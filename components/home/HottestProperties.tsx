'use client';

import { motion } from 'framer-motion';
import PropertyCard from '../ui/PropertyCard';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface Property {
  id: string | number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'rent' | 'sell';
  propertyType: string;
  images: string[];
  featured?: boolean;
  is_sold?: boolean;
}

interface HottestPropertiesProps {
  properties: Property[];
}

const HottestProperties = ({ properties }: HottestPropertiesProps) => {
  const { t } = useLanguage();
  // Filter for featured properties or just take the first 6
  const displayedProperties = properties.slice(0, 6);

  return (
    <section id="properties" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm mb-4">
            <TrendingUp className="w-4 h-4" />
            {t('hottest.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('hottest.title')} <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{t('hottest.subtitle')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('hottest.description')}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {displayedProperties.length > 0 ? (
            displayedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Map property data to PropertyCard props if necessary */}
                <PropertyCard
                  id={property.id}
                  image={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                  title={property.title}
                  price={property.price.toString()}
                  location={property.location}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  type={property.type}
                  category={property.propertyType}
                  featured={property.featured}
                  isSold={property.is_sold}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              {t('hottest.noProperties')}
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/properties">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 cursor-pointer"
            >
              {t('hottest.viewAll')}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HottestProperties;
