'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        console.error('Error fetching profile:', error)
        return null
    }

    return { ...data, email: user.email }
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to update your profile' }
    }

    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const whatsapp = formData.get('whatsapp') as string
    const role = formData.get('role') as 'owner' | 'renter' | 'broker'

    // Handle avatar upload if present
    const avatarFile = formData.get('avatar') as File
    let avatarUrl = formData.get('avatarUrl') as string

    if (avatarFile && avatarFile.size > 0) {
        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${user.id}/avatar.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFile, { upsert: true })

        if (uploadError) {
            console.error('Error uploading avatar:', uploadError)
            return { error: 'Failed to upload avatar' }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)

        avatarUrl = publicUrl
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            phone,
            whatsapp,
            role,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/profile')
    return { success: true }
}
