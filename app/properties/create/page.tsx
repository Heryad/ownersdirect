'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, Plus, X, Loader2, Home, DollarSign, MapPin, Layout, Bed, Bath, Car, Calendar, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createProperty } from '@/actions/properties';
import { createClient } from '@/lib/supabase/client';

export default function CreatePropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [currentAmenity, setCurrentAmenity] = useState('');
    const [idDocument, setIdDocument] = useState<string | null>(null);
    const [ownershipDocument, setOwnershipDocument] = useState<string | null>(null);
    const [uploadingDoc, setUploadingDoc] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        setError('');
        const supabase = createClient();
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

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

    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'ownership') => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploadingDoc(true);
        setError('');
        const supabase = createClient();
        const file = e.target.files[0];

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('property-documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('property-documents')
                .getPublicUrl(filePath);

            if (type === 'id') {
                setIdDocument(publicUrl);
            } else {
                setOwnershipDocument(publicUrl);
            }
        } catch (err: any) {
            console.error('Error uploading document:', err);
            setError('Failed to upload document. Please try again.');
        } finally {
            setUploadingDoc(false);
            e.target.value = '';
        }
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
        console.log('Submitting form...');
        if (images.length === 0) {
            console.log('No images uploaded');
            setError('Please upload at least one image of the property');
            return;
        }

        if (!idDocument || !ownershipDocument) {
            setError('Please upload both ID and Ownership documents');
            return;
        }

        setLoading(true);
        setError('');

        // Append images and amenities as JSON strings
        formData.append('images', JSON.stringify(images));
        formData.append('amenities', JSON.stringify(amenities));
        formData.append('idDocument', idDocument);
        formData.append('ownershipDocument', ownershipDocument);

        console.log('Calling createProperty server action...');
        try {
            const result = await createProperty(formData);
            console.log('Server action result:', result);

            if (result?.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success handled by server action redirect
                console.log('Success, redirecting...');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

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
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">List Your Property</h1>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Fill in the details below to list your property on OwnersDirect. Reach thousands of potential buyers and renters directly.
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
                                        Basic Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Property Title</label>
                                            <input
                                                name="title"
                                                required
                                                placeholder="e.g. Modern Luxury Villa with Ocean View"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Listing Type</label>
                                            <select
                                                name="type"
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            >
                                                <option value="rent">For Rent</option>
                                                <option value="sell">For Sale</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                                            <select
                                                name="propertyType"
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                defaultValue="Apartment"
                                            >
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="House">House</option>
                                                <option value="Penthouse">Penthouse</option>
                                                <option value="Office">Office</option>
                                                <option value="Commercial">Commercial</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Price</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="price"
                                                    type="number"
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
                                        Property Details
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                                            <div className="relative">
                                                <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="bedrooms"
                                                    type="number"
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms</label>
                                            <div className="relative">
                                                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="bathrooms"
                                                    type="number"
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Area (sqft)</label>
                                            <div className="relative">
                                                <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="area"
                                                    type="number"
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Parking Spots</label>
                                            <div className="relative">
                                                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="parking"
                                                    type="number"
                                                    required
                                                    min="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Year Built</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    name="yearBuilt"
                                                    type="number"
                                                    required
                                                    min="1900"
                                                    max={new Date().getFullYear()}
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Available From</label>
                                            <input
                                                name="availableFrom"
                                                type="date"
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Furnishing</label>
                                            <select
                                                name="furnished"
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            >
                                                <option value="Fully Furnished">Fully Furnished</option>
                                                <option value="Semi Furnished">Semi Furnished</option>
                                                <option value="Unfurnished">Unfurnished</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                            placeholder="Describe your property in detail..."
                                        ></textarea>
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Documents */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Upload className="w-5 h-5 text-indigo-600" />
                                        Documents
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">ID Document</label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                                {idDocument ? (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <span className="font-medium">Document Uploaded</span>
                                                        <button type="button" onClick={() => setIdDocument(null)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                                                    </div>
                                                ) : (
                                                    <label className="cursor-pointer text-center">
                                                        <span className="text-indigo-600 font-medium hover:text-indigo-700">Upload ID</span>
                                                        <span className="text-slate-500 block text-xs mt-1">PDF or Image</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) => handleDocumentUpload(e, 'id')}
                                                            disabled={uploadingDoc}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Ownership Proof</label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                                {ownershipDocument ? (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <span className="font-medium">Document Uploaded</span>
                                                        <button type="button" onClick={() => setOwnershipDocument(null)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                                                    </div>
                                                ) : (
                                                    <label className="cursor-pointer text-center">
                                                        <span className="text-indigo-600 font-medium hover:text-indigo-700">Upload Proof</span>
                                                        <span className="text-slate-500 block text-xs mt-1">PDF or Image</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) => handleDocumentUpload(e, 'ownership')}
                                                            disabled={uploadingDoc}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Images */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Upload className="w-5 h-5 text-indigo-600" />
                                        Images
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
                                                    {uploading ? 'Uploading...' : 'Click to upload images'}
                                                </span>
                                                <span className="text-xs text-slate-400">JPG, PNG, WebP up to 5MB</span>
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
                                                No images added yet
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <hr className="border-slate-200" />

                                {/* Amenities */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-indigo-600" />
                                        Amenities
                                    </h2>

                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={currentAmenity}
                                            onChange={(e) => setCurrentAmenity(e.target.value)}
                                            placeholder="Add amenity (e.g. WiFi, Pool, Parking)"
                                            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddAmenity}
                                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                                        >
                                            Add
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
                                            <p className="text-slate-500 text-sm italic">No amenities added yet</p>
                                        )}
                                    </div>
                                </section>

                                <div className="pt-6">
                                    <motion.button
                                        type="submit"
                                        disabled={loading || uploading || uploadingDoc}
                                        whileHover={{ scale: (loading || uploading) ? 1 : 1.02 }}
                                        whileTap={{ scale: (loading || uploading) ? 1 : 0.98 }}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                Creating Listing...
                                            </>
                                        ) : (
                                            'Create Listing'
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
