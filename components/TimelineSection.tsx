import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Award, Rocket, Globe, BrainCircuit } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const TimelineSection: React.FC = () => {
    const { t } = useTranslation();
    
    const iconMap: Record<string, any> = {
        'Foundation': Flag,
        'First Patent Granted': Award,
        'First Commercial Deployment': Rocket,
        'Global Expansion': Globe,
        'AI Integration': BrainCircuit,
    };

    const events = (t('pages.about.journey.events', { returnObjects: true }) as any[]) || [];

    const lineVariants = {
        initial: { scaleY: 0 },
        inView: { scaleY: 1, transition: { duration: 2, ease: 'easeOut' } },
    } as const;

    return (
        <div className="py-20 sm:py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">{t('pages.about.journey.title')}</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                        {t('pages.about.journey.subtitle')}
                    </p>
                </div>
                
                <div className="relative max-w-3xl mx-auto">
                    {/* The vertical line */}
                    <motion.div 
                        className="absolute left-4 md:left-1/2 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent -translate-x-1/2 origin-top"
                        style={{ height: 'calc(100% - 4rem)' }}
                        variants={lineVariants}
                        initial="initial"
                        whileInView="inView"
                        viewport={{ once: true }}
                    />

                    {events.map((event, index) => {
                        const Icon = iconMap[event.title] || Globe;
                        const isOdd = index % 2 !== 0;

                        const itemVariants = {
                            initial: { opacity: 0, x: isOdd ? 50 : -50 },
                            inView: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                        } as const;

                        return (
                            <motion.div
                                key={index}
                                className={`relative mb-12 flex items-center w-full ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                                variants={itemVariants}
                                initial="initial"
                                whileInView="inView"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <div className="hidden md:flex w-1/2"></div>
                                <div className={`w-full md:w-1/2 ${isOdd ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                                        <div className="w-8 h-8 rounded-full bg-[#000212] flex items-center justify-center border-2 border-emerald-400">
                                            <Icon className="w-4 h-4 text-emerald-300" />
                                        </div>
                                    </div>
                                    <div className={`ml-12 md:ml-0 ${isOdd ? 'md:ml-12' : 'md:mr-12'}`}>
                                      <div className="glass-card p-6 rounded-xl">
                                          <p className="font-bold text-lg text-emerald-300">{event.date}</p>
                                          <h3 className="text-xl font-bold mt-1 mb-2">{event.title}</h3>
                                          <p className="text-gray-400 text-sm">{event.description}</p>
                                      </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;
