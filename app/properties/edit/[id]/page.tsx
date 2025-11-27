'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Upload, Plus, X, Loader2, Home, DollarSign, MapPin, Layout, Bed, Bath, Car, Calendar, Image as ImageIcon, Save } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProperty, updateProperty } from '@/actions/properties';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const { t } = useLanguage();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [currentAmenity, setCurrentAmenity] = useState('');
    const [property, setProperty] = useState<any>(null);

    useEffect(() => {
        loadProperty();
    }, [id]);

    const loadProperty = async () => {
        try {
            const data = await getProperty(id);
            if (data.property) {
                setProperty(data.property);
                setImages(data.property.images || []);
                setAmenities(data.property.amenities || []);
            } else {
                setError(data.error || 'Property not found');
            }
        } catch (err) {
            console.error('Error loading property:', err);
            setError('Failed to load property details');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        setError('');
        const supabase = createClient();
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                newImages.push(publicUrl);
            }

            setImages([...images, ...newImages]);
        } catch (err: any) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddAmenity = () => {
        if (currentAmenity && !amenities.includes(currentAmenity)) {
            setAmenities([...amenities, currentAmenity]);
            setCurrentAmenity('');
        }
    };

    const handleRemoveAmenity = (amenity: string) => {
        setAmenities(amenities.filter((a) => a !== amenity));
    };

    const handleSubmit = async (formData: FormData) => {
        if (images.length === 0) {
            setError('Please upload at least one image of the property');
            return;
        }

        setSaving(true);
        setError('');

        // Append images and amenities as JSON strings
        formData.append('images', JSON.stringify(images));
        formData.append('amenities', JSON.stringify(amenities));

        const result = await updateProperty(id, formData);

        if (result?.error) {
            setError(result.error);
            setSaving(false);
        } else {
            // Success handled by server action redirect
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
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Property Not Found</h2>
                    <p className="text-slate-600">The property you are trying to edit does not exist or you do not have permission to view it.</p>
                </div>
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
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('propertyForm.editTitle')}</h1>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                {t('propertyForm.createSubtitle')}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                            <form action={handleSubmit} className="p-8 space-y-8">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                                        {error}
                                    </div>
                                )}

                                {/* Basic Information */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Home className="w-5 h-5 text-indigo-600" />
                                        {t('propertyForm.sections.basic')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.title')}</label>
                                            <input
                                                name="title"
                                                defaultValue={property.title}
                                                required
                                                placeholder={t('propertyForm.placeholders.title')}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.type')}</label>
                                            <select
                                                name="type"
                                                defaultValue={property.type}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            >
                                                <option value="rent">{t('properties.filters.rent')}</option>
                                                <option value="sell">{t('properties.filters.buy')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.propertyType')}</label>
                                            <select
                                                name="propertyType"
                                                defaultValue={property.property_type}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            >
                                                <option value="Apartment">{t('hero.categories.apartment')}</option>
                                                <option value="Villa">{t('hero.categories.villa')}</option>
                                                <option value="House">{t('hero.categories.house') || 'House'}</option>
                                                <option value="Penthouse">{t('hero.categories.penthouse')}</option>
                                                <option value="Office">{t('hero.categories.office')}</option>
                                                <option value="Commercial">{t('hero.categories.commercial')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.price')}</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="price"
                                                    type="number"
                                                    defaultValue={property.price}
                                                    required
                                                    placeholder="0.00"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="location"
                                                    defaultValue={property.location}
                                                    required
                                                    placeholder="City, State or Address"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Property Details */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Layout className="w-5 h-5 text-indigo-600" />
                                        {t('propertyForm.sections.details')}
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.bedrooms')}</label>
                                            <div className="relative">
                                                <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="bedrooms"
                                                    type="number"
                                                    defaultValue={property.bedrooms}
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.bathrooms')}</label>
                                            <div className="relative">
                                                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="bathrooms"
                                                    type="number"
                                                    defaultValue={property.bathrooms}
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.size')}</label>
                                            <div className="relative">
                                                <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="area"
                                                    type="number"
                                                    defaultValue={property.area}
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.parking')}</label>
                                            <div className="relative">
                                                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="parking"
                                                    type="number"
                                                    defaultValue={property.parking}
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.yearBuilt')}</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="yearBuilt"
                                                    type="number"
                                                    defaultValue={property.year_built}
                                                    required
                                                    min="1900"
                                                    max={new Date().getFullYear()}
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.availableFrom')}</label>
                                            <input
                                                name="availableFrom"
                                                type="date"
                                                defaultValue={property.available_from}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.furnished')}</label>
                                            <select
                                                name="furnished"
                                                defaultValue={property.furnished}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            >
                                                <option value="Fully Furnished">{t('propertyForm.options.furnished.fully')}</option>
                                                <option value="Semi Furnished">{t('propertyForm.options.furnished.semi')}</option>
                                                <option value="Unfurnished">{t('propertyForm.options.furnished.unfurnished')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.description')}</label>
                                        <textarea
                                            name="description"
                                            defaultValue={property.description}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            placeholder={t('propertyForm.placeholders.description')}
                                        ></textarea>
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Images */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Upload className="w-5 h-5 text-indigo-600" />
                                        {t('propertyForm.sections.images')}
                                    </h2>

                                    <div className="mb-6">
                                        <label className="block w-full cursor-pointer">
                                            <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                                {uploading ? (
                                                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                                                ) : (
                                                    <ImageIcon className="w-8 h-8 text-slate-400" />
                                                )}
                                                <span className="text-sm font-medium text-slate-600">
                                                    {uploading ? t('propertyForm.buttons.uploading') : t('propertyForm.buttons.uploadImages')}
                                                </span>
                                                <span className="text-xs text-slate-400">{t('propertyForm.hints.images')}</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {images.map((url, index) => (
                                            <div key={index} className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                <img src={url} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {images.length === 0 && !uploading && (
                                            <div className="col-span-full py-8 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-lg">
                                                {t('propertyForm.status.noImages')}
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Amenities */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-indigo-600" />
                                        {t('propertyForm.sections.amenities')}
                                    </h2>

                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={currentAmenity}
                                            onChange={(e) => setCurrentAmenity(e.target.value)}
                                            placeholder={t('propertyForm.placeholders.amenity')}
                                            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddAmenity}
                                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                                        >
                                            {t('propertyForm.buttons.add')}
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                                            >
                                                {amenity}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAmenity(amenity)}
                                                    className="hover:text-indigo-900"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                        {amenities.length === 0 && (
                                            <p className="text-slate-500 text-sm italic">{t('propertyForm.status.noAmenities')}</p>
                                        )}
                                    </div>
                                </section>

                                <div className="pt-6">
                                    <motion.button
                                        type="submit"
                                        disabled={saving || uploading}
                                        whileHover={{ scale: (saving || uploading) ? 1 : 1.02 }}
                                        whileTap={{ scale: (saving || uploading) ? 1 : 0.98 }}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                {t('propertyForm.buttons.updating') || 'Saving Changes...'}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                {t('propertyForm.buttons.update')}
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
