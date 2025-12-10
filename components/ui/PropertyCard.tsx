'use client';

import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface PropertyCardProps {
  id: string | number;
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'rent' | 'sell';
  category: string;
  featured?: boolean;
  isSold?: boolean;
}

const PropertyCard = ({
  id,
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  category,
  featured = false,
  isSold = false,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${type === 'rent' ? 'bg-indigo-600' : 'bg-blue-600'
            }`}>
            {type === 'rent' ? t('properties.filters.rent') : t('properties.filters.buy')}
          </span>
          {featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500">
              {t('card.featured')}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
              } transition-colors`}
          />
        </motion.button>

        {/* View Details Overlay */}
        <Link href={`/property/${id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-lg flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            {t('card.viewDetails')}
          </motion.div>
        </Link>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
            {category}
          </span>
        </div>

        {/* SOLD Badge - Diagonal Ribbon */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -45 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-60" />

              {/* Main badge */}
              <div className="relative px-16 py-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 animate-pulse opacity-75" />
                <span className="relative text-white font-black text-2xl tracking-wider drop-shadow-lg">
                  {type === 'rent' ? 'RENTED' : 'SOLD'}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            AED {price}
          </span>
          {type === 'rent' && (
            <span className="text-slate-500 text-sm ml-1">/{t('card.month')}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1.5">
            <Bed className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{area} sqft</span>
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default PropertyCard;
