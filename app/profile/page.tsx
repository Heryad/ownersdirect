'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageCircle, Camera, Loader2, Save, Building2, LogOut } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProfile, updateProfile } from '@/actions/profile';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { signout } from '@/actions/auth';

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [profile, setProfile] = useState<any>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            if (data) {
                setProfile(data);
                setAvatarPreview(data.avatar_url || '');
            } else {
                // Redirect to login if no profile found (not logged in)
                router.push('/auth/signin');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setSaving(true);
        setMessage({ type: '', text: '' });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        // Keep existing avatar URL if no new file
        formData.append('avatarUrl', profile.avatar_url || '');

        const result = await updateProfile(formData);

        if (result?.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            // Refresh profile data to get new avatar URL if uploaded
            loadProfile();
        }
        setSaving(false);
    };

    const handleSignOut = async () => {
        await signout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Sidebar / Avatar */}
                            <div className="md:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                                    <div className="relative w-32 h-32 mx-auto mb-4 group">
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-50 bg-slate-100">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-full h-full p-6 text-slate-300" />
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg">
                                            <Camera className="w-4 h-4" />
                                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                        </label>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-1">{profile?.full_name || 'User'}</h2>
                                    <p className="text-slate-500 text-sm mb-4">{profile?.email}</p>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium capitalize">
                                        {profile?.role || 'User'}
                                    </div>
                                </div>

                                {/* Quick Stats or Links could go here */}
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-2">
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="p-6 border-b border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                                    </div>

                                    <form action={handleSubmit} className="p-6 space-y-6">
                                        {message.text && (
                                            <div className={`p-4 rounded-lg text-sm flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                                                    }`} />
                                                {message.text}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        name="fullName"
                                                        defaultValue={profile?.full_name || ''}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        name="phone"
                                                        defaultValue={profile?.phone || ''}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp</label>
                                                <div className="relative">
                                                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        name="whatsapp"
                                                        defaultValue={profile?.whatsapp || ''}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {['owner', 'renter', 'broker'].map((role) => (
                                                        <label key={role} className="cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="role"
                                                                value={role}
                                                                defaultChecked={profile?.role === role}
                                                                className="peer hidden"
                                                            />
                                                            <div className="text-center py-3 px-4 rounded-lg border border-slate-200 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 hover:bg-slate-50 transition-all capitalize font-medium">
                                                                {role}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <motion.button
                                                type="submit"
                                                disabled={saving}
                                                whileHover={{ scale: saving ? 1 : 1.02 }}
                                                whileTap={{ scale: saving ? 1 : 0.98 }}
                                                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-5 h-5" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
