'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Shield, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AboutPage() {
    const { t } = useLanguage();

    const values = [
        { icon: Shield, title: t('about.values.trust.title'), description: t('about.values.trust.description') },
        { icon: Users, title: t('about.values.community.title'), description: t('about.values.community.description') },
        { icon: Heart, title: t('about.values.transparency.title'), description: t('about.values.transparency.description') },
        { icon: TrendingUp, title: t('about.values.innovation.title'), description: t('about.values.innovation.description') },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-16">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                {t('about.hero.title')}
                            </h1>
                            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                                {t('about.hero.subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                {t('about.story.title')}
                            </h2>
                            <div className="space-y-4 text-lg text-slate-600">
                                <p>{t('about.story.paragraph1')}</p>
                                <p>{t('about.story.paragraph2')}</p>
                                <p>{t('about.story.paragraph3')}</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission Section */}
                <div className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                {t('about.mission.title')}
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                {t('about.mission.description')}
                            </p>
                        </motion.div>

                        {/* Values Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex p-4 bg-indigo-100 rounded-2xl mb-4">
                                            <Icon className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-slate-600">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: '10,000+', label: t('about.stats.users') },
                            { number: '5,000+', label: t('about.stats.properties') },
                            { number: '50+', label: t('about.stats.cities') },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-8 text-center text-white"
                            >
                                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-indigo-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
