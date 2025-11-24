'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Helper function to check if user is admin
async function isAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    return profile?.role === 'admin';
}

// User Management Actions
export async function getAllUsers(page = 1, limit = 10, search = '') {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();
    const offset = (page - 1) * limit;

    // Get profiles
    let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

    const { data: profiles, error, count } = await query;

    if (error) {
        return { error: error.message };
    }

    // Get auth users to fetch emails
    const { data: { users: authUsers } } = await supabase.auth.admin.listUsers();

    // Merge profile data with email from auth users
    const usersWithEmail = profiles?.map(profile => {
        const authUser = authUsers?.find(u => u.id === profile.id);
        return {
            ...profile,
            email: authUser?.email || 'N/A'
        };
    }) || [];

    // Apply search filter if provided
    let filteredUsers = usersWithEmail;
    if (search) {
        filteredUsers = usersWithEmail.filter(user =>
            user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return {
        users: filteredUsers,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
    };
}

export async function updateUserRole(userId: string, newRole: string) {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    if (!['owner', 'renter', 'admin'].includes(newRole)) {
        return { error: 'Invalid role' };
    }

    const supabase = await createClient();
    const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin');
    return { success: true };
}

export async function toggleUserVerification(userId: string) {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();

    // Get current verification status
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', userId)
        .single();

    if (!profile) {
        return { error: 'User not found' };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ is_verified: !profile.is_verified })
        .eq('id', userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin');
    return { success: true };
}

// Property Management Actions
export async function getPendingProperties(page = 1, limit = 10) {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
        .from('properties')
        .select(`
      *,
      profiles:owner_id (
        full_name
      )
    `, { count: 'exact' })
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        return { error: error.message };
    }

    return {
        properties: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
    };
}

export async function getAllPropertiesAdmin(page = 1, limit = 10, status = 'all', search = '') {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();
    const offset = (page - 1) * limit;

    let query = supabase
        .from('properties')
        .select(`
      *,
      profiles:owner_id (
        full_name,
        email
      )
    `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (status !== 'all') {
        query = query.eq('status', status);
    }

    if (search) {
        query = query.ilike('title', `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        return { error: error.message };
    }

    return {
        properties: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
    };
}

export async function updatePropertyStatus(propertyId: string, status: 'pending' | 'published' | 'rejected') {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();
    const { error } = await supabase
        .from('properties')
        .update({
            status,
            is_published: status === 'published'
        })
        .eq('id', propertyId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/properties');
    return { success: true };
}

// Dashboard Statistics
export async function getAdminStats() {
    if (!await isAdmin()) {
        return { error: 'Unauthorized' };
    }

    const supabase = await createClient();

    const [usersResult, pendingResult, publishedResult] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    ]);

    return {
        totalUsers: usersResult.count || 0,
        pendingProperties: pendingResult.count || 0,
        publishedProperties: publishedResult.count || 0,
    };
}
