'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Home, CheckCircle, XCircle, Loader2, Search, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useRouter } from 'next/navigation';
import {
    getAdminStats,
    getAllUsers,
    getPendingProperties,
    updateUserRole,
    toggleUserVerification,
    updatePropertyStatus
} from '@/actions/admin';
import { getProfile } from '@/actions/profile';

export default function AdminPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalUsers: 0, pendingProperties: 0, publishedProperties: 0 });
    const [users, setUsers] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        checkAdminAccess();
    }, []);

    const checkAdminAccess = async () => {
        const profile = await getProfile();
        if (!profile || profile.role !== 'admin') {
            router.push('/');
            return;
        }
        loadData();
    };

    const loadData = async () => {
        setLoading(true);
        const statsData = await getAdminStats();
        if (!statsData.error) {
            setStats({
                totalUsers: statsData.totalUsers || 0,
                pendingProperties: statsData.pendingProperties || 0,
                publishedProperties: statsData.publishedProperties || 0
            });
        }

        const usersData = await getAllUsers();
        if (!usersData.error) {
            setUsers(usersData.users || []);
        }

        const propertiesData = await getPendingProperties();
        if (!propertiesData.error) {
            setProperties(propertiesData.properties || []);
        }

        setLoading(false);
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        const result = await updateUserRole(userId, newRole);
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: t('admin.messages.roleUpdated') });
            loadData();
        }
    };

    const handleVerificationToggle = async (userId: string) => {
        const result = await toggleUserVerification(userId);
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: t('admin.messages.verificationToggled') });
            // Refetch only users data instead of full page refresh
            const usersData = await getAllUsers();
            if (!usersData.error) {
                setUsers(usersData.users || []);
            }
        }
    };

    const handlePropertyAction = async (propertyId: string, status: 'published' | 'rejected') => {
        const result = await updatePropertyStatus(propertyId, status);
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            const messageKey = status === 'published' ? 'propertyApproved' : 'propertyRejected';
            setMessage({ type: 'success', text: t(`admin.messages.${messageKey}`) });
            loadData();
        }
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-slate-900">{t('admin.title')}</h1>
                        </div>
                        <p className="text-slate-600">Manage users and properties</p>
                    </motion.div>

                    {/* Message */}
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}

                    {/* Tabs */}
                    <div className="mb-8 border-b border-slate-200">
                        <div className="flex gap-4">
                            {['overview', 'users', 'properties'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 px-2 font-semibold transition-colors ${activeTab === tab
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {t(`admin.${tab}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-100 rounded-lg">
                                        <Users className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">{t('admin.stats.totalUsers')}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-100 rounded-lg">
                                        <Home className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">{t('admin.stats.pendingProperties')}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stats.pendingProperties}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">{t('admin.stats.publishedProperties')}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stats.publishedProperties}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.usersTable.name')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.usersTable.email')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.usersTable.role')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.usersTable.verified')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 text-sm text-slate-900">{user.full_name || 'N/A'}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                        className="px-3 py-1 rounded-lg border border-slate-300 text-sm"
                                                    >
                                                        <option value="renter">{t('profile.renter')}</option>
                                                        <option value="owner">{t('profile.owner')}</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleVerificationToggle(user.id)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${user.is_verified
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                            }`}
                                                    >
                                                        {user.is_verified ? (
                                                            <>
                                                                <CheckCircle className="w-3.5 h-3.5" />
                                                                {t('admin.usersTable.yes')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-3.5 h-3.5" />
                                                                {t('admin.usersTable.no')}
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Properties Tab */}
                    {activeTab === 'properties' && (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.propertiesTable.title')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.propertiesTable.owner')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.propertiesTable.type')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.propertiesTable.price')}</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('admin.propertiesTable.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {properties.map((property) => (
                                            <tr key={property.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{property.title}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{property.profiles?.full_name || 'N/A'}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                                                        {property.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-900">AED {property.price}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handlePropertyAction(property.id, 'published')}
                                                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                                                        >
                                                            {t('admin.propertiesTable.approve')}
                                                        </button>
                                                        <button
                                                            onClick={() => handlePropertyAction(property.id, 'rejected')}
                                                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                                                        >
                                                            {t('admin.propertiesTable.reject')}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
