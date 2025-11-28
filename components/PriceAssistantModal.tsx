import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Wand2 } from 'lucide-react';
import { fuelPriceData, PriceData } from '../data/fuelPrices';

interface PriceAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyPrice: (price: number) => void;
}

const countries = [
    "United States", "Canada", "Germany", "United Kingdom", "France", "Japan", "Australia", "Brazil", "India", "China", "Saudi Arabia", "United Arab Emirates"
];

const PriceAssistantModal: React.FC<PriceAssistantModalProps> = ({ isOpen, onClose, onApplyPrice }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [priceData, setPriceData] = useState<PriceData | null>(null);

    useEffect(() => {
        if (isOpen) {
            setPriceData(fuelPriceData[selectedCountry] || null);
        }
    }, [selectedCountry, isOpen]);
    
    // Reset state when modal is closed
    useEffect(() => {
        if (!isOpen) {
            setPriceData(null);
        } else {
             // Set initial data when opened
            setPriceData(fuelPriceData[selectedCountry]);
        }
    }, [isOpen, selectedCountry]);

    const handleApply = () => {
        if (priceData) {
            const netPrice = priceData.gasolinePrice - priceData.fuelTax;
            onApplyPrice(parseFloat(netPrice.toFixed(2)));
            onClose();
        }
    };

    const backdropVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const modalVariants: Variants = {
        initial: { scale: 0.9, opacity: 0, y: 30 },
        animate: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } },
        exit: { scale: 0.9, opacity: 0, y: 30, transition: { duration: 0.3 } },
    };

    const netPrice = priceData ? priceData.gasolinePrice - priceData.fuelTax : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        className="relative w-full max-w-md glass-card rounded-2xl aurora-border m-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Wand2 className="text-cyan-300" />
                                Price Assistant
                            </h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label htmlFor="country-select" className="block text-sm font-semibold mb-2 text-gray-300">Select a Country</label>
                                <select 
                                    id="country-select"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 text-sm focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                                >
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            
                            <div className="bg-slate-900/50 p-4 rounded-lg min-h-[160px] flex flex-col justify-between">
                                {priceData ? (
                                    <div className="w-full space-y-3 text-sm">
                                        <div className="flex justify-between items-center"><span className="text-gray-400">Avg. Fuel Price:</span> <span className="font-mono">{priceData.gasolinePrice.toFixed(2)} USD/L</span></div>
                                        <div className="flex justify-between items-center"><span className="text-gray-400">Avg. Fuel Tax:</span> <span className="font-mono text-red-400">- {priceData.fuelTax.toFixed(2)} USD/L</span></div>
                                        <hr className="border-white/10 my-2" />
                                        <div className="flex justify-between items-center text-base"><span className="font-bold text-cyan-300">Net Price (Tax-Exclusive):</span> <span className="font-mono font-bold text-cyan-300">{netPrice.toFixed(2)} USD/L</span></div>
                                    </div>
                                ) : (
                                    <p className="m-auto text-sm text-gray-500 text-center">No data available for the selected country.</p>
                                )}
                                 <p className="text-xs text-gray-500 text-center mt-3">Last updated on November 15th, 2025</p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
                            <button
                                onClick={handleApply}
                                disabled={!priceData}
                                className="font-semibold bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                Apply Price
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PriceAssistantModal;