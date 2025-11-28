
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const keyItems = [
    { color: '#f59e0b', label: 'Vapor In', desc: 'Raw emissions' },
    { color: '#06b6d4', label: 'Product A', desc: 'Clean fuel return' },
    { color: '#10b981', label: 'Product B', desc: 'Secondary recovery' },
];

interface SimulationKeyProps {
    onClose: () => void;
}

const SimulationKey: React.FC<SimulationKeyProps> = ({ onClose }) => {
    return (
        <motion.div
            className="absolute top-20 right-4 z-40 glass-card bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-64 shadow-2xl"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visual Legend</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </div>
            <div className="space-y-3">
                {keyItems.map(item => (
                    <div key={item.label} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                        <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                        <div>
                            <p className="text-xs font-bold text-gray-200">{item.label}</p>
                            <p className="text-[10px] text-gray-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default SimulationKey;
