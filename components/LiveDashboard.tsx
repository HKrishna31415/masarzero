
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, Pause, BarChart, DollarSign, Leaf, RefreshCw } from 'lucide-react';

interface LiveDashboardProps {
    liters: number;
    revenue: number;
    emissions: number;
    isRunning: boolean;
    onToggle: () => void;
}

const formatNumber = (num: number, digits: number) => num.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
});

const LiveDashboard: React.FC<LiveDashboardProps> = ({ liters, revenue, emissions, isRunning, onToggle }) => {
    const dashboardVariants: Variants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, delay: 0.2 } },
    };

    return (
        <motion.div 
            className="w-full glass-card bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6"
            variants={dashboardVariants}
            initial="initial"
            animate="animate"
        >
            {/* Controls Area */}
            <div className="flex items-center justify-between w-full md:w-auto px-2">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onToggle}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' : 'bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-400'}`}
                    >
                        {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                    <div className="md:hidden">
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isRunning ? 'Simulating' : 'Paused'}</p>
                         <p className="text-white text-sm font-medium">Live Output</p>
                    </div>
                </div>
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden md:block w-px h-10 bg-white/10"></div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 w-full gap-2 md:gap-8 px-1 md:px-0">
                <StatItem 
                    icon={BarChart} 
                    label="Recovered" 
                    value={formatNumber(liters, 1)} 
                    unit="L" 
                    color="text-blue-400" 
                />
                <StatItem 
                    icon={DollarSign} 
                    label="Revenue" 
                    value={formatNumber(revenue, 2)} 
                    unit="$" 
                    color="text-green-400" 
                />
                <StatItem 
                    icon={Leaf} 
                    label="Emissions" 
                    value={formatNumber(emissions, 1)} 
                    unit="kg" 
                    color="text-emerald-400" 
                />
            </div>
        </motion.div>
    );
};

const StatItem: React.FC<{ icon: React.ComponentType<any>, label: string, value: string, unit: string, color: string }> = ({ icon: Icon, label, value, unit, color }) => (
    <div className="flex flex-col items-center md:items-start md:flex-row md:gap-3 bg-white/5 md:bg-transparent rounded-xl p-2 md:p-0 border border-white/5 md:border-none">
        <div className={`p-2 rounded-lg bg-slate-800/50 hidden md:block ${color}`}>
            <Icon size={20} />
        </div>
        <div className="text-center md:text-left">
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-sm md:text-xl font-bold text-white font-mono">
                {value} <span className="text-[10px] md:text-sm text-gray-400 font-normal ml-0.5">{unit}</span>
            </p>
        </div>
    </div>
);

export default LiveDashboard;
