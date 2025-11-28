
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Server, Cloud, AlertTriangle, Activity, Zap, Lock, Wifi, Database, ChevronDown } from 'lucide-react';

// --- Mock Data ---
const performanceData = [
    { name: '1', value: 20 }, { name: '2', value: 35 }, { name: '3', value: 28 },
    { name: '4', value: 45 }, { name: '5', value: 38 }, { name: '6', value: 55 },
    { name: '7', value: 45 }, { name: '8', value: 60 }, { name: '9', value: 55 },
    { name: '10', value: 70 },
];

// --- Components ---

// A high-fidelity mock of the dashboard designed at a fixed logical width
const DashboardUI = ({ step }: { step: number }) => {
    return (
        <div className="w-[350px] md:w-[600px] aspect-[3/4] md:aspect-video bg-[#0f172a] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative select-none">
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
            
            {/* Header */}
            <div className="h-12 border-b border-slate-700 flex items-center justify-between px-4 bg-slate-800/50 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-300 tracking-wider">VRU-01 // ONLINE</span>
                </div>
                <div className="flex gap-3 text-slate-400">
                    <Database size={14} />
                    <Wifi size={14} />
                </div>
            </div>

            {/* Body */}
            <div className="p-4 grid grid-cols-2 gap-4 flex-1 content-start overflow-hidden">
                
                {/* Metric Cards */}
                <div className={`col-span-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700 transition-all duration-500 ${step === 2 ? 'ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-slate-800 z-10 relative' : 'opacity-60 grayscale'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={14} className="text-cyan-400" />
                        <span className="text-[10px] uppercase text-slate-400 font-bold">Flow Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white">1,240 <span className="text-xs font-normal text-slate-500">L/min</span></div>
                </div>

                <div className={`col-span-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700 transition-all duration-500 ${step === 2 ? 'ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-slate-800 z-10 relative' : 'opacity-60 grayscale'}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-yellow-400" />
                        <span className="text-[10px] uppercase text-slate-400 font-bold">Pressure</span>
                    </div>
                    <div className="text-2xl font-bold text-white">14.5 <span className="text-xs font-normal text-slate-500">PSI</span></div>
                </div>

                {/* Main Chart */}
                <div className={`col-span-2 bg-slate-800/30 rounded-xl border border-slate-700 p-4 h-32 relative overflow-hidden transition-all duration-500 ${step === 2 ? 'ring-1 ring-cyan-500/50 shadow-lg z-10 relative' : 'opacity-60 grayscale'}`}>
                    <p className="text-[10px] text-slate-400 mb-2 absolute top-3 left-4">Recovery Efficiency Trend</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="url(#chartGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Alerts Section */}
                <div className={`col-span-2 md:col-span-1 bg-slate-800/50 rounded-xl border border-slate-700 p-3 transition-all duration-500 ${step === 3 ? 'ring-2 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-slate-800 scale-105 z-10' : 'opacity-60 grayscale'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">System Alerts</span>
                        <div className={`w-2 h-2 bg-red-500 rounded-full ${step === 3 ? 'animate-ping' : ''}`} />
                    </div>
                    <div className="flex items-start gap-2 bg-red-500/10 p-2 rounded border border-red-500/20">
                        <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-red-300">Filter Maintenance</p>
                            <p className="text-[10px] text-red-400/70">Delta P {'>'} 2.5 PSI</p>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className={`col-span-2 md:col-span-1 bg-slate-800/50 rounded-xl border border-slate-700 p-3 flex flex-col justify-between transition-all duration-500 ${step === 4 ? 'ring-2 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] bg-slate-800 scale-105 z-10' : 'opacity-60 grayscale'}`}>
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">Remote Ops</span>
                         <Lock size={12} className="text-slate-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-600/20 border border-blue-600/50 rounded text-center py-1.5">
                            <span className="text-[10px] font-bold text-blue-300">START</span>
                        </div>
                        <div className="bg-slate-700 border border-slate-600 rounded text-center py-1.5">
                            <span className="text-[10px] font-bold text-slate-400">STOP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Background Scenes ---

const DataRain = ({ opacity }: { opacity: any }) => (
    <motion.div className="absolute inset-0 flex justify-center overflow-hidden pointer-events-none" style={{ opacity }}>
         {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-8 md:w-12 mx-1 md:mx-8 relative h-full opacity-20">
                <motion.div 
                    className="absolute bottom-0 left-0 w-full text-cyan-400 font-mono text-[10px] md:text-xs leading-none text-center break-all"
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    transition={{ 
                        duration: 2 + Math.random() * 3, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                >
                    {Array.from({ length: 60 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
                </motion.div>
            </div>
        ))}
    </motion.div>
);

const CloudNode = ({ opacity, scale }: { opacity: any, scale: any }) => (
    <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" 
        style={{ opacity, scale }}
    >
        <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-[80px] opacity-20 animate-pulse" />
            <Cloud size={100} className="text-cyan-300 relative z-10 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]" />
            <Server size={32} className="text-blue-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mt-8 text-white tracking-widest uppercase">Processing</h3>
    </motion.div>
);

const HeroTitle = ({ opacity, scale }: { opacity: any, scale: any }) => (
    <motion.div 
        style={{ opacity, scale }} 
        className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none text-center px-4"
    >
        <div className="absolute inset-0 bg-[#000212]/60" />
        <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                PINNACLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">OS</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light tracking-wide">
                The Operating System for Industrial Sustainability.
            </p>
            <div className="mt-16 animate-bounce text-cyan-500 flex justify-center">
                <ChevronDown size={48} />
            </div>
        </div>
    </motion.div>
);

// --- Main Component ---

const ScadaScrollAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const [step, setStep] = useState(1);
    const [scale, setScale] = useState(1);

    // Handle responsive scaling
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScale(Math.min(width / 400, 0.9)); 
            } else {
                setScale(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.3) {
            setStep(1);
        } else if (latest < 0.5) {
            setStep(2); // Metrics
        } else if (latest < 0.7) {
            setStep(3); // Alerts
        } else {
            setStep(4); // Controls
        }
    });

    // Animation Transforms
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.5]);
    
    const rainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const cloudOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const cloudScale = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1.5]);
    const dashboardOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.9, 1], [0, 1, 1, 0]);
    const dashboardY = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#000212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                
                {/* Hero Title Overlay */}
                <HeroTitle opacity={heroOpacity} scale={heroScale} />
                
                {/* Background Layers */}
                <DataRain opacity={rainOpacity} />
                <CloudNode opacity={cloudOpacity} scale={cloudScale} />

                {/* Stage Layer (Scaled for Mobile) */}
                <motion.div 
                    className="relative z-10 flex items-center justify-center origin-center"
                    style={{ 
                        opacity: dashboardOpacity, 
                        y: dashboardY,
                        scale: scale 
                    }}
                >
                    <DashboardUI step={step} />
                </motion.div>

                {/* Narrative Overlay (Fixed Position independent of scaling) */}
                <div className="absolute bottom-12 md:bottom-24 left-0 right-0 z-30 px-6 flex justify-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {step === 2 && (
                            <motion.div key="text2" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 md:p-6 rounded-2xl max-w-sm text-center shadow-2xl">
                                <h3 className="text-cyan-400 font-bold text-lg md:text-xl mb-1">Real-Time Telemetry</h3>
                                <p className="text-xs md:text-sm text-gray-300">Instant visibility into flow rates and pressures.</p>
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div key="text3" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="bg-slate-900/90 backdrop-blur-md border border-red-500/30 p-4 md:p-6 rounded-2xl max-w-sm text-center shadow-2xl">
                                <h3 className="text-red-400 font-bold text-lg md:text-xl mb-1">Predictive Alerts</h3>
                                <p className="text-xs md:text-sm text-gray-300">AI diagnostics detect anomalies before failures occur.</p>
                            </motion.div>
                        )}
                        {step === 4 && (
                            <motion.div key="text4" variants={textVariants} initial="hidden" animate="visible" exit="exit" className="bg-slate-900/90 backdrop-blur-md border border-blue-500/30 p-4 md:p-6 rounded-2xl max-w-sm text-center shadow-2xl">
                                <h3 className="text-blue-400 font-bold text-lg md:text-xl mb-1">Remote Command</h3>
                                <p className="text-xs md:text-sm text-gray-300">Secure, encrypted control from anywhere in the world.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default ScadaScrollAnimation;
