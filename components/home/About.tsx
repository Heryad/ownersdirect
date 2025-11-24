'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Clock, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const about2 = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('about2.features.verified.title'),
      description: t('about2.features.verified.desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Award,
      title: t('about2.features.expert.title'),
      description: t('about2.features.expert.desc'),
      color: 'from-blue-500 to-pink-500',
    },
    {
      icon: Users,
      title: t('about2.features.community.title'),
      description: t('about2.features.community.desc'),
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: TrendingUp,
      title: t('about2.features.insights.title'),
      description: t('about2.features.insights.desc'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Clock,
      title: t('about2.features.quick.title'),
      description: t('about2.features.quick.desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: HeartHandshake,
      title: t('about2.features.transparent.title'),
      description: t('about2.features.transparent.desc'),
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  return (
    <section id="about2" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('about2.title')} <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{t('about2.subtitle')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('about2.description')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Modern Building"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-2xl"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">15+</div>
                    <div className="text-xs text-slate-600 mt-1">{t('hero.stats.experience')}</div>
                  </div>
                  <div className="text-center border-x border-slate-300">
                    <div className="text-3xl font-bold text-blue-600">50+</div>
                    <div className="text-xs text-slate-600 mt-1">{t('hero.stats.cities')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">10K+</div>
                    <div className="text-xs text-slate-600 mt-1">{t('hero.stats.properties')}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-20 rtl:right-auto rtl:-left-6"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full blur-3xl opacity-20 rtl:left-auto rtl:-right-6"></div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              {t('about2.trustedPartner')}
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('about2.history')}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('about2.mission')}
            </p>

            <div className="space-y-4">
              {[
                { label: t('about2.stats.connections'), value: '100%' },
                { label: t('about2.stats.savings'), value: '40%' },
                { label: t('about2.stats.time'), value: '15 days' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg"
                >
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-300 transition-colors duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default about2;
