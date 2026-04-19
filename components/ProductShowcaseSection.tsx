
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

const ProductShowcaseSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold">{t('home.productShowcase.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        {t('home.productShowcase.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    {/* Main Large Image */}
                    <motion.div 
                        className="md:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 group min-h-[350px] md:min-h-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img 
                            src="/otherinstalls/bahraininstall.jpeg"
                            alt="MZ-1 units in the factory"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-8">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-3 inline-block">
                                {t('home.productShowcase.badge')}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{t('home.productShowcase.mainTitle')}</h3>
                            <p className="text-gray-300 text-sm mt-2 max-w-md">{t('home.productShowcase.mainDescription')}</p>
                        </div>
                    </motion.div>

                    {/* Side Column Images */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <motion.div 
                            className="flex-1 relative rounded-3xl overflow-hidden border border-white/10 group min-h-[250px] md:min-h-0"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <img 
                                src="/appscreenshots/financialdashboardss.png"
                                alt="Intelligent control dashboard"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute bottom-6 left-6">
                                <h4 className="font-bold text-white">{t('home.productShowcase.intelligentControlTitle')}</h4>
                                <p className="text-xs text-gray-300 mt-1">{t('home.productShowcase.intelligentControlDescription')}</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex-1 relative rounded-3xl overflow-hidden border border-white/10 group min-h-[250px] md:min-h-0"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img 
                                src="/machinepictures/cryocore.jpg"
                                alt="Patented Cryo-Core components"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute bottom-6 left-6">
                                <h4 className="font-bold text-white">{t('home.productShowcase.cryoCoreTitle')}</h4>
                                <p className="text-xs text-gray-300 mt-1">{t('home.productShowcase.cryoCoreDescription')}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcaseSection;
