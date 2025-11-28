
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Activity, Terminal, RefreshCw, ShieldCheck, ChevronRight, Globe, Info, X, CheckCircle2, XCircle, Zap } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';
import AnimatedCounter from '../components/AnimatedCounter';

// --- Custom Components ---

const GradientDroplet = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
    >
        <defs>
            <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d946ef" /> {/* Fuchsia/Purple */}
                <stop offset="100%" stopColor="#4f46e5" /> {/* Indigo */}
            </linearGradient>
        </defs>
        <path 
            d="M12 2.69006L17.6569 8.34692C20.781 11.4711 20.781 16.5364 17.6569 19.6605C14.5327 22.7847 9.46734 22.7847 6.34315 19.6605C3.21895 16.5364 3.21895 11.4711 6.34315 8.34692L12 2.69006Z" 
            fill="url(#dropletGradient)" 
            stroke="url(#dropletGradient)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
);

// --- Mock Data & Types ---

type SampleType = {
    country: string;
    code: string;
    type: string;
    inputOctane: number;
    inputRvp: number;
    metrics: {
        name: string;
        value: string;
        status: 'Pass' | 'Fail';
        detail: string;
        standard: string;
        ourResult: string;
        chartData: { subject: string; A: number; B: number; fullMark: number }[];
    }[];
};

const samples: SampleType[] = [
    {
        country: 'USA',
        code: 'US',
        type: 'Premium Unleaded',
        inputOctane: 93,
        inputRvp: 9.0,
        metrics: [
            { 
                name: 'Octane (RON)', 
                value: '93.2', 
                status: 'Pass', 
                detail: 'Research Octane Number indicates fuel stability against knocking. MasarZero retains high-octane chains.',
                standard: 'Min 93',
                ourResult: '93.2 (+0.2)',
                chartData: [{ subject: 'C5', A: 80, B: 60, fullMark: 100 }, { subject: 'C6', A: 90, B: 70, fullMark: 100 }, { subject: 'C7+', A: 95, B: 85, fullMark: 100 }] 
            },
            { 
                name: 'RVP (PSI)', 
                value: '8.9', 
                status: 'Pass',
                detail: 'Reid Vapor Pressure measures volatility. Lower RVP means less evaporation loss in storage.',
                standard: 'Max 9.0',
                ourResult: '8.9 (Optimal)',
                chartData: [{ subject: 'Winter', A: 12, B: 13.5, fullMark: 15 }, { subject: 'Summer', A: 8.9, B: 9.5, fullMark: 15 }] 
            },
            { 
                name: 'Benzene', 
                value: '0.58%', 
                status: 'Pass',
                detail: 'A carcinogenic component. Our membrane selectively filters benzene to ensure strict EPA compliance.',
                standard: 'Max 0.62%',
                ourResult: '0.58% (Safe)',
                chartData: [{ subject: 'Input', A: 1.2, B: 1.2, fullMark: 2 }, { subject: 'Output', A: 0.58, B: 0.9, fullMark: 2 }]
            },
            { 
                name: 'Sulfur', 
                value: '< 8 PPM', 
                status: 'Pass',
                detail: 'Sulfur content reduction protects catalytic converters and reduces SOx emissions.',
                standard: 'Max 10 PPM',
                ourResult: '7.8 PPM',
                chartData: [{ subject: 'In', A: 30, B: 30, fullMark: 50 }, { subject: 'Out', A: 8, B: 25, fullMark: 50 }]
            }
        ]
    },
    {
        country: 'Germany',
        code: 'DE',
        type: 'Super Plus 98',
        inputOctane: 98,
        inputRvp: 8.5,
        metrics: [
            { 
                name: 'Octane (RON)', 
                value: '98.1', 
                status: 'Pass', 
                detail: 'High performance standard for European engines. Our cryo-condensation preserves aromatic chains.',
                standard: 'Min 98',
                ourResult: '98.1 (Exact)',
                chartData: [{ subject: 'Aromatics', A: 35, B: 25, fullMark: 50 }, { subject: 'Olefins', A: 10, B: 15, fullMark: 30 }] 
            },
            { 
                name: 'RVP (PSI)', 
                value: '8.4', 
                status: 'Pass',
                detail: 'Strict volatility controls for autobahn performance safety margins.',
                standard: 'Max 8.5',
                ourResult: '8.4 (Stable)',
                chartData: [{ subject: 'Volatility', A: 80, B: 60, fullMark: 100 }] 
            },
            { 
                name: 'Benzene', 
                value: '0.45%', 
                status: 'Pass',
                detail: 'Exceeds EU standards for benzene reduction through multi-stage filtration.',
                standard: 'Max 1.0%',
                ourResult: '0.45% (Superior)',
                chartData: [{ subject: 'Reduction', A: 95, B: 70, fullMark: 100 }]
            },
            { 
                name: 'Sulfur', 
                value: '< 5 PPM', 
                status: 'Pass',
                detail: 'Ultra-low sulfur content compatible with advanced Euro 6 engines.',
                standard: 'Max 10 PPM',
                ourResult: '4.2 PPM',
                chartData: [{ subject: 'Cleanliness', A: 98, B: 85, fullMark: 100 }]
            }
        ]
    },
    {
        country: 'Japan',
        code: 'JP',
        type: 'High Octane',
        inputOctane: 100,
        inputRvp: 8.0,
        metrics: [
            { name: 'Octane (RON)', value: '100.0', status: 'Pass', detail: 'Premium grade for high compression engines.', standard: 'Min 99.5', ourResult: '100.0', chartData: [{ subject: 'RON', A: 100, B: 99.5, fullMark: 100 }] },
            { name: 'RVP (PSI)', value: '7.9', status: 'Pass', detail: 'Low volatility for dense urban environments.', standard: 'Max 8.0', ourResult: '7.9', chartData: [{ subject: 'RVP', A: 7.9, B: 8.0, fullMark: 10 }] },
            { name: 'Benzene', value: '0.3%', status: 'Pass', detail: 'Extremely low benzene limits.', standard: 'Max 1.0%', ourResult: '0.3%', chartData: [{ subject: 'Vol %', A: 0.3, B: 1.0, fullMark: 2 }] },
            { name: 'Sulfur', value: '< 3 PPM', status: 'Pass', detail: 'Near-zero sulfur content.', standard: 'Max 10 PPM', ourResult: '2.1 PPM', chartData: [{ subject: 'PPM', A: 2.1, B: 10, fullMark: 20 }] },
        ]
    },
    {
        country: 'Brazil',
        code: 'BR',
        type: 'Ethanol Blend (E27)',
        inputOctane: 95,
        inputRvp: 7.5,
        metrics: [
            { name: 'Octane (RON)', value: '95.5', status: 'Pass', detail: 'Maintains octane despite ethanol separation challenges.', standard: 'Min 95', ourResult: '95.5', chartData: [{ subject: 'RON', A: 95.5, B: 95, fullMark: 100 }] },
            { name: 'RVP (PSI)', value: '7.2', status: 'Pass', detail: 'Controls moisture absorption and volatility.', standard: 'Max 7.5', ourResult: '7.2', chartData: [{ subject: 'RVP', A: 7.2, B: 7.5, fullMark: 10 }] },
            { name: 'Ethanol %', value: '27.1%', status: 'Pass', detail: 'Preserves ethanol content ratio during recovery.', standard: '27.0%', ourResult: '27.1%', chartData: [{ subject: '%', A: 27.1, B: 27.0, fullMark: 30 }] },
            { name: 'Water %', value: '0.01%', status: 'Pass', detail: 'Critical water separation for ethanol blends.', standard: 'Max 0.05%', ourResult: '0.01%', chartData: [{ subject: '%', A: 0.01, B: 0.05, fullMark: 0.1 }] },
        ]
    }
];

const logs = [
    "[SYS] Connection established to Node-Alpha",
    "[VRU] Vacuum pump efficiency: 98.2%",
    "[SENS] Vapor concentration: 45% LEL",
    "[AUTO] Cooling cycle initiated",
    "[NET] Telemetry packet sent (24kb)",
    "[VRU] Recovery rate optimal",
    "[SYS] Diagnostic check complete",
    "[SENS] Tank pressure normalized",
    "[AUTO] Valve sequence 4 activated",
    "[VRU] Liquid return flow: 12.5 L/min"
];

// --- Sub-components ---

const LiveLog = () => {
    const [lines, setLines] = useState<string[]>([logs[0], logs[1], logs[2]]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomLog = logs[Math.floor(Math.random() * logs.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setLines(prev => [`${timestamp} ${randomLog}`, ...prev.slice(0, 6)]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs h-48 overflow-hidden border border-white/10 flex flex-col-reverse shadow-inner">
            {lines.map((line, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1 - (i * 0.15), x: 0 }} 
                    className="text-cyan-500/90 mb-1 truncate"
                >
                    <span className="text-slate-500 mr-2">{line.split(' ')[0]}</span>
                    {line.split(' ').slice(1).join(' ')}
                </motion.div>
            ))}
        </div>
    );
};

const MetricModal = ({ metric, onClose }: { metric: any, onClose: () => void }) => (
    <motion.div 
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div 
            className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl shadow-cyan-500/10"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
                    <RefreshCw size={24} className="animate-pulse" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{metric.name} Analysis</h3>
                    <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider">Chemical Verification</p>
                </div>
            </div>
            
            <div className="space-y-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center border border-white/5">
                    <span className="text-gray-400 text-sm">Industry Standard</span>
                    <span className="text-white font-bold font-mono">{metric.standard}</span>
                </div>
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 p-4 rounded-lg flex justify-between items-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <span className="text-cyan-200 text-sm">MasarZero Output</span>
                    <span className="text-cyan-400 font-bold font-mono flex items-center gap-2">
                        {metric.ourResult} <CheckCircle2 size={14} />
                    </span>
                </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {metric.detail}
            </p>

            {metric.chartData.length > 0 && (
                <div className="h-32 w-full bg-black/20 rounded-xl border border-white/5 p-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={metric.chartData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="MasarZero" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.3} />
                            <Radar name="Standard" dataKey="B" stroke="#64748b" strokeWidth={2} fill="#64748b" fillOpacity={0.1} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    </motion.div>
);

const ComparisonSection = () => (
    <div className="grid md:grid-cols-2 gap-8 mb-24">
        {/* Advanced System Card */}
        <VectorBorderCard glowing className="h-full">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-cyan-500" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">MasarZero VRU</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Advanced System</h2>
                <p className="text-gray-400 mb-8 text-sm">The pinnacle of vapor recovery technology.</p>
                <div className="space-y-6 flex-grow">
                    {[
                        { title: '250x Return on Energy', desc: 'Generating 250 times the energy it consumes.' },
                        { title: '5x Better Than Competitors', desc: 'Outperforms the nearest competitor by a factor of five.' },
                        { title: '99.9% Recovery Rate', desc: 'Capture virtually all valuable vapor, ensuring minimal waste.' }
                    ].map(feat => (
                        <div key={feat.title} className="flex items-start gap-4 group">
                            <div className="mt-1 p-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                                <CheckCircle2 className="text-cyan-400 w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{feat.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </VectorBorderCard>

        {/* Competitor Card */}
        <div className="bg-slate-900/20 border border-white/5 p-8 rounded-xl flex flex-col h-full relative overflow-hidden">
            {/* Subtle noise/texture for 'old' feel could go here */}
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-10 transition-opacity" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-slate-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Legacy Systems</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-300 mb-2">Standard Competitors</h2>
                <p className="text-gray-500 mb-8 text-sm">The conventional, outdated alternative.</p>
                <div className="space-y-6 flex-grow">
                    {[
                        { title: 'Up to 50x Return on Energy', desc: 'Significantly lower energy efficiency, impacting your bottom line.' },
                        { title: 'Standard Performance', desc: 'Limited by older technology, leaving valuable fuel vapors and potential revenue behind.' },
                        { title: '~85-95% Recovery Rate', desc: 'A noticeable percentage of vapor is lost, translating to lost income.' }
                    ].map(feat => (
                        <div key={feat.title} className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-red-500/10 rounded-full border border-red-500/20">
                                <XCircle className="text-red-400 w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-400 text-sm">{feat.title}</h3>
                                <p className="text-xs text-gray-600 mt-1">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const AnalysisLab = () => {
    const [sampleIndex, setSampleIndex] = useState(0);
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
    const [selectedMetric, setSelectedMetric] = useState<any>(null);
    
    const currentSample = samples[sampleIndex];

    const handleAnalyze = () => {
        if (status === 'analyzing') return;
        
        if (status === 'complete') {
            setSampleIndex((prev) => (prev + 1) % samples.length);
            setStatus('idle');
            setTimeout(() => setStatus('analyzing'), 100);
        } else {
            setStatus('analyzing');
        }
        
        setTimeout(() => setStatus('complete'), 2500);
    };

    return (
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Interactive Analysis Lab</h2>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                    Simulate the MasarZero verification process. Click "Analyze New Sample" to process different fuel grades from our global terminals and view detailed chemical breakdowns.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 relative min-h-[380px]">
                
                {/* Input Sample */}
                <div className="w-full lg:w-80 flex flex-col">
                    <div className="bg-slate-900/60 border border-slate-700 p-8 rounded-2xl text-center relative z-10 flex flex-col items-center justify-center h-full shadow-xl">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Globe size={12} /> INPUT SAMPLE ({currentSample.code})
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                            <GradientDroplet size={80} className="relative z-10 drop-shadow-lg" />
                        </div>
                        <motion.div
                            key={currentSample.type}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-1">{currentSample.type}</h3>
                            <p className="text-sm text-slate-400 font-mono mb-4">{currentSample.inputOctane} Octane // {currentSample.inputRvp} PSI</p>
                            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
                                Source: {currentSample.country} Terminal
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Process Arrow / Animation */}
                <div className="hidden lg:flex flex-col items-center justify-center text-cyan-500 px-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-slate-700 via-cyan-500/50 to-slate-700 -z-10" />
                    
                    <div className="w-16 h-16 rounded-full bg-[#000212] border border-cyan-500/30 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <AnimatePresence mode="wait">
                            {status === 'analyzing' ? (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <RefreshCw size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="arrow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <ChevronRight size={24} className="opacity-80" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Output Result */}
                <div className="w-full lg:w-80 flex flex-col">
                    <AnimatePresence mode="wait">
                        {status === 'complete' ? (
                            <motion.div 
                                key="result"
                                className="bg-slate-900/40 border border-green-500/30 p-6 rounded-2xl relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.05)] flex flex-col h-full backdrop-blur-sm"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2 justify-center">
                                    <ShieldCheck size={14} /> VERIFIED OUTPUT
                                </div>
                                
                                <div className="flex-grow space-y-3">
                                    {currentSample.metrics.map((m, i) => (
                                        <motion.button
                                            key={m.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => setSelectedMetric(m)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/10 hover:bg-green-500/10 hover:border-green-500/30 transition-all group text-left"
                                        >
                                            <div>
                                                <span className="text-[10px] text-green-200/70 font-bold uppercase block mb-0.5">{m.name}</span>
                                                <span className="text-sm font-bold text-white font-mono">{m.value}</span>
                                            </div>
                                            <div className="p-1.5 rounded-full bg-green-500/10 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Info size={14} />
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="mt-6 text-center border-t border-green-500/20 pt-4">
                                    <div className="inline-flex items-center gap-2 text-green-400 font-bold text-sm bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                                        <CheckCircle2 size={16} /> Quality Certified
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="placeholder"
                                className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 p-8 h-full min-h-[380px]"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Activity size={48} className="mb-4 opacity-20" />
                                <p className="text-sm font-mono uppercase tracking-wider">Awaiting Analysis</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="text-center mt-12">
                <button 
                    onClick={handleAnalyze}
                    disabled={status === 'analyzing'}
                    className="relative aurora-border font-bold py-4 px-10 rounded-full text-white hover:bg-white/5 disabled:opacity-50 transition-all flex items-center gap-3 mx-auto text-lg shadow-lg shadow-cyan-500/10 group"
                >
                    <RefreshCw className={`w-5 h-5 ${status === 'analyzing' ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    {status === 'analyzing' ? 'Processing...' : 'Analyze New Sample'}
                </button>
                <p className="text-xs text-gray-500 mt-4 font-mono">
                    {status === 'complete' ? 'Analysis Complete. Click to load next sample.' : 'Click to rotate through diverse input scenarios.'}
                </p>
            </div>

            <AnimatePresence>
                {selectedMetric && (
                    <MetricModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const DataPage: React.FC = () => {
    return (
        <section className="min-h-screen pt-32 pb-20 bg-[#000212] relative overflow-hidden">
            
            {/* Background FX */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        Quality Assurance
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Chemistry</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        Our cryogenic condensation process yields fuel that is chemically purer than the source.
                    </p>
                </motion.div>

                {/* 1. Comparison Section */}
                <ComparisonSection />

                {/* 2. Interactive Lab */}
                <AnalysisLab />

                {/* 3. Telemetry & Live Data */}
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <div className="flex items-center gap-2 mb-4 px-2 justify-center">
                            <Terminal size={16} className="text-cyan-400" />
                            <h3 className="font-mono font-bold text-white text-sm">Live Telemetry</h3>
                            <div className="ml-auto flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                                <span className="text-[10px] font-mono text-gray-500">ONLINE</span>
                            </div>
                        </div>
                        <LiveLog />
                        
                        <div className="mt-6 space-y-3">
                            <div className="bg-slate-900/40 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                                <span className="text-sm text-gray-400">System Pressure</span>
                                <span className="text-white font-mono font-bold">14.2 PSI</span>
                            </div>
                            <div className="bg-slate-900/40 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                                <span className="text-sm text-gray-400">Flow Rate</span>
                                <span className="text-cyan-400 font-mono font-bold">340 L/min</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DataPage;
