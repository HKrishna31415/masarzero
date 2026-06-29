
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2, Activity } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const SocialProofSection: React.FC = () => {
    const { t } = useTranslation();
    const stats = [
        { icon: Globe, value: '5+', label: t('home.socialProof.countries') },
        { icon: CheckCircle2, value: '50+', label: t('home.socialProof.installations') },
        { icon: Activity, value: '99%+', label: t('home.socialProof.uptime') },
    ];

    return (
        <section className="py-12 border-b border-white/5 bg-[#000212]">
            {/* Stats Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="p-3 rounded-full bg-white/5">
                                    <Icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;
