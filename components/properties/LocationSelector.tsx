import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import uaeLocations from '@/lib/data/uae-locations.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface LocationSelectorProps {
    onLocationChange: (emirate: string, area: string) => void;
    initialEmirate?: string;
    initialArea?: string;
}

const LocationSelector = ({ onLocationChange, initialEmirate = '', initialArea = '' }: LocationSelectorProps) => {
    const { t } = useLanguage();
    const [emirate, setEmirate] = useState(initialEmirate);
    const [area, setArea] = useState(initialArea);
    const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);
    const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
    const areaInputRef = useRef<HTMLInputElement>(null);

    const emirates = Object.keys(uaeLocations);

    useEffect(() => {
        if (emirate && uaeLocations[emirate as keyof typeof uaeLocations]) {
            const areas = uaeLocations[emirate as keyof typeof uaeLocations];
            if (area) {
                setFilteredAreas(areas.filter(a => a.toLowerCase().includes(area.toLowerCase())));
            } else {
                setFilteredAreas(areas);
            }
        } else {
            setFilteredAreas([]);
        }
        onLocationChange(emirate, area);
    }, [emirate, area]);

    const handleEmirateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newEmirate = e.target.value;
        setEmirate(newEmirate);
        setArea(''); // Reset area when emirate changes
        setShowAreaSuggestions(false);
    };

    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArea(e.target.value);
        setShowAreaSuggestions(true);
    };

    const selectArea = (selectedArea: string) => {
        setArea(selectedArea);
        setShowAreaSuggestions(false);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (areaInputRef.current && !areaInputRef.current.contains(event.target as Node)) {
                setShowAreaSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Emirate Selector */}
            <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.emirate')}</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <select
                        value={emirate}
                        onChange={handleEmirateChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white appearance-none cursor-pointer"
                    >
                        <option value="">{t('propertyForm.placeholders.selectEmirate')}</option>
                        {emirates.map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Area Selector with Autocomplete */}
            <div className="relative" ref={areaInputRef as any}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t('propertyForm.fields.community')}</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                        ref={areaInputRef}
                        type="text"
                        value={area}
                        onChange={handleAreaChange}
                        onFocus={() => setShowAreaSuggestions(true)}
                        placeholder={emirate ? `${t('propertyForm.placeholders.searchArea')} ${emirate}` : t('propertyForm.placeholders.selectEmirateFirst')}
                        disabled={!emirate}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                    {showAreaSuggestions && emirate && filteredAreas.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                            {filteredAreas.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => selectArea(suggestion)}
                                    className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700 transition-colors flex items-center justify-between group"
                                >
                                    <span>{suggestion}</span>
                                    {area === suggestion && <Check className="w-4 h-4 text-indigo-600" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LocationSelector;
