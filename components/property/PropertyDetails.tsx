'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Ruler,
  Bed,
  Bath,
  Car,
  Home,
  MapPin,
  FileText,
  Clock,
  Sofa,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface PropertyDetailsProps {
  price: string;
  type: 'rent' | 'sell';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  propertyType: string;
  yearBuilt: number;
  availableFrom: string;
  furnished: string;
  location: string;
}

const PropertyDetails = ({
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  parking,
  propertyType,
  yearBuilt,
  availableFrom,
  furnished,
  location,
}: PropertyDetailsProps) => {
  const { t } = useLanguage();
  const details = [
    {
      icon: Bed,
      label: t('propertyForm.fields.bedrooms'),
      value: bedrooms.toString(),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Bath,
      label: t('propertyForm.fields.bathrooms'),
      value: bathrooms.toString(),
      color: 'from-blue-500 to-pink-500',
    },
    {
      icon: Ruler,
      label: t('propertyForm.fields.size'),
      value: area ? `${area} sqft` : 'N/A',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Car,
      label: t('propertyForm.fields.parking'),
      value: `${parking} ${parking === 1 ? 'space' : 'spaces'}`,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Home,
      label: t('propertyForm.fields.propertyType'),
      value: propertyType,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Calendar,
      label: t('propertyForm.fields.yearBuilt'),
      value: yearBuilt.toString(),
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Clock,
      label: t('propertyForm.fields.availableFrom'),
      value: availableFrom,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Sofa,
      label: t('propertyForm.fields.furnished'),
      value: furnished,
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Price Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                {type === 'rent' ? t('propertyDetails.monthlyRent') : t('propertyDetails.askingPrice')}
              </span>
            </div>
            <div className="text-5xl font-bold mb-2">
              AED {price}
              {type === 'rent' && <span className="text-xl ml-2 opacity-75">/{t('propertyDetails.month')}</span>}
            </div>
          </div>
          <div className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full font-semibold text-sm">
            {type === 'rent' ? t('properties.filters.rent') : t('properties.filters.buy')}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{location}</span>
        </div>
      </motion.div>

      {/* Property Details Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          {t('propertyDetails.details')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                <div className="bg-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-300 transition-all hover:shadow-md">
                  <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${detail.color} mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-slate-600 mb-1">{detail.label}</div>
                  <div className="text-xl font-bold text-slate-900">{detail.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Additional Terms */}
      {type === 'rent' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">{t('propertyDetails.rentalTerms')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('propertyDetails.securityDeposit')}</div>
              <div className="text-lg font-bold text-slate-900">AED {price}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('propertyDetails.minimumLease')}</div>
              <div className="text-lg font-bold text-slate-900">{t('propertyDetails.12months')}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">{t('propertyDetails.noticePeriod')}</div>
              <div className="text-lg font-bold text-slate-900">{t('propertyDetails.2months')}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};



export default PropertyDetails;
