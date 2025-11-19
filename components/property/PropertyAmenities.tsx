'use client';

import { motion } from 'framer-motion';
import {
  Car,
  Dumbbell,
  Waves,
  Wifi,
  Snowflake,
  Shield,
  TreePine,
  UtensilsCrossed,
  Sofa,
  Tv,
  Wind,
  Sun,
  Camera,
  DoorOpen,
  ShowerHead,
  Zap,
} from 'lucide-react';

interface Amenity {
  name: string;
  iconName: string;
  available: boolean;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities & Features</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity.iconName as keyof typeof amenityIcons] || Wifi;
          return (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${amenity.available
                  ? 'border-indigo-200 bg-indigo-50 hover:border-indigo-300 hover:shadow-md'
                  : 'border-slate-200 bg-slate-50 opacity-50'
                }`}
            >
              <div
                className={`p-2 rounded-lg ${amenity.available
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-500'
                    : 'bg-slate-300'
                  }`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-sm font-semibold ${amenity.available ? 'text-slate-900' : 'text-slate-400'
                  }`}
              >
                {amenity.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PropertyAmenities;

// Export common amenities icons for easy use
export const amenityIcons = {
  parking: Car,
  gym: Dumbbell,
  pool: Waves,
  wifi: Wifi,
  ac: Snowflake,
  security: Shield,
  garden: TreePine,
  kitchen: UtensilsCrossed,
  furnished: Sofa,
  tv: Tv,
  heating: Wind,
  balcony: Sun,
  cctv: Camera,
  elevator: DoorOpen,
  bathroom: ShowerHead,
  generator: Zap,
};
