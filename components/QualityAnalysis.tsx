
import React, { useState, useEffect } from 'react';
// FIX: Add Variants type to fix framer-motion type inference issue.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Droplet, Globe, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';

const samples = [
  {
    country: 'USA',
    fuel: 'Gasoline',
    octane: 93,
    metrics: [
      { name: 'Octane Rating', value: '93' },
      { name: 'Vapor Pressure', value: '9.0 PSI' },
      { name: 'Sediment', value: '< 1 PPM' },
      { name: 'Ethanol Content', value: '9.8%' },
      { name: 'Sulfur Content', value: '< 10 PPM' },
    ],
  },
  {
    country: 'Germany',
    fuel: 'Gasoline',
    octane: 98,
    metrics: [
      { name: 'Octane Rating', value: '98' },
      { name: 'Vapor Pressure', value: '9.0 PSI' },
      { name: 'Sediment', value: '< 1 PPM' },
      { name: 'Ethanol Content', value: '9.8%' },
      { name: 'Sulfur Content', value: '< 10 PPM' },
    ],
  },
    {
    country: 'Brazil',
    fuel: 'Ethanol Mix',
    octane: 87,
    metrics: [
        { name: 'Octane Rating', value: '87' },
        { name: 'Vapor Pressure', value: '10.5 PSI' },
        { name: 'Sediment', value: '< 2 PPM' },
        { name: 'Ethanol Content', value: '27.5%' },
        { name: 'Sulfur Content', value: '< 15 PPM' },
    ],
  },
  {
    country: 'Japan',
    fuel: 'Premium Gas',
    octane: 100,
    metrics: [
        { name: 'Octane Rating', value: '100' },
        { name: 'Vapor Pressure', value: '8.5 PSI' },
        { name: 'Sediment', value: '< 1 PPM' },
        { name: 'Ethanol Content', value: '3.0%' },
        { name: 'Sulfur Content', value: '< 5 PPM' },
    ],
  },
];

const QualityAnalysis: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
    const [sampleIndex, setSampleIndex] = useState(0);

    const currentSample = samples[sampleIndex];

    const handleAnalyze = () => {
        if (status === 'analyzing') {
            return;
        }

        const newIndex = status === 'complete' ? (sampleIndex + 1) % samples.length : sampleIndex;
        
        if (newIndex !== sampleIndex) {
            setSampleIndex(newIndex);
        }
        
        setStatus('analyzing');
        setTimeout(() => {
            setStatus('complete');
        }, 3000); 
    };

    // This effect ensures that when a new sample is loaded, the old "Verified Output" card disappears.
    useEffect(() => {
        if (status === 'analyzing') {
            // No need to do anything here, the main handleAnalyze function drives the logic.
        }
    }, [sampleIndex]);

    // Fix: Using variants for animations to resolve potential TypeScript typing issues.
    const textVariants = {
      initial: { opacity: 0, y: -10 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: status === 'analyzing' ? i * 0.4 : 0 },
      }),
    };
    
    const fillVariants: Variants = {
        initial: { width: '0%' },
        animate: (i: number) => ({
            width: '100%',
            // FIX: Explicitly set transition type to 'tween' to resolve framer-motion type inference issue.
            transition: { type: 'tween', duration: 0.4, delay: i * 0.4, ease: 'linear' },
        })
    };

    const outputVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };


    return (
        <div className="py-24">
            <div className="grid md:grid-cols-3 items-center gap-8 relative">
                {/* Arrows */}
                <ChevronRight className="absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2 w-8 h-8 text-slate-600 hidden md:block" />
                <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-1/3 translate-x-1/2 w-8 h-8 text-slate-600 hidden md:block" />

                {/* Input Sample */}
                <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl text-center h-full flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Input Sample</span>
                    <Globe className="text-slate-400 w-5 h-5 mx-auto mt-4"/>
                    <span className="text-xs text-slate-500">{currentSample.country}</span>
                    <Droplet className="text-cyan-400 w-16 h-16 mx-auto my-4"/>
                    <h3 className="text-2xl font-bold">{currentSample.fuel}</h3>
                    <p className="text-slate-400">{currentSample.octane} Octane</p>
                </div>

                {/* Quality Analysis */}
                <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl h-full">
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Quality Analysis</span>
                    <div className="space-y-3 mt-4">
                        {currentSample.metrics.map((metric, index) => (
                            <div key={metric.name} className="flex justify-between items-center text-sm">
                                <span className="text-slate-300">{metric.name}</span>
                                <div className="flex items-center gap-2">
                                    <AnimatePresence mode="wait">
                                        <motion.span 
                                            key={`${status}-${metric.value}`}
                                            custom={index}
                                            variants={textVariants}
                                            initial="initial"
                                            animate="animate"
                                            className="font-mono font-semibold"
                                        >
                                            {status !== 'idle' ? metric.value : '...'}
                                        </motion.span>
                                    </AnimatePresence>
                                    <div className={`w-3 h-3 rounded-full border-2 ${status === 'idle' ? 'border-slate-600' : status === 'analyzing' ? 'border-cyan-400' : 'border-green-400'} relative overflow-hidden`}>
                                        {status === 'analyzing' && <motion.div 
                                            className="absolute top-0 left-0 bottom-0 bg-cyan-400"
                                            custom={index}
                                            variants={fillVariants}
                                            initial="initial"
                                            animate="animate"
                                        />}
                                         {status === 'complete' && <div className="w-full h-full bg-green-400"/>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verified Output */}
                 <AnimatePresence>
                {status === 'complete' && (
                    <motion.div 
                        className="bg-green-900/30 border border-green-500 p-6 rounded-xl text-center h-full flex flex-col justify-center"
                        variants={outputVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Verified Output</span>
                        <ShieldCheck className="text-green-400 w-20 h-20 mx-auto my-6"/>
                        <h3 className="text-2xl font-bold text-white">Quality Certified</h3>
                        <p className="text-green-300">{currentSample.octane} Octane</p>
                    </motion.div>
                )}
                 </AnimatePresence>
            </div>
            
            <div className="text-center mt-12">
                <button 
                    onClick={handleAnalyze}
                    disabled={status === 'analyzing'}
                    className="bg-slate-800 border border-cyan-500/50 text-cyan-400 font-bold py-3 px-8 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-wait transition-colors flex items-center mx-auto gap-2"
                >
                    <RefreshCw className={`w-5 h-5 ${status === 'analyzing' ? 'animate-spin' : ''}`} />
                    Analyze New Sample
                </button>
            </div>
        </div>
    );
};

export default QualityAnalysis;