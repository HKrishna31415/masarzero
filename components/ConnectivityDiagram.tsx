
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wifi, Server, Activity } from 'lucide-react';

const ConnectivityDiagram: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#0e1424] relative overflow-hidden rounded-2xl p-8 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Wifi className="text-blue-400" size={20} />
                        Telemetry Uplink
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">V-BOX IoT Gateway Configuration</p>
                </div>
            </div>

            {/* Topology Visual */}
            <div className="flex-grow flex items-center justify-center relative">
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path 
                        d="M 150 150 L 300 150" 
                        stroke="#334155" strokeWidth="4" strokeDasharray="8 8" 
                    />
                    <motion.path 
                        d="M 150 150 L 300 150" 
                        stroke="#0ea5e9" strokeWidth="4" strokeDasharray="8 8" 
                        initial={{ strokeDashoffset: 20 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.path 
                        d="M 420 150 L 550 150" 
                        stroke="#334155" strokeWidth="4" 
                    />
                    <motion.circle cx="485" cy="150" r="4" fill="#22c55e">
                        <animate 
                            attributeName="cx" 
                            from="420" to="550" 
                            dur="1.5s" 
                            repeatCount="indefinite" 
                        />
                    </motion.circle>
                </svg>

                <div className="flex justify-between items-center w-full max-w-2xl z-10">
                    
                    {/* Node 1: PLC */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center shadow-lg">
                            <Server size={40} className="text-slate-400" />
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-bold text-white block">PLC Core</span>
                            <span className="text-xs text-gray-500 font-mono">RS-485</span>
                        </div>
                    </div>

                    {/* Node 2: V-BOX */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-28 h-28 bg-[#0f172a] rounded-xl border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center relative">
                            <Activity size={48} className="text-cyan-400" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-bold text-white block">V-BOX Gateway</span>
                            <span className="text-xs text-cyan-400 font-mono">Gateway Online</span>
                        </div>
                    </div>

                    {/* Node 3: Cloud */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-blue-900/20 rounded-full border-2 border-blue-500/50 flex items-center justify-center shadow-lg">
                            <Cloud size={40} className="text-blue-400" />
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-bold text-white block">MasarZero Cloud</span>
                            <span className="text-xs text-gray-500 font-mono">AES-256 Encrypted</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Config Data */}
            <div className="mt-8 bg-black/40 rounded-lg p-4 border border-white/5 font-mono text-xs">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-500">IP ADDRESS</span>
                        <span className="text-white">192.168.1.205</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-500">SUBNET</span>
                        <span className="text-white">255.255.255.0</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span className="text-gray-500">GATEWAY</span>
                        <span className="text-white">192.168.1.1</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span className="text-gray-500">DNS</span>
                        <span className="text-white">8.8.8.8</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ConnectivityDiagram;
