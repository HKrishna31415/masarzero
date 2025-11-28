
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Fuel, Warehouse, ArrowRight, Scan } from 'lucide-react';

interface FacilitySelectionProps {
    onSelect: (facility: 'gas' | 'storage') => void;
}

const FacilitySelection: React.FC<FacilitySelectionProps> = ({ onSelect }) => {
    return (
        <div className="relative w-full max-w-6xl mx-auto z-10">
             {/* Decorative Background Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none blur-3xl" />
             
            <div className="text-center mb-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">System Initialized</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Twin</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        Select a facility environment to initialize the MasarZero VRU simulation kernel.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 px-4">
                <SelectionCard
                    id="gas"
                    icon={Fuel}
                    title="Retail Station"
                    subtitle="Urban Environment"
                    description="Simulate high-frequency refueling cycles and vapor displacement in a standard underground tank configuration."
                    onSelect={() => onSelect('gas')}
                    delay={0.2}
                />
                <SelectionCard
                    id="storage"
                    icon={Warehouse}
                    title="Storage Terminal"
                    subtitle="Industrial Hub"
                    description="Model large-scale vapor recovery efficiency for bulk liquid storage farms and distribution terminals."
                    onSelect={() => onSelect('storage')}
                    delay={0.4}
                />
            </div>
        </div>
    );
};

const SelectionCard: React.FC<{ 
    id: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string; 
    subtitle: string;
    description: string; 
    onSelect: () => void;
    delay: number;
}> = ({ id, icon: Icon, title, subtitle, description, onSelect, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover="hover"
            className="group relative cursor-pointer"
            onClick={onSelect}
        >
            {/* Card Container */}
            <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-colors duration-500 group-hover:border-cyan-500/50 group-hover:bg-slate-900/60">
                
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Grid Overlay */}
                <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
                    style={{ 
                        backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }} 
                />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                            <Icon className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        <Scan className="w-6 h-6 text-gray-600 group-hover:text-cyan-500 transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                    </div>

                    <div className="mb-4">
                        <span className="text-xs font-mono text-cyan-500 mb-2 block uppercase tracking-wider">{subtitle}</span>
                        <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">{title}</h2>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                            {description}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center text-sm font-bold text-gray-500 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                        Initialize Simulation
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FacilitySelection;
