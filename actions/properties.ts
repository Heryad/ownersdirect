'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getProperties(filters?: {
    emirate?: string;
    community?: string;
    type?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    minSize?: number;
    maxSize?: number;
}) {
    const supabase = await createClient()

    let query = supabase
        .from('properties')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url,
        phone,
        whatsapp,
        is_verified
      )
    `)
        .order('created_at', { ascending: false })

    // Only show published properties by default
    // In a real app, we might want to allow admins or owners to see their own pending properties here
    // But for the public listing, it should be published only.
    query = query.eq('is_published', true)

    if (filters) {
        if (filters.emirate) query = query.eq('emirate', filters.emirate)
        if (filters.community) query = query.ilike('community', `%${filters.community}%`)
        if (filters.type && filters.type !== 'all') query = query.eq('type', filters.type)
        if (filters.propertyType) query = query.ilike('property_type', filters.propertyType)
        if (filters.minPrice) query = query.gte('price', filters.minPrice)
        if (filters.maxPrice) query = query.lte('price', filters.maxPrice)
        if (filters.bedrooms) query = query.gte('bedrooms', filters.bedrooms)
        if (filters.bathrooms) query = query.gte('bathrooms', filters.bathrooms)
        if (filters.minSize) query = query.gte('area', filters.minSize)
        if (filters.maxSize) query = query.lte('area', filters.maxSize)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching properties:', error)
        return []
    }

    return data
}

export async function getProperty(id: string) {
    const supabase = await createClient()

    const { data: property, error } = await supabase
        .from('properties')
        .select(`
            *,
            profiles (
                full_name,
                avatar_url,
                phone,
                whatsapp,
                is_verified,
                role
            ),
            id_document,
            ownership_document
        `)
        .eq('id', id)
        .single()

    if (error || !property) {
        console.error('Error fetching property:', error)
        return { property: null, error: 'Property not found' }
    }
    
    const documents = [
        { name: 'ID Document', url: property.id_document },
        { name: 'Ownership Document', url: property.ownership_document }
    ].filter(doc => doc.url);


    return { property: { ...property, documents }, error: null }
}

export async function createProperty(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to create a property' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const type = formData.get('type') as 'rent' | 'sell'
    const emirate = formData.get('emirate') as string
    const areaVal = formData.get('area') as string

    const bedrooms = parseInt(formData.get('bedrooms') as string)
    const bathrooms = parseInt(formData.get('bathrooms') as string)
    const areaSize = parseFloat(formData.get('area') as string)
    const parking = parseInt(formData.get('parking') as string)
    const propertyType = formData.get('propertyType') as string
    const yearBuilt = parseInt(formData.get('yearBuilt') as string)
    const availableFrom = formData.get('availableFrom') as string
    const furnished = formData.get('furnished') as string

    // Handle amenities (expecting JSON string or array of strings)
    const amenitiesRaw = formData.get('amenities') as string
    let amenities = []
    try {
        amenities = JSON.parse(amenitiesRaw)
    } catch (e) {
        console.error('Error parsing amenities:', e)
    }

    // Handle images - this is a simplified version. 
    // In a real app, you'd upload files to Supabase Storage first and get URLs.
    // For now, we'll assume we receive a list of URLs or handle uploads separately.
    const imagesRaw = formData.get('images') as string
    let images: string[] = []
    try {
        images = JSON.parse(imagesRaw)
    } catch (e) {
        // If it's not JSON, maybe it's a comma-separated string?
        if (imagesRaw) images = imagesRaw.split(',').map(s => s.trim())
    }

    // Handle documents
    const idDocument = formData.get('idDocument') as string
    const ownershipDocument = formData.get('ownershipDocument') as string

    const locationCombined = `${areaVal}, ${emirate}`

    const { error } = await supabase
        .from('properties')
        .insert({
            owner_id: user.id,
            title,
            description,
            price,
            type,
            location: locationCombined, // Use the combined location
            emirate,
            community: areaVal, // Store the location area string in 'community' column
            bedrooms,
            bathrooms,
            area: areaSize, // Store the size (sqft) in 'area' column
            parking,
            property_type: propertyType,
            year_built: yearBuilt,
            available_from: availableFrom,
            furnished,
            amenities,
            images,
            id_document: idDocument,
            ownership_document: ownershipDocument,
            status: 'pending',
            is_published: false
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/properties')
    redirect('/properties')
}

export async function getUserProperties() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching user properties:', error)
        return []
    }

    return data
}

export async function deleteProperty(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to delete a property' }
    }

    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/properties')
    revalidatePath('/dashboard')
    return { success: true }
}

export async function updateProperty(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to update a property' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const type = formData.get('type') as 'rent' | 'sell'
    const location = formData.get('location') as string
    const bedrooms = parseInt(formData.get('bedrooms') as string)
    const bathrooms = parseInt(formData.get('bathrooms') as string)
    const areaSize = parseFloat(formData.get('area') as string)
    const parking = parseInt(formData.get('parking') as string)
    const propertyType = formData.get('propertyType') as string
    const yearBuilt = parseInt(formData.get('yearBuilt') as string)
    const availableFrom = formData.get('availableFrom') as string
    const furnished = formData.get('furnished') as string

    // Handle amenities
    const amenitiesRaw = formData.get('amenities') as string
    let amenities = []
    try {
        amenities = JSON.parse(amenitiesRaw)
    } catch (e) {
        console.error('Error parsing amenities:', e)
    }

    // Handle images
    const imagesRaw = formData.get('images') as string
    let images: string[] = []
    try {
        images = JSON.parse(imagesRaw)
    } catch (e) {
        if (imagesRaw) images = imagesRaw.split(',').map(s => s.trim())
    }

    const emirate = formData.get('emirate') as string
    const areaVal = formData.get('area') as string

    // If we have new location fields, construct the location string
    let locationToUpdate = location;
    if (emirate && areaVal) {
        locationToUpdate = `${areaVal}, ${emirate}`;
    }

    const updateData: any = {
        title,
        description,
        price,
        type,
        location: locationToUpdate,
        bedrooms,
        bathrooms,
        area: areaSize,
        parking,
        property_type: propertyType,
        year_built: yearBuilt,
        available_from: availableFrom,
        furnished,
        amenities,
        images
    }

    if (emirate) updateData.emirate = emirate;
    if (areaVal) updateData.community = areaVal;

    const { error } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', id)
        .eq('owner_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/properties')
    revalidatePath(`/property/${id}`)
    revalidatePath('/dashboard')
    redirect('/dashboard')
}
