'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Home, Bed, Bath, Ruler, DollarSign, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
}

export interface Filters {
  city: string;
  type: 'all' | 'rent' | 'sell';
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  priceMin: string;
  priceMax: string;
  sizeMin: string;
  sizeMax: string;
}

const FilterBar = ({ onFilterChange, onReset }: FilterBarProps) => {
  const [filters, setFilters] = useState<Filters>({
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

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: Filters = {
      city: '',
      type: 'all',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      priceMin: '',
      priceMax: '',
      sizeMin: '',
      sizeMax: '',
    };
    setFilters(resetFilters);
    onReset();
  };

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Office' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'penthouse', label: 'Penthouse' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-8 sticky top-24 z-40"
    >
      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* City Search */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="City or location"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('type', 'all')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              filters.type === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('type', 'rent')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              filters.type === 'rent'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => handleFilterChange('type', 'sell')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              filters.type === 'sell'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Buy
          </button>
        </div>

        {/* Property Type */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
            showAdvanced
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showAdvanced ? 'Hide' : 'More'} Filters
        </motion.button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-slate-200 pt-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bedrooms */}
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} Bedrooms
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div className="relative">
              <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                {bathroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} Bathrooms
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder="Min price"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder="Max price"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Size Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder="Min size (sqft)"
                value={filters.sizeMin}
                onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder="Max size (sqft)"
                value={filters.sizeMax}
                onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-all"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;
