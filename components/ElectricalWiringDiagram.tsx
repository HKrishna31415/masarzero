
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, Info } from 'lucide-react';

const ElectricalWiringDiagram: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#0e1424] relative overflow-hidden rounded-2xl p-8 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="text-yellow-400" size={20} />
                        Main Power Termination
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">380V 3-Phase + N + PE</p>
                </div>
                <div className="bg-red-900/20 border border-red-500/50 px-3 py-1 rounded flex items-center gap-2 text-xs text-red-300">
                    <AlertTriangle size={14} />
                    <span>ENSURE LOTO BEFORE WORK</span>
                </div>
            </div>

            {/* Diagram Area */}
            <div className="flex-grow relative flex items-center justify-center">
                <svg viewBox="0 0 600 300" className="w-full max-w-2xl drop-shadow-2xl">
                    
                    {/* --- Terminal Block Housing --- */}
                    <rect x="50" y="50" width="500" height="200" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <rect x="70" y="70" width="460" height="40" rx="4" fill="#0f172a" stroke="#334155" />
                    <text x="300" y="95" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="monospace" letterSpacing="2">XT1 MAIN POWER TERMINAL</text>

                    {/* --- Terminals --- */}
                    {['L1', 'L2', 'L3', 'N', 'PE'].map((label, i) => {
                        const x = 110 + i * 95;
                        const color = 
                            label === 'L1' ? '#ef4444' : // Red (Brown equiv)
                            label === 'L2' ? '#eab308' : // Yellow (Black equiv)
                            label === 'L3' ? '#3b82f6' : // Blue (Grey equiv)
                            label === 'N' ? '#0ea5e9' :  // Light Blue
                            '#22c55e';                   // Green/Yellow

                        return (
                            <g key={label}>
                                {/* Terminal Body */}
                                <rect x={x - 20} y="120" width="40" height="80" rx="4" fill="#334155" stroke="#475569" />
                                {/* Screw Head */}
                                <circle cx={x} cy="140" r="8" fill="#cbd5e1" stroke="#64748b" />
                                <path d={`M ${x-5} 140 L ${x+5} 140 M ${x} 135 L ${x} 145`} stroke="#64748b" strokeWidth="2" />
                                
                                {/* Wire Entering (Animated) */}
                                <motion.path 
                                    d={`M ${x} 280 L ${x} 200`} 
                                    stroke={color} 
                                    strokeWidth="8" 
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                />
                                
                                {/* Label */}
                                <text x={x} y="180" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{label}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Info Footer */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
                <div className="bg-white/5 p-3 rounded border border-white/5">
                    <strong className="text-gray-300 block mb-1">Cable Spec</strong>
                    <span className="text-cyan-400 font-mono">5 x 6mm² Cu Armored</span>
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/5">
                    <strong className="text-gray-300 block mb-1">Torque</strong>
                    <span className="text-cyan-400 font-mono">2.5 Nm (Terminal)</span>
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/5">
                    <strong className="text-gray-300 block mb-1">Phase Seq.</strong>
                    <span className="text-cyan-400 font-mono">CW Rotation Check</span>
                </div>
            </div>

        </div>
    );
};

export default ElectricalWiringDiagram;
