
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { X, ArrowRight, Store, Info, DollarSign, FileText, Percent, User } from 'lucide-react';
import { EnrichedClient } from '../types/pipeline';

const typeColors: { [key: string]: string } = {
    GOVERNMENT: 'bg-green-500/20 text-green-300 border-green-500/30',
    PUBLIC: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    PRIVATE: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const DealModal: React.FC<{ deal: EnrichedClient; onClose: () => void }> = ({ deal, onClose }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    const backdropVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const modalVariants: Variants = {
        initial: { scale: 0.95, opacity: 0, y: 50 },
        animate: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
        exit: { scale: 0.95, opacity: 0, y: 50, transition: { duration: 0.2 } },
    };

    const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    const formatNumber = (value: number) => value.toLocaleString('en-US');
    const marginPercent = (deal.calculated.profitPerUnit / deal.potential.directSales.pricePerUnit) * 100;

    return (
        <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                variants={modalVariants}
                className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-2xl overflow-hidden flex flex-col bg-[#0f1623] border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Fixed Header */}
                <div className="p-6 pb-0 border-b border-white/10 bg-[#0f1623] z-10 shrink-0">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-2 shadow-lg">
                                <img src={deal.logo} alt={deal.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{deal.name}</h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${typeColors[deal.type]}`}>{deal.type}</span>
                                    <span className="text-sm text-gray-400 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        {deal.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-8 mt-8">
                        {['Overview', 'Financials & ROI', 'Documents & Team'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div 
                                        layoutId="activeTabModal"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" 
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="p-6 md:p-8 bg-[#0b101b] overflow-y-auto custom-scrollbar">
                    {activeTab === 'Overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Pipeline Stage</h4>
                                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${
                                        deal.stage.includes('Lost') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        deal.stage.includes('Won') ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-slate-800 text-white border-white/10'
                                    }`}>
                                        {deal.stage}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Demand Profile</h4>
                                    <p className="text-xl text-white font-medium leading-relaxed">{deal.demand}</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Next Action</h4>
                                    <div className="bg-[#1a2030] border border-[#2a324a] rounded-xl p-5 flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                            <ArrowRight size={18} />
                                        </div>
                                        <p className="text-gray-200 font-medium leading-relaxed text-sm pt-1">
                                            {deal.nextStep}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content: Market & Scale Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-[#131929] border border-white/5 rounded-xl p-6 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Store size={20} className="text-gray-400" />
                                        <h3 className="text-lg font-bold text-white">Market Context</h3>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Station Count</span>
                                            <span className="text-sm font-bold text-white">{deal.stationCount}</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Region Key</span>
                                            <span className="text-sm font-bold text-white">{deal.marketKey}</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Corporate Domain</span>
                                            <a href={`https://${deal.domain}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                                {deal.domain}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Financials & ROI Tab */}
                    {activeTab === 'Financials & ROI' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <DollarSign size={20} className="text-cyan-400" />
                                        <h3 className="text-lg font-bold text-white">Direct Sales Financials</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <Stat label="Units" value={formatNumber(deal.potential.directSales.units)} />
                                        <Stat label="Price/Unit" value={formatCurrency(deal.potential.directSales.pricePerUnit)} />
                                        <Stat label="Base Cost/Unit" value={formatCurrency(deal.potential.directSales.costPerUnit)} />
                                        <Stat label="Landed Cost/Unit" value={formatCurrency(deal.calculated.landedCost)} />
                                        <Stat label="Profit/Unit" value={formatCurrency(deal.calculated.profitPerUnit)} />
                                        <Stat label="Margin" value={`${marginPercent.toFixed(1)}%`} icon={<Percent size={14} />} />
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Landed Cost Breakdown</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <Stat label="Base" value={formatCurrency(deal.calculated.landedCostDetails.baseCost)} />
                                            <Stat label="Freight" value={formatCurrency(deal.calculated.landedCostDetails.freight)} />
                                            <Stat label="Duty" value={formatCurrency(deal.calculated.landedCostDetails.duty)} />
                                            <Stat label="VAT" value={formatCurrency(deal.calculated.landedCostDetails.vat)} />
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-[#0f162a] rounded-lg border border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Total Direct Sales Profit</span>
                                            <span className="text-sm font-bold text-cyan-400">{formatCurrency(deal.calculated.directSalesProfit)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <DollarSign size={20} className="text-cyan-400" />
                                        <h3 className="text-lg font-bold text-white">Lease Model</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <Stat label="Units" value={formatNumber(deal.potential.leaseModel.units)} />
                                        <Stat label="Monthly Lease" value={formatCurrency(deal.potential.leaseModel.monthlyLease)} />
                                        <Stat label="Term (months)" value={formatNumber(deal.potential.leaseModel.termMonths)} />
                                    </div>
                                    <div className="mt-6 p-4 bg-[#0f162a] rounded-lg border border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Total Lease Value</span>
                                            <span className="text-sm font-bold text-cyan-400">{formatCurrency(deal.calculated.totalLeaseValue)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <User size={20} className="text-cyan-400" />
                                        <h3 className="text-lg font-bold text-white">Payouts</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {deal.payouts.map((p) => (
                                            <div key={p.name} className="flex justify-between items-center bg-[#0f162a] border border-white/5 rounded-lg px-3 py-2">
                                                <span className="text-sm text-gray-300">{p.name}</span>
                                                <span className="text-sm font-bold text-cyan-400">{p.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Quick Summary */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Value (Kanban)</span>
                                            <span className="text-white font-bold">{formatCurrency(deal.value)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Market</span>
                                            <span className="text-white font-bold">{deal.marketKey}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Stage</span>
                                            <span className="text-white font-bold">{deal.stage}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Documents & Team Tab */}
                    {activeTab === 'Documents & Team' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText size={20} className="text-cyan-400" />
                                        <h3 className="text-lg font-bold text-white">Attachments</h3>
                                    </div>
                                    {deal.attachments && deal.attachments.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {deal.attachments.map((a) => (
                                                <a key={a.name} href={a.url} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#0f162a] border border-white/5 rounded-lg px-3 py-2 hover:border-cyan-500/40 transition-colors">
                                                    <div>
                                                        <p className="text-sm text-white font-semibold">{a.name}</p>
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{a.type} • {a.uploadedAt}</p>
                                                    </div>
                                                    <FileText size={16} className="text-gray-400" />
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No attachments uploaded yet.</p>
                                    )}
                                </div>

                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <User size={20} className="text-cyan-400" />
                                        <h3 className="text-lg font-bold text-white">Deal Origin & Team</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-white font-bold">
                                            {deal.dealOrigin.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{deal.dealOrigin.name}</p>
                                            <p className="text-xs text-gray-400">{deal.dealOrigin.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Company */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-[#131929] border border-white/10 rounded-xl p-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Company</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1">
                                                <img src={deal.logo} alt={deal.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-bold">{deal.company}</p>
                                                <a href={`https://${deal.domain}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300">{deal.domain}</a>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Market</span>
                                            <span className="text-white font-bold">{deal.marketKey}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Station Count</span>
                                            <span className="text-white font-bold">{deal.stationCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Stat: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-[#0f162a] border border-white/5 rounded-lg p-3">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-sm text-white font-bold mt-1">{value}</div>
    </div>
);

export default DealModal;
