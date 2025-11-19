'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FilterBar, { Filters } from '@/components/properties/FilterBar';
import PropertyCard from '@/components/ui/PropertyCard';
import Pagination from '@/components/properties/Pagination';
import { Search, Home } from 'lucide-react';

export default function PropertiesPage() {
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

  // Fetch properties when filters change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { getProperties } = await import('@/actions/properties');
        const apiFilters = {
          city: filters.city,
          type: filters.type,
          propertyType: filters.propertyType,
          minPrice: filters.priceMin ? parseFloat(filters.priceMin) : undefined,
          maxPrice: filters.priceMax ? parseFloat(filters.priceMax) : undefined,
          bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
          bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,
          minSize: filters.sizeMin ? parseFloat(filters.sizeMin) : undefined,
          maxSize: filters.sizeMax ? parseFloat(filters.sizeMax) : undefined,
        };
        const data = await getProperties(apiFilters);
        setProperties(data || []);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const allProperties = useMemo(() => {
    return properties.map(p => ({
      id: p.id,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', // Fallback image
      title: p.title,
      price: p.price.toLocaleString(),
      location: p.location,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      type: p.type,
      category: p.property_type,
      featured: false, // Default to false for now
    }));
  }, [properties]);

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return allProperties;
  }, [allProperties]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleReset = () => {
    setFilters({
      city: '',
      type: 'all',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      priceMin: '',
      priceMax: '',
      sizeMin: '',
      sizeMax: '',
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full font-semibold text-sm mb-6">
              <Home className="w-4 h-4" />
              Browse Properties
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Perfect <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Property</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore {allProperties.length}+ verified properties available for rent and sale
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} onReset={handleReset} />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2 text-slate-600">
            <Search className="w-5 h-5" />
            <span className="font-semibold">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </span>
          </div>
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length}
          </div>
        </motion.div>

        {/* Properties Grid */}
        {currentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="inline-flex p-6 bg-slate-100 rounded-full mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your filters to see more results</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}

        {/* Pagination */}
        {currentProperties.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
