
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stages, deals } from '../data/pipelineData';
import { ChevronDown, Search, Users, Bot, PieChart, Activity, DollarSign, FileCheck, ClipboardList, Building2, Lock } from 'lucide-react';
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

const nextStepByStage: Record<string, string> = {
    Prospect: 'Confirm account owner and qualify the commercial need.',
    Qualified: 'Collect site data, utilities, and operating constraints.',
    Proposal: 'Review commercial structure and close technical clarifications.',
    'On Hold': 'Resolve budget timing or stakeholder delay.',
    'Awaiting Funding': 'Secure capital approval or financing pathway.',
    'Closed Won': 'Move to kickoff, documentation, and delivery planning.',
    'Closed Lost': 'Document reasons and keep strategic re-entry notes.',
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
                            <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2 block">Client Portal Preview</span>
                            <h1 className="text-4xl font-black text-white tracking-tight">Client Pipeline</h1>
                            <p className="text-gray-400 mt-3 max-w-2xl">
                                This view now acts more like an admin portal teaser: who we are working with, where they sit in the process, and what we need next to move each opportunity forward.
                            </p>
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

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <VectorBorderCard className="bg-[#151b2e]">
                            <div className="p-5">
                                <Users className="text-cyan-400 mb-3" size={20} />
                                <h2 className="text-xl font-bold text-white mb-2">Admin visibility</h2>
                                <p className="text-sm text-gray-400">See every active client, stage, owner, and value signal in one board.</p>
                            </div>
                        </VectorBorderCard>
                        <VectorBorderCard className="bg-[#151b2e]">
                            <div className="p-5">
                                <ClipboardList className="text-cyan-400 mb-3" size={20} />
                                <h2 className="text-xl font-bold text-white mb-2">Next-step clarity</h2>
                                <p className="text-sm text-gray-400">Each stage can now be framed around the single requirement needed to move forward.</p>
                            </div>
                        </VectorBorderCard>
                        <VectorBorderCard className="bg-[#151b2e]">
                            <div className="p-5">
                                <Building2 className="text-cyan-400 mb-3" size={20} />
                                <h2 className="text-xl font-bold text-white mb-2">Portal positioning</h2>
                                <p className="text-sm text-gray-400">Useful as a teaser for future admin workflows, file exchange, and commercial coordination.</p>
                            </div>
                        </VectorBorderCard>
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
                                                <div className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 p-3 mb-4">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-1">Next step</p>
                                                    <p className="text-xs text-gray-300">{nextStepByStage[deal.stage] || 'Advance stakeholder discussion.'}</p>
                                                </div>
                                                
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
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'MZ2025') {
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
        }
    };

    if (!unlocked) {
        return (
            <div className="min-h-screen bg-[#000212] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                >
                    <div className="glass-card rounded-2xl p-8 border border-white/10">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
                                <Lock size={24} className="text-cyan-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Client Pipeline</h1>
                            <p className="text-sm text-gray-400 mt-1 text-center">This area is restricted to authorized personnel.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setError(false); }}
                                    placeholder="Enter password"
                                    autoFocus
                                    className={`w-full bg-black/30 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-500/50'}`}
                                />
                                {error && <p className="text-red-400 text-xs mt-2 font-mono">Incorrect password. Try again.</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors"
                            >
                                Unlock
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <PipelineView />;
};

export default PipelinePage;
