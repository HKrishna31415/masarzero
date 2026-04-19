
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sprout, Recycle, ArrowUpRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import VectorBorderCard from './VectorBorderCard';
import { useTranslation } from '../context/TranslationContext';

const getStats = (t: any) => [
    { 
        id: 'co2',
        icon: Leaf, 
        to: 8200000, 
        suffix: ' tons', 
        label: t('pages.esg.impactDashboard.co2.label'), 
        sub: t('pages.esg.impactDashboard.co2.sub'),
        color: 'text-emerald-400' 
    },
    { 
        id: 'fuel',
        icon: Droplets, 
        to: 231900203, 
        suffix: ' L', 
        label: t('pages.esg.impactDashboard.fuel.label'), 
        sub: t('pages.esg.impactDashboard.fuel.sub'),
        color: 'text-teal-400' 
    },
    { 
        id: 'trees',
        icon: Sprout, 
        to: 12300000, 
        suffix: '', 
        label: t('pages.esg.impactDashboard.trees.label'), 
        sub: t('pages.esg.impactDashboard.trees.sub'),
        color: 'text-emerald-400' 
    },
    { 
        id: 'water',
        icon: Recycle, 
        to: 3.1, 
        fractionDigits: 1, 
        suffix: 'B L', 
        label: t('pages.esg.impactDashboard.water.label'), 
        sub: t('pages.esg.impactDashboard.water.sub'),
        color: 'text-emerald-400' 
    },
];

const ImpactDashboard: React.FC = () => {
    const { t } = useTranslation();
    const stats = getStats(t);
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    {t('pages.esg.impactDashboard.title')}
                </h3>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t('pages.esg.impactDashboard.subtitle')}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <VectorBorderCard key={stat.id} delay={i * 0.1} className="h-full">
                            <div className="flex flex-col h-full p-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <ArrowUpRight size={16} className="text-gray-600" />
                                </div>
                                
                                <div className="mt-auto">
                                    <AnimatedCounter 
                                        to={stat.to} 
                                        fractionDigits={stat.fractionDigits}
                                        suffix={stat.suffix}
                                        className="text-3xl lg:text-4xl font-black text-white font-mono tracking-tight block"
                                    />
                                    <p className="text-sm font-bold text-gray-300 mt-1">{stat.label}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-2 border-t border-white/10 pt-2">
                                        {stat.sub}
                                    </p>
                                </div>
                            </div>
                        </VectorBorderCard>
                    );
                })}
            </div>
        </div>
    );
};

export default ImpactDashboard;
