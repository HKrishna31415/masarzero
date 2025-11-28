
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Fuel, Zap, Atom, Layers, ArrowRight, CheckCircle2, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const headerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const containerVariants = {
        initial: {},
        animate: { transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-32 min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#000212] via-[#0a0f29] to-[#000212] -z-10"></div>
            
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-20"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Technology Portfolio
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        From our flagship vapor recovery systems to experimental energy solutions, we engineer the future of industrial efficiency.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    className="space-y-16"
                >
                    {/* Flagship Product */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl opacity-20 blur-lg"></div>
                        <div className="relative glass-card rounded-2xl border border-cyan-500/30 p-8 md:p-12 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                                            Flagship Series
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-wider border border-green-500/30">
                                            Available Now
                                        </span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">MZ-VRU 9000 Series</h2>
                                    <p className="text-lg text-gray-300 mb-8">
                                        The industry standard for intelligent vapor recovery. Our 9000 Series captures up to 99.9% of fugitive emissions, converting waste into a localized revenue stream with zero upfront CapEx.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {['99.9% Recovery Rate', 'Zero-CapEx Model', 'AI-Powered Optimization', 'ATEX Certified'].map((feat) => (
                                            <div key={feat} className="flex items-center gap-3">
                                                <CheckCircle2 className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                                                <span className="text-sm text-gray-300">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate('/technology')}
                                        className="group relative aurora-border bg-slate-900/80 backdrop-blur-md font-bold text-lg px-10 py-4 rounded-full overflow-hidden flex items-center gap-3 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 cursor-pointer border border-white/20 z-50"
                                    >
                                        <span className="relative z-10 text-white group-hover:text-cyan-300 transition-colors duration-300">Launch Interactive 3D Model</span>
                                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-cyan-400" />

                                        {/* Hover Fill Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                    </button>
                                </div>

                                <div className="relative h-full min-h-[300px] flex items-center justify-center">
                                    {/* Decorative Graphic */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
                                    <Fuel size={200} className="text-white/5 absolute rotate-12 scale-150" />
                                    <div className="relative z-10 glass-card p-8 rounded-2xl border border-white/10 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                                        <Fuel size={80} className="text-cyan-400 mx-auto mb-4" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-32 bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full w-[80%] bg-cyan-400 animate-pulse"></div>
                                            </div>
                                            <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
                                        </div>
                                        <p className="text-xs text-cyan-300 mt-4 text-center font-mono">SYSTEM ONLINE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Specialized Solutions */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 border-l-4 border-purple-500 pl-4">Future Innovations & Specialized Solutions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { 
                                    icon: Zap, 
                                    title: 'MZ-ES 1500', 
                                    subtitle: 'Electrical Shunt',
                                    status: 'In Development',
                                    desc: 'High-precision shunts for industrial power stability.'
                                },
                                { 
                                    icon: Atom, 
                                    title: 'MZ-PG 750', 
                                    subtitle: 'Plasma Gasification',
                                    status: 'Prototype',
                                    desc: 'Transforming solid waste into hydrogen-rich syngas.'
                                },
                                { 
                                    icon: Layers, 
                                    title: 'MZ-VRU Custom', 
                                    subtitle: 'Bespoke Units',
                                    status: 'Made to Order',
                                    desc: 'Tailored engineering for unique flow rates and footprints.'
                                }
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div 
                                        key={item.title}
                                        variants={itemVariants}
                                        className="group relative glass-card p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-white/5 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                                                <Icon size={24} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {item.status}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-xs text-purple-300 uppercase tracking-wide mb-3">{item.subtitle}</p>
                                        <p className="text-sm text-gray-400 mb-6">{item.desc}</p>
                                        <button className="w-full py-2 rounded-lg border border-white/10 text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                                            Contact Engineering
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductsPage;
