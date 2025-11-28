
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCcw, Power, Fan, Filter, Zap, AlertTriangle, Hand } from 'lucide-react';

const HmiDisplay: React.FC = () => {
    const [isOn, setIsOn] = useState(true);
    const [isFault, setIsFault] = useState(false);
    const [pressure, setPressure] = useState(-3952);
    const [refTemp, setRefTemp] = useState(-32);
    const [tankLevel, setTankLevel] = useState(65);
    
    // Simulation Loop
    useEffect(() => {
        if (!isOn) return;

        const interval = setInterval(() => {
            // Add noise to sensor readings
            setPressure(p => -3950 + Math.floor(Math.random() * 20 - 10));
            setRefTemp(t => -32 + (Math.random() * 1 - 0.5));
            setTankLevel(l => {
                const change = Math.random() > 0.7 ? 1 : 0;
                return Math.min(95, Math.max(10, l + (Math.random() > 0.5 ? change : -change)));
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isOn]);

    const handleReset = () => {
        setIsFault(false);
        setIsOn(true);
    };

    const handleEStop = () => {
        setIsOn(false);
        setIsFault(true);
    };

    const FlowPath = ({ d, color = "#06b6d4", active, width = 3, dashed = false }: { d: string, color?: string, active: boolean, width?: number, dashed?: boolean }) => (
        <>
            {/* Background Pipe */}
            <path d={d} stroke="#1e293b" strokeWidth={width + 4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Active Flow */}
            <motion.path 
                d={d} 
                stroke={active ? color : "#334155"} 
                strokeWidth={width} 
                fill="none" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dashed || active ? "8 8" : "none"}
                animate={active ? { strokeDashoffset: -100 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ opacity: active ? 1 : 0.3 }}
            />
        </>
    );

    const ComponentBlock = ({ x, y, w, h, title, icon: Icon, active, warning }: any) => (
        <g transform={`translate(${x}, ${y})`}>
            <defs>
                <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0.9} />
                </linearGradient>
                <filter id="glow-active">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <rect 
                width={w} 
                height={h} 
                rx="6" 
                fill={`url(#grad-${title})`} 
                stroke={warning ? "#ef4444" : active ? "#06b6d4" : "#475569"} 
                strokeWidth={active || warning ? 2 : 1}
                filter={active && !warning ? "url(#glow-active)" : ""}
            />
            
            {/* Header Strip */}
            <rect width={w} height="20" rx="6" fill={warning ? "#7f1d1d" : active ? "#0e7490" : "#334155"} clipPath={`inset(0 0 ${h-20}px 0)`} />
            <text x={10} y={14} fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">{title}</text>
            
            {/* Icon */}
            <g transform={`translate(${w - 24}, 4)`}>
                {warning ? <AlertTriangle size={14} color="#fca5a5" /> : <Icon size={14} color="white" opacity={0.8} />}
            </g>
        </g>
    );

    return (
        <div className="w-full bg-[#080b14] rounded-xl border-4 border-slate-800 relative overflow-hidden shadow-2xl select-none font-mono flex flex-col">
            
            {/* Main HMI Area */}
            <div className="flex-grow relative flex flex-col h-[500px]">
                
                {/* --- UI Header --- */}
                <div className="h-12 bg-[#0f172a] border-b border-slate-700 flex items-center justify-between px-4 z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 tracking-widest uppercase">Status</span>
                            <span className={`text-xs font-bold ${isFault ? 'text-red-500 animate-pulse' : isOn ? 'text-green-400' : 'text-slate-500'}`}>
                                {isFault ? 'FAULT' : isOn ? 'RUNNING' : 'STANDBY'}
                            </span>
                        </div>
                        <div className="h-6 w-px bg-slate-700"></div>
                        <div className="flex gap-3">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 uppercase">Mode</span>
                                <span className="text-xs text-cyan-400 font-bold">AUTO</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-slate-200">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                </div>

                {/* --- Main Schematic Canvas --- */}
                <div className="flex-grow bg-[#0b101b] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                            </pattern>
                        </defs>

                        {/* --- PIPES --- */}
                        <FlowPath d="M 100 320 L 100 250 L 200 250" active={isOn && !isFault} color="#f59e0b" width={4} dashed />
                        <FlowPath d="M 280 250 L 350 250 L 350 150 L 400 150" active={isOn && !isFault} color="#ef4444" width={4} />
                        <FlowPath d="M 520 150 L 580 150 L 580 250 L 620 250" active={isOn && !isFault} color="#3b82f6" width={4} />
                        <FlowPath d="M 660 300 L 660 350 L 400 350" active={isOn && !isFault} color="#22c55e" width={4} />

                        {/* --- COMPONENTS --- */}
                        <g transform="translate(40, 320)">
                            <rect x="0" y="0" width="120" height="60" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                            <text x="60" y="35" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">BUFFER TANK</text>
                            <g transform="translate(80, -20)">
                                <rect width="70" height="24" rx="4" fill="#0f172a" stroke="#334155" />
                                <text x="35" y="16" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">{isOn && !isFault ? pressure : 0}</text>
                                <text x="60" y="16" fill="#64748b" fontSize="8">Pa</text>
                            </g>
                        </g>

                        <ComponentBlock x={200} y={200} w={80} h={100} title="COMP A" icon={Zap} active={isOn && !isFault} warning={isFault} />
                        <g transform="translate(210, 235)">
                            <circle cx="30" cy="30" r="20" fill="#0f172a" stroke="#334155" />
                            <motion.path 
                                d="M 15 30 L 45 30 M 30 15 L 30 45" 
                                stroke={isFault ? "#ef4444" : "#06b6d4"} 
                                strokeWidth="3" 
                                animate={isOn && !isFault ? { rotate: 360 } : {}}
                                style={{ transformOrigin: "30px 30px" }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                            />
                        </g>

                        <ComponentBlock x={400} y={100} w={120} h={100} title="CONDENSER" icon={Fan} active={isOn && !isFault} />
                        <g transform="translate(410, 135)">
                            <path d="M 10 10 H 90 M 10 20 H 90 M 10 30 H 90" stroke="#475569" strokeWidth="2" />
                            <g transform="translate(50, 30)">
                                    <motion.circle r="25" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" animate={isOn && !isFault ? { rotate: -360 } : {}} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                                    <text x="0" y="40" textAnchor="middle" fill="#06b6d4" fontSize="10">{isOn && !isFault ? refTemp.toFixed(1) : 20}°C</text>
                            </g>
                        </g>

                        <ComponentBlock x={620} y={200} w={80} h={120} title="SEPARATOR" icon={Filter} active={isOn && !isFault} />
                        <g transform="translate(630, 230)">
                            <rect x="10" y="0" width="20" height="80" rx="2" fill="#334155" />
                            <rect x="35" y="0" width="20" height="80" rx="2" fill="#334155" />
                            <g transform="translate(5, 90)">
                                    <rect width="55" height="6" fill="#0f172a" />
                                    <motion.rect 
                                    width={`${tankLevel * 0.55}`} 
                                    height="6" 
                                    fill="#22c55e" 
                                    animate={{ width: `${tankLevel * 0.55}` }}
                                    />
                            </g>
                        </g>

                        {/* --- Digital E-Stop Button --- */}
                        <g transform="translate(700, 20)" onClick={handleEStop} style={{ cursor: 'pointer' }}>
                            <rect width="80" height="40" rx="4" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
                            <rect x="4" y="4" width="72" height="32" rx="2" fill="#b91c1c" />
                            <text x="40" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E-STOP</text>
                        </g>
                    </svg>
                </div>

                {/* --- Control Deck (Footer) --- */}
                <div className="h-24 bg-[#1e293b] border-t border-slate-700 flex items-center justify-around px-4 shrink-0 shadow-inner relative z-20">
                    
                    {/* Run Lamp (Green) */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-12 h-12 rounded-full border-4 border-slate-600 shadow-inner transition-all duration-300 flex items-center justify-center relative ${isOn && !isFault ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-green-900/30'}`}>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Run</span>
                    </div>

                    {/* Fault Lamp (Yellow) */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-12 h-12 rounded-full border-4 border-slate-600 shadow-inner transition-all duration-300 flex items-center justify-center relative ${isFault ? 'bg-yellow-500 shadow-[0_0_20px_#eab308] animate-pulse' : 'bg-yellow-900/30'}`}>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fault</span>
                    </div>

                    {/* Reset Button (Red) */}
                    <div className="flex flex-col items-center gap-1">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="w-12 h-12 rounded-full border-b-4 border-red-800 bg-red-600 active:border-b-0 active:mt-1 transition-all shadow-lg flex items-center justify-center relative overflow-hidden group"
                        >
                            <RotateCcw size={20} className="text-white opacity-80 group-hover:rotate-180 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                        </motion.button>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reset</span>
                    </div>

                    {/* Main Power Switch (Simulated) */}
                    <div className="flex flex-col items-center gap-1 ml-4 pl-4 border-l border-slate-600">
                         <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOn(!isOn)}
                            className={`w-12 h-12 rounded border-2 flex items-center justify-center transition-all ${isOn ? 'bg-slate-700 border-green-500/50 text-green-400' : 'bg-slate-800 border-slate-600 text-slate-500'}`}
                        >
                            <Power size={20} />
                        </motion.button>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Power</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HmiDisplay;
