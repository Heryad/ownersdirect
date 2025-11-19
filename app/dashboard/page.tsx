'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, MessageSquare, Home, Loader2, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getUserProperties, deleteProperty } from '@/actions/properties';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState<any[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await getUserProperties();
            setProperties(data || []);
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;

        setDeletingId(id);
        const result = await deleteProperty(id);

        if (result?.error) {
            alert(result.error);
        } else {
            // Remove from local state
            setProperties(properties.filter(p => p.id !== id));
        }
        setDeletingId(null);
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Owner Dashboard</h1>
                                <p className="text-slate-600 mt-1">Manage your property listings and view performance stats</p>
                            </div>
                            <Link href="/properties/create">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Property
                                </motion.button>
                            </Link>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <Home className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Total Properties</p>
                                        <h3 className="text-2xl font-bold text-slate-900">{properties.length}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Total Views</p>
                                        <h3 className="text-2xl font-bold text-slate-900">0</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Total Inquiries</p>
                                        <h3 className="text-2xl font-bold text-slate-900">0</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Properties List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900">Your Properties</h2>
                            </div>

                            {properties.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Home className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties listed yet</h3>
                                    <p className="text-slate-500 mb-6">Start by adding your first property listing to reach potential buyers and renters.</p>
                                    <Link href="/properties/create">
                                        <button className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">
                                            Create Listing
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-200">
                                    {properties.map((property) => (
                                        <div key={property.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors">
                                            {/* Image */}
                                            <div className="w-full md:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {property.images && property.images[0] ? (
                                                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                        <Home className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${property.type === 'rent' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                                                                }`}>
                                                                For {property.type}
                                                            </span>
                                                            <span className="text-slate-500 text-sm">• {property.property_type}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{property.title}</h3>
                                                        <p className="text-slate-500 text-sm mb-2">{property.location}</p>
                                                        <div className="font-bold text-indigo-600">
                                                            AED {property.price.toLocaleString()}
                                                            {property.type === 'rent' && <span className="text-sm font-normal text-slate-500">/month</span>}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2">
                                                        <Link href={`/property/${property.id}`}>
                                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                        </Link>
                                                        <Link href={`/properties/edit/${property.id}`}>
                                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(property.id)}
                                                            disabled={deletingId === property.id}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                            title="Delete"
                                                        >
                                                            {deletingId === property.id ? (
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
