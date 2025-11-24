'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      content: 'OwersDirect made finding my dream home incredibly easy. The platform is intuitive, and the team was supportive throughout the entire process. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Real Estate Investor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      content: 'As an investor, I need reliable listings and quick deals. This platform delivers both. The search filters are precise, and the property information is always accurate.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'First-time Buyer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      content: 'I was nervous about buying my first property, but OwersDirect simplified everything. The detailed listings and transparent pricing gave me confidence in my decision.',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      content: 'Managing multiple properties is challenging, but OwersDirect streamlines the rental process. Great platform for both landlords and tenants.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Jessica Williams',
      role: 'Apartment Renter',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
      content: 'Found my perfect apartment in just a week! The virtual tours and detailed descriptions helped me make an informed decision without wasting time on unsuitable properties.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Robert Martinez',
      role: 'Commercial Buyer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      content: 'Excellent platform for commercial real estate. The analytics and market insights helped me identify the best investment opportunities in prime locations.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 rounded-full font-semibold text-sm mb-4 shadow-lg">
            <Star className="w-4 h-4 fill-indigo-600" />
            {t('testimonials.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('testimonials.title')} <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{t('testimonials.subtitle')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 rtl:right-auto rtl:left-6">
                <Quote className="w-16 h-16 text-indigo-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white rtl:right-auto rtl:-left-1"></div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-300"
        >
          {[
            { value: '4.9/5', label: t('testimonials.stats.rating') },
            { value: '5,000+', label: t('testimonials.stats.clients') },
            { value: '10,000+', label: t('testimonials.stats.sold') },
            { value: '99%', label: t('testimonials.stats.satisfaction') },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
