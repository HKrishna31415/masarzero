import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const getGoals = (t: any) => [
    {
        number: 13,
        title: t('pages.esg.globalGoals.goals.0.title'),
        description: t('pages.esg.globalGoals.goals.0.desc'),
        borderColor: 'border-green-500',
        textColor: 'text-green-400',
        glowColor: 'shadow-green-500/20',
    },
    {
        number: 11,
        title: t('pages.esg.globalGoals.goals.1.title'),
        description: t('pages.esg.globalGoals.goals.1.desc'),
        borderColor: 'border-orange-500',
        textColor: 'text-orange-400',
        glowColor: 'shadow-orange-500/20',
    },
    {
        number: 12,
        title: t('pages.esg.globalGoals.goals.2.title'),
        description: t('pages.esg.globalGoals.goals.2.desc'),
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-400',
        glowColor: 'shadow-yellow-500/20',
    },
    {
        number: 7,
        title: t('pages.esg.globalGoals.goals.3.title'),
        description: t('pages.esg.globalGoals.goals.3.desc'),
        borderColor: 'border-teal-500',
        textColor: 'text-teal-400',
        glowColor: 'shadow-teal-500/20',
    }
];

const GlobalGoalsSection: React.FC = () => {
    const { t } = useTranslation();
    const goals = getGoals(t);
    const sectionVariants = {
        initial: { opacity: 0 },
        inView: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        initial: { opacity: 0, y: 30 },
        inView: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-12">
            <motion.div
                className="container mx-auto px-4"
                variants={sectionVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="flex items-center gap-4 mb-12 justify-center">
                    <Target className="text-white w-8 h-8" />
                    <h2 className="text-2xl md:text-4xl font-bold text-white">{t('pages.esg.globalGoals.title')}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {goals.map((goal, i) => (
                        <motion.div
                            key={goal.number}
                            variants={cardVariants}
                            className={`bg-[#050714] p-6 rounded-2xl border border-white/10 hover:border-opacity-100 border-t-4 ${goal.borderColor} relative group overflow-hidden transition-all duration-300 hover:shadow-xl ${goal.glowColor}`}
                        >
                            {/* Background Number */}
                            <span className={`absolute -right-4 -top-4 text-9xl font-black opacity-5 ${goal.textColor} select-none pointer-events-none group-hover:opacity-10 transition-opacity`}>
                                {goal.number}
                            </span>

                            <div className="relative z-10">
                                <div className={`text-sm font-bold mb-4 uppercase tracking-wider ${goal.textColor}`}>
                                    SDG Goal {goal.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{goal.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{goal.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default GlobalGoalsSection;
