'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getProperty } from '@/actions/properties';
import { updatePropertyStatus } from '@/actions/admin';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Loader2, CheckCircle, XCircle, File as FileIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PropertyVerificationPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { id } = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (id) {
            loadPropertyDetails(id as string);
        }
    }, [id]);

    const loadPropertyDetails = async (propertyId: string) => {
        setLoading(true);
        const { property: propertyData, error } = await getProperty(propertyId);
        if (error || !propertyData) {
            notFound();
            return;
        }
        setProperty(propertyData);
        setLoading(false);
    };

    const handleAction = async (status: 'published' | 'rejected') => {
        if (!id) return;

        const result = await updatePropertyStatus(id as string, status);

        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            const messageKey = status === 'published' ? 'propertyApproved' : 'propertyRejected';
            setMessage({ type: 'success', text: t(`admin.messages.${messageKey}`) });
            setTimeout(() => {
                router.push('/admin');
            }, 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!property) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">{property.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">Property Details</h2>
                            <div className="space-y-2 text-slate-700">
                                <p><strong>Type:</strong> {property.type}</p>
                                <p><strong>Price:</strong> AED {property.price}</p>
                                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                                <p><strong>Area:</strong> {property.sqft} sqft</p>
                                <p><strong>Location:</strong> {property.location}</p>
                                <p><strong>Description:</strong> {property.description}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">Uploaded Documents</h2>
                            {property.documents && property.documents.length > 0 ? (
                                <ul className="space-y-2">
                                    {property.documents.map((doc: any, index: number) => (
                                        <li key={index} className="flex items-center">
                                            <FileIcon className="w-5 h-5 text-slate-500 mr-2" />
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                                {doc.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-600">No documents uploaded.</p>
                            )}
                        </div>
                    </div>

                    {message.text && (
                        <div className={`mt-6 p-4 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            onClick={() => handleAction('published')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Approve
                        </button>
                        <button
                            onClick={() => handleAction('rejected')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        >
                            <XCircle className="w-5 h-5" />
                            Reject
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
