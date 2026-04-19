import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { Zap, Layers, Clock } from 'lucide-react';
import CycleDiagram from '../components/CycleDiagram';

const CycleSystemPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="py-32 min-h-screen bg-[#000212] overflow-hidden">
            <div className="container mx-auto px-4">
                
                {/* Hero Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        {t('pages.cycle.badge')}
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        {t('pages.cycle.title')}
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                        {t('pages.cycle.description')}
                    </p>
                </motion.div>

                {/* Main Diagram */}
                <motion.div 
                    className="max-w-6xl mx-auto mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <CycleDiagram />
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto border-t border-white/10 pt-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Layers size={20} className="text-purple-400" />
                            {t('pages.cycle.features.battery.title')}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t('pages.cycle.features.battery.text')}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-blue-400" />
                            {t('pages.cycle.features.time.title')}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t('pages.cycle.features.time.text')}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Zap size={20} className="text-cyan-400" />
                            {t('pages.cycle.features.waste.title')}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t('pages.cycle.features.waste.text')}
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default CycleSystemPage;
