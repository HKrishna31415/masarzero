
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CycleSchematic: React.FC<{ mode: 'standard' | 'surge' }> = ({ mode }) => {
    // Animation flow logic
    const isSurge = mode === 'surge';

    return (
        <div className="w-full aspect-video bg-[#0B1021] rounded-xl border border-white/10 relative overflow-hidden select-none shadow-2xl p-8">
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />

            <svg viewBox="0 0 800 450" className="w-full h-full overflow-visible">
                <defs>
                    <filter id="glow-flow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <linearGradient id="tankGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e293b" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity={0.9} />
                    </linearGradient>
                </defs>

                {/* --- INFRASTRUCTURE --- */}

                {/* UST (Underground Storage Tank) */}
                <g transform="translate(100, 250)">
                    {/* Tank Body */}
                    <path d="M 0 20 C 0 0 20 0 20 0 L 380 0 C 380 0 400 0 400 20 L 400 120 C 400 140 380 140 380 140 L 20 140 C 20 140 0 140 0 120 Z" 
                          fill="url(#tankGrad)" stroke="#475569" strokeWidth="2" />
                    
                    {/* Fuel Level */}
                    <path d="M 2 80 L 398 80 L 398 120 C 398 130 390 138 380 138 L 20 138 C 10 138 2 130 2 120 Z" 
                          fill="#0e7490" opacity="0.5" />
                    
                    <text x="200" y="70" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="1">UST VAPOR SPACE</text>
                    <text x="200" y="110" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold" letterSpacing="1">LIQUID FUEL</text>
                </g>

                {/* VRU Unit */}
                <g transform="translate(550, 50)">
                    <rect x="0" y="0" width="140" height="100" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                    <text x="70" y="55" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">MZ-9000</text>
                    <rect x="-10" y="20" width="10" height="20" fill="#334155" /> {/* Inlet */}
                    <rect x="140" y="20" width="10" height="20" fill="#334155" /> {/* Vent */}
                    <rect x="60" y="100" width="20" height="10" fill="#334155" /> {/* Liquid Out */}
                </g>

                {/* --- PIPING & FLOWS --- */}

                {/* 1. VAPOR INTAKE LINE (UST -> VRU) */}
                <path d="M 150 250 L 150 60 L 540 60" fill="none" stroke="#64748b" strokeWidth="4" />
                {/* Flow Animation */}
                <motion.path 
                    d="M 150 250 L 150 60 L 540 60" 
                    fill="none" 
                    stroke={isSurge ? "#f59e0b" : "#cbd5e1"} 
                    strokeWidth="2" 
                    strokeDasharray="8 8"
                    animate={{ strokeDashoffset: -100 }}
                    transition={{ duration: isSurge ? 1 : 3, repeat: Infinity, ease: "linear" }}
                />

                {/* 2. LIQUID RECOVERY LINE (VRU -> UST) */}
                <path d="M 620 110 L 620 300 L 450 300 L 450 250" fill="none" stroke="#64748b" strokeWidth="4" />
                {/* Flow Animation */}
                <motion.path 
                    d="M 620 110 L 620 300 L 450 300 L 450 250" 
                    fill="none" 
                    stroke="#06b6d4" 
                    strokeWidth="2" 
                    strokeDasharray="20 5"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: 100 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow-flow)"
                />

                {/* 3. CYCLE RETURN LINE (VRU -> UST) - THE KEY FEATURE */}
                <path d="M 690 30 L 750 30 L 750 200 L 350 200 L 350 250" fill="none" stroke="#64748b" strokeWidth="4" opacity="0.5" />
                
                {/* Cycle Valve Graphic */}
                <g transform="translate(730, 20)">
                    <circle cx="20" cy="10" r="8" fill={isSurge ? "#22c55e" : "#ef4444"} stroke="white" strokeWidth="1" />
                </g>

                {/* Cycle Flow Animation (Only active in Surge Mode) */}
                {isSurge && (
                    <motion.path 
                        d="M 690 30 L 750 30 L 750 200 L 350 200 L 350 250" 
                        fill="none" 
                        stroke="#a855f7" 
                        strokeWidth="3" 
                        strokeDasharray="6 4"
                        animate={{ strokeDashoffset: -100 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        filter="url(#glow-flow)"
                    />
                )}

                {/* --- LABELS --- */}
                <g transform="translate(250, 50)">
                    <rect width="100" height="20" rx="4" fill="#0f172a" stroke="#64748b" />
                    <text x="50" y="14" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">VAPOR INTAKE</text>
                </g>

                <g transform="translate(500, 320)">
                    <rect width="120" height="20" rx="4" fill="#0f172a" stroke="#06b6d4" />
                    <text x="60" y="14" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">LIQUID RETURN</text>
                </g>

                <g transform="translate(580, 180)">
                    <rect width="120" height="20" rx="4" fill="#0f172a" stroke="#a855f7" opacity={isSurge ? 1 : 0.3} />
                    <text x="60" y="14" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="monospace" opacity={isSurge ? 1 : 0.3}>CYCLE BUFFER</text>
                </g>

            </svg>

            {/* Status Overlay */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
                <div className={`px-3 py-1.5 rounded border flex items-center gap-2 ${isSurge ? 'bg-purple-900/30 border-purple-500/50' : 'bg-slate-800/50 border-slate-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${isSurge ? 'bg-purple-400 animate-pulse' : 'bg-slate-500'}`} />
                    <span className={`text-xs font-bold uppercase ${isSurge ? 'text-purple-300' : 'text-slate-400'}`}>
                        Surge Valve: {isSurge ? 'OPEN' : 'CLOSED'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CycleSchematic;
