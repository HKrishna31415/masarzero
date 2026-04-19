import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, HardHat } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useTranslation } from '../context/TranslationContext';

const getSafetyStats = (t: any) => [
    { icon: ShieldCheck, to: 0.05, fractionDigits: 2, label: t('pages.esg.safety.stats.0.label') },
    { icon: HeartPulse, to: 0, label: t('pages.esg.safety.stats.1.label') },
    { icon: HardHat, to: 15000, suffix: t('pages.esg.safety.stats.2.suffix'), label: t('pages.esg.safety.stats.2.label') },
];

const SafetyDashboard: React.FC = () => {
    const { t } = useTranslation();
    const safetyStats = getSafetyStats(t);
    const sectionVariants = {
        initial: { opacity: 0 },
        inView: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const cardVariants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    } as const;

    return (
        <section className="py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold">{t('pages.esg.safety.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    {t('pages.esg.safety.subtitle')}
                </p>
            </div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                variants={sectionVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.3 }}
            >
                {safetyStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            className="relative p-8 rounded-2xl glass-card text-center flex flex-col items-center justify-center"
                            variants={cardVariants}
                        >
                            <Icon className="w-12 h-12 text-emerald-300 mb-4" />
                            <AnimatedCounter 
                                to={stat.to} 
                                fractionDigits={stat.fractionDigits}
                                suffix={stat.suffix}
                                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
                            />
                            <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default SafetyDashboard;