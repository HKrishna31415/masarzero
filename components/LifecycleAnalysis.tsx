
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Factory, Zap, Recycle } from 'lucide-react';

const stages = [
    {
        icon: Box,
        title: 'Ethical Sourcing',
        description: '95% of raw materials sourced from certified sustainable providers with full traceability.'
    },
    {
        icon: Factory,
        title: 'Green Manufacturing',
        description: 'Facilities powered by 100% renewable energy with closed-loop water systems.'
    },
    {
        icon: Zap,
        title: 'High-Efficiency Operation',
        description: 'Generates 250x the energy consumed. AI-driven optimization minimizes grid impact.'
    },
    {
        icon: Recycle,
        title: 'Circular Economy',
        description: 'Over 90% recyclable by weight. Designed for disassembly and remanufacturing.'
    }
];

const LifecycleAnalysis: React.FC = () => {
    const stageVariants = {
        initial: { opacity: 0, x: -20 },
        inView: { opacity: 1, x: 0 },
    };

    return (
        <section className="py-24 relative">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Full Lifecycle Sustainability</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    From raw material to end-of-life, every phase is optimized for minimal environmental impact.
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:-translate-x-1/2"></div>

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
                                        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse"></div>
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
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
