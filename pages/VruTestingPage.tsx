
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { FlaskConical, ClipboardCheck, ShieldAlert, Activity, CheckCircle2, Microscope, Zap, ArrowRight, Server, Ruler, Database, Cpu, ScanLine, Radio, Layers, Droplets, MousePointerClick, Terminal, Crosshair, BoxSelect, Map as MapIcon, RotateCcw, Play, Timer, Umbrella, Gauge, Wifi, AudioWaveform, Signal, Volume2, Mic, Power, Cable, X, Waves } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, AreaChart, Area, ReferenceLine } from 'recharts';
import VectorBorderCard from '../components/VectorBorderCard';

// --- Animation Components ---

const GoldAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 160" className="w-full h-full">
            <defs>
                <marker id="arrowhead-gold" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#facc15" />
                </marker>
                <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
            </defs>

            {/* Nodes */}
            <g transform="translate(20, 60)">
                <rect width="40" height="40" fill="#334155" rx="4" />
                <text x="20" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Site</text>
            </g>

            <g transform="translate(140, 50)">
                <rect width="80" height="30" fill="none" stroke="#facc15" strokeWidth="1" rx="4" />
                <text x="40" y="20" textAnchor="middle" fill="#facc15" fontSize="12" fontWeight="bold">TVA2020</text>
            </g>

            <g transform="translate(280, 30)">
                <rect width="100" height="70" fill="url(#screenGradient)" stroke="#334155" strokeWidth="2" rx="4" />
                {/* Screen Header */}
                <rect x="0" y="0" width="100" height="15" fill="#334155" rx="4" />
                <text x="50" y="10" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">LIVE ANALYZER</text>
                
                {/* Moving Graph Line */}
                <svg x="5" y="20" width="90" height="45" viewBox="0 0 180 50" preserveAspectRatio="none" style={{ overflow: 'hidden' }}>
                    <motion.path 
                        d="M 0 25 L 10 20 L 20 30 L 30 15 L 40 35 L 50 25 L 60 20 L 70 30 L 80 10 L 90 25   M 90 25 L 100 20 L 110 30 L 120 15 L 130 35 L 140 25 L 150 20 L 160 30 L 170 10 L 180 25"
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        initial={{ x: 0 }}
                        animate={{ x: -90 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
                
                {/* Data Text */}
                <text x="50" y="60" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="monospace">0.045 ppm</text>
            </g>

            {/* Flow Lines */}
            <line x1="60" y1="80" x2="130" y2="65" stroke="#facc15" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead-gold)" />
            <line x1="220" y1="65" x2="270" y2="65" stroke="#facc15" strokeWidth="2" markerEnd="url(#arrowhead-gold)" />

            {/* Particles */}
            <motion.circle r="3" fill="#facc15">
                <animateMotion path="M 60 80 L 130 65" dur="1.5s" repeatCount="indefinite" />
            </motion.circle>
             <motion.circle r="3" fill="#facc15">
                <animateMotion path="M 220 65 L 270 65" dur="1s" repeatCount="indefinite" />
            </motion.circle>
        </svg>
    </div>
);

const SilverAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 160" className="w-full h-full">
             <defs>
                <marker id="arrowhead-silver" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
            </defs>

            {/* Nodes */}
            <g transform="translate(20, 60)">
                <rect width="40" height="40" fill="#334155" rx="4" />
                <text x="20" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Site</text>
            </g>

            {/* Top Path (TVA - Short Term) */}
            <g transform="translate(120, 20)">
                <rect width="70" height="25" fill="none" stroke="#64748b" strokeWidth="1" rx="4" strokeDasharray="2 2" />
                <text x="35" y="17" textAnchor="middle" fill="#64748b" fontSize="10">TVA2020</text>
            </g>

            {/* Bottom Path (Sensors - Long Term) */}
            <g transform="translate(120, 90)">
                <rect width="60" height="25" fill="#1e293b" stroke="#64748b" strokeWidth="1" rx="4" />
                <text x="30" y="17" textAnchor="middle" fill="#94a3b8" fontSize="10">Sensor</text>
            </g>

            {/* Proxy Model */}
            <g transform="translate(230, 50)">
                <rect width="90" height="30" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="4" />
                <rect x="0" y="-5" width="90" height="5" fill="#3b82f6" rx="2" /> 
                <text x="45" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Proxy Model</text>
            </g>

            {/* Output */}
            <g transform="translate(340, 30)">
                 <rect width="60" height="60" fill="#0f172a" stroke="#334155" rx="4" />
                 <rect x="0" y="0" width="60" height="12" fill="#334155" rx="2" />
                 <text x="30" y="9" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="bold">ESTIMATED</text>
                 
                 {/* Stepped Graph */}
                 <motion.path 
                    d="M 5 45 L 15 45 L 15 35 L 25 35 L 25 40 L 35 40 L 35 25 L 45 25 L 45 30 L 55 30" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="1.5" 
                    strokeDasharray="2 2"
                    initial={{ strokeDashoffset: 10 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <text x="30" y="55" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace">~98.2%</text>
            </g>

            {/* Connections */}
            <path d="M 60 80 Q 90 80 120 32" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arrowhead-silver)" />
            <path d="M 190 32 Q 210 32 230 55" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 60 80 Q 90 80 120 102" fill="none" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowhead-silver)" />
            <path d="M 180 102 Q 205 102 230 75" fill="none" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowhead-silver)" />
            <line x1="320" y1="65" x2="340" y2="60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />

            {/* Particles */}
            <motion.circle r="2" fill="#94a3b8">
                <animateMotion path="M 60 80 Q 90 80 120 102" dur="2s" repeatCount="indefinite" />
            </motion.circle>
             <motion.circle r="2" fill="#94a3b8">
                <animateMotion path="M 180 102 Q 205 102 230 75" dur="2s" begin="1s" repeatCount="indefinite" />
            </motion.circle>
        </svg>
    </div>
);

// --- Generic Visualization Components for Hardware ---

const Oscilloscope = () => {
    const [mode, setMode] = useState<'idle' | 'base' | 'peak'>('base');
    const modeData = {
        idle: { kw: 2.1, amp: 10, color: '#94a3b8' },
        base: { kw: 14.5, amp: 30, color: '#22d3ee' },
        peak: { kw: 22.8, amp: 55, color: '#facc15' }
    };

    const SineWave = ({ phase, color, speed }: { phase: number, color: string, speed: number }) => {
        const amplitude = mode === 'idle' ? 10 : mode === 'base' ? 30 : 45;
        const wavelength = 200;
        const points = 100;
        const totalWidth = 600;
        const d = `M ${Array.from({ length: points + 1 }).map((_, i) => {
            const x = (i / points) * totalWidth;
            const y = 100 + Math.sin(((x / wavelength) * Math.PI * 2) + phase) * amplitude;
            return `${x} ${y}`;
        }).join(' L ')}`;
        return (
            <motion.path d={d} fill="none" stroke={color} strokeWidth="2" initial={{ x: 0 }} animate={{ x: -wavelength }} transition={{ repeat: Infinity, ease: "linear" }} />
        );
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between mb-4">
                <h3 className="text-white font-bold">3-Phase Load Analysis</h3>
                <div className="flex bg-black/40 rounded border border-white/10 p-1">
                    {(['idle', 'base', 'peak'] as const).map(m => (
                        <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 text-xs font-bold rounded uppercase ${mode === m ? 'bg-white text-black' : 'text-gray-500'}`}>{m}</button>
                    ))}
                </div>
            </div>
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <SineWave phase={0} color="#ef4444" speed={2} />
                    <SineWave phase={2 * Math.PI / 3} color="#eab308" speed={2} />
                    <SineWave phase={4 * Math.PI / 3} color="#3b82f6" speed={2} />
                </svg>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 p-2 rounded">
                    <p className="text-[10px] text-gray-500">Power</p>
                    <p className="text-lg font-mono font-bold text-white">{modeData[mode].kw} kW</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <p className="text-[10px] text-gray-500">Current</p>
                    <p className="text-lg font-mono font-bold text-white">{modeData[mode].amp} A</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <p className="text-[10px] text-gray-500">THD</p>
                    <p className="text-lg font-mono font-bold text-green-400">&lt; 3%</p>
                </div>
            </div>
        </div>
    );
};

const LiveGraph = ({ title, unit, color, min, max, noise = 5 }: any) => {
    const [data, setData] = useState(Array.from({ length: 20 }, () => min + (max-min)/2));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const last = prev[prev.length - 1];
                const next = Math.min(max, Math.max(min, last + (Math.random() - 0.5) * noise));
                return [...prev.slice(1), next];
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - ((val - min) / (max - min)) * 100}`).join(' ');

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">{title}</h3>
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 relative p-4 flex items-end overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.5}/>
                            <stop offset="100%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <polyline points={`0,100 ${points} 100,100`} fill={`url(#grad-${title})`} />
                    <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="absolute top-2 right-4 font-mono text-2xl font-bold" style={{ color }}>
                    {data[data.length - 1].toFixed(1)} <span className="text-sm text-gray-500">{unit}</span>
                </div>
            </div>
        </div>
    );
};

const RadarAnalysis = ({ title }: { title: string }) => {
    const data = [
        { subject: 'Propane (C3)', A: 15, fullMark: 100 },
        { subject: 'Butane (C4)', A: 25, fullMark: 100 },
        { subject: 'Pentane (C5)', A: 30, fullMark: 100 },
        { subject: 'Hexane (C6+)', A: 20, fullMark: 100 },
        { subject: 'Benzene', A: 5, fullMark: 100 },
        { subject: 'Toluene', A: 5, fullMark: 100 },
    ];

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">{title}</h3>
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 relative p-2">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 40]} tick={false} axisLine={false} />
                        <Radar name="Composition" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.3} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: '#fff' }}
                            itemStyle={{ color: '#22d3ee' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-cyan-400 font-mono uppercase">Analysis Active</span>
                </div>
            </div>
        </div>
    );
};

const LogicGrid = () => {
    const [active, setActive] = useState<number[]>([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newActive = Array.from({ length: 16 }, (_, i) => Math.random() > 0.5 ? i : -1).filter(i => i !== -1);
            setActive(newActive);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">PLC I/O State</h3>
            <div className="flex-grow grid grid-cols-4 gap-2 bg-black/40 rounded-xl border border-white/10 p-4">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`rounded border transition-all duration-300 flex items-center justify-center ${active.includes(i) ? 'bg-green-500/20 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-white/5 border-white/10'}`}>
                        <div className={`w-2 h-2 rounded-full ${active.includes(i) ? 'bg-green-400' : 'bg-gray-700'}`} />
                    </div>
                ))}
            </div>
            <div className="mt-2 flex gap-4 text-[10px] font-mono text-gray-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400" /> HIGH</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-700" /> LOW</span>
            </div>
        </div>
    );
};

const ThermalView = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [temp, setTemp] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursor({ x, y });

        // Simulate temperature hot spots
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        const maxDist = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));
        const normalizedDist = 1 - Math.min(dist / maxDist, 1);
        const simulatedTemp = 25 + (normalizedDist * 40) + (Math.random() * 2); // Base 25C, max +40C
        setTemp(simulatedTemp);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">Thermal Core Analysis</h3>
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="flex-grow bg-black rounded-xl border border-white/10 relative overflow-hidden cursor-crosshair group"
            >
                {/* Heat Map Gradient Background */}
                <div className="absolute inset-0 blur-3xl opacity-80 mix-blend-screen">
                    <motion.div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full" animate={{ x: [0, 50, 0], y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} />
                    <motion.div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full" animate={{ x: [0, -30, 0], y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity }} />
                    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                </div>
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Interactive Crosshair */}
                <div 
                    className="absolute pointer-events-none flex items-center justify-center"
                    style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
                >
                    <Crosshair size={24} className="text-white opacity-80" />
                    <div className="absolute top-4 left-4 bg-black/70 text-white font-mono text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap">
                        {temp.toFixed(1)}°C
                    </div>
                </div>

                {/* HUD Info */}
                <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
                    <div>EMISSIVITY: 0.95</div>
                    <div>REFLECTED: 22°C</div>
                </div>
            </div>
        </div>
    );
};

const SHEDAnalysis = () => {
    const [hasShade, setHasShade] = useState(false);
    const [time, setTime] = useState(0); // 0 to 15 (simulated hours, e.g., 6AM to 9PM)
    
    // Simulation values
    const baseTemp = 22;
    const peakTempExposed = 65;
    const peakTempShaded = 45;
    
    // Calculate current temp based on time (parabolic curve for sun)
    const normalizedTime = time / 15; // 0 to 1
    const sunIntensity = Math.sin(normalizedTime * Math.PI); // 0 -> 1 -> 0
    
    const currentTempExposed = baseTemp + (sunIntensity * (peakTempExposed - baseTemp));
    const currentTempShaded = baseTemp + (sunIntensity * (peakTempShaded - baseTemp));
    
    const [displayTemp, setDisplayTemp] = useState(baseTemp);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => (t + 0.05) % 15);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const target = hasShade ? currentTempShaded : currentTempExposed;
        setDisplayTemp(prev => prev + (target - prev) * 0.1);
    }, [time, hasShade, currentTempExposed, currentTempShaded]);

    const getTempColor = (t: number) => {
        if (t < 30) return '#22c55e'; // Green
        if (t < 45) return '#eab308'; // Yellow
        if (t < 55) return '#f97316'; // Orange
        return '#ef4444'; // Red
    };

    const sunX = (time / 15) * 100;
    const sunY = 20 + (1 - Math.sin((time/15) * Math.PI)) * 60; // Arc

    const chartData = Array.from({length: 16}, (_, i) => {
        const t = i / 15;
        const si = Math.sin(t * Math.PI);
        return {
            hour: i,
            Exposed: Math.round(baseTemp + (si * (peakTempExposed - baseTemp))),
            Shaded: Math.round(baseTemp + (si * (peakTempShaded - baseTemp))),
        }
    });

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0f172a]">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Umbrella className={hasShade ? "text-green-400" : "text-gray-500"} size={18} />
                        SHED Thermal Analysis
                    </h3>
                    <p className="text-xs text-gray-400">Machine Temp vs Solar Load</p>
                </div>
                <button 
                    onClick={() => setHasShade(!hasShade)}
                    className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all border ${hasShade ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                    {hasShade ? 'CANOPY ACTIVE' : 'NO SHADE'}
                </button>
            </div>

            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 relative bg-gradient-to-b from-sky-900/20 to-[#0B1021] border-r border-white/10 overflow-hidden h-64 md:h-auto">
                    <motion.div 
                        className="absolute w-12 h-12 rounded-full bg-yellow-400 blur-md shadow-[0_0_40px_rgba(250,204,21,0.6)]"
                        style={{ left: `${sunX}%`, top: `${sunY}%` }}
                        animate={{ left: `${sunX}%`, top: `${sunY}%` }}
                        transition={{ type: "tween", ease: "linear", duration: 0 }}
                    />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-40 transition-colors duration-500 flex items-center justify-center flex-col"
                         style={{ backgroundColor: '#1e293b', border: `2px solid ${getTempColor(displayTemp)}` }}>
                        <div className="absolute inset-0 transition-opacity duration-300" 
                             style={{ backgroundColor: getTempColor(displayTemp), opacity: (displayTemp - 20) / 60 }}></div>
                        
                        <span className="relative z-10 font-mono text-white font-bold text-lg drop-shadow-md">{displayTemp.toFixed(1)}°C</span>
                        <span className="relative z-10 text-[8px] text-white/70">INTERNAL</span>
                    </div>
                    <AnimatePresence>
                        {hasShade && (
                            <motion.div 
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                className="absolute bottom-52 left-1/2 -translate-x-1/2 w-48"
                            >
                                <div className="h-4 w-full bg-green-600 rounded-t-lg shadow-xl border-b-4 border-green-800"></div>
                                <div className="flex justify-between px-2">
                                    <div className="w-2 h-40 bg-gray-600"></div>
                                    <div className="w-2 h-40 bg-gray-600"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="md:w-1/2 p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                    <div className="h-48 w-full bg-black/20 rounded-lg p-2 border border-white/5 relative shrink-0">
                        <p className="text-[10px] text-gray-500 uppercase font-bold absolute top-2 left-3 z-10">Thermal Profile (1 Day)</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradExposed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradShaded" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="hour" type="number" domain={[0, 15]} hide />
                                <YAxis domain={[20, 70]} hide />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '10px' }} />
                                <Area type="monotone" dataKey="Exposed" stroke="#ef4444" strokeWidth={2} fill="url(#gradExposed)" isAnimationActive={false} />
                                <Area type="monotone" dataKey="Shaded" stroke="#22c55e" strokeWidth={2} fill="url(#gradShaded)" isAnimationActive={false} />
                                <ReferenceLine x={time} stroke="white" strokeDasharray="2 2" ifOverflow="extendDomain" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 shrink-0">
                        <div className="bg-white/5 p-3 rounded border border-white/5">
                            <p className="text-[10px] text-gray-400 mb-1">Peak Temp Delta</p>
                            <p className="text-xl font-bold text-cyan-400">-20°C</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded border border-white/5">
                            <p className="text-[10px] text-gray-400 mb-1">Cooling Load</p>
                            <p className="text-xl font-bold text-green-400">{hasShade ? '-18%' : '100%'}</p>
                        </div>
                    </div>

                    {/* Cable Integrity Test - Added Here */}
                    <div className="bg-[#0f172a] p-3 rounded-lg border border-white/10 flex items-center justify-between shrink-0">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Cable size={14} className="text-purple-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Sensor Harness Integrity</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 rounded border border-green-500/30">T1</span>
                                <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 rounded border border-green-500/30">T2</span>
                                <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 rounded border border-green-500/30">H1</span>
                                <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 rounded border border-green-500/30">DATA</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-white font-mono">99.8%</div>
                            <div className="text-[9px] text-gray-500">SIGNAL HEALTH</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WiredConnectionTest = () => {
    // Simulating throughput data for a graph
    const [throughputData, setThroughputData] = useState(Array.from({length: 20}, () => ({ value: 0 })));
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setThroughputData(prev => {
                const newVal = 850 + Math.random() * 100; // Fluctuating around 900 Mbps
                const next = [...prev.slice(1), { value: newVal }];
                return next;
            });
        }, 200); // Faster update for throughput look
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showTerminal) {
            setTerminalLogs([]);
            let count = 0;
            const interval = setInterval(() => {
                const latency = (Math.random() * 2 + 1).toFixed(2); // Low latency
                setTerminalLogs(prev => [...prev, `64 bytes from 8.8.8.8: icmp_seq=${count} ttl=115 time=${latency}ms`]);
                count++;
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showTerminal]);

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden relative">
            
            {/* Terminal Overlay */}
            <AnimatePresence>
                {showTerminal && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col font-mono text-sm"
                    >
                        <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
                            <span className="text-green-400 font-bold flex items-center gap-2"><Terminal size={14} /> ROOT@VRU-CONTROLLER:~#</span>
                            <button onClick={() => setShowTerminal(false)}><X size={20} className="text-white/50 hover:text-white" /></button>
                        </div>
                        <div className="flex-grow overflow-y-auto space-y-1 text-green-300/80">
                            <div>$ ping 8.8.8.8 -c 20</div>
                            <div className="mb-2">PING 8.8.8.8 (8.8.8.8): 56 data bytes</div>
                            {terminalLogs.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                            <div className="w-2 h-4 bg-green-400 animate-pulse inline-block ml-1"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Cable size={18} className="text-cyan-400" />
                        Wired Connection Diagnostic
                    </h3>
                    <p className="text-xs text-gray-400">Ethernet Link & Latency Test</p>
                </div>
                <button 
                    onClick={() => setShowTerminal(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-white/10 rounded text-xs font-mono text-cyan-300 hover:bg-slate-700 transition-colors"
                >
                    <Terminal size={12} /> PING TEST
                </button>
            </div>
            
            <div className="flex-grow flex flex-col md:flex-row p-6 gap-6">
                
                {/* Throughput Monitor */}
                <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Network Throughput (Mbps)</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[9px] font-mono text-green-400">CONNECTED</span>
                        </div>
                    </div>
                    
                    <div className="flex-grow relative min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={throughputData}>
                                <defs>
                                    <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <YAxis hide domain={[0, 1000]} />
                                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="url(#throughputGradient)" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Metrics Panel */}
                <div className="w-full md:w-64 flex flex-col gap-3">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                        <p className="text-xs text-gray-400 mb-1 font-bold">Link Speed</p>
                        <div className="text-3xl font-mono font-bold text-green-400 mb-2">1.0 <span className="text-sm text-gray-500">Gbps</span></div>
                        <div className="flex gap-1">
                            <span className="px-2 py-0.5 bg-slate-700 rounded text-[9px] font-mono text-white">FULL DUPLEX</span>
                        </div>
                    </div>

                    {/* Interface Details */}
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase font-bold mb-2 flex items-center gap-2">
                            <Server size={12} /> Interface eth0
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                            <span>IP Address</span>
                            <span className="font-mono text-white">192.168.10.45</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                            <span>Gateway</span>
                            <span className="font-mono text-white">192.168.10.1</span>
                        </div>
                        {/* PoE Status */}
                        <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                             <span>PoE Status</span>
                             <span className="font-mono text-yellow-400 flex items-center gap-1"><Zap size={10} /> 48V (Active)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <span>Packets Dropped</span>
                            <span className="font-mono text-green-400">0 (0%)</span>
                        </div>
                    </div>

                    <div className="flex-grow bg-black/40 rounded-xl border border-white/10 p-3 flex flex-col justify-between">
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Port Activity</p>
                        <div className="flex items-center justify-center h-12 gap-4">
                             {/* RJ45 Port Visual */}
                             <div className="w-12 h-10 bg-slate-700 rounded border-2 border-slate-600 flex justify-between px-2 pt-1">
                                 <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                                 <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AcousticAnalysis = () => {
    const [distance, setDistance] = useState(5); // Meters
    const [dampening, setDampening] = useState(false);
    
    // Base Source dB (1m)
    const sourceDbBase = 95;
    const dampenedDbBase = 78; // With foam/enclosure
    
    const currentSourceDb = dampening ? dampenedDbBase : sourceDbBase;

    // Inverse square law: roughly -6dB for every doubling of distance
    // Formula: L2 = L1 - 20 * log10(d2/d1)
    const calculateDb = (d: number) => {
        if (d < 1) return currentSourceDb;
        return Math.max(40, currentSourceDb - 20 * Math.log10(d));
    };

    const currentDb = calculateDb(distance);
    
    // Standard: < 65dB at 10m
    const limitDb = 65;
    const isPassing = currentDb < limitDb;
    
    // For the compliance badge, we specifically check at >= 10m
    const isCompliantAtDistance = distance >= 10 && isPassing;
    
    // Animation for waves
    const waves = Array.from({length: 3});

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <AudioWaveform size={18} className="text-purple-400" />
                        Acoustic Monitoring
                    </h3>
                    <p className="text-xs text-gray-400">ISO 1996-2 Compliance Check</p>
                </div>
                <div className={`px-3 py-1 rounded border text-[10px] font-bold uppercase ${isCompliantAtDistance ? 'bg-green-500/20 border-green-500 text-green-400' : distance >= 10 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-gray-700/30 border-gray-600 text-gray-400'}`}>
                    {distance >= 10 ? (isPassing ? 'PASS' : 'FAIL') : 'MEASURING...'}
                </div>
            </div>

            {/* Simulation Area */}
            <div className="flex-grow relative bg-black/20 overflow-hidden flex items-center px-12">
                {/* Track */}
                <div className="absolute bottom-12 left-12 right-12 h-1 bg-gray-700 rounded-full"></div>
                {/* Distance Markers */}
                <div className="absolute bottom-6 left-12 text-[10px] text-gray-500 font-mono">0m</div>
                <div className="absolute bottom-6 left-1/2 text-[10px] text-gray-500 font-mono -translate-x-1/2">10m</div>
                <div className="absolute bottom-6 right-12 text-[10px] text-gray-500 font-mono">20m</div>

                {/* Source (VRU) */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                    <div className={`w-16 h-20 rounded-lg border flex items-center justify-center shadow-xl relative transition-colors duration-500 ${dampening ? 'bg-purple-900/50 border-purple-500' : 'bg-slate-700 border-slate-500'}`}>
                        <Volume2 className="text-white animate-pulse" size={24} />
                        {/* Sound Waves */}
                        {waves.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute rounded-full border ${dampening ? 'border-purple-300/30' : 'border-red-500/50'}`}
                                style={{ width: '100%', height: '100%' }}
                                animate={{ 
                                    scale: dampening ? [1, 2] : [1, 4], 
                                    opacity: [0.8, 0] 
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.6,
                                    ease: "linear" 
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-2 font-bold">SOURCE</span>
                </div>

                {/* Microphone (Draggable) */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-100 ease-out"
                    style={{ left: `${(distance / 20) * 80 + 5}%` }}
                >
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] border-2 border-white">
                        <Mic size={18} className="text-black" />
                    </div>
                    <div className="bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30 mt-3 backdrop-blur-sm">
                        {distance}m
                    </div>
                </div>
            </div>

            {/* Controls & Data */}
            <div className="p-6 bg-[#0f172a] border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Slider Control */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-gray-300 uppercase">Measurement Distance</label>
                            <span className="text-xs font-mono text-cyan-400">{distance} m</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" 
                            max="20" 
                            step="1"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-[9px] text-gray-500 mt-1 font-mono">
                            <span>1m (Source)</span>
                            <span>10m (Standard)</span>
                            <span>20m</span>
                        </div>
                    </div>
                    
                    {/* Dampening Toggle */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setDampening(!dampening)}
                            className={`px-3 py-1.5 rounded border text-xs font-bold uppercase transition-colors ${dampening ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                        >
                            {dampening ? 'Dampening ON' : 'Dampening OFF'}
                        </button>
                        <span className="text-[10px] text-gray-500">Simulates acoustic foam installation.</span>
                    </div>
                </div>

                {/* Readout */}
                <div className="flex items-center gap-6 justify-end">
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Measured Level</p>
                        <p className={`text-3xl font-mono font-bold ${currentDb > limitDb ? 'text-red-400' : 'text-green-400'}`}>
                            {currentDb.toFixed(1)} <span className="text-sm text-gray-500 font-normal">dB</span>
                        </p>
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <div className="text-right opacity-60">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Limit @ 10m</p>
                        <p className="text-xl font-mono font-bold text-gray-300">
                            &lt; {limitDb} <span className="text-xs text-gray-500 font-normal">dB</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

const IntegrityScan = () => (
    <div className="h-full flex flex-col">
        <h3 className="text-white font-bold mb-4">System Integrity</h3>
        <div className="flex-grow bg-black/40 rounded-xl border border-white/10 p-4 flex items-center justify-center">
            <div className="relative">
                <ShieldAlert size={80} className="text-gray-700" />
                <motion.div 
                    className="absolute inset-0 text-green-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ShieldAlert size={80} />
                </motion.div>
            </div>
            <div className="ml-8 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-300">Pressure: OK</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-300">Vacuum: OK</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-300">Seal: PASS</span>
                </div>
            </div>
        </div>
    </div>
);

const GoldSilverModule = () => {
    const [standard, setStandard] = useState<'silver' | 'gold'>('gold');

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white">Methodology Selector</h3>
                    <p className="text-xs text-gray-400">Regulatory validation protocol comparison.</p>
                </div>
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                    <button 
                        onClick={() => setStandard('silver')}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${standard === 'silver' ? 'bg-slate-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${standard === 'silver' ? 'bg-white' : 'bg-gray-600'}`} />
                        Silver
                    </button>
                    <button 
                        onClick={() => setStandard('gold')}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${standard === 'gold' ? 'bg-yellow-500/20 text-yellow-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${standard === 'gold' ? 'bg-yellow-400' : 'bg-gray-600'}`} />
                        Gold
                    </button>
                </div>
            </div>

            <div className="flex-grow bg-black/30 rounded-xl border border-white/10 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 pointer-events-none"></div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={standard}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {standard === 'gold' ? <GoldAnimation /> : <SilverAnimation />}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded p-3 border border-white/5">
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Calculation Method</h5>
                    <p className="text-xs text-gray-300 font-mono leading-tight">
                        {standard === 'gold'
                            ? "Mass = [VOC]_realtime × Flow_realtime"
                            : "Mass = Model(P, F) × Correlation_Factor"
                        }
                    </p>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/5">
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Accuracy</h5>
                    <div className="flex items-center gap-2">
                        <div className={`w-full h-1.5 rounded-full bg-gray-700 overflow-hidden`}>
                            <div className={`h-full rounded-full ${standard === 'gold' ? 'bg-green-400 w-[99%]' : 'bg-blue-400 w-[85%]'}`} />
                        </div>
                        <span className="text-xs font-bold text-white">{standard === 'gold' ? '99.9%' : '~85%'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpectrumAnalyzer = ({ type }: { type: string }) => {
    const data = [
        { name: 'Octane (RON)', value: 95, target: 95 },
        { name: 'Vapor Pressure', value: 8.5, target: 9.0 },
        { name: 'Benzene', value: 0.8, target: 1.0 },
        { name: 'Sulfur', value: 8, target: 10 },
        { name: 'Olefins', value: 12, target: 18 },
    ];

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">Fuel Quality Spectrum</h3>
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }}
                        />
                        <Bar dataKey="value" barSize={15} radius={[0, 4, 4, 0]}>
                             {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value <= entry.target ? '#22c55e' : '#ef4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-2 text-[10px] uppercase font-bold text-gray-500">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Compliant</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Exceeds Limit</span>
                </div>
            </div>
        </div>
    );
};

const ReformateEvaporationSim = () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const particles = useMemo(() => {
        const items = [];
        // C4/C5 (Blue - Fast)
        for(let i=0; i<15; i++) items.push({ type: 'c4', speed: 2, color: '#3b82f6', startY: Math.random() * 20 });
        // C6-C9 (Green - Medium)
        for(let i=0; i<15; i++) items.push({ type: 'c6', speed: 1, color: '#22c55e', startY: Math.random() * 40 + 20 });
        // Reformates (Red - Slow/Heavy)
        for(let i=0; i<10; i++) items.push({ type: 'ref', speed: 0.2, color: '#ef4444', startY: Math.random() * 30 + 60 });
        return items;
    }, []);

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-2">Fractional Evaporation Analysis</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                <strong>Note:</strong> Octane boosters (Reformates) have low volatility and remain in liquid phase, altering the recovered fuel composition compared to source vapor. Lighter hydrocarbons (C4/C5) evaporate first.
            </p>
            
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 relative overflow-hidden p-4">
                {/* Tank Container */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 border-x-2 border-b-2 border-white/20 rounded-b-xl">
                    <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-yellow-900/20 to-transparent opacity-30"></div>
                    
                    {particles.map((p, i) => {
                        let yPos = p.startY;
                        let opacity = 1;
                        
                        if (p.type === 'c4') {
                            const move = progress * 3;
                            yPos = p.startY - move;
                            if (yPos < -100) opacity = 0;
                        } else if (p.type === 'c6') {
                            if (progress > 20) {
                                const move = (progress - 20) * 1.5;
                                yPos = p.startY - move;
                                if (yPos < -100) opacity = 0;
                            }
                        } else {
                            yPos = p.startY + Math.sin(progress * 0.1 + i) * 2;
                        }

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{ 
                                    backgroundColor: p.color,
                                    left: `${(i % 5) * 20 + 10}%`,
                                    bottom: `${Math.max(0, 100 - yPos)}%`, 
                                    opacity
                                }}
                            />
                        )
                    })}
                </div>
                
                {/* Vapor Line */}
                <div className="absolute top-10 left-0 right-0 border-t border-dashed border-white/20 text-[10px] text-gray-500 text-center">Vapor Phase Boundary</div>
            </div>

            <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold uppercase">
                <span className="text-blue-400 flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-full"/> C4-C5 (Light)</span>
                <span className="text-green-400 flex items-center gap-1"><div className="w-2 h-2 bg-green-400 rounded-full"/> C6-C9 (Med)</span>
                <span className="text-red-400 flex items-center gap-1"><div className="w-2 h-2 bg-red-400 rounded-full"/> Reformates (Heavy)</span>
            </div>
        </div>
    );
}

const OlfactoryTest = () => {
    const [mode, setMode] = useState<'before' | 'after'>('before');
    const [activePoint, setActivePoint] = useState<number | null>(null);
    
    // Mock Data for Before/After
    const points = [
        { id: 1, x: 20, y: 20, label: 'Perimeter NW', before: { intensity: 3.5, tone: -2.8, desc: 'Strong Gasoline' }, after: { intensity: 0.2, tone: -0.1, desc: 'Neutral' } },
        { id: 2, x: 80, y: 20, label: 'Perimeter NE', before: { intensity: 2.8, tone: -2.0, desc: 'Moderate Fuel' }, after: { intensity: 0.1, tone: 0, desc: 'Undetectable' } },
        { id: 3, x: 50, y: 50, label: 'Vent Risers', before: { intensity: 4.8, tone: -3.5, desc: 'Very Strong/Pungent' }, after: { intensity: 0.8, tone: -0.5, desc: 'Very Faint' } },
        { id: 4, x: 30, y: 70, label: 'Dispenser 1', before: { intensity: 3.0, tone: -2.2, desc: 'Noticeable Fuel' }, after: { intensity: 0.5, tone: -0.3, desc: 'Barely Perceptible' } },
        { id: 5, x: 70, y: 70, label: 'Dispenser 4', before: { intensity: 3.2, tone: -2.4, desc: 'Noticeable Fuel' }, after: { intensity: 0.4, tone: -0.2, desc: 'Barely Perceptible' } },
    ];

    // Bar Chart Data generator
    const chartData = points.map(p => ({
        name: `P${p.id}`,
        Intensity: mode === 'before' ? p.before.intensity : p.after.intensity,
        Reduction: mode === 'after' ? (p.before.intensity - p.after.intensity) : 0
    }));

    const activeData = activePoint ? points.find(p => p.id === activePoint)![mode] : null;
    const activeLabel = activePoint ? points.find(p => p.id === activePoint)!.label : null;

    const getIntensityColor = (intensity: number) => {
        if (intensity > 3.5) return 'rgba(239, 68, 68, 0.9)'; // Red
        if (intensity > 2.0) return 'rgba(234, 179, 8, 0.9)'; // Yellow
        if (intensity > 0.5) return 'rgba(59, 130, 246, 0.9)'; // Blue
        return 'rgba(34, 197, 94, 0.9)'; // Green
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2"><MapIcon size={18} className="text-cyan-400" /> Olfactory Map</h3>
                    <p className="text-xs text-gray-400">Field Odor Intensity Verification</p>
                </div>
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                    <button 
                        onClick={() => setMode('before')}
                        className={`px-4 py-2 text-xs font-bold rounded-md uppercase transition-all ${mode === 'before' ? 'bg-red-500 text-white shadow-lg shadow-red-900/20' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Before VRU
                    </button>
                    <button 
                        onClick={() => setMode('after')}
                        className={`px-4 py-2 text-xs font-bold rounded-md uppercase transition-all ${mode === 'after' ? 'bg-green-500 text-white shadow-lg shadow-green-900/20' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        After VRU
                    </button>
                </div>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Left: Station Map */}
                <div className="md:col-span-7 bg-[#0f172a] rounded-xl border border-white/10 relative overflow-hidden p-4 flex items-center justify-center group">
                    <div className="absolute top-3 left-3 text-[10px] font-bold text-gray-500 z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">SITE ODOR FOOTPRINT</div>
                    
                    {/* Heatmap Overlay based on mode */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-30 ${mode === 'before' ? 'bg-red-500/20 mix-blend-overlay' : 'bg-green-500/10 mix-blend-overlay'}`} />

                    {/* Map Container */}
                    <div className="relative w-full max-w-sm aspect-square bg-[#1e293b] rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
                        {/* Structures */}
                        <div className="absolute top-[40%] left-[20%] w-[15%] h-[30%] bg-slate-700/50 rounded border border-slate-600" title="Dispenser Island"></div>
                        <div className="absolute top-[40%] right-[20%] w-[15%] h-[30%] bg-slate-700/50 rounded border border-slate-600" title="Dispenser Island"></div>
                        <div className="absolute top-[15%] left-[40%] w-[20%] h-[15%] bg-slate-800 rounded flex items-center justify-center border border-slate-600">
                            <span className="text-[8px] text-gray-500">Office</span>
                        </div>
                        
                        {/* Zones Visualization */}
                        {points.map(p => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full blur-xl opacity-40 pointer-events-none"
                                style={{ 
                                    left: `${p.x}%`, 
                                    top: `${p.y}%`, 
                                    width: '20%',
                                    height: '20%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: getIntensityColor(p[mode].intensity) 
                                }}
                                animate={{ backgroundColor: getIntensityColor(p[mode].intensity) }}
                                transition={{ duration: 0.8 }}
                            />
                        ))}

                        {/* Interactive Points */}
                        {points.map(p => (
                            <motion.button
                                key={p.id}
                                className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 flex items-center justify-center cursor-pointer z-20 shadow-lg transition-all duration-300 ${activePoint === p.id ? 'scale-125 border-white ring-2 ring-white/20' : 'border-black/20 hover:scale-110'}`}
                                style={{ 
                                    left: `${p.x}%`, 
                                    top: `${p.y}%`, 
                                    backgroundColor: getIntensityColor(p[mode].intensity) 
                                }}
                                onClick={() => setActivePoint(p.id)}
                                animate={{ backgroundColor: getIntensityColor(p[mode].intensity) }}
                            >
                                <span className="text-[10px] font-bold text-white drop-shadow-md">{p.id}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Right: Data Panel & Charts */}
                <div className="md:col-span-5 flex flex-col gap-3">
                    
                    {/* Selected Point Data */}
                    <div className="bg-black/20 rounded-xl border border-white/10 p-4 flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xs font-bold text-gray-300 uppercase flex items-center gap-2"><Crosshair size={14}/> Point Analysis</h4>
                            {activePoint && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-900/30 text-cyan-400 border border-cyan-500/20">{activeLabel}</span>}
                        </div>
                        
                        {activePoint && activeData ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={activePoint}
                                className="space-y-3"
                            >
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="text-xs text-gray-400">Intensity (0-5 scale)</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-16 rounded-full bg-slate-700 overflow-hidden`}>
                                            <div className={`h-full ${mode === 'before' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(activeData.intensity / 5) * 100}%` }} />
                                        </div>
                                        <span className="text-sm font-bold text-white">{activeData.intensity}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="text-xs text-gray-400">Hedonic Tone</span>
                                    <span className="text-sm font-bold text-white">
                                        {activeData.tone > 0 ? `+${activeData.tone}` : activeData.tone}
                                    </span>
                                </div>
                                <div className="mt-2 p-3 bg-black/40 rounded-lg border border-dashed border-gray-700">
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Subjective Description</p>
                                    <p className="text-sm text-gray-300 italic">"{activeData.desc}"</p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                                <MousePointerClick size={24} className="opacity-50" />
                                <span className="text-xs uppercase tracking-wide">Select a map point</span>
                            </div>
                        )}
                    </div>

                    {/* Intensity Chart */}
                    <div className="bg-black/20 rounded-xl border border-white/10 p-3 h-40">
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-2 ml-1">Comparative Intensity Levels</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 5]} />
                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', color: '#fff' }} />
                                <Bar dataKey="Intensity" name={mode === 'before' ? "Baseline" : "Post-Treatment"} fill={mode === 'before' ? "#ef4444" : "#22c55e"} radius={[4,4,0,0]} animationDuration={800} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

const VectorVRUDiagram = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[#0b101b] rounded-xl relative overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Labels */}
            <div className="absolute top-6 left-6 text-white/50 text-xs font-mono">FLOW_DIAGRAM_V4</div>

            <svg viewBox="0 0 800 300" className="w-full h-full max-w-4xl drop-shadow-2xl">
                <defs>
                    <marker id="arrow-flow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* --- Main Flow Line --- */}
                <path d="M 50 150 L 200 150 L 400 150 L 600 150 L 750 150" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />

                {/* --- 1. Vapor Inlet --- */}
                <g transform="translate(50, 150)">
                    <circle r="8" fill="#64748b" />
                    <text x="0" y="-25" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">VAPOR INLET</text>
                </g>

                {/* --- 2. Vacuum Pump --- */}
                <g transform="translate(200, 150)">
                    <circle r="30" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" filter="url(#neon-glow)" />
                    {/* Fan blades */}
                    <g opacity="0.8">
                        <path d="M -15 0 L 15 0 M 0 -15 L 0 15" stroke="#3b82f6" strokeWidth="2" />
                        <circle r="10" fill="#3b82f6" opacity="0.3" />
                    </g>
                    <text x="0" y="55" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">VACUUM PUMP</text>
                </g>

                {/* --- 3. Mystery Box (Core Unit) --- */}
                <g transform="translate(400, 150)">
                    {/* Outer Glow */}
                    <rect x="-70" y="-45" width="140" height="90" rx="12" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" filter="url(#neon-glow)" />
                    {/* Main Box */}
                    <rect x="-60" y="-35" width="120" height="70" rx="8" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
                    
                    {/* Internal Tech Pattern */}
                    <path d="M -40 0 L -20 -15 L 20 15 L 40 0" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.8" />
                    <circle cx="0" cy="0" r="8" fill="#8b5cf6" />
                    <motion.circle cx="0" cy="0" r="12" fill="none" stroke="#a78bfa" strokeWidth="1" 
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    <text x="0" y="65" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">CORE UNIT</text>
                    <text x="0" y="-55" textAnchor="middle" fill="#64748b" fontSize="9" fontStyle="italic" letterSpacing="1">PATENTED TECH</text>
                </g>

                {/* --- 4. Oil Pump --- */}
                <g transform="translate(600, 150)">
                    {/* Pump Body */}
                    <path d="M -25 -20 L 25 -20 L 25 20 L -25 20 Z" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" filter="url(#neon-glow)" />
                    {/* Gears hint */}
                    <circle cx="-10" cy="0" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="10" cy="0" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    
                    <text x="0" y="50" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">OIL PUMP</text>
                </g>

                {/* --- 5. Outlet --- */}
                <g transform="translate(750, 150)">
                    <circle r="8" fill="#64748b" />
                    <text x="0" y="-25" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">GASOLINE OUT</text>
                </g>

                {/* --- Particle Animations --- */}
                
                {/* Stage 1: Vapor (Blue/White) moving to Vacuum */}
                <motion.circle r="3" fill="#bae6fd">
                    <animateMotion path="M 50 150 L 200 150" dur="1.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" />
                </motion.circle>

                {/* Stage 2: Compressed Vapor to Core */}
                <motion.circle r="3" fill="#60a5fa">
                    <animateMotion path="M 200 150 L 340 150" dur="1s" repeatCount="indefinite" />
                </motion.circle>

                {/* Stage 3: Liquid (Green) from Core to Oil Pump */}
                <motion.circle r="4" fill="#4ade80">
                    <animateMotion path="M 460 150 L 600 150" dur="1s" repeatCount="indefinite" />
                </motion.circle>

                {/* Stage 4: Final Output */}
                <motion.circle r="4" fill="#22c55e">
                    <animateMotion path="M 600 150 L 750 150" dur="1s" repeatCount="indefinite" />
                </motion.circle>

            </svg>
        </div>
    )
}

const FlowSimulation = () => {
    const [flowRate, setFlowRate] = useState(0);
    const [totalVolume, setTotalVolume] = useState(12450);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate varying flow rate around 350 L/min
            const variation = Math.sin(Date.now() / 1000) * 50;
            const currentFlow = 350 + variation + (Math.random() * 20 - 10);
            setFlowRate(currentFlow);
            setTotalVolume(prev => prev + (currentFlow / 60 / 10)); // Add liters per tick (100ms)
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-bold mb-4">Coriolis Mass Flow Meter</h3>
            <div className="flex-grow bg-black/40 rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
                
                {/* Flow Pipe Visual */}
                <div className="relative w-full h-24 bg-slate-800 rounded-lg overflow-hidden flex items-center border border-slate-700">
                    {/* Moving Liquid */}
                    <motion.div 
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.2)_50%,transparent_100%)]"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Particles */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            initial={{ x: -10, y: Math.random() * 80 + 10 }}
                            animate={{ x: 600 }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: i * 0.4, 
                                ease: "linear" 
                            }}
                        />
                    ))}
                    
                    {/* Sensor overlay */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-500/50 blur-[1px]"></div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center">
                        <p className="text-xs text-gray-400 mb-1">Instantaneous Flow</p>
                        <p className="text-2xl font-mono font-bold text-cyan-400">
                            {flowRate.toFixed(1)} <span className="text-sm text-gray-500">L/min</span>
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center">
                        <p className="text-xs text-gray-400 mb-1">Totalized Volume</p>
                        <p className="text-2xl font-mono font-bold text-white">
                            {Math.floor(totalVolume).toLocaleString()} <span className="text-sm text-gray-500">L</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- New Component: BubbleLeakTest (Level 1) ---
const BubbleLeakTest = () => {
    const [applied, setApplied] = useState(false);
    const [leaking, setLeaking] = useState(true); // Simulator usually defaults to showing the phenomenon

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Droplets size={18} className="text-blue-400" />
                        Soap Solution Test
                    </h3>
                    <p className="text-xs text-gray-400">ASTM E515 Compliance Check</p>
                </div>
                <button
                    onClick={() => { setApplied(true); setTimeout(() => setApplied(false), 4000); }}
                    disabled={applied}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-all disabled:opacity-50"
                >
                    {applied ? 'OBSERVING...' : 'APPLY SOLUTION'}
                </button>
            </div>
            <div className="flex-grow relative flex items-center justify-center bg-[#1e293b]">
                {/* Pipe Graphic */}
                <div className="relative w-64 h-20 bg-slate-600 rounded flex items-center justify-center border-y-4 border-slate-700">
                    {/* Flange */}
                    <div className="w-4 h-28 bg-slate-500 rounded border-x-2 border-slate-400 flex flex-col justify-between py-1">
                        <div className="w-full h-2 bg-slate-800 rounded-full mx-auto"></div>
                        <div className="w-full h-2 bg-slate-800 rounded-full mx-auto"></div>
                        <div className="w-full h-2 bg-slate-800 rounded-full mx-auto"></div>
                    </div>
                    
                    {/* Bubbles Animation */}
                    {applied && leaking && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {[...Array(15)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-sm"
                                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                                    animate={{ 
                                        scale: [0, 1 + Math.random()], 
                                        x: (Math.random() - 0.5) * 40, 
                                        y: (Math.random() - 0.5) * 40 - 10,
                                        opacity: [0, 1, 0] 
                                    }}
                                    transition={{ 
                                        duration: 1 + Math.random(), 
                                        repeat: Infinity, 
                                        delay: Math.random() * 0.5 
                                    }}
                                    style={{ width: 10 + Math.random() * 15, height: 10 + Math.random() * 15 }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                    {applied && (
                        <span className={`px-3 py-1 rounded text-xs font-bold ${leaking ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {leaking ? 'BUBBLE FORMATION DETECTED' : 'NO LEAKS'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- New Component: OpticalGasImaging (Level 3) ---
const OpticalGasImaging = () => {
    const [mode, setMode] = useState<'visual' | 'ogi'>('visual');

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <ScanLine size={18} className="text-purple-400" />
                        Optical Gas Imaging
                    </h3>
                    <p className="text-xs text-gray-400">MWIR Fugitive Emission Scan</p>
                </div>
                <div className="flex bg-black/40 p-1 rounded-lg">
                    <button 
                        onClick={() => setMode('visual')}
                        className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${mode === 'visual' ? 'bg-slate-700 text-white' : 'text-gray-500'}`}
                    >
                        VISUAL
                    </button>
                    <button 
                        onClick={() => setMode('ogi')}
                        className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${mode === 'ogi' ? 'bg-purple-600 text-white' : 'text-gray-500'}`}
                    >
                        OGI MODE
                    </button>
                </div>
            </div>
            
            <div className="flex-grow relative overflow-hidden flex items-center justify-center bg-black">
                {/* Viewfinder UI */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-lg z-20 pointer-events-none flex flex-col justify-between p-4">
                    <div className="flex justify-between text-white/50 text-xs font-mono">
                        <span>REC ●</span>
                        <span>ISO 800</span>
                    </div>
                    <div className="flex justify-center">
                        <Crosshair className="text-white/30" size={48} />
                    </div>
                    <div className="flex justify-between text-white/50 text-xs font-mono">
                        <span>{mode === 'ogi' ? 'HSM: HIGH' : 'HSM: OFF'}</span>
                        <span>FPS: 60</span>
                    </div>
                </div>

                {/* Scene Content */}
                {/* Invert filter creates the 'black hot' or 'white hot' high contrast thermal look */}
                <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${mode === 'ogi' ? 'grayscale invert contrast-125' : ''}`}>
                    {/* Background Valve */}
                    <div className="w-32 h-48 bg-slate-800 rounded-lg relative border border-slate-700 flex items-center justify-center">
                        <div className="w-40 h-8 bg-slate-700 absolute top-1/2 -translate-y-1/2 -translate-x-4 rounded"></div>
                        <div className="w-16 h-16 bg-red-700 rounded-full border-4 border-red-900 shadow-xl z-10"></div>
                        <div className="w-4 h-24 bg-slate-600 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Gas Plume - Modified for visibility in OGI Mode */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-4 -translate-y-8 w-32 h-48 pointer-events-none ${mode === 'ogi' ? 'opacity-100' : 'opacity-0'}`}>
                         {/* Using SVG filter for smoke effect */}
                         <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <filter id="gas-turb">
                                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="0">
                                    <animate attributeName="seed" from="0" to="100" dur="1.5s" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
                            </filter>
                            <g filter="url(#gas-turb)">
                                {/* Dark smoke color which gets inverted to bright white by the parent 'invert' filter */}
                                <path d="M 50 100 Q 20 50 50 0 Q 80 50 50 100" fill="#111" stroke="#000" strokeWidth="5" style={{filter: 'blur(8px)'}} />
                            </g>
                         </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- New Component: WaterCutProbe ---
const WaterCutProbe = () => {
    const [probeDepth, setProbeDepth] = useState(70); // percentage 0-100 (top to bottom)
    // Simulate interface at 80% down (20% from bottom)
    const interfaceLevel = 80; 
    
    const dielectricValue = probeDepth > interfaceLevel ? 82.0 : 2.1; // ~80 for water, ~2 for oil
    
    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Waves size={18} className="text-cyan-400" />
                        Electronic Water Cut
                    </h3>
                    <p className="text-xs text-gray-400">Capacitance Probe Interface Detection</p>
                </div>
                <div className="flex gap-4 text-xs font-mono bg-black/30 px-3 py-1 rounded border border-white/5">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">SIGNAL:</span>
                        <span className="text-green-400 font-bold">4-20mA</span>
                    </div>
                </div>
            </div>

            <div className="flex-grow flex p-6 gap-8 items-center justify-center">
                
                {/* Probe Visualization */}
                <div className="w-40 h-[320px] relative bg-slate-900 border-x-4 border-slate-700 rounded-none overflow-hidden shadow-inner">
                    {/* Fluid Layers */}
                    <div className="absolute inset-0 flex flex-col">
                        <div className="h-[80%] bg-amber-500/20 flex items-center justify-center relative border-b border-dashed border-white/20">
                            <span className="text-[10px] text-amber-500 font-bold absolute top-2 right-2">OIL PHASE</span>
                        </div>
                        <div className="h-[20%] bg-blue-600/30 flex items-center justify-center relative">
                            <span className="text-[10px] text-blue-400 font-bold absolute bottom-2 right-2">WATER PHASE</span>
                        </div>
                    </div>

                    {/* Probe Rod */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gray-400/50"></div>
                    
                    {/* Active Sensor Tip */}
                    <motion.div 
                        className="absolute left-1/2 -translate-x-1/2 w-4 h-12 bg-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-gray-300 z-10 cursor-ns-resize"
                        style={{ top: `${probeDepth}%` }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 280 }}
                        onDrag={(event, info) => {
                            // Simple update for visual feedback simulation
                            const newDepth = Math.min(100, Math.max(0, probeDepth + info.delta.y / 3));
                            setProbeDepth(newDepth);
                        }}
                    >
                        {/* Capacitance Field Lines */}
                        <div className="absolute -inset-4 border border-white/20 rounded-full animate-ping opacity-20"></div>
                    </motion.div>
                </div>

                {/* Digital Readout Panel */}
                <div className="w-64 flex flex-col gap-4">
                    <div className="bg-black/40 p-6 rounded-xl border border-white/10 text-center">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Dielectric Constant</p>
                        <div className="text-5xl font-mono font-black text-white mb-1">
                            {dielectricValue.toFixed(1)}
                        </div>
                        <p className="text-xs text-gray-400">εr</p>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-colors duration-300 ${dielectricValue > 10 ? 'bg-blue-900/20 border-blue-500/50' : 'bg-amber-900/20 border-amber-500/50'}`}>
                        <div className={`w-3 h-3 rounded-full ${dielectricValue > 10 ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                        <span className={`font-bold ${dielectricValue > 10 ? 'text-blue-400' : 'text-amber-400'}`}>
                            {dielectricValue > 10 ? 'WATER DETECTED' : 'OIL DETECTED'}
                        </span>
                    </div>

                    <div className="mt-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block">Manual Override (Depth)</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="95" 
                            value={probeDepth} 
                            onChange={(e) => setProbeDepth(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- New Component: TankVisual (Level 1 & 2) ---
const TankVisual = ({ type }: { type: 'atg' | 'water' }) => {
    const [fuelLevel, setFuelLevel] = useState(75);
    const [waterLevel, setWaterLevel] = useState(5); // %
    
    // Simulation for ATG
    useEffect(() => {
        if (type === 'atg') {
            const interval = setInterval(() => {
                setFuelLevel(l => Math.min(95, Math.max(10, l + (Math.random() - 0.5))));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [type]);

    // Interaction for Water Paste
    const [dipstickInserted, setDipstickInserted] = useState(false);

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        {type === 'atg' ? <ScanLine size={18} className="text-cyan-400" /> : <Droplets size={18} className="text-blue-400" />}
                        {type === 'atg' ? 'Automated Tank Gauge' : 'Water Finding Paste'}
                    </h3>
                    <p className="text-xs text-gray-400">{type === 'atg' ? 'Real-time Inventory Monitoring' : 'Manual Interface Detection'}</p>
                </div>
                {type === 'water' && (
                    <button 
                        onClick={() => setDipstickInserted(!dipstickInserted)}
                        className="px-3 py-1.5 rounded text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                        {dipstickInserted ? 'REMOVE ROD' : 'INSERT ROD'}
                    </button>
                )}
            </div>

            <div className="flex-grow flex relative">
                {/* Tank Visual */}
                <div className="w-1/2 p-8 relative flex items-center justify-center">
                    <div className="w-32 h-64 border-x-2 border-b-2 border-slate-600 rounded-b-xl relative overflow-hidden bg-slate-800/30">
                        {/* Fuel */}
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-amber-500/80"
                            animate={{ height: `${fuelLevel}%` }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        />
                        {/* Water */}
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-blue-600/80"
                            animate={{ height: `${waterLevel}%` }}
                        />
                        
                        {/* Dipstick for Water Test */}
                        {type === 'water' && (
                            <motion.div 
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 bg-gray-300 origin-top"
                                initial={{ height: 0 }}
                                animate={{ height: dipstickInserted ? '95%' : '0%' }}
                                transition={{ duration: 1 }}
                            >
                                {/* Paste reaction color change */}
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 bg-red-500"
                                    initial={{ height: 0 }}
                                    animate={{ height: dipstickInserted ? `${(waterLevel / 100) * 256}px` : 0 }} // height relative to tank px roughly
                                    transition={{ delay: 1, duration: 0.5 }} 
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Info Panel */}
                <div className="w-1/2 p-6 bg-black/20 border-l border-white/5 flex flex-col justify-center gap-6">
                    {type === 'atg' ? (
                        <>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Product Volume</p>
                                <p className="text-3xl font-mono font-bold text-amber-400">{(fuelLevel * 150).toFixed(0)} L</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Water Volume</p>
                                <p className="text-xl font-mono font-bold text-blue-400">{(waterLevel * 150).toFixed(0)} L</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Temp</p>
                                <p className="text-lg font-mono font-bold text-white">18.4°C</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                <h4 className="font-bold text-white mb-2 text-sm">Test Procedure</h4>
                                <ol className="list-decimal list-inside text-xs text-gray-400 space-y-2">
                                    <li>Apply generic water-finding paste to dipstick.</li>
                                    <li>Insert stick to tank bottom.</li>
                                    <li>Wait 10 seconds.</li>
                                    <li>Remove and inspect color change.</li>
                                </ol>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-300">Red = Water Detected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-yellow-100 rounded-full"></div>
                                <span className="text-sm text-gray-300">Yellow = No Reaction</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- New Component: NitrogenPressureTest (Level 2) ---
const NitrogenPressureTest = () => {
    const [pressure, setPressure] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const [result, setResult] = useState<'idle' | 'pass' | 'fail'>('idle');

    const startTest = () => {
        setIsTesting(true);
        setResult('idle');
        setPressure(0);
        
        // Ramp up
        let p = 0;
        const rampInterval = setInterval(() => {
            p += 5;
            setPressure(p);
            if (p >= 60) {
                clearInterval(rampInterval);
                // Hold phase
                setTimeout(() => {
                    // Decay phase (Simulate pass)
                    const decayInterval = setInterval(() => {
                        setPressure(prev => Math.max(58, prev - 0.05)); // Very slow leak allowed
                    }, 100);
                    
                    setTimeout(() => {
                        clearInterval(decayInterval);
                        setIsTesting(false);
                        setResult('pass');
                    }, 3000);
                }, 1000);
            }
        }, 50);
    };

    return (
        <div className="h-full flex flex-col bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#0f172a] flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Activity size={18} className="text-green-400" />
                        Nitrogen Integrity Test
                    </h3>
                    <p className="text-xs text-gray-400">Standard: Hold 60 PSI for 15 min</p>
                </div>
                <button 
                    onClick={startTest}
                    disabled={isTesting}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-bold rounded transition-all"
                >
                    {isTesting ? 'TESTING...' : 'START SEQUENCE'}
                </button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center relative">
                {/* Gauge Visual */}
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="45" stroke="#1e293b" strokeWidth="10" fill="none" />
                        <motion.circle 
                            cx="50" cy="50" r="45" 
                            stroke={result === 'fail' ? '#ef4444' : '#22c55e'} 
                            strokeWidth="10" fill="none" 
                            strokeDasharray="283" 
                            strokeDashoffset={283 - (283 * pressure) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-100"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-mono font-bold text-white">{pressure.toFixed(1)}</span>
                        <span className="text-xs text-gray-500 font-bold">PSI</span>
                    </div>
                </div>

                {/* Result Badge */}
                {result !== 'idle' && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`mt-8 px-6 py-2 rounded-full border font-bold uppercase tracking-widest ${result === 'pass' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}
                    >
                        TEST {result}ED
                    </motion.div>
                )}
                
                <div className="absolute bottom-6 flex gap-8 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" /> Target: 60 PSI
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" /> Limit: &lt;1 PSI Decay
                    </div>
                </div>
            </div>
        </div>
    );
};

const HardwareSimulationModule = ({ hardware }: { hardware: string | null }) => {
    if (!hardware) {
        return (
            <div className="mt-8 w-full max-w-6xl mx-auto">
                <div className="bg-[#0F1225] rounded-2xl border border-dashed border-white/10 p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <MousePointerClick size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Select Hardware</h3>
                    <p className="text-gray-400">Click on a component above to initialize its specific diagnostic simulation.</p>
                </div>
            </div>
        );
    }

    let content = null;

    // Map hardware names to components
    if (hardware.includes('Power Analyzer')) content = <Oscilloscope />;
    else if (hardware.includes('VOC')) content = <GoldSilverModule />;
    else if (hardware.includes('Manometer') || hardware.includes('Pressure')) content = <LiveGraph title="Differential Pressure" unit="mbar" color="#22d3ee" min={-5} max={5} />;
    else if (hardware.includes('Flowmeter')) content = <FlowSimulation />;
    else if (hardware.includes('Thermal')) content = <ThermalView />;
    else if (hardware.includes('PLC')) content = <LogicGrid />;
    else if (hardware.includes('Quality Lab')) content = <SpectrumAnalyzer type="quality" />;
    else if (hardware.includes('Chromatograph')) content = <RadarAnalysis title="Hydrocarbon Speciation" />;
    else if (hardware.includes('ATG')) content = <TankVisual type="atg" />;
    else if (hardware.includes('Water Cut')) content = <WaterCutProbe />;
    else if (hardware.includes('Water') || hardware.includes('Paste')) content = <TankVisual type="water" />;
    else if (hardware.includes('Hybrid VRU')) content = <VectorVRUDiagram />; 
    else if (hardware.includes('Reformates')) content = <ReformateEvaporationSim />; 
    else if (hardware.includes('SHED')) content = <SHEDAnalysis />; 
    else if (hardware.includes('Olfactory')) content = <OlfactoryTest />; 
    else if (hardware.includes('Nitrogen')) content = <NitrogenPressureTest />;
    else if (hardware.includes('Wireless') || hardware.includes('Wired')) content = <WiredConnectionTest />;
    else if (hardware.includes('Acoustic')) content = <AcousticAnalysis />;
    else if (hardware.includes('Bubble')) content = <BubbleLeakTest />;
    else if (hardware.includes('Optical')) content = <OpticalGasImaging />;
    else content = <IntegrityScan />;

    return (
        <div className="mt-8 w-full max-w-6xl mx-auto">
            <div className="bg-[#0F1225] rounded-2xl border border-white/10 overflow-hidden p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                    <Terminal size={20} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Diagnostic Terminal: <span className="text-cyan-400">{hardware}</span></h3>
                </div>
                <div className="h-[450px]">
                    {content}
                </div>
            </div>
        </div>
    );
};

const VruTestingPage: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState(1);
    const [selectedHardware, setSelectedHardware] = useState<string | null>(null);

    useEffect(() => {
        setSelectedHardware(null);
    }, [activeLevel]);

    const levels = [
        {
            level: 1,
            title: "Standard Compliance",
            subtitle: "Routine Verification",
            icon: ClipboardCheck,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/30",
            description: "The foundational layer of our quality assurance. Every unit deployed undergoes this mandatory testing sequence to ensure it meets basic regulatory and operational standards.",
            features: [
                "Vapor Pressure (RVP) Check",
                "Output Octane Rating Analysis",
                "Basic Leak Detection Scan",
                "4-Hour Continuous Run Test"
            ],
            hardware: [
                { category: "Primary Equipment", icon: Server, equipment: "Hybrid VRU (Ref + Carbon)", purpose: "Standard recovery unit with >98% efficiency rating." },
                { category: "Vapor Manifolding", icon: Ruler, equipment: "Double-walled FRP & P/V Valves", purpose: "Ensures system integrity and pressure safety." },
                { category: "Leak Detection", icon: Droplets, equipment: "Bubble Leak Test", purpose: "Visual verification of joint tightness using surfactant solution." },
                { category: "Tank Monitoring", icon: ScanLine, equipment: "High-Precision ATG", purpose: "Automated Tank Gauging for inventory tracking." },
                { category: "Control System", icon: Cpu, equipment: "Standard PLC Interface", purpose: "Basic automated control and emergency logic." },
                { category: "Quality Verification", icon: FlaskConical, equipment: "Gasoline Quality Lab Test", purpose: "External laboratory analysis to certify fuel composition." },
                { category: "Manual Audit", icon: Droplets, equipment: "Water Finding Paste", purpose: "Color-change verification of tank bottom water." }
            ]
        },
        {
            level: 2,
            title: "Deep-Dive Audit",
            subtitle: "Efficiency Optimization",
            icon: Activity,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/30",
            description: "A rigorous examination of system efficiency. This level introduces manual auditing tools to verify sensor accuracy, physical integrity, and detailed electrical consumption analysis.",
            features: [
                "Manual Pressure Verification",
                "Gross Flow Volume Audit",
                "Power Consumption Profiling",
                "Physical Seal Integrity Scan"
            ],
            hardware: [
                { category: "Foundation", icon: Layers, equipment: "Includes All Level 1 Hardware", purpose: "Builds upon the standard equipment baseline." },
                { category: "Integrity Test", icon: Activity, equipment: "Nitrogen Integrity Test", purpose: "High-pressure decay simulation to verify manifold seal." },
                { category: "Chemistry", icon: FlaskConical, equipment: "Gasoline Reformates Analysis", purpose: "Simulation of non-evaporative octane boosters." },
                { category: "Power Analysis", icon: Zap, equipment: "3-Phase Power Analyzer", purpose: "Logs voltage, current, and power factor." },
                { category: "Sensor Audit", icon: Droplets, equipment: "Electronic Water Cut", purpose: "Digital interface probe calibration check." }
            ]
        },
        {
            level: 3,
            title: "Forensic Stress Test",
            subtitle: "Maximum Durability",
            icon: ShieldAlert,
            color: "text-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/30",
            description: "Our most extreme testing protocol. Includes Gold/Silver standard methodology for precise emissions calculation, chemical speciation, and thermal performance analysis.",
            features: [
                "Full Hydrocarbon Speciation",
                "Contaminant Injection Simulation",
                "Surge Flow Load Testing (150%)",
                "Gold/Silver Standard Validation"
            ],
            hardware: [
                { category: "Advanced Leak", icon: ScanLine, equipment: "Optical Gas Imaging", purpose: "Visualizing fugitive hydrocarbon emissions invisible to the naked eye." },
                { category: "Thermal Control", icon: Umbrella, equipment: "SHED Analysis", purpose: "Canopy/Shade impact simulation on core operating temperature." },
                { category: "Sensory Audit", icon: MapIcon, equipment: "Olfactory Test", purpose: "Station map and field olfactometry verification." },
                { category: "Precise Emissions", icon: Radio, equipment: "VOC Analyzer (PID/FID)", purpose: "Real-time ppm concentration." },
                { category: "Chemical Analysis", icon: FlaskConical, equipment: "Gas Chromatograph", purpose: "Full chemical speciation (C4-C6 chains)." },
                { category: "Advanced Diagnostics", icon: Database, equipment: "Thermal Imager", purpose: "Thermal core uniformity analysis." },
                { category: "Remote Comms", icon: Cable, equipment: "Wired Internet Connection Test", purpose: "Ethernet link latency & packet loss verification." },
                { category: "Mechanical Health", icon: AudioWaveform, equipment: "Acoustic Monitoring", purpose: "Ultrasonic bearing & cavitation detection." }
            ]
        }
    ];

    const headerVariants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const cardVariants: Variants = {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }
    };

    return (
        <section className="py-32 min-h-screen bg-[#000212]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        Quality Assurance
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        Validation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Protocols</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-400 text-lg">
                        We don't just build machines; we certify performance. Our 3-tiered testing regime ensures every VRU meets the specific demands of its deployment environment.
                    </p>
                </motion.div>

                {/* Level Selectors */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {levels.map((lvl) => {
                        const Icon = lvl.icon;
                        const isActive = activeLevel === lvl.level;
                        return (
                            <motion.div
                                key={lvl.level}
                                onClick={() => setActiveLevel(lvl.level)}
                                className={`cursor-pointer relative rounded-2xl border p-6 transition-all duration-300 ${isActive ? `${lvl.bg} ${lvl.border} shadow-[0_0_30px_rgba(0,0,0,0.3)]` : 'bg-slate-900/40 border-white/10 hover:border-white/20'}`}
                                whileHover={{ y: -5 }}
                            >
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-glow"
                                        className={`absolute inset-0 rounded-2xl border-2 opacity-50 ${lvl.border}`}
                                    />
                                )}
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl bg-[#000212]/50 ${lvl.color}`}>
                                        <Icon size={32} />
                                    </div>
                                    <span className="text-5xl font-black text-white/5 select-none">0{lvl.level}</span>
                                </div>
                                <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>{lvl.title}</h3>
                                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{lvl.subtitle}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    
                    {/* Top Card: Description & Features */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`desc-${activeLevel}`}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <VectorBorderCard className="bg-[#0A0E1F]">
                                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className={`text-sm font-bold px-3 py-1 rounded-full border ${levels[activeLevel-1].color.replace('text-', 'border-').replace('400', '500/30')} bg-black/20`}>
                                                Level {activeLevel} Scope
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                            {levels[activeLevel-1].title}
                                        </h2>
                                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                            {levels[activeLevel-1].description}
                                        </p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {levels[activeLevel-1].features.map((feat, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <CheckCircle2 size={18} className={levels[activeLevel-1].color} />
                                                    <span className="text-sm text-gray-200">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual Side */}
                                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                                        <div className="aspect-square rounded-2xl bg-black/40 border border-white/10 relative overflow-hidden flex items-center justify-center group">
                                            {/* Animated Background Grid */}
                                            <div className="absolute inset-0 opacity-20" 
                                                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                                            />
                                            
                                            {/* Central Icon Animation */}
                                            <motion.div
                                                animate={{ 
                                                    scale: [1, 1.1, 1],
                                                    rotate: activeLevel === 2 ? 360 : 0
                                                }}
                                                transition={{ 
                                                    duration: activeLevel === 2 ? 10 : 4, 
                                                    repeat: Infinity, 
                                                    ease: "linear" 
                                                }}
                                                className={`p-6 rounded-full bg-white/5 border border-white/10 ${levels[activeLevel-1].color}`}
                                            >
                                                {activeLevel === 1 && <FlaskConical size={48} />}
                                                {activeLevel === 2 && <Activity size={48} />}
                                                {activeLevel === 3 && <Zap size={48} />}
                                            </motion.div>
                                        </div>
                                        <button className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-white text-black hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2 group">
                                            Request Level {activeLevel} Audit
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </VectorBorderCard>
                        </motion.div>
                    </AnimatePresence>

                    {/* Middle Card: Hardware Requirements */}
                    <AnimatePresence mode="wait">
                        {levels[activeLevel-1].hardware.length > 0 && (
                            <motion.div
                                key={`hw-${activeLevel}`}
                                variants={cardVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <VectorBorderCard className="bg-[#0f1623]" glowing>
                                    <div className="p-8 md:p-10">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-white/5 ${levels[activeLevel-1].color}`}>
                                                    <Server size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Hardware Diagnostics</h3>
                                                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Select component to run simulation</p>
                                                </div>
                                            </div>
                                            <div className="hidden md:block text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                                                SPECIFICATION_SHEET_V2.4
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {levels[activeLevel-1].hardware.map((item, idx) => {
                                                const ItemIcon = item.icon;
                                                const isSelected = selectedHardware === item.equipment;
                                                return (
                                                    <motion.div 
                                                        key={idx} 
                                                        onClick={() => setSelectedHardware(item.equipment)}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${isSelected ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'}`}
                                                    >
                                                        {isSelected && <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />}
                                                        <div className="mt-1 relative z-10">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-gray-300'}`}>
                                                                <ItemIcon size={18} />
                                                            </div>
                                                        </div>
                                                        <div className="relative z-10">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-cyan-300' : 'text-gray-500'}`}>{item.category}</span>
                                                            </div>
                                                            <h4 className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{item.equipment}</h4>
                                                            <p className="text-xs text-gray-400 leading-relaxed">{item.purpose}</p>
                                                        </div>
                                                        
                                                        {/* Click Hint */}
                                                        <div className={`absolute top-2 right-2 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                                                            <MousePointerClick size={14} className={isSelected ? 'text-cyan-400' : 'text-gray-600'} />
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </VectorBorderCard>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Hardware Simulation Module */}
                    <AnimatePresence mode="wait">
                        {selectedHardware && (
                            <motion.div
                                key="hw-sim"
                                variants={cardVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <HardwareSimulationModule hardware={selectedHardware} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Lab Note */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 text-gray-500 text-sm bg-white/5 px-6 py-3 rounded-full border border-white/5">
                        <Microscope size={16} />
                        <span>All testing is conducted by ISO 17025 accredited laboratories.</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VruTestingPage;
