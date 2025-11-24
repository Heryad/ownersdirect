import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, Bed, Bath, Ruler, DollarSign, SlidersHorizontal, X, Building2, ChevronDown, Check } from 'lucide-react';
import uaeLocations from '@/lib/data/uae-locations.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
}

export interface Filters {
  emirate: string;
  community: string;
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
  const { t } = useLanguage();
  const [filters, setFilters] = useState<Filters>({
    emirate: '',
    community: '',
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
  const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const areaInputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (areaInputRef.current && !areaInputRef.current.contains(event.target as Node)) {
        setShowAreaSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleEmirateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEmirate = e.target.value;
    const areas = newEmirate ? uaeLocations[newEmirate as keyof typeof uaeLocations] || [] : [];
    setFilteredAreas(areas);

    const newFilters = { ...filters, emirate: newEmirate, community: '' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCommunityChange = (value: string) => {
    const newFilters = { ...filters, community: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: Filters = {
      emirate: '',
      community: '',
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
    { value: '', label: t('properties.filters.allTypes') },
    { value: 'Apartment', label: t('hero.categories.apartment') },
    { value: 'Villa', label: t('hero.categories.villa') },
    { value: 'House', label: 'House' },
    { value: 'Office', label: t('hero.categories.office') },
    { value: 'Commercial', label: t('hero.categories.commercial') },
    { value: 'Penthouse', label: t('hero.categories.penthouse') },
  ];

  const bedroomOptions = [
    { value: '', label: t('properties.filters.any') },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: t('properties.filters.any') },
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
        {/* Emirate Selector */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <select
            value={filters.emirate}
            onChange={handleEmirateChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
          >
            <option value="">{t('hero.selectEmirate') || 'Select Emirate'}</option>
            {Object.keys(uaeLocations).map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Community Selector */}
        <div className="relative" ref={areaInputRef as any}>
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={filters.emirate ? "Select Area" : t('hero.selectEmirate')}
            value={filters.community}
            onChange={(e) => {
              handleCommunityChange(e.target.value);
              setShowAreaSuggestions(true);
            }}
            onFocus={() => setShowAreaSuggestions(true)}
            disabled={!filters.emirate}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600 disabled:bg-slate-50 disabled:cursor-not-allowed"
          />

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showAreaSuggestions && filters.emirate && filteredAreas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                {filteredAreas
                  .filter(area => area.toLowerCase().includes(filters.community.toLowerCase()))
                  .map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        handleCommunityChange(suggestion);
                        setShowAreaSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700 transition-colors flex items-center justify-between"
                    >
                      <span>{suggestion}</span>
                      {filters.community === suggestion && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('type', 'all')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${filters.type === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {t('properties.filters.all')}
          </button>
          <button
            onClick={() => handleFilterChange('type', 'rent')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${filters.type === 'rent'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {t('properties.filters.rent')}
          </button>
          <button
            onClick={() => handleFilterChange('type', 'sell')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${filters.type === 'sell'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            {t('properties.filters.buy')}
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
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${showAdvanced
            ? 'bg-indigo-600 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showAdvanced ? t('properties.filters.hideAdvanced') : t('properties.filters.advanced')}
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
                    {option.label} {t('properties.filters.bedrooms')}
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
                    {option.label} {t('properties.filters.bathrooms')}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder={t('properties.filters.priceMin')}
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder={t('properties.filters.priceMax')}
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
                placeholder={t('properties.filters.sizeMin')}
                value={filters.sizeMin}
                onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="number"
                placeholder={t('properties.filters.sizeMax')}
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
              {t('properties.filters.reset')}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;
