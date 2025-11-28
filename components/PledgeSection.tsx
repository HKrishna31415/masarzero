
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake, ScanLine, Droplets, DollarSign } from 'lucide-react';

const ZeroCostIcon = ({ className }: { className?: string }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M258 21.89c-.5 0-1.2 0-1.8.12-4.6.85-10.1 5.1-13.7 14.81-3.8 9.7-4.6 23.53-1.3 38.34 3.4 14.63 10.4 27.24 18.2 34.94 7.6 7.7 14.5 9.8 19.1 9 4.8-.7 10.1-5.1 13.7-14.7 3.8-9.64 4.8-23.66 1.4-38.35-3.5-14.8-10.4-27.29-18.2-34.94-6.6-6.8-12.7-9.22-17.4-9.22zM373.4 151.4c-11 .3-24.9 3.2-38.4 8.9-15.6 6.8-27.6 15.9-34.2 24.5-6.6 8.3-7.2 14.6-5.1 18.3 2.2 3.7 8.3 7.2 20 7.7 11.7.7 27.5-2.2 43-8.8 15.5-6.7 27.7-15.9 34.3-24.3 6.6-8.3 7.1-14.8 5-18.5-2.1-3.8-8.3-7.1-20-7.5-1.6-.3-3-.3-4.6-.3zm-136.3 92.9c-6.6.1-12.6.9-18 2.3-11.8 3-18.6 8.4-20.8 14.9-2.5 6.5 0 14.3 7.8 22.7 8.2 8.2 21.7 16.1 38.5 20.5 16.7 4.4 32.8 4.3 44.8 1.1 12.1-3.1 18.9-8.6 21.1-15 2.3-6.5 0-14.2-8.1-22.7-7.9-8.2-21.4-16.1-38.2-20.4-9.5-2.5-18.8-3.5-27.1-3.4zm160.7 58.1L336 331.7c4.2.2 14.7.5 14.7.5l6.6 8.7 54.7-28.5-14.2-10zm-54.5.1l-57.4 27.2c5.5.3 18.5.5 23.7.8l49.8-23.6-16.1-4.4zm92.6 10.8l-70.5 37.4 14.5 18.7 74.5-44.6-18.5-11.5zm-278.8 9.1a40.33 40.33 0 0 0-9 1c-71.5 16.5-113.7 17.9-126.2 17.9H18v107.5s11.6-1.7 30.9-1.8c37.3 0 103 6.4 167 43.8 3.4 2.1 10.7 2.9 19.8 2.9 24.3 0 61.2-5.8 69.7-9C391 452.6 494 364.5 494 364.5l-32.5-28.4s-79.8 50.9-89.9 55.8c-91.1 44.7-164.9 16.8-164.9 16.8s119.9 3 158.4-27.3l-22.6-34s-82.8-2.3-112.3-6.2c-15.4-2-48.7-18.8-73.1-18.8z"></path></svg>
);

const MutualBenefitIcon = ({ className }: { className?: string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M216.4 18.66c-3 35.94 12.6 64.01 28.1 88.94 15.5 24.9 30.6 47 32.2 72.3 1.2 17.3-4.6 34.5-11.5 53-6.9 18.6-14.8 38.4-15.5 60.9l18 .6c.5-18.5 7.4-36.4 14.4-55.2 6.9-18.8 14-38.5 12.6-60.5-2-31.5-19.8-56.3-35-80.65-15.1-24.34-27.9-47.81-25.3-77.87l-18-1.52zm134.2 9.52c-18.7 10.56-39.1 23.47-52.1 37.64-7.9 8.63-12.8 17.38-13.9 25.86-1 7.53.8 15.42 7.3 24.72 20.2-.7 35.3-13.8 45.7-33.24 8.9-16.54 13.3-37.15 13-54.98zM141.7 97.64c-1.1.01-2.2.04-3.2.07-5.7.18-11 .73-15.9 1.49 10.5 16.8 30.5 35.8 52.2 46.8 13.1 6.6 26.6 10.4 38.8 10.1 10.8-.2 20.4-3.5 29-10.9-1.6-8.6-6.2-15.9-13.9-22.5-8.8-7.5-21.4-13.7-35.5-18-15.4-4.7-32.6-6.92-48.2-7.06-1.1-.01-2.2-.01-3.3 0zM347.5 208.2c-2.1.1-4.1.3-6.1.5-14.2 1.8-26.1 8-34.8 22.2 3.8 3.9 8.1 6 13.1 7 6.6 1.3 14.7.4 23.2-2.5 12.7-4.2 26.3-12.8 36.8-22-10-3.3-20.5-5.2-30.3-5.2h-1.9zM32 311v18h204.3c-1.1 7.3-2.8 17.7-5.5 28.8-5 21-14.4 44.1-24.2 51.7-12.5 9.6-29.8 10.2-49.6 7.9-3.8-2.4-14.6-9.6-25.1-18.9-6.4-5.6-12.4-12-16-17.6-3.6-5.7-4.3-9.8-3.5-12.4-.1.6-.1 0 2.2-.9 2.4-.9 6.2-1.7 10.1-2 7.8-.7 15.5 0 15.5 0l1.6-18s-2.2-.2-5.6-.3c-3.5-.1-8.1-.1-13 .3-4.9.5-10.1 1.3-15.1 3.2-4.9 1.9-10.55 5.4-12.74 12.1-3.25 9.8.24 19.5 5.34 27.6 4.9 7.9 11.9 15 19 21.2-13.6-1.9-27.53-3.1-40.68-1-3.49-6.9-7.94-14.2-15.19-20.1-8.92-7.3-21.63-11.8-39.25-12.2l-.38 18c14.84.3 22.78 3.7 28.25 8.2 3.71 3 6.49 6.9 9.04 11.4-3.48 1.7-6.87 3.7-10.13 6.1-10.6 7.9-14.53 20.9-17.66 32.2-3.13 11.2-4.44 21-4.44 21l17.84 2.4s1.18-8.7 3.94-18.6c2.74-9.8 8.09-20.4 11.06-22.6 16.99-12.6 42.6-9.1 71.1-4.4 28.4 4.7 60 10.4 84.4-8.4 8-6.2 13.9-14.9 18.6-24.6 4.8 10.5 11.7 19.6 20 27.5-10.7 2.7-20 7.5-28.1 13.3-13.4 9.7-24 21.7-34.8 31.5l12 13.4c8-7.3 15.3-14.8 22.6-21.4 4.1 7.3 9.9 13.1 16.4 17.3 10.4 6.8 22.2 10.3 33 12.9l4.2-17.4c-10-2.5-20-5.7-27.3-10.5-5.5-3.6-9.6-7.7-12-13.6 10.1-6.5 20.8-10.4 35.4-9.6 6.5 3.7 13.3 7 20.3 9.8 26.6 10.5 56.4 14.4 82.5 12 16.4-1.6 32.8-11 47.4-22 6.6 5.3 12 11.7 15.7 18 5.3 9 6.5 17.7 5.3 21.6l17 5.6c4-11.7.2-24.5-6.8-36.4-4.3-7.2-9.9-14.1-16.8-20.3.1 0 .1-.1.2-.1 18-15.1 31.3-29.8 31.3-29.8l-13.2-12.2s-12.8 13.9-29.7 28.2c-17 14.3-38.8 28.2-52 29.4-23 2.2-50.6-1.4-74.3-10.8-23.6-9.3-43-24.2-51.9-43.8-2.6-5.7.7-22 7.1-36 3-6.6 6.2-12.5 8.8-17 3.8 2 8.1 4.4 12.9 7.2 13 7.6 27.9 18 34.1 25.5 4.6 5.5 10.6 18.6 14.7 29.7 4.1 11.2 6.7 20.5 6.7 20.5l17.4-4.8s-2.8-10-7.2-21.9c-2.8-7.9-6.2-16.5-10.5-24.2 4.1-.6 9.5-.6 15.7.6 12.2 2.4 26.8 8.5 39 17.5l10.6-14.6c-14.5-10.5-31-17.6-46.2-20.5-5.7-1.1-11.3-1.8-16.7-1.6-5.1.1-9.9 1-14.2 2.8-9.5-9.3-22.6-17.6-34.2-24.5-.8-.5-1.6-.9-2.4-1.4H480v-18H32z"></path>
  </svg>
);

const pledgeItems = [
  {
    icon: ZeroCostIcon,
    title: 'Zero Upfront Cost',
    description: 'We install our sophisticated Vapor Recovery Units at your industrial site with no capital expenditure required from you. The financial risk is on us.',
  },
  {
    icon: Handshake,
    title: 'Shared Success',
    description: 'Our success is directly tied to yours. We don\'t get paid unless our technology performs. We simply take a percentage of the profits from the fuel our VRU recovers.',
  },
  {
    icon: MutualBenefitIcon,
    title: 'Mutual Benefit',
    description: 'You reduce waste, achieve environmental compliance, and gain a new revenue stream without any initial investment. We succeed only when you do.',
  },
];

// --- Vector Graphics for Pipeline ---

const AnalysisGraphic = () => (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        {/* Rotating Scan Ring */}
        <motion.div 
            className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Grid */}
        <div className="absolute inset-4 border border-cyan-900/50 rounded-full bg-cyan-950/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        </div>
        {/* Scanning Beam */}
        <motion.div 
            className="absolute w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_#22d3ee]"
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <ScanLine size={48} className="text-cyan-300 relative z-10" />
        <div className="absolute -bottom-12 text-cyan-400 font-mono text-xs tracking-widest">SCANNING PARAMETERS...</div>
    </div>
);

const InstallationGraphic = () => (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        {/* Platform */}
        <div className="absolute bottom-10 w-32 h-2 bg-blue-500/20 rounded-full" />
        
        {/* Falling Blocks Animation */}
        <div className="relative w-32 h-40 flex flex-col-reverse items-center justify-start">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-16 h-8 bg-blue-600/80 border border-blue-400 rounded-sm mb-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-sm"
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: i * 0.6, 
                        ease: "backOut",
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                />
            ))}
        </div>
        
        <div className="absolute -bottom-12 text-blue-400 font-mono text-xs tracking-widest">SYSTEM ASSEMBLY</div>
    </div>
);

const RecoveryGraphic = () => (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center overflow-hidden">
        {/* Vapor In (Top) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full flex justify-center gap-2">
            {[0, 1, 2, 3].map(i => (
                <motion.div
                    key={`vapor-${i}`}
                    className="w-1 h-2 bg-gray-400/50 rounded-full blur-sm"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 80, opacity: [0, 1, 0] }}
                    transition={{ 
                        duration: 1.5, 
                        delay: i * 0.2, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                />
            ))}
        </div>

        {/* Condenser Coil Graphic */}
        <svg className="absolute top-24 w-24 h-12 text-indigo-500/50" viewBox="0 0 100 50">
            <path d="M0 10 Q 25 40 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 25 Q 25 55 50 25 T 100 25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Liquid Collection Tank (Bottom) */}
        <div className="absolute bottom-20 w-24 h-24 border-2 border-indigo-500/50 rounded-b-xl bg-indigo-950/20 overflow-hidden backdrop-blur-sm">
            <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-indigo-500/60"
                animate={{ height: ['0%', '90%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Droplets size={20} className="text-indigo-300 drop-shadow-lg" />
            </div>
        </div>

        <div className="absolute -bottom-12 text-indigo-400 font-mono text-xs tracking-widest">PHASE CONVERSION</div>
    </div>
);

const RevenueGraphic = () => (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                    <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Central Source Node */}
            <motion.circle 
                cx="100" cy="30" r="15" 
                fill="#0f172a" stroke="#22d3ee" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
            />
            <text x="100" y="35" textAnchor="middle" fill="#22d3ee" fontSize="16" fontWeight="bold">$</text>

            {/* Flow Path Main */}
            <motion.path
                d="M100 45 L100 80"
                stroke="#22d3ee" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Splitter Node */}
            <motion.path
                d="M100 80 L85 95 L115 95 Z"
                fill="#3b82f6" opacity="0.8"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.5 }}
                style={{ transformOrigin: '100px 90px' }}
            />

            {/* Left Flow (Client) */}
            <motion.path
                d="M90 90 L40 140"
                stroke="url(#revGradient)" strokeWidth="3" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                transition={{ duration: 0.8, delay: 0.8 }}
            />
            
            {/* Right Flow (MZ) */}
            <motion.path
                d="M110 90 L160 140"
                stroke="url(#revGradient)" strokeWidth="3" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                transition={{ duration: 0.8, delay: 0.8 }}
            />

            {/* Moving Particles */}
            <motion.circle r="3" fill="#fff">
                <animateMotion
                    path="M100 45 L100 80"
                    dur="1s" repeatCount="indefinite"
                />
            </motion.circle>
             <motion.circle r="2" fill="#fff">
                <animateMotion
                    path="M90 90 L40 140"
                    dur="1.5s" begin="0.5s" repeatCount="indefinite"
                />
            </motion.circle>
             <motion.circle r="2" fill="#fff">
                <animateMotion
                    path="M110 90 L160 140"
                    dur="1.5s" begin="0.5s" repeatCount="indefinite"
                />
            </motion.circle>

            {/* Left Stack (Client) - Shorter */}
            <g transform="translate(20, 140)">
                <text x="20" y="55" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">CLIENT</text>
                {[0,1,2].map(i => (
                    <motion.rect
                        key={`l-${i}`}
                        x="0" y={30 - (i*8)} width="40" height="6" rx="2"
                        fill="#22d3ee" opacity="0.8"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + (i*0.3), duration: 0.3 }}
                    />
                ))}
            </g>

            {/* Right Stack (MZ) - Taller */}
            <g transform="translate(140, 140)">
                <text x="20" y="55" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">MZ</text>
                {[0,1,2,3,4,5,6,7,8].map(i => (
                    <motion.rect
                        key={`r-${i}`}
                        x="0" y={30 - (i*8)} width="40" height="6" rx="2"
                        fill="#3b82f6" opacity="0.8"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + (i*0.3), duration: 0.3 }}
                    />
                ))}
            </g>
        </svg>
        
        <div className="absolute -bottom-12 text-sky-400 font-mono text-xs tracking-widest">SHARED PROFIT</div>
    </div>
);


const PartnershipPipeline = () => {
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const pipelineSteps = [
        { id: 0, title: 'Analysis', subtitle: 'Site Evaluation', color: 'text-cyan-400', borderColor: 'border-cyan-500', Graphic: AnalysisGraphic },
        { id: 1, title: 'Installation', subtitle: 'Zero-Cost Setup', color: 'text-blue-400', borderColor: 'border-blue-500', Graphic: InstallationGraphic },
        { id: 2, title: 'Recovery', subtitle: 'Automated Process', color: 'text-indigo-400', borderColor: 'border-indigo-500', Graphic: RecoveryGraphic },
        { id: 3, title: 'Revenue', subtitle: 'Shared Profit', color: 'text-sky-400', borderColor: 'border-sky-500', Graphic: RevenueGraphic },
    ];

    return (
        <div className="w-full bg-[#080b1a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row">
            {/* Left Side: Navigation Steps */}
            <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-slate-900/50">
                {pipelineSteps.map((step, index) => {
                    const isActive = activeStage === index;
                    return (
                        <div 
                            key={step.id}
                            className={`relative flex-1 p-4 lg:p-6 cursor-pointer transition-all duration-500 group ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                            onClick={() => setActiveStage(index)}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent ${step.title === 'Analysis' ? 'via-cyan-500' : step.title === 'Installation' ? 'via-blue-500' : step.title === 'Recovery' ? 'via-indigo-500' : 'via-sky-500'} to-transparent`}
                                />
                            )}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className={`text-xs font-mono uppercase tracking-widest mb-1 block ${isActive ? step.color : 'text-gray-500'}`}>Step 0{index + 1}</span>
                                    <h3 className={`text-lg lg:text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{step.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>
                                </div>
                                {isActive && (
                                    <div className={`w-2 h-2 rounded-full ${step.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right Side: Visualization Stage */}
            <div className="w-full lg:w-2/3 relative flex items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[350px] lg:min-h-[500px] bg-gradient-to-br from-[#080b1a] to-[#0f1226]">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                {/* Animated Center Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStage}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full flex justify-center"
                    >
                        {React.createElement(pipelineSteps[activeStage].Graphic)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const PledgeSection: React.FC = () => {
    const pledgeCardVariants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0 },
    };

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Pledge Header */}
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
                The <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">MasarZero</span> Pledge
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                We're revolutionizing the energy industry by removing financial barriers and demonstrating ultimate confidence in our technology. Our performance is our promise, and our partnership is your profit.
            </p>
        </div>

        {/* Pledge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pledgeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="bg-slate-900/50 border border-slate-700 p-8 rounded-xl text-center flex flex-col items-center hover:border-cyan-500/30 transition-colors"
                variants={pledgeCardVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 border border-slate-600 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm flex-grow leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Partnership Model in Action - NEW ANIMATION */}
        <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">Partnership In Motion</h3>
            <p className="mt-3 max-w-2xl mx-auto text-gray-400">
                Experience the frictionless journey from assessment to monetization.
            </p>
        </div>
        
        <motion.div 
            className="w-full max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <PartnershipPipeline />
        </motion.div>

      </div>
    </div>
  );
};

export default PledgeSection;
