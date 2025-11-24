'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const USFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5 rounded-sm object-cover shadow-sm">
        <path fill="#bd3d44" d="M0 0h640v480H0" />
        <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 424h640" />
        <path fill="#192f5d" d="M0 0h296.2v258.5H0" />
        <marker id="us-a" markerHeight="30" markerWidth="30">
            <path fill="#fff" d="m14.7 18.4 6.7-20.6 6.6 20.6-17.5-12.8h21.7" />
        </marker>
        <use width="30" height="30" x="19" y="15" href="#us-a" />
        <use width="30" height="30" x="67.7" y="15" href="#us-a" />
        <use width="30" height="30" x="116.4" y="15" href="#us-a" />
        <use width="30" height="30" x="165.1" y="15" href="#us-a" />
        <use width="30" height="30" x="213.8" y="15" href="#us-a" />
        <use width="30" height="30" x="262.5" y="15" href="#us-a" />
        <use width="30" height="30" x="43.4" y="40.6" href="#us-a" />
        <use width="30" height="30" x="92.1" y="40.6" href="#us-a" />
        <use width="30" height="30" x="140.8" y="40.6" href="#us-a" />
        <use width="30" height="30" x="189.5" y="40.6" href="#us-a" />
        <use width="30" height="30" x="238.2" y="40.6" href="#us-a" />
        <use width="30" height="30" x="19" y="66.2" href="#us-a" />
        <use width="30" height="30" x="67.7" y="66.2" href="#us-a" />
        <use width="30" height="30" x="116.4" y="66.2" href="#us-a" />
        <use width="30" height="30" x="165.1" y="66.2" href="#us-a" />
        <use width="30" height="30" x="213.8" y="66.2" href="#us-a" />
        <use width="30" height="30" x="262.5" y="66.2" href="#us-a" />
        <use width="30" height="30" x="43.4" y="91.8" href="#us-a" />
        <use width="30" height="30" x="92.1" y="91.8" href="#us-a" />
        <use width="30" height="30" x="140.8" y="91.8" href="#us-a" />
        <use width="30" height="30" x="189.5" y="91.8" href="#us-a" />
        <use width="30" height="30" x="238.2" y="91.8" href="#us-a" />
        <use width="30" height="30" x="19" y="117.4" href="#us-a" />
        <use width="30" height="30" x="67.7" y="117.4" href="#us-a" />
        <use width="30" height="30" x="116.4" y="117.4" href="#us-a" />
        <use width="30" height="30" x="165.1" y="117.4" href="#us-a" />
        <use width="30" height="30" x="213.8" y="117.4" href="#us-a" />
        <use width="30" height="30" x="262.5" y="117.4" href="#us-a" />
        <use width="30" height="30" x="43.4" y="143" href="#us-a" />
        <use width="30" height="30" x="92.1" y="143" href="#us-a" />
        <use width="30" height="30" x="140.8" y="143" href="#us-a" />
        <use width="30" height="30" x="189.5" y="143" href="#us-a" />
        <use width="30" height="30" x="238.2" y="143" href="#us-a" />
        <use width="30" height="30" x="19" y="168.6" href="#us-a" />
        <use width="30" height="30" x="67.7" y="168.6" href="#us-a" />
        <use width="30" height="30" x="116.4" y="168.6" href="#us-a" />
        <use width="30" height="30" x="165.1" y="168.6" href="#us-a" />
        <use width="30" height="30" x="213.8" y="168.6" href="#us-a" />
        <use width="30" height="30" x="262.5" y="168.6" href="#us-a" />
        <use width="30" height="30" x="43.4" y="194.2" href="#us-a" />
        <use width="30" height="30" x="92.1" y="194.2" href="#us-a" />
        <use width="30" height="30" x="140.8" y="194.2" href="#us-a" />
        <use width="30" height="30" x="189.5" y="194.2" href="#us-a" />
        <use width="30" height="30" x="238.2" y="194.2" href="#us-a" />
        <use width="30" height="30" x="19" y="219.8" href="#us-a" />
        <use width="30" height="30" x="67.7" y="219.8" href="#us-a" />
        <use width="30" height="30" x="116.4" y="219.8" href="#us-a" />
        <use width="30" height="30" x="165.1" y="219.8" href="#us-a" />
        <use width="30" height="30" x="213.8" y="219.8" href="#us-a" />
        <use width="30" height="30" x="262.5" y="219.8" href="#us-a" />
    </svg>
);

const UAEFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5 rounded-sm object-cover shadow-sm">
        <path fill="#00732f" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#000" d="M0 320h640v160H0z" />
        <path fill="red" d="M0 0h220v480H0z" />
    </svg>
);

export default function LanguageDropdown() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleLanguage = (lang: 'en' | 'ar') => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
                {language === 'en' ? <USFlag /> : <UAEFlag />}
                <span className="text-sm font-medium text-slate-700 uppercase">{language}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                        <div className="py-1">
                            <button
                                onClick={() => toggleLanguage('en')}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${language === 'en' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
                                    }`}
                            >
                                <USFlag />
                                <span className="font-medium">English</span>
                            </button>
                            <button
                                onClick={() => toggleLanguage('ar')}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${language === 'ar' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
                                    }`}
                            >
                                <UAEFlag />
                                <span className="font-medium">العربية</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
