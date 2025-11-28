
import React, { useState } from 'react';
import {
  Cpu,
  AlertTriangle,
  Zap,
  Fan,
  Activity,
  BookOpen,
  Cloud,
  Thermometer,
  Filter,
  Droplets,
  Wind,
  Play,
  Server,
  Wifi,
  Radio,
  Layers,
  Maximize2,
  Power,
  ArrowRightLeft,
  Gauge,
  CheckCircle2,
  AlertOctagon,
  Monitor,
  Workflow,
  Anchor,
  Box,
  Disc,
  SwitchCamera,
  Cable,
  Component,
  Hammer,
  Hand
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HmiDisplay from '../components/HmiDisplay';
import HvacSystemLoop from '../components/HvacSystemLoop';
import ElectricalPanelDiagram from '../components/ElectricalPanelDiagram';
import BaseplateDiagram from '../components/BaseplateDiagram';

// --- Shared Helper Components ---

const WarningBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-6 p-4 border-l-4 border-red-500 bg-red-900/10 rounded-r-lg text-red-200">
    <div className="flex items-start">
      <AlertTriangle className="h-6 w-6 mr-3 text-red-400 flex-shrink-0 mt-1" />
      <div>
        <h4 className="font-bold text-red-400 mb-1">SAFETY WARNING</h4>
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  </div>
);

const InfoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-6 p-4 border-l-4 border-cyan-500 bg-cyan-900/10 rounded-r-lg text-cyan-200">
    <div className="flex items-start">
      <div className="mr-3 mt-1">
        <div className="bg-cyan-500/20 p-1 rounded">
            <Activity className="h-4 w-4 text-cyan-400" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-cyan-400 mb-1">Technical Note</h4>
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  </div>
);

// --- Animated Components ---

const RelayResetAnimation = () => {
    const [resetState, setResetState] = useState<'tripped' | 'resetting' | 'normal'>('tripped');

    const handleSimulate = () => {
        setResetState('resetting');
        setTimeout(() => {
            setResetState('normal');
            setTimeout(() => setResetState('tripped'), 2000);
        }, 500);
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
            <div className="relative w-64 h-64 bg-[#0c101c] rounded-lg border border-slate-600 mb-4 overflow-hidden shadow-inner flex items-center justify-center">
                
                {/* Full Contactor Assembly Graphic */}
                <svg viewBox="0 0 100 150" className="w-32 h-48">
                    {/* Top Contactor */}
                    <rect x="15" y="10" width="70" height="60" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
                    <rect x="17" y="12" width="66" height="56" rx="1" fill="#1e293b" />
                    <rect x="20" y="25" width="60" height="15" fill="#cbd5e1" rx="1" />
                    <text x="50" y="35" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f172a">KM-OIL</text>
                    
                    {/* Overload Relay (Bottom) */}
                    <path d="M 20 70 L 80 70 L 80 130 Q 80 135 75 135 L 25 135 Q 20 135 20 130 Z" fill="#1e293b" stroke="#475569" />
                    
                    {/* Amp Dial - Moved to LEFT */}
                    <circle cx="35" cy="100" r="10" fill="#0f172a" stroke="#64748b" />
                    <line x1="35" y1="100" x2="42" y2="107" stroke="#e2e8f0" strokeWidth="2" transform="rotate(-45 35 100)" />
                    <text x="35" y="118" textAnchor="middle" fontSize="4" fill="#64748b">AMPS</text>
                    
                    {/* Reset Button (Blue) - Right, Top */}
                    <motion.g
                        animate={resetState === 'resetting' ? { scale: 0.9 } : { scale: 1 }}
                        style={{ originX: "65px", originY: "90px" }}
                    >
                        <rect x="60" y="85" width="12" height="12" rx="2" fill={resetState === 'normal' ? "#2563eb" : "#3b82f6"} stroke="#1e3a8a" />
                        <text x="66" y="83" textAnchor="middle" fontSize="4" fill="#94a3b8" fontWeight="bold">RST</text>
                    </motion.g>

                    {/* Stop Button (Red) - Right, Bottom */}
                    <rect x="60" y="105" width="12" height="12" rx="2" fill="#ef4444" stroke="#7f1d1d" />
                    <text x="66" y="125" textAnchor="middle" fontSize="4" fill="#94a3b8" fontWeight="bold">STOP</text>

                    {/* Status Indicator */}
                    <circle cx="85" cy="80" r="3" fill={resetState === 'tripped' ? '#ef4444' : '#22c55e'} />
                </svg>

                {/* Animated Hand Cursor - Adjusted target position to new reset button location */}
                <motion.div
                    className="absolute top-0 left-0 pointer-events-none text-cyan-400 drop-shadow-lg"
                    initial={{ x: 180, y: 200, opacity: 0 }}
                    animate={resetState === 'resetting' ? { x: 118, y: 150, scale: 0.9, opacity: 1 } : { x: 140, y: 180, scale: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <Hand size={32} fill="currentColor" className="rotate-[-12deg]" />
                </motion.div>

            </div>
            
            <div className="text-center">
                <p className="text-sm font-bold text-white mb-2">Status: {resetState === 'tripped' ? 'Tripped (Indicator Red)' : resetState === 'resetting' ? 'Resetting...' : 'Ready (Indicator Green)'}</p>
                <button 
                    onClick={handleSimulate}
                    disabled={resetState !== 'tripped'}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded transition-colors"
                >
                    PRESS BLUE BUTTON
                </button>
            </div>
        </div>
    );
};

const GasolineTankDiagram = () => {
    return (
        <div className="w-full bg-[#0f1629] border border-slate-700 rounded-xl p-6 flex items-center justify-center relative overflow-hidden my-6 min-h-[400px]">
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">FIG 3.2 - FLOAT SENSOR ASSEMBLY</div>
            <svg width="300" height="350" viewBox="0 0 300 350">
                <defs>
                    <linearGradient id="rodGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#cbd5e1" />
                        <stop offset="50%" stopColor="#f1f5f9" />
                        <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="tankBody" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e293b" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                
                <g transform="translate(150, 200)">
                    
                    {/* --- Tank Body (Stationary) --- */}
                    <g>
                        {/* Back Walls (Internal) */}
                        <path d="M -70 -60 L 70 -60 L 70 120 L -70 120 Z" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                        
                        {/* Tank Exterior */}
                        <path d="M -70 -60 L -90 -40 L -90 140 L -70 120 L -70 -60" fill="url(#tankBody)" stroke="#475569" strokeWidth="1.5" /> {/* Left Side */}
                        <path d="M -90 140 L 50 140 L 70 120" fill="none" stroke="#475569" strokeWidth="1.5" /> {/* Bottom Front */}
                        <path d="M 50 -40 L 50 140" fill="none" stroke="#475569" strokeWidth="1.5" /> {/* Right Front Corner */}
                        <path d="M -90 -40 L 50 -40" fill="none" stroke="#475569" strokeWidth="1.5" /> {/* Top Front Edge */}
                        <path d="M 70 -60 L 50 -40" fill="none" stroke="#475569" strokeWidth="1.5" /> {/* Top Right Edge */}
                        <path d="M -70 -60 L -90 -40" fill="none" stroke="#475569" strokeWidth="1.5" /> {/* Top Left Edge */}
                        
                        {/* Top Surface (with hole) */}
                        <path d="M -70 -60 L 70 -60 L 50 -40 L -90 -40 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" opacity="0.8" />
                        
                        {/* Flange Mounting Hole (Ellipse) */}
                        <ellipse cx="-20" cy="-50" rx="30" ry="10" fill="#0f1629" stroke="#475569" strokeWidth="1" />
                    </g>

                    {/* --- Animated Flange Assembly --- */}
                    <motion.g
                        initial={{ y: 0 }}
                        animate={{ y: [0, -130, -130, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1], repeatDelay: 1 }}
                    >
                        {/* Elements below flange plate (Rods & Floats) */}
                        <g transform="translate(-20, -50)">
                            
                            {/* Rods */}
                            {/* Rod 1 (Left) */}
                            <rect x="-12" y="0" width="4" height="160" fill="url(#rodGradient)" />
                            {/* Rod 2 (Right) */}
                            <rect x="8" y="0" width="4" height="160" fill="url(#rodGradient)" />
                            
                            {/* Floats (Black/Dark Grey) - Positioned near bottom */}
                            <g transform="translate(0, 140)">
                                {/* Float 1 */}
                                <path d="M -16 0 L -8 0 L -8 15 L -16 15 Z" fill="#1e293b" stroke="#000" strokeWidth="0.5" />
                                <ellipse cx="-12" cy="0" rx="4" ry="1.5" fill="#334155" />
                                <ellipse cx="-12" cy="15" rx="4" ry="1.5" fill="#1e293b" stroke="#000" strokeWidth="0.5" />
                                
                                {/* Float 2 */}
                                <path d="M 4 0 L 12 0 L 12 15 L 4 15 Z" fill="#1e293b" stroke="#000" strokeWidth="0.5" />
                                <ellipse cx="8" cy="0" rx="4" ry="1.5" fill="#334155" />
                                <ellipse cx="8" cy="15" rx="4" ry="1.5" fill="#1e293b" stroke="#000" strokeWidth="0.5" />
                                
                                {/* Stopper nuts at very bottom */}
                                <rect x="-13" y="18" width="6" height="4" fill="#94a3b8" rx="1" />
                                <rect x="7" y="18" width="6" height="4" fill="#94a3b8" rx="1" />
                            </g>
                        </g>

                        {/* Flange Plate & Top Components (Updated with Wiring Terminals) */}
                        <g transform="translate(-20, -50)">
                            {/* The Plate */}
                            <ellipse cx="0" cy="0" rx="35" ry="12" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
                            <path d="M -35 0 L -35 5 C -35 12 35 12 35 5 L 35 0" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                            
                            {/* Bolts */}
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                                const rad = angle * Math.PI / 180;
                                const bx = Math.cos(rad) * 28;
                                const by = Math.sin(rad) * 9;
                                return <circle key={i} cx={bx} cy={by} r="2" fill="#475569" stroke="none" />;
                            })}

                            {/* UPDATED: Terminal Housing (Circular Recess) */}
                            <ellipse cx="0" cy="-5" rx="14" ry="6" fill="#334155" stroke="#1e293b" />
                            <path d="M -14 -5 L -14 -20 L 14 -20 L 14 -5" fill="#334155" stroke="#1e293b" />
                            <ellipse cx="0" cy="-20" rx="14" ry="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                            
                            {/* Terminals - 2 Wires Only */}
                            <circle cx="-6" cy="-20" r="2" fill="#facc15" stroke="none" />
                            <text x="-6" y="-24" fontSize="4" fill="#94a3b8" textAnchor="middle">1</text>
                            <circle cx="6" cy="-20" r="2" fill="#facc15" stroke="none" />
                            <text x="6" y="-24" fontSize="4" fill="#94a3b8" textAnchor="middle">2</text>
                            
                            {/* Wires (Disconnected/Loose look during lift) */}
                            <path d="M -6 -20 C -10 -35 -15 -40 -20 -45" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" opacity="0.7" />
                            <path d="M 6 -20 C 10 -35 15 -40 20 -45" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 1" opacity="0.7" />
                        </g>
                    </motion.g>
                </g>
            </svg>
        </div>
    );
};

const MotorWiringDiagram = () => (
  <div className="w-full bg-[#0f1629] border border-slate-700 rounded-xl p-6 my-6 flex flex-col md:flex-row gap-8 items-center justify-center overflow-hidden">
    {/* Star (Wye) Connection */}
    <div className="flex flex-col items-center">
      <h5 className="text-cyan-400 font-bold text-sm mb-4 uppercase tracking-wider">Star (Wye) Connection - High Voltage</h5>
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Terminal Board Background */}
        <rect x="10" y="10" width="140" height="140" rx="4" fill="none" stroke="#475569" />
        
        {/* Terminals Top: W2, U2, V2 */}
        <circle cx="40" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="40" y="25" textAnchor="middle" fill="#64748b" fontSize="10">W2</text>
        <circle cx="80" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="80" y="25" textAnchor="middle" fill="#64748b" fontSize="10">U2</text>
        <circle cx="120" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="120" y="25" textAnchor="middle" fill="#64748b" fontSize="10">V2</text>

        {/* Terminals Bottom: U1, V1, W1 */}
        <circle cx="40" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="40" y="115" textAnchor="middle" fill="#64748b" fontSize="10">U1</text>
        <circle cx="80" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="80" y="115" textAnchor="middle" fill="#64748b" fontSize="10">V1</text>
        <circle cx="120" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="120" y="115" textAnchor="middle" fill="#64748b" fontSize="10">W1</text>

        {/* Shorting Links (Horizontal for Star) */}
        <rect x="34" y="36" width="92" height="8" rx="2" fill="#facc15" opacity="0.8" />

        {/* Line Inputs */}
        <path d="M 40 145 L 40 96" stroke="#ef4444" strokeWidth="3" />
        <text x="30" y="135" fill="#ef4444" fontSize="10" fontWeight="bold">L1</text>
        <path d="M 80 145 L 80 96" stroke="#eab308" strokeWidth="3" />
        <text x="70" y="135" fill="#eab308" fontSize="10" fontWeight="bold">L2</text>
        <path d="M 120 145 L 120 96" stroke="#3b82f6" strokeWidth="3" />
        <text x="110" y="135" fill="#3b82f6" fontSize="10" fontWeight="bold">L3</text>
      </svg>
    </div>

    {/* Divider */}
    <div className="w-px h-32 bg-slate-700 hidden md:block"></div>

    {/* Delta Connection */}
    <div className="flex flex-col items-center">
      <h5 className="text-purple-400 font-bold text-sm mb-4 uppercase tracking-wider">Delta Connection - Low Voltage</h5>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <rect x="10" y="10" width="140" height="140" rx="4" fill="none" stroke="#475569" />
        
        {/* Terminals Top */}
        <circle cx="40" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="40" y="25" textAnchor="middle" fill="#64748b" fontSize="10">W2</text>
        <circle cx="80" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="80" y="25" textAnchor="middle" fill="#64748b" fontSize="10">U2</text>
        <circle cx="120" cy="40" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="120" y="25" textAnchor="middle" fill="#64748b" fontSize="10">V2</text>

        {/* Terminals Bottom */}
        <circle cx="40" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="40" y="115" textAnchor="middle" fill="#64748b" fontSize="10">U1</text>
        <circle cx="80" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="80" y="115" textAnchor="middle" fill="#64748b" fontSize="10">V1</text>
        <circle cx="120" cy="90" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <text x="120" y="115" textAnchor="middle" fill="#64748b" fontSize="10">W1</text>

        {/* Shorting Links (Vertical for Delta) */}
        <rect x="36" y="34" width="8" height="62" rx="2" fill="#facc15" opacity="0.8" />
        <rect x="76" y="34" width="8" height="62" rx="2" fill="#facc15" opacity="0.8" />
        <rect x="116" y="34" width="8" height="62" rx="2" fill="#facc15" opacity="0.8" />

        {/* Line Inputs */}
        <path d="M 40 145 L 40 96" stroke="#ef4444" strokeWidth="3" />
        <text x="30" y="135" fill="#ef4444" fontSize="10" fontWeight="bold">L1</text>
        <path d="M 80 145 L 80 96" stroke="#eab308" strokeWidth="3" />
        <text x="70" y="135" fill="#eab308" fontSize="10" fontWeight="bold">L2</text>
        <path d="M 120 145 L 120 96" stroke="#3b82f6" strokeWidth="3" />
        <text x="110" y="135" fill="#3b82f6" fontSize="10" fontWeight="bold">L3</text>
      </svg>
    </div>
  </div>
);

const PlcWiringDiagram = () => {
  return (
    <div className="w-full bg-[#080b14] border border-slate-700 rounded-xl p-6 md:p-8 relative overflow-hidden my-8">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-16">
        
        {/* Left Side: Inputs/Outputs */}
        <div className="flex flex-col justify-between gap-6 w-full md:w-1/3">
            {/* Group 1 */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700 pb-1">External Wiring</h4>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                    <span className="text-sm text-white">Main Power (380V)</span>
                    <Zap size={14} className="text-yellow-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                    <span className="text-sm text-white">Internet (V-BOX)</span>
                    <Wifi size={14} className="text-blue-400" />
                </div>
            </div>

            {/* Group 2 */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700 pb-1">Motors & Pumps (KM)</h4>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Compressor</span>
                    <span className="text-xs text-cyan-500 font-mono">KM1</span>
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Fans (1 & 2)</span>
                    <span className="text-xs text-cyan-500 font-mono">KM2</span>
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Oil Pump</span>
                    <span className="text-xs text-cyan-500 font-mono">KM3</span>
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Air Pump</span>
                    <span className="text-xs text-cyan-500 font-mono">KM4</span>
                </div>
            </div>

            {/* Group 3 */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700 pb-1">Sensors & Actuators (KA)</h4>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Pressure Sensors (x4)</span>
                    <Gauge size={14} className="text-purple-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Temperature Sensors (x3)</span>
                    <Thermometer size={14} className="text-red-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Solenoid Valves (x3)</span>
                    <SwitchCamera size={14} className="text-green-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Level Switch</span>
                    <Disc size={14} className="text-orange-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-600 p-3 rounded flex items-center justify-between">
                    <span className="text-sm text-white">Flowmeter</span>
                    <Activity size={14} className="text-pink-400" />
                </div>
            </div>
        </div>

        {/* Center Connections (Visual only) */}
        <div className="hidden md:flex flex-col justify-around items-center w-16 relative">
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            {/* Connection Lines */}
            <div className="w-full h-px bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div></div>
            <div className="w-full h-px bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div></div>
            <div className="w-full h-px bg-slate-700 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div></div>
        </div>

        {/* Right Side: PLC Box */}
        <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex-grow border-2 border-cyan-500/30 bg-[#0f1623] rounded-lg p-6 relative shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#080b14] px-4 -mt-3 text-cyan-400 font-bold text-sm tracking-widest">
                    Explosion-Proof Control Box (PLC)
                </div>
                
                <div className="h-full flex flex-col justify-center items-center text-center gap-6">
                    <Server size={64} className="text-slate-600" />
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">PLC Core</h3>
                        <p className="text-sm text-slate-400 font-mono">Model: LX3V-1616MR-A</p>
                        <p className="text-xs text-slate-500 mt-1">Logic Control & Safety Barrier</p>
                    </div>
                    
                    <div className="w-full grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-black/40 p-3 rounded border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase font-bold">CPU Status</div>
                            <div className="text-green-400 font-mono text-sm">RUNNING</div>
                        </div>
                        <div className="bg-black/40 p-3 rounded border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase font-bold">Comms</div>
                            <div className="text-blue-400 font-mono text-sm">RS-485 OK</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- Content Functions ---

const IntroductionContent = () => (
  <div className="space-y-6 text-gray-300">
    <p className="text-lg leading-relaxed">
      This guide provides detailed instructions for the repair and maintenance of the MasarZero Vapor Recovery Machine. 
      It is intended for <span className="text-white font-bold">qualified technicians only</span>.
    </p>
    
    <InfoBox>
        <p>The primary diagnostic tool for this system is the HMI (Human-Machine Interface) screen. Any system abnormality or fault will be reported here first. <strong>Always consult the HMI for error codes before beginning any repair work.</strong></p>
    </InfoBox>

    <WarningBox>
      <p>All repair and maintenance procedures must be performed by certified technicians. Before starting any work, ensure the machine is completely powered off and de-energized at the main circuit breaker. Follow all local safety regulations for handling hazardous vapor recovery equipment.</p>
    </WarningBox>

    <h3 className="text-xl font-bold text-white mt-8 border-b border-white/10 pb-2">Construction & Electrical</h3>
    <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
            <h4 className="font-mono text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <Zap size={20} /> Electrical Ratings
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-black/20 p-3 rounded">
                    <div className="text-gray-500 text-xs uppercase font-bold">Rated Voltage</div>
                    <div className="text-white font-mono text-lg">380V</div>
                    <div className="text-gray-500 text-xs">3-Phase</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                    <div className="text-gray-500 text-xs uppercase font-bold">Rated Power</div>
                    <div className="text-white font-mono text-lg">5 kW</div>
                    <div className="text-gray-500 text-xs">Peak Load</div>
                </div>
            </div>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 text-sm space-y-3">
            <h4 className="font-mono text-cyan-400 font-bold text-lg mb-2 flex items-center gap-2">
                <Box size={20} /> Construction Specs
            </h4>
            <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></span>
                    <span><strong>Surfaces:</strong> Flameproof joints with 20 reserved holes. Coated with anti-rust oil. Exterior: RAL 7035 Polyurethane 1321 Anti-corrosion Paint.</span>
                </li>
                <li className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span><strong>Markings:</strong> "Ex" mark and "Strictly Forbidden to Open When Energized" painted in red.</span>
                </li>
                <li className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0"></span>
                    <span><strong>Grounding:</strong> Nickel-plated connectors. Dedicated tag with symbol (⏚).</span>
                </li>
                <li className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 shrink-0"></span>
                    <span><strong>Nameplates:</strong> Securely attached with brass rivets. Displays model, 380V, 5kW, and Ex marking.</span>
                </li>
            </ul>
        </div>
    </div>

    <div className="bg-slate-800/30 p-4 rounded-lg border border-white/5 mt-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <AlertOctagon size={12} className="text-amber-500" />
            <span>CERTIFICATION: Ex demb IIb t4 Gb</span>
        </div>
    </div>
  </div>
);

const PlcContent = () => (
    <div className="space-y-6 text-gray-300">
        <p>The PLC (Model: LX3V-1616MR-A) is the central processing unit. It monitors sensors, controls outputs, and communicates with the HMI.</p>
        
        <PlcWiringDiagram />

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Responding to Alarms</h3>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5">
            <ol className="list-decimal list-inside space-y-3 pl-2 marker:text-cyan-500 text-sm">
                <li><strong>Identify the Alarm:</strong> Read the alarm message carefully on the HMI screen. It will typically identify the component and the nature of the fault (e.g., "Compressor Low Pressure", "Oil Pump Overload").</li>
                <li><strong>Consult this Guide:</strong> Locate the corresponding section in this guide to find troubleshooting steps for that specific component and alarm.</li>
                <li><strong>Acknowledge/Reset:</strong> After resolving the physical issue, the alarm may need to be acknowledged or reset via the HMI touchscreen interface. Follow on-screen prompts.</li>
            </ol>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">I/O Mapping Table</h3>
        <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-800/50">
                    <tr>
                        <th className="px-4 py-3">Input</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Output</th>
                        <th className="px-4 py-3">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-3 font-mono text-cyan-400">X0</td>
                        <td className="px-4 py-3">Emergency Stop</td>
                        <td className="px-4 py-3 font-mono text-purple-400">Y0</td>
                        <td className="px-4 py-3">Compressor Contactor</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-3 font-mono text-cyan-400">X1</td>
                        <td className="px-4 py-3">Start Button</td>
                        <td className="px-4 py-3 font-mono text-purple-400">Y1</td>
                        <td className="px-4 py-3">Fan Contactor</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-3 font-mono text-cyan-400">X2</td>
                        <td className="px-4 py-3">Stop Button</td>
                        <td className="px-4 py-3 font-mono text-purple-400">Y2</td>
                        <td className="px-4 py-3">Oil Pump Contactor</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-3 font-mono text-cyan-400">X3</td>
                        <td className="px-4 py-3">High Pressure Switch</td>
                        <td className="px-4 py-3 font-mono text-purple-400">Y3</td>
                        <td className="px-4 py-3">Solenoid Valve 1</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <WarningBox>
            <p>Do not attempt to modify the PLC program. The control logic is factory-set and any unauthorized changes can lead to unsafe operation.</p>
        </WarningBox>
    </div>
);

const HmiContent = () => (
    <div className="space-y-6 text-gray-300">
        <p>The HMI (Model: PI3102IE) is the primary interface for operating and monitoring the vapor recovery unit.</p>
        
        <div className="my-8">
            <HmiDisplay />
        </div>

        <h3 className="text-xl font-bold text-white mt-8">Troubleshooting: Blank Screen</h3>
        <ol className="list-decimal list-inside space-y-2 pl-2 marker:text-cyan-500">
            <li><strong>Check Power:</strong> Verify main power is on.</li>
            <li><strong>Inspect Connections:</strong> Check 24V DC power connector on back of HMI.</li>
            <li><strong>Power Cycle:</strong> Turn off main breaker for 60 seconds.</li>
            <li><strong>Replacement:</strong> If voltage is present (24V) but screen is black, replace unit.</li>
        </ol>
    </div>
);

const HvacContent = () => (
    <div className="space-y-6 text-gray-300">
        <p>The refrigeration loop uses R-404a refrigerant to cool vapors. Proper pressure maintenance is critical.</p>
        
        <div className="my-8">
            <HvacSystemLoop />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-white/10">
                <span className="text-xs text-gray-500 uppercase block mb-1">Compressor</span>
                <span className="text-white font-bold">Panasonic C4-SB453L8A</span>
                <span className="text-xs text-cyan-400 block mt-1">Scroll Type, 380V</span>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-white/10">
                <span className="text-xs text-gray-500 uppercase block mb-1">Refrigerant</span>
                <span className="text-white font-bold">R-404a</span>
                <span className="text-xs text-cyan-400 block mt-1">4.5kg - 5.0kg Charge</span>
            </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-8">Symptom 1: HMI displays "Compressor Low Pressure Alarm"</h3>
        <p className="text-sm bg-red-900/20 p-3 border-l-2 border-red-500 text-red-200">
            Diagnosis: This alarm indicates the pressure on the suction side of the compressor is too low, most commonly caused by a refrigerant leak in the system (tubing, joints, valves, coils) or a clogged filter-drier / stuck-closed thermal expansion valve starving the compressor.
        </p>
        
        <h4 className="font-bold text-white mt-4">Solution: Leak Detection and Repair</h4>
        <ol className="list-decimal list-inside space-y-3 pl-2 mt-2 marker:text-cyan-500 text-sm">
            <li><strong>Safety Shutdown:</strong> Disconnect all electrical power to the unit at the main breaker. Lock out and tag out the breaker.</li>
            <li><strong>Visual Inspection:</strong> Inspect all tubing and connections for oily residue, a clear sign of a leak.</li>
            <li><strong>Leak Detection:</strong> Use an electronic leak detector or soap bubbles with dry nitrogen to pinpoint the leak.</li>
            <li><strong>Recover Refrigerant:</strong> Safely recover any remaining R-404a from the system.</li>
            <li><strong>Repair Leak:</strong> Repair the leak via brazing or component replacement.</li>
            <li><strong>Evacuate &amp; Recharge:</strong> After repair, pull a deep vacuum (below 500 microns). Recharge the system with 4 to 5 kg of R-404a refrigerant by weight.</li>
            <li><strong>Test Operation:</strong> Restore power and run the unit, monitoring system pressures.</li>
        </ol>

        <h3 className="text-xl font-bold text-white mt-8">Symptom 2: Poor cooling, frost on lines, or compressor noise</h3>
        <p className="text-sm bg-yellow-900/20 p-3 border-l-2 border-yellow-500 text-yellow-200">
            Diagnosis: Thermal Expansion Valve (TXV) Issues. Stuck Open causes flooding (excessive frost, knocking). Stuck Closed causes starvation (poor cooling, low pressure).
        </p>

        <h4 className="font-bold text-white mt-4">Solution: TXV Replacement</h4>
        <ol className="list-decimal list-inside space-y-3 pl-2 mt-2 marker:text-yellow-500 text-sm">
            <li>Confirm the diagnosis by measuring superheat at the evaporator outlet.</li>
            <li>Recover the refrigerant charge.</li>
            <li>Carefully un-braze the old valve and braze in the new one, protecting it from heat. Properly attach the sensing bulb.</li>
            <li>Install a new filter-drier.</li>
            <li>Evacuate and recharge the system to factory specifications.</li>
        </ol>
    </div>
);

const ElectricalContent = () => (
    <div className="space-y-6 text-gray-300">
        <WarningBox>
            <p>High Voltage (380V). Arc Flash Hazard. PPE Required. Only certified electricians should open the explosion-proof panel.</p>
        </WarningBox>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">Voltage Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h4 className="text-red-400 font-bold text-lg mb-1">380V (3-Phase)</h4>
                <p className="text-xs text-gray-400">Main Power: Compressor, Oil Pump, Ring Blower, Fans.</p>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <h4 className="text-yellow-400 font-bold text-lg mb-1">220V (1-Phase)</h4>
                <p className="text-xs text-gray-400">Control Power Supply, V-BOX telemetry.</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-bold text-lg mb-1">24V DC</h4>
                <p className="text-xs text-gray-400">Safe Control Voltage: PLC, HMI, Sensors, Solenoids.</p>
            </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6">Panel Layout (Contactor Assembly)</h3>
        <ElectricalPanelDiagram />

        <h3 className="text-xl font-bold text-white mt-6">Panel Components</h3>
        <ul className="space-y-3">
            <li className="bg-white/5 p-3 rounded flex justify-between items-center border border-white/5">
                <span className="font-mono text-cyan-300">KM1-KM4</span>
                <span className="text-sm text-gray-400">Schneider Contactors (LC1D09M7C)</span>
            </li>
            <li className="bg-white/5 p-3 rounded flex justify-between items-center border border-white/5">
                <span className="font-mono text-cyan-300">KA1-KA4</span>
                <span className="text-sm text-gray-400">Thermal Overload Relays (LRN Series)</span>
            </li>
            <li className="bg-white/5 p-3 rounded flex justify-between items-center border border-white/5">
                <span className="font-mono text-cyan-300">QF1-QF3</span>
                <span className="text-sm text-gray-400">Air Circuit Breakers (Schneider IC65N)</span>
            </li>
        </ul>

        <div className="bg-slate-800 p-4 rounded-lg mt-6 border border-slate-600">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRightLeft size={16} /> How to Reset a Trip</h4>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 text-sm">
                    <p className="mb-3">If a motor overloads, the KA relay will trip to protect it.</p>
                    <ol className="list-decimal list-inside space-y-1 pl-2 marker:text-cyan-500">
                        <li>Power down main breaker.</li>
                        <li>Open the explosion-proof panel using correct tools.</li>
                        <li>Locate the specific KA relay (e.g., KA-Comp for Compressor).</li>
                        <li>Press the <strong>BLUE</strong> reset button on the relay face (shown in demo).</li>
                        <li>Close panel, restore power, and test.</li>
                    </ol>
                </div>
                <div className="shrink-0">
                    <RelayResetAnimation />
                </div>
            </div>
        </div>
    </div>
);

const MembranesContent = () => (
    <div className="space-y-6 text-gray-300">
        <p>The membrane unit is the core of the vapor separation process. It allows hydrocarbon molecules to pass while blocking air.</p>
        
        <div className="flex gap-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-6">
            <Filter className="text-blue-400 shrink-0" size={24} />
            <div>
                <h4 className="font-bold text-blue-300 mb-1">Consumable Item</h4>
                <p className="text-sm">Typical lifespan: <strong>8,000 - 12,000 running hours</strong>. Replacement is required if recovery efficiency drops below 95%.</p>
            </div>
        </div>

        <h4 className="font-bold text-white text-lg border-b border-white/10 pb-2 mb-4">Replacement Procedure</h4>
        <ol className="list-decimal list-inside space-y-4 marker:text-cyan-500 text-sm">
            <li className="pl-2">
                <strong>Isolation:</strong> Isolate the system and ensure all pressure is vented.
            </li>
            <li className="pl-2">
                <strong>Access:</strong> Remove the top flange of the membrane housing.
                <div className="ml-4 mt-1 text-xs text-gray-500 bg-black/30 p-2 rounded inline-block">Torque Spec: 45 Nm</div>
            </li>
            <li className="pl-2">
                <strong>Removal:</strong> Gently pull out the old cartridge. Inspect the housing interior for oil residue (indicates upstream filter failure).
            </li>
            <li className="pl-2">
                <strong>Preparation:</strong> Clean sealing surfaces with a lint-free cloth. Lubricate new O-rings with silicone grease.
            </li>
            <li className="pl-2">
                <strong>Install:</strong> Insert the new cartridge. <span className="text-red-400">Critical: Ensure flow direction arrow points DOWN.</span>
            </li>
        </ol>
    </div>
);

const OilPumpContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                <Droplets className="text-purple-400" size={32} />
            </div>
            <div>
                <h4 className="text-white font-bold text-xl">Oil Pump Repair</h4>
                <p className="text-sm text-gray-400 font-mono">Manufacturer: Kawit (卡维特) | Model: Horizontal 80W/220V</p>
            </div>
        </div>

        <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 mt-1 shrink-0" size={20} />
                <div>
                    <h5 className="font-bold text-red-300 mb-1">Symptom: "Oil Pump Overload" Alarm</h5>
                    <p className="text-sm text-red-100/80">This alarm indicates the pump motor is drawing excessive current. It can be caused by an electrical fault, mechanical seizure, or blockage.</p>
                </div>
            </div>
        </div>

        <h4 className="font-bold text-white text-lg border-b border-white/10 pb-2 mb-4">Troubleshooting & Solutions</h4>
        
        <div className="space-y-6">
            {/* Solution 1 */}
            <div className="bg-slate-800/30 rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-cyan-500/20 p-1.5 rounded text-cyan-400 font-bold text-xs">01</div>
                    <h5 className="text-white font-bold">Electrical Reset</h5>
                </div>
                <p className="text-sm mb-3 text-gray-400">First, attempt to clear the fault by resetting the thermal protection.</p>
                <ol className="list-decimal list-inside space-y-2 text-sm pl-2 marker:text-cyan-500">
                    <li><strong className="text-white">Power Down:</strong> Disconnect all electrical power at the main breaker.</li>
                    <li><strong className="text-white">Access Panel:</strong> Open the explosion-proof control box.</li>
                    <li><strong className="text-white">Reset Relay:</strong> Locate the thermal overload relay (KA-Oil) and press the physical <strong>RESET</strong> button.</li>
                    <li><strong className="text-white">Test:</strong> Close panel, restore power, and run unit. If it trips again, proceed to mechanical checks.</li>
                </ol>
            </div>

            {/* Solution 2 */}
            <div className="bg-slate-800/30 rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-purple-500/20 p-1.5 rounded text-purple-400 font-bold text-xs">02</div>
                    <h5 className="text-white font-bold">Mechanical Seizure Fix</h5>
                </div>
                <p className="text-sm mb-3 text-gray-400">Common after long-term shutdowns. Internal vanes can rust and seize.</p>
                <ol className="list-decimal list-inside space-y-2 text-sm pl-2 marker:text-purple-500">
                    <li><strong className="text-white">Power Down:</strong> Ensure unit is fully de-energized (LOTO).</li>
                    <li><strong className="text-white">Access Pump:</strong> Remove the side cover/inspection plate of the pump housing.</li>
                    <li><strong className="text-white">Clean Vanes:</strong> Inspect vanes for rust. Use a tool to gently free them.</li>
                    <li><strong className="text-white">Manual Rotation:</strong> Manually rotate the shaft (via rear fan) to ensure free movement.</li>
                    <li><strong className="text-white">Reassemble & Test:</strong> Replace cover and test operation.</li>
                </ol>
            </div>

            {/* Solution 3 */}
            <div className="bg-slate-800/30 rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-red-500/20 p-1.5 rounded text-red-400 font-bold text-xs">03</div>
                    <h5 className="text-white font-bold">Replacement</h5>
                </div>
                <p className="text-sm text-gray-400">
                    If resetting fails and the pump is not mechanically seized (or motor is burnt), replace the entire unit. Ensure UL standard compliance for the new unit.
                </p>
            </div>
        </div>
    </div>
);

const AirPumpContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                <Wind className="text-cyan-400" size={32} />
            </div>
            <div>
                <h4 className="text-white font-bold text-xl">Air Pump Repair</h4>
                <p className="text-sm text-gray-400 font-mono">Manufacturer: Haoguan | Model: 380V/300W EXRHG210-7H2-0.37KW</p>
            </div>
        </div>

        <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 mt-1 shrink-0" size={20} />
                <div>
                    <h5 className="font-bold text-red-300 mb-1">Symptom: "Air Pump Overload" Alarm</h5>
                    <p className="text-sm text-red-100/80">
                        This indicates an electrical overload of the air pump motor, often due to a blockage in the vapor lines or a fault in the motor itself.
                    </p>
                </div>
            </div>
        </div>

        <h4 className="font-bold text-white text-lg border-b border-white/10 pb-2 mb-4">Solution Procedure</h4>
        
        <div className="bg-slate-800/30 rounded-xl border border-white/5 p-5">
            <ol className="list-decimal list-inside space-y-3 text-sm pl-2 marker:text-cyan-500">
                <li><strong className="text-white">Power Down & Check for Blockages:</strong> First, follow the Pipeline Maintenance procedure to check for and clear any pipeline blockages.</li>
                <li><strong className="text-white">Access Panel:</strong> Open the explosion-proof control box after ensuring power is off.</li>
                <li><strong className="text-white">Reset Relay:</strong> Locate the thermal overload relay for the air pump and press the reset button.</li>
                <li><strong className="text-white">Test:</strong> Restore power and test the unit. If the alarm does not clear or immediately returns (and pipelines are clear), the pump motor is likely faulty.</li>
                <li><strong className="text-white">Replacement:</strong> If the reset fails, the entire air pump unit must be replaced.</li>
            </ol>
        </div>
    </div>
);

const FanContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Fan className="text-yellow-400" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Explosion-Proof Fan</h4>
                <p className="text-xs text-gray-500">GECO 380V/250W</p>
            </div>
        </div>
        <p className="text-sm">Ensures airflow over the condenser coil for heat exchange.</p>
        
        <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 mt-1 shrink-0" size={20} />
                <div>
                    <h5 className="font-bold text-red-300 mb-1">Issue: Excessive Current Draw</h5>
                    <p className="text-sm text-red-100/80">
                        The fan motor has drawn excessive current, causing the protective relay to trip. This could be due to a seized bearing or an electrical fault.
                    </p>
                </div>
            </div>
        </div>

        <InfoBox>
            <p><strong>Note:</strong> The motor for this fan assembly is a Beifeng model ysb7114 (250W 380V).</p>
        </InfoBox>

        <h4 className="font-bold text-white mt-6 mb-4 border-b border-white/10 pb-2">Resolution Steps</h4>
        <div className="space-y-4">
            <div className="flex gap-4 items-start">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">1</div>
                <div>
                    <h5 className="font-bold text-white text-sm">Power Down</h5>
                    <p className="text-sm">Disconnect all electrical power.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">2</div>
                <div>
                    <h5 className="font-bold text-white text-sm">Manual Check</h5>
                    <p className="text-sm">Attempt to spin the fan blades clockwise by hand (use a tool if necessary, do not put hands inside). They should spin freely with minimal resistance. If seized, the fan must be replaced.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">3</div>
                <div>
                    <h5 className="font-bold text-white text-sm">Electrical Reset</h5>
                    <p className="text-sm">If the blades spin freely, open the explosion-proof control box. Locate the fan's thermal overload relay and press the reset button.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">4</div>
                <div>
                    <h5 className="font-bold text-white text-sm">Test</h5>
                    <p className="text-sm">Restore power. If the fan runs, the issue may have been temporary. If it trips again, the motor windings are likely faulty.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">5</div>
                <div>
                    <h5 className="font-bold text-white text-sm">Replacement</h5>
                    <p className="text-sm">If the fan is seized or fails the electrical reset test, replace the entire fan assembly.</p>
                </div>
            </div>
        </div>
    </div>
);

const MotorContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Component className="text-white" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Electric Motors</h4>
                <p className="text-xs text-gray-500">General Guide (3-Phase Induction)</p>
            </div>
        </div>
        <p className="text-sm">Applies to Compressor, Pump, and Fan motors.</p>
        
        <MotorWiringDiagram />

        <div className="overflow-x-auto border border-white/10 rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-slate-800/50">
                    <tr>
                        <th className="px-4 py-2">Symptom</th>
                        <th className="px-4 py-2">Possible Cause</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-2">Won't Start</td>
                        <td className="px-4 py-2">Tripped Relay</td>
                        <td className="px-4 py-2">Reset KA Relay</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-2">Humming</td>
                        <td className="px-4 py-2">Phase Loss</td>
                        <td className="px-4 py-2">Check fuses/wiring</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                        <td className="px-4 py-2">Overheating</td>
                        <td className="px-4 py-2">Blocked Cooling</td>
                        <td className="px-4 py-2">Clean fins/fan cover</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <WarningBox>
            <p>Always check rotation direction after any wiring changes. Reverse rotation can damage scroll compressors instantly.</p>
        </WarningBox>
    </div>
);

const TankContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Disc className="text-orange-400" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Recovery Tank</h4>
                <p className="text-xs text-gray-500">Liquid Collection & Separation</p>
            </div>
        </div>
        <p className="text-sm">Collects condensed liquid. Contains the Oil-Water separator float mechanism.</p>
        
        {/* NEW VECTOR DIAGRAM FOR TANK */}
        <GasolineTankDiagram />

        <h4 className="font-bold text-white mt-4 mb-2">High Oil Level Alarm / Float Replacement</h4>
        <ol className="list-decimal list-inside text-sm space-y-2 pl-2 marker:text-orange-500">
            <li>Check Oil Pump for operation/overload.</li>
            <li>Check Float Switch (Model: FS610250V07S001).</li>
            <li><strong>Isolate Power:</strong> Ensure the tank area is de-energized.</li>
            <li><strong>Disconnect Wiring:</strong> Open the flange junction box. Disconnect the 2 signal wires.</li>
            <li><strong>Remove Flange:</strong> Remove the 4 mounting bolts.</li>
            <li><strong>Lift & Replace:</strong> Lift out the assembly. Replace float sensor and re-terminate wires securely.</li>
        </ol>
    </div>
);

const ValveContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <SwitchCamera className="text-green-400" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Solenoid Valve</h4>
                <p className="text-xs text-gray-500">Danfoss EVR10 + 018Z6122 Coil</p>
            </div>
        </div>
        <p className="text-sm">Electrically controlled valves for refrigerant and vapor flow.</p>
        
        <div className="bg-black/20 p-4 rounded border border-white/5">
            <h5 className="font-bold text-sm text-white mb-2">Magnetic Field Test:</h5>
            <p className="text-sm">Place a magnetic screwdriver tip near the coil stem while toggling the output in Manual Mode. You should feel a distinct magnetic pull.</p>
        </div>
        <p className="text-sm mt-2">If the coil is hot but valve doesn't open, the internal plunger is stuck (requires rebuilding valve body). If cold and no magnetic pull, check 24V wiring.</p>
    </div>
);

const BaseplateContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Layers className="text-blue-300" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Baseplate Wiring</h4>
                <p className="text-xs text-gray-500">Field Connection Terminals</p>
            </div>
        </div>
        <p className="text-sm">Connection point for all external sensors and actuators entering the main enclosure.</p>
        
        <BaseplateDiagram />

        <InfoBox>
            <p>Blue terminals are Intrinsically Safe (IS) 24V DC. Do not run 220V/380V cables near these lines to prevent signal interference.</p>
        </InfoBox>
    </div>
);

const CloudContent = () => (
    <div className="space-y-6 text-gray-300">
        <p>The V-BOX gateway connects the PLC to the MasarZero cloud for remote monitoring. Reliable internet connectivity is critical for continuous data logging.</p>
        
        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Wifi size={18} /> Connectivity Requirements</h4>
            <p className="text-sm mb-2">For cloud telemetry, the V-BOX requires a stable internet connection. Our recommended hierarchy for connection stability is:</p>
            <ol className="list-decimal list-inside text-sm space-y-1 pl-2 text-gray-300">
                <li><strong>Fiber Optic (Ideal):</strong> Provides the lowest latency and highest reliability.</li>
                <li><strong>Cat6 Ethernet (Preferred):</strong> Standard wired connection.</li>
                <li><strong>WiFi (Last Resort):</strong> Wireless connections are more prone to interference and disconnection. Use only if wired options are impossible.</li>
            </ol>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-black/40 p-3 rounded text-center border border-white/10">
                <div className="text-[10px] font-bold text-gray-500 uppercase">PWR LED</div>
                <div className="text-green-400 font-bold text-sm mt-1">Solid Green</div>
                <div className="text-[10px] text-gray-600">Power OK</div>
            </div>
            <div className="bg-black/40 p-3 rounded text-center border border-white/10">
                <div className="text-[10px] font-bold text-gray-500 uppercase">NET LED</div>
                <div className="text-blue-400 font-bold text-sm mt-1">Blinking</div>
                <div className="text-[10px] text-gray-600">Data Transfer</div>
            </div>
            <div className="bg-black/40 p-3 rounded text-center border border-white/10">
                <div className="text-[10px] font-bold text-gray-500 uppercase">COM LED</div>
                <div className="text-yellow-400 font-bold text-sm mt-1">Rapid Flash</div>
                <div className="text-[10px] text-gray-600">PLC Comms</div>
            </div>
        </div>

        <h4 className="font-bold text-white mt-6">Troubleshooting Connectivity</h4>
        <ul className="space-y-3 list-none pl-0">
             <li className="flex gap-3 items-start bg-slate-800/50 p-3 rounded border border-white/5">
                <span className="bg-white/10 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span className="text-sm"><strong>Physical Check:</strong> Ensure the Ethernet cable is securely clicked into the WAN port (not LAN). Check for cable damage.</span>
            </li>
            <li className="flex gap-3 items-start bg-slate-800/50 p-3 rounded border border-white/5">
                <span className="bg-white/10 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span className="text-sm"><strong>Network Settings:</strong> If using a static IP, verify configuration in the V-BOX local interface. For DHCP, ensure the router is assigning an IP.</span>
            </li>
            <li className="flex gap-3 items-start bg-slate-800/50 p-3 rounded border border-white/5">
                <span className="bg-white/10 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span className="text-sm"><strong>Reboot:</strong> Power cycle the entire machine. The V-BOX takes up to 3 minutes to reconnect.</span>
            </li>
        </ul>
    </div>
);

const PipelineContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Workflow className="text-gray-400" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Pipeline Maintenance</h4>
                <p className="text-xs text-gray-500">Integrity & Flow Assurance</p>
            </div>
        </div>
        
        <p className="text-sm leading-relaxed">The integrity of the vapor recovery pipelines is critical for both performance and safety. Issues are typically categorized as either blockages or leaks. Address any pipeline-related alarms immediately.</p>

        {/* Blockages */}
        <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="bg-blue-500/20 p-1 rounded text-blue-400"><Filter size={18} /></div>
                Troubleshooting Blockages
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-800/50 p-3 rounded border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Symptom</span>
                    <p className="text-sm text-white">HMI shows "Inlet Pressure Low" or "Air Pump Overload".</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Diagnosis</span>
                    <p className="text-sm text-white">Obstruction (ice/sludge) preventing vapor flow. Check inlet, separator, and condenser outlet.</p>
                </div>
            </div>

            <WarningBox>
                <p>Before any work, ensure the machine is off, de-energized, and any connected pipelines are isolated and depressurized.</p>
            </WarningBox>

            <div className="bg-slate-900/50 border border-white/10 rounded-lg p-5">
                <h5 className="text-cyan-400 font-bold mb-3 text-sm uppercase tracking-wider">Nitrogen Purge Procedure</h5>
                <ol className="list-decimal list-inside space-y-3 text-sm pl-2 marker:text-cyan-500 text-gray-300">
                    <li><strong>Disconnect Inlet:</strong> Disconnect the main vapor inlet pipe from the machine.</li>
                    <li><strong>Connect Nitrogen:</strong> Connect a regulated dry nitrogen source to the machine's inlet port.</li>
                    <li><strong>Purge System:</strong> Open the solenoid valves manually or via the HMI (if safe and possible). Pressure: 0.3 to 0.5 MPa (approx. 45-75 PSI).</li>
                    <li><strong>Observe Outlet:</strong> Check for a steady flow of nitrogen from the system's exhaust vent to dislodge ice or debris.</li>
                    <li><strong>Reconnect & Test:</strong> Disconnect nitrogen, reconnect inlet piping, and test operation.</li>
                </ol>
            </div>
        </div>

        {/* Leaks */}
        <div className="mt-8 border-t border-white/10 pt-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="bg-red-500/20 p-1 rounded text-red-400"><Droplets size={18} /></div>
                Troubleshooting Leaks
            </h4>

            <div className="bg-red-950/30 border border-red-500/40 p-4 rounded-lg mb-6 flex items-start gap-4">
                <AlertOctagon className="text-red-500 shrink-0 mt-1" size={24} />
                <div>
                    <h5 className="font-bold text-red-400 text-sm uppercase mb-1">EXTREME DANGER</h5>
                    <p className="text-sm text-red-200/80 leading-relaxed">
                        Gasoline vapor is highly flammable and explosive. A leak creates a severe safety hazard. Address immediately. Do not operate until repaired.
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h5 className="text-xs text-gray-500 uppercase font-bold mb-2">Common Symptoms</h5>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-2 marker:text-gray-600">
                    <li>Strong smell of gasoline around the unit.</li>
                    <li>HMI displays "Low System Pressure" alarms when sealed.</li>
                    <li>Poor recovery performance.</li>
                </ul>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-lg p-5">
                <h5 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-wider">Leak Detection & Repair Protocol</h5>
                <ol className="list-decimal list-inside space-y-3 text-sm pl-2 marker:text-purple-500 text-gray-300">
                    <li><strong>Immediate Shutdown:</strong> Stop the machine and disconnect all power at the main breaker.</li>
                    <li><strong>Ventilate Area:</strong> Ensure the area is well-ventilated to disperse flammable vapors. Eliminate ignition sources.</li>
                    <li><strong>Pressurize with Inert Gas:</strong> Safely purge hydrocarbon vapors. Pressurize pipeline with low pressure dry nitrogen.</li>
                    <li><strong>Locate Leak:</strong> Apply soap bubble solution to all joints, fittings, and valves. Bubbles indicate a leak. Electronic detectors can also be used.</li>
                    <li><strong>Repair:</strong> Depressurize. Tighten fittings, replace gaskets, or replace pipe sections as needed.</li>
                    <li><strong>Test Repair:</strong> Re-pressurize with nitrogen and re-test with soap solution to confirm the seal before returning to service.</li>
                </ol>
            </div>
        </div>
    </div>
);

const GroundingContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Anchor className="text-yellow-600" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Grounding Safety</h4>
                <p className="text-xs text-gray-500">Critical Ex Requirement</p>
            </div>
        </div>

        <p className="text-sm">Proper grounding is the single most important safety feature of any electrical equipment operating in a hazardous or explosive environment. It ensures that any stray electrical current or static discharge is safely dissipated to the earth, preventing sparks that could ignite flammable vapors.</p>

        <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
            <h5 className="text-yellow-400 font-bold mb-2">Importance of Grounding</h5>
            <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Ignition Prevention:</strong> Prevents the buildup of static electricity, which can create a spark and cause an explosion.</li>
                <li><strong>Personnel Safety:</strong> Protects technicians from electric shock during faults.</li>
                <li><strong>Equipment Protection:</strong> Provides a safe path for fault currents, aiding circuit breaker trips to protect sensitive electronics.</li>
            </ul>
        </div>

        <WarningBox>
            <p>NEVER operate the vapor recovery machine without a verified, low-resistance connection to earth ground. Both the internal and external grounding points must be secure. Failure to do so creates a life-threatening risk of explosion and electrocution.</p>
        </WarningBox>

        <h4 className="font-bold text-white mt-4">Inspection & Verification</h4>
        <ul className="space-y-3 list-none pl-0 mt-2">
            <li className="bg-slate-800/50 p-3 rounded border border-white/5">
                <strong className="text-white block mb-1">Visual Inspection</strong>
                <span className="text-sm">Regularly inspect the external grounding wire for fraying, corrosion, or loose connections. Ensure the connection clamp and grounding rod are in good condition.</span>
            </li>
            <li className="bg-slate-800/50 p-3 rounded border border-white/5">
                <strong className="text-white block mb-1">Check Terminal Tightness</strong>
                <span className="text-sm">During routine maintenance inside the electrical panel, verify that the internal grounding bus bar connections are tight and free of corrosion.</span>
            </li>
            <li className="bg-slate-800/50 p-3 rounded border border-white/5">
                <strong className="text-white block mb-1">Resistance Test</strong>
                <span className="text-sm">Periodically, a qualified electrician should perform a ground resistance test (typically &lt; 5 ohms).</span>
            </li>
        </ul>
    </div>
);

const CabinetContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <Box className="text-slate-400" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Exterior Cabinet Maintenance</h4>
                <p className="text-xs text-gray-500">Enclosure Integrity & Ex Rating</p>
            </div>
        </div>
        
        <p className="text-sm">The integrity of the exterior cabinet is essential for protecting internal components and maintaining the unit's explosion-proof rating.</p>

        <div className="bg-red-900/10 border-l-4 border-red-500 p-4 my-4">
            <h5 className="text-red-400 font-bold text-sm mb-1">CRITICAL NOTE</h5>
            <p className="text-xs text-red-200/80">Any breach in the cabinet (significant rust, unsealed holes, damaged gaskets) can invalidate the 'Ex' safety certification and render the unit unsafe for operation in a hazardous area.</p>
        </div>

        <h4 className="font-bold text-white mt-6 mb-3">Inspection Checklist</h4>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2 marker:text-cyan-500">
            <li><strong>Paint & Coating:</strong> Check "camel grey" paint for chipping or scratches exposing metal.</li>
            <li><strong>Corrosion:</strong> Inspect for rust, especially around the base where moisture collects.</li>
            <li><strong>Seals & Gaskets:</strong> Gaskets must be pliable, crack-free, and create a tight seal.</li>
            <li><strong>Fasteners:</strong> Ensure all bolts on Ex enclosures are present and tightened.</li>
            <li><strong>Safety Markings:</strong> Verify "Ex" mark and warning labels are clearly visible.</li>
        </ul>

        <h4 className="font-bold text-white mt-6 mb-3">Repair Procedures</h4>
        <div className="space-y-3">
            <div className="bg-slate-800/50 p-3 rounded border border-white/5">
                <h5 className="text-white font-bold text-sm">Minor Paint Damage</h5>
                <p className="text-xs text-gray-400 mt-1">Clean area, remove loose rust with wire brush, apply metal primer, and touch up with matching paint.</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded border border-white/5">
                <h5 className="text-white font-bold text-sm">Corrosion</h5>
                <p className="text-xs text-gray-400 mt-1">Remove significant rust down to bare metal. Treat, prime, and repaint to prevent recurrence.</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded border border-white/5">
                <h5 className="text-white font-bold text-sm">Damaged Seals</h5>
                <p className="text-xs text-gray-400 mt-1">Replace cracked or brittle gaskets with identical, manufacturer-approved parts to maintain safety rating.</p>
            </div>
        </div>
    </div>
);

const PressureValveContent = () => (
    <div className="space-y-6 text-gray-300">
        <div className="flex items-center gap-3 mb-4">
            <AlertOctagon className="text-red-500" size={28} />
            <div>
                <h4 className="text-white font-bold text-lg">Pressure Vacuum Valve (PVV)</h4>
                <p className="text-xs text-gray-500">Vent Stack Safety Device</p>
            </div>
        </div>

        <p className="text-sm">Located on top of the vent stack, this critical safety device automatically vents excess pressure or relieves vacuum to prevent catastrophic failure.</p>

        <WarningBox>
            <p>Never attempt to block, adjust, or tamper with a pressure relief valve. Doing so can lead to dangerous over-pressurization, risking explosion, serious injury, or death.</p>
        </WarningBox>

        <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5">
                <h5 className="text-yellow-400 font-bold text-sm mb-2">Symptom: Constant Venting</h5>
                <p className="text-xs text-gray-400"><strong>Diagnosis:</strong> Valve stuck partially open (debris/failed spring). Prevents normal operating pressure and wastes vapor.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5">
                <h5 className="text-red-400 font-bold text-sm mb-2">Symptom: High Pressure Alarm</h5>
                <p className="text-xs text-gray-400"><strong>Diagnosis:</strong> Valve stuck closed. Extremely dangerous condition requiring immediate attention.</p>
            </div>
        </div>

        <InfoBox>
            <p>Pressure relief valves are typically sealed and non-serviceable. If confirmed faulty, the only solution is replacement.</p>
        </InfoBox>

        <h4 className="font-bold text-white mt-6 mb-3">Valve Replacement Procedure</h4>
        <ol className="list-decimal list-inside space-y-3 text-sm pl-2 marker:text-cyan-500">
            <li><strong>Immediate Shutdown:</strong> If over-pressurized, perform emergency shutdown. Disconnect main power.</li>
            <li><strong>Depressurize:</strong> Safely vent all pressure. Verify zero pressure with a gauge.</li>
            <li><strong>Remove Old Valve:</strong> Unscrew the old valve from the vent stack. Note orientation and sealing.</li>
            <li><strong>Install New Valve:</strong> Use an identical, manufacturer-approved model. Apply hydrocarbon-compatible thread sealant (e.g., PTFE tape). Tighten to spec.</li>
            <li><strong>Test:</strong> Bring system to pressure and leak test fittings with soap solution.</li>
        </ol>
    </div>
);

const SOPContent = () => (
    <div className="space-y-6 text-gray-300">
        <h4 className="font-bold text-white text-lg">Standard Operating Procedure</h4>
        
        <div className="relative border-l-2 border-cyan-800 pl-6 ml-2 space-y-8">
            {/* Step 1 */}
            <div className="relative">
                <span className="absolute -left-[31px] top-0 w-6 h-6 bg-cyan-900 rounded-full border-2 border-cyan-500 text-[10px] flex items-center justify-center text-white font-bold">1</span>
                <h5 className="text-cyan-400 font-bold mb-1">Pre-Start Checks</h5>
                <ul className="text-sm list-disc list-inside text-gray-400">
                    <li>Verify Grounding cable is secure.</li>
                    <li>Check Oil level in sight glass.</li>
                    <li>Ensure Vapor Inlet Valve (V1) is OPEN.</li>
                </ul>
            </div>

            {/* Step 2 */}
            <div className="relative">
                <span className="absolute -left-[31px] top-0 w-6 h-6 bg-cyan-900 rounded-full border-2 border-cyan-500 text-[10px] flex items-center justify-center text-white font-bold">2</span>
                <h5 className="text-cyan-400 font-bold mb-1">Start Up</h5>
                <ul className="text-sm list-disc list-inside text-gray-400">
                    <li>Turn Main Isolator to ON.</li>
                    <li>Wait for HMI to boot (approx 30s).</li>
                    <li>Press the physical <span className="text-green-400 font-bold">GREEN</span> button.</li>
                    <li>Confirm fan starts immediately.</li>
                </ul>
            </div>

            {/* Step 3 */}
            <div className="relative">
                <span className="absolute -left-[31px] top-0 w-6 h-6 bg-cyan-900 rounded-full border-2 border-cyan-500 text-[10px] flex items-center justify-center text-white font-bold">3</span>
                <h5 className="text-cyan-400 font-bold mb-1">Operation Monitoring</h5>
                <p className="text-sm text-gray-400 mb-2">Monitor HMI Main Screen for nominal values:</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/30 p-2 rounded">
                    <div>Pressure: -20 to -5 kPa</div>
                    <div>Temp: -25°C to -30°C</div>
                </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
                <span className="absolute -left-[31px] top-0 w-6 h-6 bg-cyan-900 rounded-full border-2 border-cyan-500 text-[10px] flex items-center justify-center text-white font-bold">4</span>
                <h5 className="text-cyan-400 font-bold mb-1">Shut Down</h5>
                <ul className="text-sm list-disc list-inside text-gray-400">
                    <li>Press <span className="text-red-400 font-bold">RED</span> Stop button.</li>
                    <li>System enters "Purge Mode" (Fan runs for 60s).</li>
                    <li>Wait for complete stop before closing valves.</li>
                </ul>
            </div>
        </div>
    </div>
);

// --- Exported Configuration ---

export interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.FC;
}

export const MAINTENANCE_SECTIONS: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: BookOpen,
    content: IntroductionContent,
  },
  {
    id: 'plc',
    title: 'PLC Guide',
    icon: Cpu,
    content: PlcContent,
  },
  {
    id: 'hmi',
    title: 'HMI (Display)',
    icon: Monitor,
    content: HmiContent,
  },
  {
    id: 'hvac',
    title: 'HVAC System',
    icon: Thermometer,
    content: HvacContent,
  },
  {
    id: 'electrical',
    title: 'Electrical Panel',
    icon: Zap,
    content: ElectricalContent,
  },
  {
    id: 'membranes',
    title: 'Membranes',
    icon: Filter,
    content: MembranesContent,
  },
  {
    id: 'oil_pump',
    title: 'Oil Pump',
    icon: Droplets,
    content: OilPumpContent,
  },
  {
    id: 'air_pump',
    title: 'Ring Blower/Air Pump/Vacuum Pump',
    icon: Wind,
    content: AirPumpContent,
  },
  {
    id: 'fan',
    title: 'Ex-Proof Fan',
    icon: Fan,
    content: FanContent,
  },
  {
    id: 'motor',
    title: 'Electric Motors',
    icon: Component,
    content: MotorContent,
  },
  {
    id: 'tank',
    title: 'Gasoline Tank',
    icon: Disc,
    content: TankContent,
  },
  {
    id: 'valve',
    title: 'Solenoid Valve',
    icon: SwitchCamera,
    content: ValveContent,
  },
  {
    id: 'baseplate',
    title: 'Baseplate Wiring',
    icon: Layers,
    content: BaseplateContent,
  },
  {
    id: 'cloud',
    title: 'Cloud Telemetry',
    icon: Cloud,
    content: CloudContent,
  },
  {
    id: 'pipeline',
    title: 'Pipeline',
    icon: Workflow,
    content: PipelineContent,
  },
  {
    id: 'grounding',
    title: 'Grounding',
    icon: Anchor,
    content: GroundingContent,
  },
  {
    id: 'cabinet',
    title: 'Exterior Cabinet',
    icon: Box,
    content: CabinetContent,
  },
  {
    id: 'pressure_valve',
    title: 'Pressure Valve',
    icon: AlertOctagon,
    content: PressureValveContent,
  },
  {
    id: 'operation',
    title: 'SOP',
    icon: Play,
    content: SOPContent,
  }
];
