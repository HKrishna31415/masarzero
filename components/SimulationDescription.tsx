
import React from 'react';
import { motion } from 'framer-motion';
import { Info, X, Activity, Truck, Database } from 'lucide-react';

interface SimulationDescriptionProps {
    onClose: () => void;
}

const SimulationDescription: React.FC<SimulationDescriptionProps> = ({ onClose }) => {
    return (
        <motion.div
            className="absolute top-20 right-4 z-40 glass-card bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 w-72 md:w-80 shadow-2xl origin-top-right"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
        >
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-cyan-400">
                    <Info size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Process Logic</h3>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="mt-0.5 text-orange-400"><Activity size={16} /></div>
                    <div>
                        <h4 className="text-xs font-bold text-white mb-1">1. Diurnal Evaporation</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Continuous vapor escape due to temperature fluctuations. Represented by the constant orange particle flow.
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <div className="mt-0.5 text-purple-400"><Truck size={16} /></div>
                    <div>
                        <h4 className="text-xs font-bold text-white mb-1">2. Displacement Surge</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Incoming fuel displaces massive vapor volumes. The system automatically detects this pressure spike and ramps up recovery.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="mt-0.5 text-blue-400"><Database size={16} /></div>
                    <div>
                        <h4 className="text-xs font-bold text-white mb-1">3. Liquid Return</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Condensed fuel accumulates in the internal 16L buffer tank. Auto-transfer activates at 14L to return value to the UST.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SimulationDescription;
