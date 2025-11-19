'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Home, Building2, Warehouse, Hotel } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    city: '',
    propertyType: 'rent',
    category: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.city) params.append('location', searchData.city);
    if (searchData.propertyType) params.append('type', searchData.propertyType);
    if (searchData.category) params.append('propertyType', searchData.category);

    router.push(`/properties?${params.toString()}`);
  };

  const propertyCategories = [
    { value: 'Apartment', label: 'Apartment', icon: Building2 },
    { value: 'Villa', label: 'Villa', icon: Home },
    { value: 'Office', label: 'Office', icon: Building2 },
    { value: 'Commercial', label: 'Commercial', icon: Warehouse },
    { value: 'Penthouse', label: 'Penthouse', icon: Hotel },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900"
    >

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Find Your Dream
            <span className="block bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Property Today
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto"
          >
            Discover the perfect space that matches your lifestyle from thousands of verified listings
          </motion.p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-lg border border-slate-200">
            {/* Property Type Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSearchData({ ...searchData, propertyType: 'rent' })}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${searchData.propertyType === 'rent'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                Rent
              </button>
              <button
                onClick={() => setSearchData({ ...searchData, propertyType: 'sell' })}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${searchData.propertyType === 'sell'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                Buy
              </button>
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* City Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter city or location"
                  value={searchData.city}
                  onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                <select
                  value={searchData.category}
                  onChange={(e) => setSearchData({ ...searchData, category: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">Property Type</option>
                  {propertyCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-lg font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </motion.button>
            </div>

            {/* Quick Category Icons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200">
              <span className="text-sm text-slate-600 font-medium mr-2">Quick search:</span>
              {propertyCategories.map((cat) => (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchData({ ...searchData, category: cat.value });
                    // Optional: Auto-search on click or just set state
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchData.category === cat.value
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent'
                    }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { label: 'Properties', value: '10K+' },
            { label: 'Happy Clients', value: '5K+' },
            { label: 'Cities', value: '50+' },
            { label: 'Years Experience', value: '15+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
