
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Droplet, TestTube, Thermometer } from 'lucide-react';

const RealSampleData: React.FC = () => {
    // Fix: Using variants for animations to resolve potential TypeScript typing issues.
    const cardVariants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="mt-12 max-w-lg mx-auto"
            variants={cardVariants}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-cyan-400">Real Sample Data</h2>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-slate-400">REP-001</p>
                        <h3 className="text-xl font-bold text-white">Amman, Jordan</h3>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1.5" />
                            <span>2024-07-28</span>
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                        Excellent
                    </span>
                </div>
                
                <div className="w-full text-center my-6">
                    <button className="w-full relative aurora-border font-bold py-3 rounded-lg text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300">
                        View Sample Report
                    </button>
                </div>
                
                <div className="border-t border-slate-700 pt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <Droplet className="w-6 h-6 mx-auto text-blue-400 mb-1" />
                        <span className="text-xs text-slate-400">Octane</span>
                        <p className="font-bold text-lg">90</p>
                    </div>
                     <div>
                        <TestTube className="w-6 h-6 mx-auto text-cyan-400 mb-1" />
                        <span className="text-xs text-slate-400">Ethanol</span>
                        <p className="font-bold text-lg">9.8%</p>
                    </div>
                     <div>
                        <Thermometer className="w-6 h-6 mx-auto text-indigo-400 mb-1" />
                        <span className="text-xs text-slate-400">Sediment</span>
                        <p className="font-bold text-lg">3 PPM</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RealSampleData;
