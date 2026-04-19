import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, DatabaseZap, Handshake, Users2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const getGovernanceTabs = (t: any) => [
    {
        id: 'oversight',
        icon: Scale,
        title: t('pages.esg.governance.tabs.0.title'),
        content: t('pages.esg.governance.tabs.0.content'),
        points: (Array.isArray(t('pages.esg.governance.tabs.0.points', { returnObjects: true })) ? t('pages.esg.governance.tabs.0.points', { returnObjects: true }) as string[] : [])
    },
    {
        id: 'privacy',
        icon: DatabaseZap,
        title: t('pages.esg.governance.tabs.1.title'),
        content: t('pages.esg.governance.tabs.1.content'),
        points: (Array.isArray(t('pages.esg.governance.tabs.1.points', { returnObjects: true })) ? t('pages.esg.governance.tabs.1.points', { returnObjects: true }) as string[] : [])
    },
    {
        id: 'ethics',
        icon: Handshake,
        title: t('pages.esg.governance.tabs.2.title'),
        content: t('pages.esg.governance.tabs.2.content'),
        points: (Array.isArray(t('pages.esg.governance.tabs.2.points', { returnObjects: true })) ? t('pages.esg.governance.tabs.2.points', { returnObjects: true }) as string[] : [])
    },
    {
        id: 'stakeholders',
        icon: Users2,
        title: t('pages.esg.governance.tabs.3.title'),
        content: t('pages.esg.governance.tabs.3.content'),
        points: (Array.isArray(t('pages.esg.governance.tabs.3.points', { returnObjects: true })) ? t('pages.esg.governance.tabs.3.points', { returnObjects: true }) as string[] : [])
    }
];

const GovernanceModule: React.FC = () => {
    const { t } = useTranslation();
    const governanceTabs = getGovernanceTabs(t);
    const [activeTab, setActiveTab] = useState(governanceTabs[0].id);
    const activeTabData = governanceTabs.find(tab => tab.id === activeTab);

    return (
        <section className="py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold">{t('pages.esg.governance.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    {t('pages.esg.governance.subtitle')}
                </p>
            </div>
            
            <div className="max-w-6xl mx-auto glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="flex flex-col md:flex-row min-h-[450px]">
                    
                    {/* Sidebar / Tabs */}
                    <div className="flex md:flex-col md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-white/5">
                        {governanceTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group relative w-full flex items-center gap-4 p-6 text-left transition-all duration-300 outline-none ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                                >
                                    {/* Active Indicator Line */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="gov-active-indicator"
                                            className="absolute bg-emerald-400 shadow-[0_0_15px_#10b981] z-10"
                                            style={{ borderRadius: '999px' }}
                                            initial={false}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            {/* Desktop Indicator (Right Edge) */}
                                            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1 bg-emerald-400" />
                                            {/* Mobile Indicator (Bottom Edge) */}
                                            <div className="md:hidden absolute bottom-0 left-0 right-0 h-1 bg-emerald-400" />
                                        </motion.div>
                                    )}

                                    {/* Icon */}
                                    <div className={`p-2 rounded-lg transition-colors duration-300 border ${isActive ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30' : 'text-gray-400 border-white/5 group-hover:text-gray-200 group-hover:border-white/10'}`}>
                                        <Icon size={20} />
                                    </div>
                                    
                                    {/* Text */}
                                    <span className={`font-bold text-sm tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                        {tab.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Panel */}
                    <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-slate-900/50 to-[#050714]/50 relative">
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" 
                             style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                        />

                        <AnimatePresence mode="wait">
                            {activeTabData && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full flex flex-col relative z-10"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                                            {React.createElement(activeTabData.icon, { size: 32 })}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">{activeTabData.title}</h3>
                                    </div>
                                    
                                    <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-3xl">
                                        {activeTabData.content}
                                    </p>

                                    <div className="mt-auto">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                            <div className="h-px w-8 bg-gray-700"></div>
                                            {t('pages.esg.governance.mechanisms')}
                                        </h4>
                                        <div className="grid gap-4">
                                            {activeTabData.points.map((point, i) => (
                                                <motion.div 
                                                    key={i} 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-200">{point}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GovernanceModule;
