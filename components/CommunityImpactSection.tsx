import React from 'react';
import { motion } from 'framer-motion';
import { Users, FlaskConical, Briefcase, Award } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const getImpactAreas = (t: any) => [
    {
        icon: Users,
        title: t('pages.esg.community.areas.0.title'),
        description: t('pages.esg.community.areas.0.desc')
    },
    {
        icon: Briefcase,
        title: t('pages.esg.community.areas.1.title'),
        description: t('pages.esg.community.areas.1.desc')
    },
    {
        icon: FlaskConical,
        title: t('pages.esg.community.areas.2.title'),
        description: t('pages.esg.community.areas.2.desc')
    },
    {
        icon: Award,
        title: t('pages.esg.community.areas.3.title'),
        description: t('pages.esg.community.areas.3.desc')
    }
];

const CommunityImpactSection: React.FC = () => {
    const { t } = useTranslation();
    const impactAreas = getImpactAreas(t);
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
                <h2 className="text-3xl md:text-5xl font-bold">{t('pages.esg.community.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    {t('pages.esg.community.subtitle')}
                </p>
            </div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={sectionVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.3 }}
            >
                {impactAreas.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.title}
                            className="glass-card p-8 rounded-2xl text-center"
                            variants={cardVariants}
                        >
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/20">
                                <Icon className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default CommunityImpactSection;