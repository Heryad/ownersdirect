'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/lib/i18n/en.json';
import ar from '@/lib/i18n/ar.json';

type Language = 'en' | 'ar';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>(en);

    useEffect(() => {
        // Load saved language from localStorage if available
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        // Update translations and direction when language changes
        setTranslations(language === 'en' ? en : ar);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
    }, [language]);

    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = translations;

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
