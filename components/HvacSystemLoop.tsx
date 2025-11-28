
import React from 'react';
import { motion } from 'framer-motion';

const HvacSystemLoop: React.FC = () => {
    return (
        <div className="w-full aspect-[16/9] bg-[#080b14] rounded-xl border border-slate-700 relative overflow-hidden p-4 md:p-8">
            {/* Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
            />
            
            <svg viewBox="0 0 800 450" className="w-full h-full">
                <defs>
                    <marker id="arrow-flow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                        <path d="M0,0 L0,10 L10,5 z" fill="#94a3b8" />
                    </marker>
                    <filter id="glow-hot">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* 1. COMPRESSOR (Bottom Center) */}
                <g transform="translate(350, 320)">
                    <rect x="0" y="0" width="100" height="80" rx="10" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="50" cy="40" r="25" fill="#0f172a" stroke="#94a3b8" />
                    <text x="50" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">COMPRESSOR</text>
                    <text x="50" y="45" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="bold">C</text>
                </g>

                {/* 2. CONDENSER (Top Left) */}
                <g transform="translate(50, 50)">
                    <rect x="0" y="0" width="150" height="100" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                    {/* Coil Lines */}
                    <path d="M 20 20 H 130 M 20 35 H 130 M 20 50 H 130 M 20 65 H 130 M 20 80 H 130" stroke="#ef4444" strokeWidth="2" />
                    <text x="75" y="120" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">CONDENSER</text>
                    <text x="75" y="-10" textAnchor="middle" fill="#ef4444" fontSize="10">REJECTS HEAT</text>
                </g>

                {/* 3. TXV (Top Right) */}
                <g transform="translate(600, 80)">
                    <path d="M 0 0 L 40 20 L 0 40 Z M 40 0 L 0 20 L 40 40 Z" fill="#1e293b" stroke="#facc15" strokeWidth="2" transform="translate(10,0)" />
                    <circle cx="30" cy="20" r="10" fill="#0f172a" stroke="#facc15" />
                    <text x="30" y="60" textAnchor="middle" fill="#facc15" fontSize="12" fontWeight="bold">TXV</text>
                    <text x="30" y="-10" textAnchor="middle" fill="#facc15" fontSize="10">EXPANSION</text>
                </g>

                {/* 4. EVAPORATOR (Middle Right) -> Actually usually Top Right in diagram logic, but creating loop */}
                {/* Let's arrange: Comp(Bot) -> Cond(TopLeft) -> TXV(TopRight) -> Evap(BotRight) -> Comp */}
                {/* Actually, standard loop: Comp -> Condenser -> TXV -> Evaporator -> Comp */}
                
                {/* Rearranging for clearer loop:
                    Comp (Bottom Center) -> Left/Up to Condenser (Top Left) -> Right to TXV (Top Center/Right) -> Down/Right to Evaporator (Bottom Right) -> Left to Comp
                */}

                {/* Redrawing EVAPORATOR (Bottom Right) */}
                <g transform="translate(600, 300)">
                    <rect x="0" y="0" width="150" height="100" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M 20 20 H 130 M 20 35 H 130 M 20 50 H 130 M 20 65 H 130 M 20 80 H 130" stroke="#3b82f6" strokeWidth="2" />
                    <text x="75" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">EVAPORATOR</text>
                    <text x="75" y="-10" textAnchor="middle" fill="#3b82f6" fontSize="10">ABSORBS HEAT</text>
                </g>

                {/* --- PIPING PATHS --- */}

                {/* Path 1: High Pressure Hot Gas (Comp -> Condenser) */}
                {/* From Comp Top (400, 320) to Condenser Bottom (125, 150) */}
                <path d="M 350 360 L 300 360 L 300 100 L 200 100" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                <motion.path 
                    d="M 350 360 L 300 360 L 300 100 L 200 100" 
                    stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="10,10"
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow-hot)"
                />
                <text x="260" y="230" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold" transform="rotate(-90 260 230)">HOT GAS</text>

                {/* Path 2: High Pressure Liquid (Condenser -> TXV) */}
                <path d="M 200 100 L 200 100 L 600 100" stroke="#eab308" strokeWidth="4" fill="none" />
                <motion.path 
                    d="M 200 100 L 600 100" 
                    stroke="#eab308" strokeWidth="2" fill="none" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <text x="400" y="90" textAnchor="middle" fill="#eab308" fontSize="10" fontWeight="bold">WARM LIQUID</text>

                {/* Path 3: Low Pressure Mixture (TXV -> Evaporator) */}
                <path d="M 640 120 L 640 300" stroke="#3b82f6" strokeWidth="4" fill="none" />
                <motion.path 
                    d="M 640 120 L 640 300" 
                    stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <text x="655" y="210" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" transform="rotate(90 655 210)">COLD MIST</text>

                {/* Path 4: Low Pressure Gas (Evaporator -> Compressor) */}
                <path d="M 600 350 L 450 350" stroke="#60a5fa" strokeWidth="4" fill="none" />
                <motion.path 
                    d="M 600 350 L 450 350" 
                    stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="10,10"
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <text x="525" y="340" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">COOL GAS</text>

            </svg>
        </div>
    );
};

export default HvacSystemLoop;
