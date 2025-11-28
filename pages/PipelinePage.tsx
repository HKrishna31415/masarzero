
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stages, deals } from '../data/pipelineData';
import { ChevronDown, Lock, Search, Users, Bot, PieChart, Activity, DollarSign } from 'lucide-react';
import DealModal from '../components/DealModal';
import { EnrichedClient, PipelineStage } from '../types/pipeline';
import VectorBorderCard from '../components/VectorBorderCard';
import AnimatedCounter from '../components/AnimatedCounter';

const formatValue = (value: number) => {
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
};

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
                <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
                <p className="text-gray-400 mb-6">Please enter the password to view the client pipeline.</p>
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
                        Unlock
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const CompanyLogo = ({ logo, name }: { logo: string, name: string }) => {
    const [error, setError] = useState(false);

    if (error || !logo) {
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return (
            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-cyan-300 flex-shrink-0">
                {initials}
            </div>
        );
    }

    return (
        <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-10 h-10 rounded-lg bg-white object-contain p-1 flex-shrink-0"
            onError={() => setError(true)}
        />
    );
};

const PipelineView = () => {
    const [selectedDeal, setSelectedDeal] = useState<EnrichedClient | null>(null);
    const [localDeals, setLocalDeals] = useState<EnrichedClient[]>(deals);
    const [draggedDealId, setDraggedDealId] = useState<number | null>(null);
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    // Derived lists for dropdowns
    const regions = useMemo(() => ['All', ...new Set(deals.map(d => d.marketKey))], []);
    const types = useMemo(() => ['All', ...new Set(deals.map(d => d.type))], []);

    const filteredDeals = useMemo(() => {
        return localDeals.filter(deal => {
            const matchesSearch = deal.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  deal.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRegion = regionFilter === 'All' || deal.marketKey === regionFilter;
            const matchesType = typeFilter === 'All' || deal.type === typeFilter;
            return matchesSearch && matchesRegion && matchesType;
        });
    }, [localDeals, searchQuery, regionFilter, typeFilter]);

    const stageData = useMemo(() => {
        return stages.map(stage => {
            const stageDeals = filteredDeals.filter(deal => deal.stage === stage.name);
            const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
            return {
                ...stage,
                deals: stageDeals,
                totalValue,
                dealCount: stageDeals.length,
            };
        });
    }, [filteredDeals]);
    
    // Aggregate Stats based on filtered data
    const totalPipelineValue = useMemo(() => filteredDeals.reduce((sum, deal) => sum + deal.value, 0), [filteredDeals]);
    const totalDeals = filteredDeals.length;
    
    const handleDragStart = (e: any, deal: EnrichedClient) => {
        e.dataTransfer.setData("dealId", deal.id.toString());
        setDraggedDealId(deal.id);
    };

    const handleDragEnd = () => {
        setDraggedDealId(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStage: PipelineStage) => {
        e.preventDefault();
        const dealId = Number(e.dataTransfer.getData("dealId"));
        setLocalDeals(prevDeals =>
            prevDeals.map(deal =>
                deal.id === dealId ? { ...deal, stage: targetStage } : deal
            )
        );
        setDraggedDealId(null);
    };

    const typeColors: { [key: string]: string } = {
        GOVERNMENT: 'bg-green-500/20 text-green-300 ring-green-500/30',
        PUBLIC: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
        PRIVATE: 'bg-purple-500/20 text-purple-300 ring-purple-500/30',
    };

    return (
        <div className="bg-[#0c1222] min-h-screen flex flex-col pt-24 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 z-10 flex flex-col h-full">
                
                {/* Header & Stats */}
                <header className="mb-8">
                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2 block">Global Operations</span>
                            <h1 className="text-4xl font-black text-white tracking-tight">Client Pipeline</h1>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="flex gap-4">
                            <div className="bg-slate-900/50 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md flex flex-col">
                                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Total Pipeline Value</span>
                                <div className="text-2xl font-bold text-white font-mono">
                                    {formatValue(totalPipelineValue)}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md flex flex-col">
                                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Active Deals</span>
                                <div className="text-2xl font-bold text-cyan-400 font-mono">
                                    {totalDeals}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between bg-[#1a2035]/80 backdrop-blur-md border border-white/10 p-2 rounded-xl gap-2">
                        <div className="relative flex-grow max-w-md w-full">
                             <input 
                                type="search" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter by company, region, or type..." 
                                className="w-full bg-[#0f1623] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:outline-none placeholder-gray-500" 
                            />
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative w-full md:w-40">
                                <select 
                                    value={regionFilter}
                                    onChange={(e) => setRegionFilter(e.target.value)}
                                    className="w-full appearance-none bg-[#0f1623] px-4 py-2.5 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors focus:outline-none focus:border-cyan-500 cursor-pointer"
                                >
                                    {regions.map(r => <option key={r} value={r}>Region: {r}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                            <div className="relative w-full md:w-40">
                                <select 
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="w-full appearance-none bg-[#0f1623] px-4 py-2.5 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors focus:outline-none focus:border-cyan-500 cursor-pointer"
                                >
                                    {types.map(t => <option key={t} value={t}>Type: {t}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Kanban Board */}
                <main className="flex-grow overflow-x-auto pb-8">
                    <div className="flex space-x-6 h-full min-h-[600px]">
                        {stageData.map((stage) => (
                            <div 
                                key={stage.name} 
                                className="w-80 flex-shrink-0 flex flex-col h-full"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, stage.name as PipelineStage)}
                            >
                                {/* Column Header */}
                                <div className="mb-4 flex items-center justify-between px-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: stage.color, color: stage.color }}></div>
                                        <h3 className="font-bold text-sm text-gray-200 uppercase tracking-wide">{stage.name}</h3>
                                        <span className="text-xs bg-white/10 text-gray-400 rounded px-1.5 py-0.5 min-w-[20px] text-center">{stage.dealCount}</span>
                                    </div>
                                </div>

                                {/* Column Body */}
                                <div className="flex-1 bg-slate-900/20 rounded-2xl border border-white/5 p-2 space-y-3 overflow-y-auto custom-scrollbar backdrop-blur-sm hover:bg-slate-900/30 transition-colors">
                                    {stage.deals.map(deal => (
                                        <motion.div
                                            key={deal.id}
                                            layoutId={`deal-${deal.id}`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, deal)}
                                            onDragEnd={handleDragEnd}
                                            onClick={() => setSelectedDeal(deal)}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`bg-[#151b2e] p-4 rounded-xl border border-white/5 hover:border-cyan-500/40 shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer group relative overflow-hidden ${draggedDealId === deal.id ? 'opacity-40 grayscale' : 'opacity-100'}`}
                                        >
                                            {/* Hover Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <CompanyLogo logo={deal.logo} name={deal.name} />
                                                        <div>
                                                            <p className="font-bold text-white text-sm leading-tight">{deal.company}</p>
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 inline-block px-1.5 py-0.5 rounded ${typeColors[deal.type].replace('ring-1 ring-inset', '')}`}>{deal.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{deal.demand}</p>
                                                
                                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                    <div>
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Value</p>
                                                        <p className="text-sm font-bold text-white">{formatValue(deal.value)}</p>
                                                    </div>
                                                    <div className="flex -space-x-2">
                                                        {/* Deal Origin Avatar placeholder */}
                                                        <div className="w-6 h-6 rounded-full bg-slate-700 border border-[#151b2e] flex items-center justify-center text-[10px] text-white" title={deal.dealOrigin.name}>
                                                            {deal.dealOrigin.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-2 px-2 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                                    <span>TOTAL</span>
                                    <span className="text-gray-300">{formatValue(stage.totalValue)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            
            <AnimatePresence>
                {selectedDeal && (
                    <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const PipelinePage: React.FC = () => {
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
                    key="pipeline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <PipelineView />
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

export default PipelinePage;
