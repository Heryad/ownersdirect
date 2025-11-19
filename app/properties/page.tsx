'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FilterBar, { Filters } from '@/components/properties/FilterBar';
import PropertyCard from '@/components/ui/PropertyCard';
import Pagination from '@/components/properties/Pagination';
import { Search, Home } from 'lucide-react';

function PropertiesContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    city: searchParams.get('city') || '',
    type: (searchParams.get('type') as 'all' | 'rent' | 'sell') || 'all',
    propertyType: searchParams.get('propertyType') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    priceMin: searchParams.get('minPrice') || '',
    priceMax: searchParams.get('maxPrice') || '',
    sizeMin: searchParams.get('minSize') || '',
    sizeMax: searchParams.get('maxSize') || '',
  });

  const itemsPerPage = 12;

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { getProperties } = await import('@/actions/properties');

        const filterParams: any = {};
        if (filters.city) filterParams.city = filters.city;
        if (filters.type && filters.type !== 'all') filterParams.type = filters.type;
        if (filters.propertyType) filterParams.propertyType = filters.propertyType;
        if (filters.bedrooms) filterParams.bedrooms = parseInt(filters.bedrooms);
        if (filters.bathrooms) filterParams.bathrooms = parseInt(filters.bathrooms);
        if (filters.priceMin) filterParams.minPrice = parseFloat(filters.priceMin);
        if (filters.priceMax) filterParams.maxPrice = parseFloat(filters.priceMax);
        if (filters.sizeMin) filterParams.minSize = parseFloat(filters.sizeMin);
        if (filters.sizeMax) filterParams.maxSize = parseFloat(filters.sizeMax);

        const data = await getProperties(filterParams);
        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Browse through our extensive collection of properties available for rent and sale
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <FilterBar
          onFilterChange={handleFilterChange}
          onReset={() => handleFilterChange({
            city: '',
            type: 'all',
            propertyType: '',
            bedrooms: '',
            bathrooms: '',
            priceMin: '',
            priceMax: '',
            sizeMin: '',
            sizeMax: '',
          })}
        />
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-slate-600">Loading properties...</p>
            </div>
          </div>
        ) : currentProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Properties Found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => handleFilterChange({
                city: '',
                type: 'all',
                propertyType: '',
                bedrooms: '',
                bathrooms: '',
                priceMin: '',
                priceMax: '',
                sizeMin: '',
                sizeMax: '',
              })}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Home className="w-5 h-5" />
                <span className="font-semibold">
                  {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
                </span>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price.toLocaleString()}
                    type={property.type}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    image={property.images?.[0] || '/placeholder-property.jpg'}
                    category={property.property_type}
                    featured={false}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
