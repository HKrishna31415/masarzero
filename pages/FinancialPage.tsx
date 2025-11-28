
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet, BarChart3, ArrowRight, Lock, Zap, PieChart, ArrowUpRight, ShieldCheck, Scale } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import VectorBorderCard from '../components/VectorBorderCard';
import AnimatedCounter from '../components/AnimatedCounter';

// --- Components ---

const FinancialHero = () => (
    <div className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 block">
                    The Vapor Economy
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                    Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Emissions</span> <br />
                    Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Equity</span>.
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
                    Stop burning capital. MasarZero transforms an environmental liability into a liquid asset class through our proprietary Zero-CapEx recovery infrastructure.
                </p>
            </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
);

const ComparisonModule = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
            {/* Traditional Approach */}
            <div className="bg-[#0f1222] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Scale size={120} className="text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-6">The Old Standard</h3>
                <ul className="space-y-6 relative z-10">
                    <li className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                            <DollarSign className="text-red-400" size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Heavy CapEx</h4>
                            <p className="text-sm text-gray-500 mt-1">Significant upfront capital allocation required ($150k+ per unit), locking up liquidity.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                            <TrendingUp className="text-red-400" size={20} style={{ transform: 'scaleY(-1)' }} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Asset Depreciation</h4>
                            <p className="text-sm text-gray-500 mt-1">Equipment value degrades over time, becoming a liability on the balance sheet.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                            <Lock className="text-red-400" size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Maintenance Burden</h4>
                            <p className="text-sm text-gray-500 mt-1">Owner assumes full risk for downtime, repairs, and specialized labor costs.</p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* MasarZero Approach */}
            <VectorBorderCard className="bg-[#0B1021]" glowing>
                <div className="p-4 md:p-8 relative h-full flex flex-col justify-center">
                     <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Zap size={120} className="text-cyan-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-8 bg-cyan-500"></div>
                        <h3 className="text-2xl font-bold text-white">The MasarZero Model</h3>
                    </div>
                    
                    <ul className="space-y-6 relative z-10">
                        <li className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                <Wallet className="text-cyan-400" size={20} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Zero CapEx</h4>
                                <p className="text-sm text-cyan-100/60 mt-1">We install, operate, and maintain the unit at no cost. You preserve capital for core business growth.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                <BarChart3 className="text-green-400" size={20} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Immediate Cash Flow</h4>
                                <p className="text-sm text-cyan-100/60 mt-1">Profitable from Day 1. We share the revenue generated from recovered fuel.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <ShieldCheck className="text-blue-400" size={20} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Risk-Free Performance</h4>
                                <p className="text-sm text-cyan-100/60 mt-1">Our revenue is tied to system uptime. If we don't recover fuel, we don't get paid.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </VectorBorderCard>
        </div>
    );
};

const RevenueProjector = () => {
    const [volume, setVolume] = useState(30000); // Daily volume per station
    const [price, setPrice] = useState(0.85); // Price per liter
    const [stations, setStations] = useState(5); // Number of stations

    const recoveryRate = 0.0015; // 0.15% recovery rate benchmark
    const dailyRecovered = volume * stations * recoveryRate;
    const annualRevenue = dailyRecovered * price * 365;
    const clientShare = 0.20; // Client keeps 20% in shared model
    const clientAnnualProfit = annualRevenue * clientShare;

    // Generate 5-year projection data
    const data = Array.from({ length: 5 }, (_, i) => {
        const year = i + 1;
        return {
            year: `Year ${year}`,
            cumulative: clientAnnualProfit * year,
            annual: clientAnnualProfit
        };
    });

    return (
        <div className="mb-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Project Your Passive Income</h2>
                <p className="text-gray-400 mt-4">Estimate the pure profit generated by the MasarZero Shared Success model.</p>
            </div>

            <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
                <div className="grid lg:grid-cols-3">
                    {/* Controls */}
                    <div className="p-8 bg-slate-900/50 border-r border-white/10 space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-300">Daily Vapor Volume (L)</label>
                                <span className="text-cyan-400 font-mono">{volume.toLocaleString()}</span>
                            </div>
                            <input 
                                type="range" min="5000" max="100000" step="1000" 
                                value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                             <p className="text-xs text-gray-500 mt-2">Average throughput per station</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-300">Station Count</label>
                                <span className="text-cyan-400 font-mono">{stations}</span>
                            </div>
                            <input 
                                type="range" min="1" max="50" step="1" 
                                value={stations} onChange={(e) => setStations(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-300">Fuel Price ($/L)</label>
                                <span className="text-cyan-400 font-mono">${price.toFixed(2)}</span>
                            </div>
                            <input 
                                type="range" min="0.5" max="2.0" step="0.01" 
                                value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>

                        <div className="pt-6 border-t border-white/10">
                             <div className="flex justify-between items-end mb-1">
                                <span className="text-sm text-gray-400">Est. Annual Profit</span>
                                <span className="text-2xl font-bold text-white">${Math.round(clientAnnualProfit).toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-400">5-Year Cumulative</span>
                                <span className="text-2xl font-bold text-cyan-400">${Math.round(clientAnnualProfit * 5).toLocaleString()}</span>
                             </div>
                             <p className="text-[10px] text-gray-500 mt-4 italic">*Estimates based on 0.15% recovery rate and 20% revenue share. Actual results may vary.</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-2 p-8 bg-[#0B1021]">
                         <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Cumulative Profit Projection</h3>
                         <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `$${val/1000}k`} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cumulative Profit']}
                                    />
                                    <Area type="monotone" dataKey="cumulative" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                                </AreaChart>
                            </ResponsiveContainer>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FinancialPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-[#000212]">
            <FinancialHero />
            
            <div className="container mx-auto px-4 relative z-20">
                <ComparisonModule />
                
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    <VectorBorderCard delay={0.1}>
                        <div className="h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck className="text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Hedge Against Volatility</h3>
                            <p className="text-sm text-gray-400">
                                Recovered fuel provides a buffer against rising wholesale costs. You produce your own inventory on-site.
                            </p>
                        </div>
                    </VectorBorderCard>
                    <VectorBorderCard delay={0.2}>
                         <div className="h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                                <PieChart className="text-purple-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Asset Appreciation</h3>
                            <p className="text-sm text-gray-400">
                                Installing advanced VRU technology increases the valuation of your terminal or retail station assets.
                            </p>
                        </div>
                    </VectorBorderCard>
                    <VectorBorderCard delay={0.3}>
                         <div className="h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                                <ArrowUpRight className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Carbon Credits</h3>
                            <p className="text-sm text-gray-400">
                                Monetize your emissions reduction through carbon credit markets, adding a secondary revenue stream.
                            </p>
                        </div>
                    </VectorBorderCard>
                </div>

                <RevenueProjector />
            </div>
        </section>
    );
};

export default FinancialPage;
