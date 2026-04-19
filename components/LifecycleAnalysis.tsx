
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Factory, Zap, Recycle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const getStages = (t: any) => [
    {
        icon: Box,
        title: t('pages.esg.lifecycle.stages.0.title'),
        description: t('pages.esg.lifecycle.stages.0.desc')
    },
    {
        icon: Factory,
        title: t('pages.esg.lifecycle.stages.1.title'),
        description: t('pages.esg.lifecycle.stages.1.desc')
    },
    {
        icon: Zap,
        title: t('pages.esg.lifecycle.stages.2.title'),
        description: t('pages.esg.lifecycle.stages.2.desc')
    },
    {
        icon: Recycle,
        title: t('pages.esg.lifecycle.stages.3.title'),
        description: t('pages.esg.lifecycle.stages.3.desc')
    }
];

const LifecycleAnalysis: React.FC = () => {
    const { t } = useTranslation();
    const stages = getStages(t);
    const stageVariants = {
        initial: { opacity: 0, x: -20 },
        inView: { opacity: 1, x: 0 },
    };

    return (
        <section className="py-24 relative">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.esg.lifecycle.title')}</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {t('pages.esg.lifecycle.subtitle')}
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent md:-translate-x-1/2"></div>

                <div className="space-y-12 md:space-y-24">
                    {stages.map((stage, i) => {
                        const Icon = stage.icon;
                        const isEven = i % 2 === 0;
                        return (
                            <motion.div
                                key={stage.title}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                                variants={stageVariants}
                                initial="initial"
                                whileInView="inView"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                {/* Content Side */}
                                <div className={`pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                                    <h3 className="text-xl font-bold text-white mb-2">{stage.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{stage.description}</p>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-[4.5rem] h-[4.5rem] flex-shrink-0 z-10">
                                    <div className="w-full h-full rounded-full bg-[#000212] border border-white/10 flex items-center justify-center relative group">
                                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse"></div>
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:text-white group-hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Side for spacing */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LifecycleAnalysis;
