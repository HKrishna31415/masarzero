
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Leaf, Users, Scale, ArrowRight, Globe, ShieldCheck, Activity, Download, ArrowDown } from 'lucide-react';
import ImpactDashboard from '../components/ImpactDashboard';
import LifecycleAnalysis from '../components/LifecycleAnalysis';
import CommunityImpactSection from '../components/CommunityImpactSection';
import SafetyDashboard from '../components/SafetyDashboard';
import GovernanceModule from '../components/GovernanceModule';
import GlobalGoalsSection from '../components/GlobalGoalsSection';
import EnergyTrilemmaSection from '../components/EnergyTrilemmaSection';
import ThreeJSBackground from '../components/ThreeJSBackground';

const tabs = [
    { id: 'env', label: 'Environmental', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50' },
    { id: 'soc', label: 'Social', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/50' },
    { id: 'gov', label: 'Governance', icon: Scale, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/50' },
];

const TransparencyVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="aspect-square rounded-2xl bg-[#0f172a] border border-white/10 relative overflow-hidden group cursor-crosshair shadow-2xl"
        >
            {/* Default Background - minimal noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            {/* Reveal Layer: Grid & Data */}
            <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.1), transparent 40%)',
                }}
            >
                {/* Grid Pattern masked by spotlight */}
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        maskImage: 'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)',
                        WebkitMaskImage: 'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)'
                    }}
                />
            </div>

            {/* Crosshair Follower */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="absolute top-0 bottom-0 w-px bg-cyan-500/40" style={{ left: 'var(--mouse-x, 50%)' }} />
                <div className="absolute left-0 right-0 h-px bg-cyan-500/40" style={{ top: 'var(--mouse-y, 50%)' }} />
                <div className="absolute text-[10px] font-mono text-cyan-400 bg-black/60 px-1.5 py-0.5 rounded ml-2 mt-2 border border-cyan-500/30 backdrop-blur-sm" style={{ left: 'var(--mouse-x, 50%)', top: 'var(--mouse-y, 50%)' }}>
                    AUDIT: VERIFIED
                </div>
            </div>

            {/* Centered Rings - Fixed Positioning */}
            <motion.div 
                className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border border-blue-500/20 border-dashed"
                style={{ x: '-50%', y: '-50%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full border border-cyan-500/20 border-dotted"
                style={{ x: '-50%', y: '-50%' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Centered Icon */}
            <motion.div 
                className="absolute top-1/2 left-1/2 text-blue-400 z-20"
                style={{ x: '-50%', y: '-50%' }}
                animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["drop-shadow(0 0 0px rgba(59, 130, 246, 0))", "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))", "drop-shadow(0 0 0px rgba(59, 130, 246, 0))"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, color: '#22d3ee' }}
            >
                <Scale size={64} strokeWidth={1.5} />
            </motion.div>
        </div>
    );
};

const ESGPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('env');

    const headerVariants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    const contentVariants: Variants = {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className="min-h-screen bg-[#000212] relative overflow-hidden">
            <ThreeJSBackground />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-900/20 via-transparent to-transparent blur-3xl pointer-events-none" />
            <motion.div 
                className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
                
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-12"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">
                                Live Impact Telemetry
                            </span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Sustainability</span> <br />
                        <span className="text-gray-500">Engine.</span>
                    </h1>
                    
                    <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed font-light">
                        We engineer outcomes, not just technology. Every MasarZero unit deployed acts as a regenerative lung for the industrial sector, transforming compliance into a competitive advantage.
                    </p>
                </motion.div>

                {/* Navigation Control Deck */}
                <div className="sticky top-24 z-50 mb-16 flex justify-center">
                    <div className="p-1.5 rounded-2xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 flex gap-1 md:gap-2 overflow-x-auto max-w-full">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); scrollToTop(); }}
                                    className={`relative px-4 md:px-8 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all duration-300 group ${
                                        isActive ? 'text-white shadow-lg' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBg"
                                            className={`absolute inset-0 rounded-xl ${tab.bg} border ${tab.border} backdrop-blur-sm`}
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon size={16} className={isActive ? tab.color : 'grayscale opacity-50 group-hover:opacity-100 transition-all'} />
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Content Area */}
                <AnimatePresence mode="wait">
                    {activeTab === 'env' && (
                        <motion.div
                            key="env"
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-24"
                        >
                            {/* Dashboard */}
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row items-end justify-between gap-4 border-b border-white/10 pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Planetary Impact</h2>
                                        <p className="text-sm text-gray-400 font-mono">REAL-TIME CARBON REDUCTION METRICS</p>
                                    </div>
                                    <div className="text-xs font-mono text-emerald-500 flex items-center gap-2">
                                        <Activity size={14} />
                                        DATA STREAM: ONLINE
                                    </div>
                                </div>
                                <ImpactDashboard />
                            </div>

                            {/* Trilemma */}
                            <EnergyTrilemmaSection />

                            {/* Global Goals */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl -z-10 blur-xl" />
                                <GlobalGoalsSection />
                            </div>

                            {/* Lifecycle */}
                            <LifecycleAnalysis />

                            {/* Next Section Button */}
                            <div className="flex justify-center pt-8 border-t border-white/10">
                                <button 
                                    onClick={() => { setActiveTab('soc'); scrollToTop(); }}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all group"
                                >
                                    <Users size={20} />
                                    <span>Next: Explore Social Responsibility</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'soc' && (
                        <motion.div
                            key="soc"
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-24"
                        >
                            {/* Safety Header */}
                            <div className="text-center max-w-3xl mx-auto">
                                <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-6">
                                    <ShieldCheck size={32} className="text-purple-400" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4">Zero Harm Culture</h2>
                                <p className="text-gray-400 text-lg">
                                    Safety isn't just a metric; it's our moral imperative. We engineer systems that protect people first.
                                </p>
                            </div>

                            <SafetyDashboard />
                            
                            <div className="border-t border-white/10 pt-24">
                                <CommunityImpactSection />
                            </div>

                            {/* Next Section Button */}
                            <div className="flex justify-center pt-8 border-t border-white/10">
                                <button 
                                    onClick={() => { setActiveTab('gov'); scrollToTop(); }}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all group"
                                >
                                    <Scale size={20} />
                                    <span>Next: View Governance Framework</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'gov' && (
                        <motion.div
                            key="gov"
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-20"
                        >
                            {/* Governance Header */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-6">Radical Transparency</h2>
                                    <p className="text-gray-400 text-lg mb-8">
                                        Trust is built on accountability. Our governance framework provides clear, verifiable insights into our operations, ensuring we meet the highest standards of integrity.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full" /> SOC 2 Type II
                                        </div>
                                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full" /> ISO 27001
                                        </div>
                                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full" /> GDPR Compliant
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <TransparencyVisual />
                                </div>
                            </div>

                            <GovernanceModule />
                            
                            {/* Download CTA */}
                            <div className="glass-card bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                                
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">2024 ESG Impact Report</h3>
                                        <p className="text-gray-400 max-w-lg">
                                            Download our comprehensive annual report detailing our methodology, full audit trails, and future sustainability targets.
                                        </p>
                                    </div>
                                    <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-50 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transform">
                                        <Download size={20} />
                                        Download PDF
                                    </button>
                                </div>
                            </div>

                            {/* Next Section Button (Loop Back) */}
                            <div className="flex justify-center pt-8 border-t border-white/10">
                                <button 
                                    onClick={() => { setActiveTab('env'); scrollToTop(); }}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all group"
                                >
                                    <Leaf size={20} />
                                    <span>Return to Environmental</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default ESGPage;
