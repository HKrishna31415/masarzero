
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Download, TrendingUp, Cpu, ShieldCheck, Globe, Activity, DollarSign, PieChart, ArrowUpRight, Calendar, Clock, ChevronDown, Briefcase, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import VectorBorderCard from '../components/VectorBorderCard';
import AnimatedCounter from '../components/AnimatedCounter';

// --- Mock Financial Data ---
const revenueData = [
    { period: 'Q1', value: 4.2 },
    { period: 'Q2', value: 5.8 },
    { period: 'Q3', value: 9.3 },
    { period: 'Q4', value: 15.6 },
    { period: 'Q1*', value: 22.1 },
];

const marginData = [
    { period: 'Q1', value: 65 },
    { period: 'Q2', value: 68 },
    { period: 'Q3', value: 72 },
    { period: 'Q4', value: 75 },
    { period: 'Q1*', value: 78 },
];

const documents = [
    { id: 'doc1', title: 'Q3 2024 Earnings Report', type: 'PDF', size: '3.1 MB', date: 'Oct 28, 2024' },
    { id: 'doc2', title: 'FY 2023 Annual Report', type: 'PDF', size: '12.5 MB', date: 'Mar 15, 2024' },
    { id: 'doc3', title: 'Investor Presentation Deck', type: 'PPTX', size: '8.7 MB', date: 'Sep 05, 2024' },
    { id: 'doc4', title: 'ESG Impact Audit 2024', type: 'PDF', size: '6.2 MB', date: 'Jun 30, 2024' },
];

// --- Components ---

const TickerTape = () => {
    const items = [
        "MSZ: $24.50 ▲ 1.2%", "REVENUE: +320% YOY", "ACTIVE UNITS: 500+", "CARBON CREDITS: $125/TON", "NEW PARTNERSHIP: ARAMCO", "EXPANSION: BRAZIL ONLINE"
    ];
    return (
        <div className="w-full bg-cyan-950/30 border-y border-cyan-900/50 overflow-hidden py-2 flex items-center fixed top-20 left-0 right-0 z-30 backdrop-blur-md">
            <div className="whitespace-nowrap animate-marquee flex gap-12 text-xs font-mono text-cyan-400">
                {[...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="flex items-center gap-2">
                        <Activity size={10} /> {item}
                    </span>
                ))}
            </div>
            <style>{`
                .animate-marquee { animation: marquee 20s linear infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            `}</style>
        </div>
    );
};

const StatBox = ({ label, value, change, prefix = "", suffix = "" }: any) => (
    <div className="bg-[#0c1222] border border-white/10 p-4 rounded-xl flex flex-col justify-between min-h-[120px] shadow-lg">
        <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${change >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {change > 0 ? '+' : ''}{change}%
            </span>
        </div>
        <div className="mt-auto">
            <div className="text-3xl font-mono font-bold text-white tracking-tight">
                {prefix}{value}{suffix}
            </div>
        </div>
    </div>
);

const ChartTab = ({ data, color }: { data: any[], color: string }) => (
    <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="period" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${color})`} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const PasswordScreen = ({ onLogin, error }: { onLogin: (password: string) => void; error: string }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(password);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#000212]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-10 rounded-2xl text-center max-w-sm w-full"
            >
                <Lock className="mx-auto text-cyan-300 mb-4" size={32} />
                <h2 className="text-2xl font-bold mb-2">Investor Access</h2>
                <p className="text-gray-400 mb-6">Please enter your secure credentials to view financial data.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-center text-white"
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    <button type="submit" className="w-full mt-6 relative aurora-border font-semibold px-6 py-3 rounded-full hover:bg-cyan-400/20 transition-all duration-300 text-white">
                        Authenticate
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const InvestorView = () => {
    const [activeChart, setActiveChart] = useState<'revenue' | 'margin'>('revenue');

    return (
        <section className="min-h-screen bg-[#000212] pt-40 pb-20 text-gray-200 font-sans selection:bg-cyan-500/30">
            
            <TickerTape />

            <div className="container mx-auto px-4">
                
                {/* Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 uppercase">
                                Investor Relations
                            </div>
                            <span className="text-xs text-gray-500 font-mono">Last Updated: 14:02 GMT</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                            Investor <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Terminal</span>
                        </h1>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-4">
                        <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm">
                            Contact IR
                        </button>
                        <button className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-bold flex items-center gap-2">
                            <Download size={16} /> 2024 Prospectus
                        </button>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
                    
                    {/* Left Col: Metrics & Chart */}
                    <div className="xl:col-span-2 flex flex-col gap-8">
                        
                        {/* Key Metrics Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatBox label="Revenue (TTM)" value="45.2" suffix="M" prefix="$" change={320} />
                            <StatBox label="Gross Margin" value="75" suffix="%" change={5.2} />
                            <StatBox label="Deployments" value="512" change={12} />
                            <StatBox label="Retention" value="100" suffix="%" change={0} />
                        </div>

                        {/* Main Chart Card */}
                        <VectorBorderCard className="bg-[#0c1222] flex-grow">
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                                        <TrendingUp size={20} className="text-cyan-400" /> Financial Performance
                                    </h3>
                                    <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10">
                                        <button 
                                            onClick={() => setActiveChart('revenue')}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeChart === 'revenue' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Revenue
                                        </button>
                                        <button 
                                            onClick={() => setActiveChart('margin')}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeChart === 'margin' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Margin
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow min-h-[300px]">
                                    {activeChart === 'revenue' ? (
                                        <ChartTab data={revenueData} color="#22d3ee" />
                                    ) : (
                                        <ChartTab data={marginData} color="#a855f7" />
                                    )}
                                </div>
                            </div>
                        </VectorBorderCard>

                    </div>

                    {/* Right Col: Why Invest */}
                    <div className="xl:col-span-1 h-full">
                        <VectorBorderCard className="h-full bg-[#0c1222]">
                            <div className="flex flex-col h-full p-8">
                                <h3 className="font-bold text-white mb-8 flex items-center gap-3 text-lg">
                                    <PieChart size={20} className="text-purple-400" /> Investment Thesis
                                </h3>
                                <div className="space-y-8 flex-grow">
                                    <div className="flex gap-4 group hover:translate-x-1 transition-transform">
                                        <div className="w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-full shrink-0 h-full min-h-[60px]"></div>
                                        <div>
                                            <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">Zero-CapEx Moat</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">Our business model removes friction, leading to rapid adoption cycles unattainable by hardware-sales competitors.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group hover:translate-x-1 transition-transform">
                                        <div className="w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full shrink-0 h-full min-h-[60px]"></div>
                                        <div>
                                            <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-1">Recurring Revenue</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">Long-term contracts (10yr+) with high-volume terminals ensure predictable, compounding cash flow.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group hover:translate-x-1 transition-transform">
                                        <div className="w-1 bg-gradient-to-b from-purple-500 to-transparent rounded-full shrink-0 h-full min-h-[60px]"></div>
                                        <div>
                                            <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1">Regulatory Tailwinds</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">Global tightening of VOC emission standards (EPA, EU Green Deal) mandates our technology.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-10 pt-8 border-t border-white/10">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">Upcoming Catalysts</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm group cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Calendar size={16} className="text-cyan-400" />
                                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Q3 Earnings Call</span>
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">Nov 15</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm group cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Globe size={16} className="text-green-400" />
                                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Brazil Expansion</span>
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">Dec 01</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </VectorBorderCard>
                    </div>
                </div>

                {/* Data Room Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Briefcase size={24} className="text-cyan-400" /> Data Room
                    </h3>
                    <div className="bg-[#0c1222] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                        <div className="grid grid-cols-12 gap-4 p-5 border-b border-white/10 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <div className="col-span-6 pl-2">Document Name</div>
                            <div className="col-span-2 text-center hidden md:block">Type</div>
                            <div className="col-span-2 text-center hidden md:block">Date</div>
                            <div className="col-span-6 md:col-span-2 text-right pr-2">Action</div>
                        </div>
                        {documents.map((doc, i) => (
                            <div key={doc.id} className="grid grid-cols-12 gap-4 p-5 border-b border-white/5 items-center hover:bg-white/5 transition-colors group">
                                <div className="col-span-6 flex items-center gap-4 pl-2">
                                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-500 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-gray-200 group-hover:text-white block">{doc.title}</span>
                                        <span className="text-[10px] text-gray-500 md:hidden">{doc.size} • {doc.date}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center hidden md:block">
                                    <span className="text-xs font-mono text-gray-400 bg-slate-800 px-2 py-1 rounded border border-white/5">{doc.type}</span>
                                </div>
                                <div className="col-span-2 text-center text-xs text-gray-400 font-mono hidden md:block">
                                    {doc.date}
                                </div>
                                <div className="col-span-6 md:col-span-2 text-right pr-2">
                                    <button className="text-cyan-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                        <Download size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

const InvestorPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const correctPassword = 'MasarZero2025!';

    const handleLogin = (password: string) => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isAuthenticated ? (
                <motion.div
                    key="investor-dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <InvestorView />
                </motion.div>
            ) : (
                <motion.div
                    key="password"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <PasswordScreen onLogin={handleLogin} error={error} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InvestorPage;
