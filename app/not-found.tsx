'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                    className="mb-8"
                >
                    <h1 className="text-[200px] md:text-[300px] font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-none">
                        404
                    </h1>
                </motion.div>

                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-6"
                >
                    <div className="inline-flex p-6 bg-white/10 backdrop-blur-lg rounded-full">
                        <AlertCircle className="w-16 h-16 text-white" />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('notFound.title')}
                    </h2>
                    <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                        {t('notFound.description')}
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            {t('notFound.backHome')}
                        </motion.button>
                    </Link>

                    <Link href="/properties">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            {t('notFound.browseProperties')}
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 flex justify-center gap-2"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-2 h-2 bg-white/30 rounded-full"
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
