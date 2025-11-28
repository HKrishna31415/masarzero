
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contactor = ({ x, label, subLabel, active, onClick }: any) => (
    <g transform={`translate(${x}, 0)`} onClick={onClick} className="cursor-pointer group">
        {/* Main Body */}
        <rect x="0" y="0" width="70" height="80" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
        <rect x="2" y="2" width="66" height="76" rx="1" fill="#1e293b" />
        
        {/* Terminals Top */}
        <circle cx="15" cy="10" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="35" cy="10" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="55" cy="10" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        
        {/* Label Area */}
        <rect x="5" y="20" width="60" height="15" fill="#cbd5e1" rx="1" />
        <text x="35" y="31" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">{label}</text>
        
        {/* Plunger / Indicator */}
        <g transform="translate(15, 40)">
            <rect x="0" y="0" width="40" height="30" rx="2" fill="#cbd5e1" />
            <motion.rect 
                x="5" y="5" width="30" height="20" rx="1" 
                fill={active ? "#0f172a" : "#e2e8f0"}
                animate={{ 
                    y: active ? 2 : 0,
                    fill: active ? "#0f172a" : "#e2e8f0"
                }}
            />
            {/* Status Bar */}
            <motion.rect
                x="12" y="12" width="16" height="6" rx="1"
                fill={active ? "#22c55e" : "#94a3b8"}
                animate={{ opacity: active ? 1 : 0.5 }}
            />
        </g>

        {/* Model Text */}
        <text x="5" y="75" fontSize="6" fill="#64748b" fontFamily="monospace">{subLabel}</text>
        
        {/* Terminals Bottom */}
        <circle cx="15" cy="85" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="35" cy="85" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="55" cy="85" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />

        {/* Highlight Overlay */}
        <rect x="-2" y="-2" width="74" height="90" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0" className="group-hover:opacity-100 transition-opacity" rx="4" />
    </g>
);

const OverloadRelay = ({ x, label, setPoint }: any) => (
    <g transform={`translate(${x}, 85)`}>
        {/* Body */}
        <path d="M 5 0 L 65 0 L 65 70 Q 65 75 60 75 L 10 75 Q 5 75 5 70 Z" fill="#1e293b" stroke="#475569" />
        
        {/* Transparent Plastic Cover */}
        <rect x="5" y="5" width="60" height="60" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />

        {/* Dial */}
        <circle cx="35" cy="25" r="12" fill="#0f172a" stroke="#64748b" />
        <line x1="35" y1="25" x2="42" y2="32" stroke="#e2e8f0" strokeWidth="2" transform={`rotate(${setPoint * 10} 35 25)`} />
        <text x="35" y="10" textAnchor="middle" fontSize="7" fill="#94a3b8">AMPS</text>

        {/* Buttons - Side by Side */}
        {/* Reset - Blue/White - Left */}
        <rect x="15" y="45" width="12" height="12" rx="2" fill="#3b82f6" stroke="#1e3a8a" /> 
        <text x="21" y="42" textAnchor="middle" fontSize="5" fill="#94a3b8">RST</text>
        
        {/* Stop - Red - Right */}
        <rect x="43" y="45" width="12" height="12" rx="2" fill="#ef4444" stroke="#7f1d1d" /> 
        <text x="49" y="42" textAnchor="middle" fontSize="5" fill="#94a3b8">STOP</text>

        {/* Terminals Bottom */}
        <circle cx="15" cy="75" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="35" cy="75" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="55" cy="75" r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
    </g>
);

const Wire = ({ d, color }: { d: string, color: string }) => (
    <path d={d} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
);

const ElectricalPanelDiagram: React.FC = () => {
    const [activeContactor, setActiveContactor] = useState<string | null>(null);

    const contactors = [
        { id: 'KM1', label: 'KM1', sub: 'LC1 N18', x: 20, relay: true, relaySet: 5, role: 'Compressor' },
        { id: 'KM2', label: 'KM2', sub: 'LC1 N09', x: 100, relay: true, relaySet: 2, role: 'Fan Motors' },
        { id: 'KM3', label: 'KM3', sub: 'LC1 N09', x: 180, relay: true, relaySet: 3, role: 'Oil Pump' },
        { id: 'KM4', label: 'KM4', sub: 'LC1 N09', x: 260, relay: true, relaySet: 4, role: 'Ring Blower/Air Pump/Vacuum Pump' },
    ];

    return (
        <div className="w-full bg-[#0c101c] border border-slate-700 rounded-xl p-6 pt-16 relative overflow-hidden my-8">
            <div className="absolute top-4 left-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                Power Distribution Rail (380V)
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Diagram */}
                <div className="flex-grow w-full aspect-[2/1] md:aspect-[5/2] relative">
                    <svg viewBox="0 0 350 200" className="w-full h-full">
                        {/* DIN Rail */}
                        <rect x="10" y="30" width="330" height="30" fill="#cbd5e1" rx="2" />
                        <rect x="10" y="35" width="330" height="20" fill="#94a3b8" />

                        {/* Wires Top (Busbar) */}
                        <Wire d="M 35 0 L 35 10" color="#facc15" />
                        <Wire d="M 55 0 L 55 10" color="#22c55e" />
                        <Wire d="M 75 0 L 75 10" color="#ef4444" />
                        
                        {/* Bridge Wires (Simulated loops) */}
                        <path d="M 55 10 Q 95 -10 135 10" stroke="#22c55e" strokeWidth="3" fill="none" />
                        <path d="M 135 10 Q 175 -10 215 10" stroke="#22c55e" strokeWidth="3" fill="none" />
                        <path d="M 215 10 Q 255 -10 295 10" stroke="#22c55e" strokeWidth="3" fill="none" />

                        {contactors.map((c) => (
                            <React.Fragment key={c.id}>
                                <Contactor 
                                    x={c.x} 
                                    label={c.label} 
                                    subLabel={c.sub} 
                                    active={activeContactor === c.id}
                                    onClick={() => setActiveContactor(activeContactor === c.id ? null : c.id)}
                                />
                                {c.relay && <OverloadRelay x={c.x} setPoint={c.relaySet} />}
                            </React.Fragment>
                        ))}
                    </svg>
                </div>

                {/* Info Panel */}
                <div className="w-full md:w-64 bg-slate-800/50 border border-white/10 rounded-lg p-4">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Diagnostics
                    </h4>
                    
                    <AnimatePresence mode="wait">
                        {activeContactor ? (
                            <motion.div
                                key={activeContactor}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Selected Unit</div>
                                <div className="text-xl text-cyan-300 font-mono font-bold mb-2">{activeContactor}</div>
                                
                                <div className="space-y-3 text-sm text-gray-300">
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span>Function:</span>
                                        <span className="text-white font-semibold text-right text-xs max-w-[120px] leading-tight">{contactors.find(c => c.id === activeContactor)?.role}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span>State:</span>
                                        <span className="text-green-400 font-mono">ENERGIZED</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span>Coil Voltage:</span>
                                        <span>220V AC</span>
                                    </div>
                                    
                                    <div className="bg-blue-500/10 p-2 rounded border border-blue-500/30 mt-2">
                                        <p className="text-xs text-blue-300">
                                            <strong>Tip:</strong> If tripped, press the Blue reset button on the left side of the relay face.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8 text-gray-500 text-sm"
                            >
                                Click a contactor to view live status and wiring details.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ElectricalPanelDiagram;
