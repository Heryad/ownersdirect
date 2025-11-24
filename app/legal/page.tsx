'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function TermsPrivacyPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-16">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {t('legal.hero.title')}
                            </h1>
                            <p className="text-xl text-indigo-100">
                                {t('legal.hero.subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="flex border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('terms')}
                                className={`flex-1 py-4 px-6 font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'terms'
                                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <FileText className="w-5 h-5" />
                                {t('legal.tabs.terms')}
                            </button>
                            <button
                                onClick={() => setActiveTab('privacy')}
                                className={`flex-1 py-4 px-6 font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'privacy'
                                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Shield className="w-5 h-5" />
                                {t('legal.tabs.privacy')}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {activeTab === 'terms' ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="prose prose-slate max-w-none"
                                >
                                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                        {t('legal.terms.title')}
                                    </h2>

                                    <p className="text-sm text-slate-500 mb-8">
                                        {t('legal.lastUpdated')}: {new Date().toLocaleDateString()}
                                    </p>

                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.terms.section1.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.terms.section1.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.terms.section2.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.terms.section2.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.terms.section3.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.terms.section3.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.terms.section4.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.terms.section4.content')}
                                            </p>
                                        </section>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="prose prose-slate max-w-none"
                                >
                                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                        {t('legal.privacy.title')}
                                    </h2>

                                    <p className="text-sm text-slate-500 mb-8">
                                        {t('legal.lastUpdated')}: {new Date().toLocaleDateString()}
                                    </p>

                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.privacy.section1.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.privacy.section1.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.privacy.section2.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.privacy.section2.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.privacy.section3.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.privacy.section3.content')}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                                {t('legal.privacy.section4.title')}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('legal.privacy.section4.content')}
                                            </p>
                                        </section>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
