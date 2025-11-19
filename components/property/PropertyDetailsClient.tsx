'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, MapPin, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/property/ImageGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyAmenities, { amenityIcons } from '@/components/property/PropertyAmenities';
import ContactCard from '@/components/property/ContactCard';

interface PropertyDetailsClientProps {
    property: any; // We can improve this type later
}

export default function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
    const router = useRouter();

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Property not found</h1>
                <button
                    onClick={() => router.back()}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                    Go back to listings
                </button>
            </div>
        );
    }

    // Map Supabase data to component structure if needed, 
    // but ideally the server component passes it already mapped or we map it here.
    // Let's assume the server passes the raw data and we map it here, OR the server maps it.
    // To minimize changes, let's assume the server passes the SAME structure as the original component state.
    // But wait, the server returns raw Supabase data.
    // Let's do the mapping here to be safe, or map it in the server component.
    // Mapping in the server component is cleaner.

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section with Back Button */}
            <div className="pt-24 pb-8 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: -5 }}
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold">Back to listings</span>
                        </motion.button>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <Share2 className="w-5 h-5 text-slate-700" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-slate-100 hover:bg-red-50 rounded-full transition-colors group"
                            >
                                <Heart className="w-5 h-5 text-slate-700 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
                            </motion.button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            {property.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <span className="font-medium">{property.location}</span>
                            </div>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                                <span>Available {property.availableFrom}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Image Gallery */}
                <div className="mb-12">
                    <ImageGallery images={property.images} />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Property</h2>
                            <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
                                {property.description}
                            </div>
                        </motion.div>

                        {/* Property Details */}
                        <PropertyDetails
                            price={property.price}
                            type={property.type}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            area={property.area}
                            parking={property.parking}
                            propertyType={property.propertyType}
                            yearBuilt={property.yearBuilt}
                            availableFrom={property.availableFrom}
                            furnished={property.furnished}
                            location={property.location}
                        />

                        {/* Amenities */}
                        <PropertyAmenities amenities={property.amenities} />

                        {/* Location Map Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Location</h2>
                            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                    <p className="text-slate-600 font-semibold">{property.location}</p>
                                    <p className="text-sm text-slate-500 mt-1">Interactive map would go here</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Contact Card */}
                    <div className="lg:col-span-1">
                        <ContactCard {...property.broker} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
