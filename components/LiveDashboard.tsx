
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, Pause, BarChart, DollarSign, Leaf, RefreshCw, AlertTriangle, Settings } from 'lucide-react';

interface LiveDashboardProps {
    liters: number;
    revenue: number;
    emissions: number;
    isRunning: boolean;
    onToggle: () => void;
    hasFault: boolean;
    onToggleFault: () => void;
    isPanelOpen: boolean;
    onTogglePanel: () => void;
    onResetRelay: () => void;
}

const formatNumber = (num: number, digits: number) => num.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
});

const LiveDashboard: React.FC<LiveDashboardProps> = ({ 
    liters, revenue, emissions, isRunning, onToggle, 
    hasFault, onToggleFault, isPanelOpen, onTogglePanel, onResetRelay 
}) => {
    const dashboardVariants: Variants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, delay: 0.2 } },
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Fault Warning Overlay */}
            {hasFault && !isPanelOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-6 py-3 bg-red-600/90 text-white rounded-full font-bold shadow-lg backdrop-blur-md mb-2 border border-red-400/50"
                >
                    <AlertTriangle size={20} className="animate-bounce" />
                    <span>SYSTEM FAULT: THERMAL OVERLOAD TRIPPED</span>
                    <button 
                        onClick={onTogglePanel}
                        className="ml-4 px-4 py-1.5 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors uppercase text-xs"
                    >
                        Open Control Panel
                    </button>
                </motion.div>
            )}

            {/* Electrical Panel View */}
            {isPanelOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-slate-800/90 border-2 border-slate-700 rounded-3xl backdrop-blur-2xl shadow-2xl mb-4 w-full max-w-md border-t-slate-600 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-6 relative">
                        <div className="flex items-center gap-2">
                            <Settings className="text-gray-400" size={18} />
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Main Control Panel</h3>
                        </div>
                        <button onClick={onTogglePanel} className="text-gray-500 hover:text-white">&times;</button>
                    </div>

                    <div className="space-y-6 relative">
                        <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Status Indicator</p>
                                <div className="flex items-center gap-2">
                                     <div className={`w-3 h-3 rounded-full ${hasFault ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-emerald-500'}`} />
                                     <span className={hasFault ? 'text-red-400 font-mono text-sm' : 'text-emerald-400 font-mono text-sm'}>
                                        {hasFault ? 'FAULT DETECTED' : 'SYSTEM READY'}
                                     </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-4 text-center">In case of thermal overload, manually reset the relay below to restore recovery operations.</p>
                            
                            <button 
                                onClick={onResetRelay}
                                disabled={!hasFault}
                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all font-black text-lg ${hasFault ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-lg' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                            >
                                <RefreshCw className={hasFault ? 'animate-spin-slow' : ''} size={24} />
                                RESET THERMAL OVERLOAD RELAY
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div 
                className={`w-full glass-card backdrop-blur-xl border rounded-3xl p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6 ${hasFault ? 'bg-red-900/60 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]' : 'bg-slate-900/80 border-white/10'}`}
                variants={dashboardVariants}
                initial="initial"
                animate="animate"
            >
                {/* Controls Area */}
                <div className="flex items-center justify-between w-full md:w-auto px-2">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onToggle}
                            disabled={hasFault}
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${hasFault ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : isRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' : 'bg-emerald-500 text-black hover:bg-emerald-400 border border-emerald-400'}`}
                        >
                            {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="md:hidden">
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{hasFault ? 'Fault' : isRunning ? 'Simulating' : 'Paused'}</p>
                             <p className="text-white text-sm font-medium">Live Output</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={onToggleFault} 
                            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${hasFault ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'}`}
                        >
                            {hasFault ? 'CLEAR TEST' : 'SIMULATE FAULT'}
                        </button>
                    </div>
                </div>

            {/* Divider (Desktop) */}
            <div className={`hidden md:block w-px h-10 ${hasFault ? 'bg-red-500/30' : 'bg-white/10'}`}></div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 w-full gap-2 md:gap-8 px-1 md:px-0">
                <StatItem 
                    icon={BarChart} 
                    label="Recovered" 
                    value={formatNumber(liters, 1)} 
                    unit="L" 
                    color="text-emerald-400" 
                />
                <StatItem 
                    icon={DollarSign} 
                    label="Revenue" 
                    value={formatNumber(revenue, 2)} 
                    unit="$" 
                    color="text-emerald-400" 
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
        </div>
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
