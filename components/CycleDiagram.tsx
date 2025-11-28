
import React from 'react';
import { motion } from 'framer-motion';

const CycleDiagram: React.FC = () => {
  return (
    <div className="relative w-full aspect-video bg-[#0B1021] rounded-xl border border-white/10 overflow-hidden select-none shadow-2xl">
        
        {/* --- Ground Line --- */}
        <div className="absolute top-[55%] left-0 right-0 h-0.5 bg-slate-700 border-t border-slate-600 border-dashed z-10" />
        <div className="absolute top-[52%] right-4 text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider z-10">Ground Level</div>

        {/* --- USTs (Underground) --- */}
        <div className="absolute left-[5%] top-[60%] w-[60%] h-[30%] flex gap-4 z-0">
            
            {/* UST 1 (Farther) */}
            <div className="flex-1 border-2 border-slate-600 bg-[#1e1b4b]/30 rounded-lg relative overflow-hidden flex flex-col justify-end">
                {/* Vapor Space */}
                <div className="absolute top-0 left-0 right-0 bottom-[40%] flex items-center justify-center">
                     <motion.div 
                        className="w-full h-full bg-purple-500/5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                     />
                     <span className="absolute top-2 text-[9px] font-bold text-purple-300/40 tracking-widest">VAPOR SPACE</span>
                </div>
                {/* Liquid Fuel */}
                <div className="relative h-[40%] w-full bg-cyan-900/80 border-t border-cyan-500/50">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-[9px] font-bold text-cyan-200/60 tracking-widest">LIQUID FUEL</span>
                    </div>
                </div>
            </div>

            {/* UST 2 (Buffer/Closer) */}
            <div className="flex-1 border-2 border-slate-600 bg-[#1e1b4b]/30 rounded-lg relative overflow-hidden flex flex-col justify-end">
                 {/* Vapor Space */}
                 <div className="absolute top-0 left-0 right-0 bottom-[40%] flex items-center justify-center">
                     <motion.div 
                        className="w-full h-full bg-purple-500/5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                     />
                     <span className="absolute top-2 text-[9px] font-bold text-purple-300/40 tracking-widest">BUFFER</span>
                </div>
                {/* Liquid Fuel */}
                <div className="relative h-[40%] w-full bg-cyan-900/80 border-t border-cyan-500/50">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>
            </div>
        </div>

        {/* --- VRU (Above Ground) --- */}
        <div className="absolute right-[10%] top-[15%] w-[22%] h-[35%] border-2 border-cyan-500/50 bg-[#0f172a] rounded-xl z-20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
             <div className="w-16 h-16 rounded-full border border-cyan-400/30 flex items-center justify-center relative mb-2">
                <motion.div 
                    className="absolute inset-0 rounded-full border-t-2 border-cyan-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
            </div>
            <span className="text-xs font-bold text-white tracking-wider">VRU CORE</span>
            <div className="flex gap-1 mt-1">
                <motion.div className="w-1.5 h-1.5 bg-green-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
                <span className="text-[9px] text-green-400 font-mono">PROCESSING</span>
            </div>
        </div>

        {/* --- SVG Layer for Flow Lines --- */}
        {/* ViewBox 0 0 800 450 corresponds to roughly 16:9 aspect ratio */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible" viewBox="0 0 800 450">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 1. Vapor Flow: USTs -> VRU (Dotted White) */}
            {/* UST 1 Center X ~150, Top Y ~270 */}
            {/* UST 2 Center X ~390, Top Y ~270 */}
            {/* VRU Left Intake X ~540, Y ~160 */}
            
            {/* From UST 1 to Main Line */}
            <motion.path 
                d="M 150 270 L 150 200 L 390 200"
                stroke="white" strokeWidth="2" strokeDasharray="6 6" fill="none" strokeOpacity="0.8"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* From UST 2 to Main Line */}
            <motion.path 
                d="M 390 270 L 390 200"
                stroke="white" strokeWidth="2" strokeDasharray="6 6" fill="none" strokeOpacity="0.8"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Main Line into VRU */}
            <motion.path 
                d="M 390 200 L 544 200 L 544 160"
                stroke="white" strokeWidth="2" strokeDasharray="6 6" fill="none" strokeOpacity="0.8"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Arrow head into VRU */}
            <motion.path 
                d="M 540 165 L 544 158 L 548 165" 
                stroke="white" strokeWidth="2" fill="none" opacity="0.8"
            />


            {/* 2. Cycle Return Loop: VRU -> Both USTs (Dotted White, Lighter) */}
            {/* VRU Right Outlet X ~710, Y ~160 */}
            {/* Return Line runs high and drops down */}
            
            {/* Main Return Line from VRU */}
            <motion.path 
                d="M 720 160 L 750 160 L 750 250 L 200 250"
                stroke="white" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeOpacity="0.4"
                animate={{ strokeDashoffset: [20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Drop to UST 2 */}
            <motion.path 
                d="M 440 250 L 440 280"
                stroke="white" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeOpacity="0.4"
                animate={{ strokeDashoffset: [20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Drop to UST 1 */}
            <motion.path 
                d="M 200 250 L 200 280"
                stroke="white" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeOpacity="0.4"
                animate={{ strokeDashoffset: [20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />


            {/* 3. Recovered Gasoline: VRU -> UST 2 Only (Solid Cyan) */}
            {/* VRU Bottom X ~630, Y ~225 */}
            {/* UST 2 Liquid Entry X ~480, Y ~350 */}
            
            <motion.path 
                d="M 630 225 L 630 380 L 480 380 L 480 340"
                stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0.8 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Animated Droplet on Liquid Line */}
            <motion.circle r="4" fill="#fff">
                <animateMotion 
                    dur="2.5s" 
                    repeatCount="indefinite" 
                    path="M 630 225 L 630 380 L 480 380 L 480 340"
                />
            </motion.circle>

        </svg>

        {/* Labels */}
        <div className="absolute top-[42%] left-[45%] text-center z-20">
             <div className="bg-black/60 border border-white/20 px-2 py-0.5 rounded text-[8px] text-white font-mono backdrop-blur-sm">
                VAPOR INTAKE
             </div>
        </div>

        <div className="absolute top-[53%] right-[2%] text-center z-20">
             <div className="bg-black/60 border border-white/20 px-2 py-0.5 rounded text-[8px] text-slate-300 font-mono backdrop-blur-sm">
                EXCESS RETURN
             </div>
        </div>

        <div className="absolute bottom-[10%] right-[25%] text-center z-20">
             <div className="bg-cyan-900/80 border border-cyan-500/30 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-[9px] font-bold text-cyan-200">LIQUID RECOVERY</span>
             </div>
        </div>

    </div>
  );
};

export default CycleDiagram;
