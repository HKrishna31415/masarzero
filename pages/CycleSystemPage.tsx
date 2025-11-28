
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Clock } from 'lucide-react';
import CycleDiagram from '../components/CycleDiagram';

const CycleSystemPage: React.FC = () => {
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
                        Advanced Flow Dynamics
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Cycle System</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                        MasarZero achieves exponential capacity without exponential hardware by transforming your existing infrastructure into a dynamic pressure buffer.
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
                            Vapor Battery
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            The system utilizes the Underground Storage Tank (UST) vapor space as a buffer, storing excess pressure during peak unload times rather than venting it.
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
                            Time Dilation
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            We spread the load of a 15-minute truck drop over 60 minutes. This allows a smaller, more energy-efficient machine to handle industrial-scale surges.
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
                            Zero Waste
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            By keeping the system closed-loop even during peak pressure, we ensure zero fugitive emissions escape to the atmosphere, maximizing recovery yield.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default CycleSystemPage;
