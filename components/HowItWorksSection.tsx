
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Truck, Wind, Droplets, ArrowDown, DollarSign } from 'lucide-react';

const stepText = [
  { title: "Truck Dispenses", description: "A tanker truck arrives and connects to the primary underground storage tank (UST) to begin refueling.", icon: Truck, color: "bg-blue-500" },
  { title: "Vapor Displacement", description: "As liquid fuel fills the tank, it displaces gasoline vapor, which is fed into the MasarZero VRU.", icon: Wind, color: "bg-purple-500" },
  { title: "Condensation", description: "The VRU's patented system compresses and condenses the vapor, converting it back into pure, liquid gasoline.", icon: Droplets, color: "bg-cyan-500" },
  { title: "Efficient Recovery", description: "Our technology achieves a 99% recovery efficiency rate, minimizing waste and maximizing value.", icon: ArrowDown, color: "bg-green-500" },
  { title: "Value Returned", description: "The recovered, sellable fuel is returned to a separate tank, creating a new, immediate revenue stream.", icon: DollarSign, color: "bg-yellow-500" },
];

const AnimatedText: React.FC<{ scrollYProgress: any, start: number, end: number, index: number }> = ({ scrollYProgress, start, end, index }) => {
    const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [20, 0, 0, -20]);
    
    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-full max-w-lg text-center p-6 glass-card rounded-2xl border border-white/10 backdrop-blur-md z-10"
        >
            <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                    {index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{stepText[index].title}</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{stepText[index].description}</p>
        </motion.div>
    );
};

const AnimatedParticle: React.FC<{ path: string; duration: number; delay: number; color: string; }> = ({ path, duration, delay, color }) => {
  return (
    <motion.circle
      cx="0"
      cy="0"
      r="4"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{
          opacity: [0, 1, 1, 0],
          offsetDistance: "100%",
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1]
      }}
      style={{ offsetPath: `path("${path}")` }}
    />
  );
};

// --- Mobile View Component ---
const MobileHowItWorks = () => {
    return (
        <div className="py-20 px-4 md:hidden overflow-hidden relative min-h-screen bg-[#000212]">
             {/* Background Title */}
             <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold text-white">From Vapor to Value</h2>
                <p className="mt-2 text-gray-400">The Recovery Process</p>
            </div>
            
            <div className="relative max-w-md mx-auto">
                {/* Vertical Track Container */}
                <div className="absolute left-4 top-0 bottom-0 w-6 flex flex-col items-center justify-start z-0">
                    {/* The Track Line */}
                    <div className="absolute top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
                         {/* Moving Gradient Fill - Simulating Flow */}
                         <motion.div 
                            className="w-full h-[40%] bg-gradient-to-b from-transparent via-cyan-400 to-transparent absolute top-0"
                            animate={{ top: ["-40%", "140%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                         />
                    </div>
                </div>

                <div className="space-y-10 relative z-10 ml-2">
                    {stepText.map((step, i) => {
                        const Icon = step.icon;
                        // Helper to map tailwind bg colors to text colors roughly
                        const iconColorClass = step.color.replace('bg-', 'text-').replace('500', '400');

                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative pl-12"
                            >
                                {/* Node on Track */}
                                <div className="absolute left-2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-[#000212] border-2 border-cyan-500 z-20 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                </div>
                                
                                {/* Horizontal Connector */}
                                <div className="absolute left-2 top-8 w-10 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />

                                {/* Card */}
                                <div className="glass-card p-5 rounded-xl border border-white/10 relative overflow-hidden group">
                                    {/* Background Glow */}
                                    <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${step.color} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`p-2.5 rounded-lg bg-white/5 ${iconColorClass} border border-white/5`}>
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-white text-lg">{step.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// --- Desktop View Component (Original SVG) ---
const DesktopHowItWorks = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    // Truck moves to position near UST 1
    const truckX = useTransform(scrollYProgress, [0, 0.15], [-600, -100]);
    const hoseLength = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
    
    // Animate UST 1 fill level from 0 to 120 (full diameter of ellipse)
    const fillLevel1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 120]);
    
    // Animate UST 2 fill level as a small top-up (e.g. from 30px high to 50px high)
    const fillLevel2 = useTransform(scrollYProgress, [0.55, 0.7], [0, 20]);

    const fuelFlowOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
    const liquidOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    
    const hosePath = "M 120 300 C 170 350, 170 350, 220 340";
    const vaporPath = "M 280 340 C 400 250, 600 250, 695 200";
    const liquidPath = "M 750 340 C 650 300, 550 300, 470 340";

    return (
        <section ref={targetRef} className="hidden md:block relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#000212]">
                {/* Full screen graphic container */}
                <div className="absolute inset-0 w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid slice">
                        {/* Ground */}
                        <path d="M -500 350 H 1400 V 600 H -500 Z" fill="#111827" />
                        <path d="M -500 350 H 1400" stroke="#374151" strokeWidth="2" />
                        
                        <defs>
                            <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#67e8f9" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <clipPath id="ust1Clip">
                                <ellipse cx="250" cy="410" rx="100" ry="60" />
                            </clipPath>
                             <clipPath id="ust2Clip">
                                <ellipse cx="500" cy="410" rx="100" ry="60" />
                            </clipPath>
                        </defs>

                        {/* UST 1 (Truck Fill) */}
                        <g id="ust1">
                            <ellipse cx="250" cy="410" rx="100" ry="60" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="3" />
                            <g clipPath="url(#ust1Clip)">
                                <motion.rect 
                                    x="150" 
                                    width="200" 
                                    fill="url(#fuelGradient)"
                                    y={useTransform(fillLevel1, h => 470 - h)}
                                    height={fillLevel1}
                                />
                            </g>
                            <path d="M 220 350 v -10" stroke="#6b7280" strokeWidth="6" />
                            <path d="M 280 350 v -10" stroke="#6b7280" strokeWidth="6" />
                        </g>
                        
                        {/* UST 2 (VRU Fill) */}
                        <g id="ust2">
                            <ellipse cx="500" cy="410" rx="100" ry="60" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="3" />
                             <g clipPath="url(#ust2Clip)">
                                <rect x="400" y="440" width="200" height="30" fill="#be185d" opacity="0.6" />
                                <motion.rect 
                                    x="400" 
                                    width="200" 
                                    fill="#be185d"
                                    y={useTransform(fillLevel2, h => 440 - h)}
                                    height={fillLevel2}
                                />
                            </g>
                            <path d="M 470 350 v -10" stroke="#6b7280" strokeWidth="6" />
                        </g>


                        {/* VRU */}
                        <g id="vru">
                            <rect x="700" y="180" width="120" height="220" rx="8" fill="#e5e7eb" />
                            <rect x="710" y="190" width="100" height="70" rx="4" fill="#0f172a" />
                            <motion.rect x="715" y="195" width="90" height="60" fill="url(#fuelGradient)" fillOpacity="0.5" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
                            <rect x="710" y="275" width="100" height="10" fill="#9ca3af" />
                            <rect x="710" y="295" width="100" height="10" fill="#9ca3af" />
                            <rect x="710" y="315" width="100" height="10" fill="#9ca3af" />
                            <line x1="700" y1="350" x2="820" y2="350" stroke="#9ca3af" strokeWidth="4" />
                        </g>
                        
                        {/* Animated Pipes and Paths */}
                        <motion.path
                            d={vaporPath}
                            stroke="#a855f7"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                            fill="none"
                            strokeOpacity={0.6}
                            animate={{ strokeDashoffset: [0, -10] }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                        <motion.path
                            d={liquidPath}
                            stroke="#ec4899"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                            fill="none"
                            strokeOpacity={0.6}
                            animate={{ strokeDashoffset: [0, -10] }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                        
                        {/* Truck */}
                        <motion.g id="truck" style={{ x: truckX }} transform="translate(0 50)">
                            <path d="M 40 250 A 30 30 0 0 1 70 220 H 250 A 30 30 0 0 1 280 250 V 310 H 40 Z" fill="#4b5563" />
                            <path d="M 70 220 H 250 A 30 30 0 0 1 280 250 V 280 A 30 30 0 0 0 250 310 H 70 A 30 30 0 0 1 40 280 V 250 A 30 30 0 0 1 70 220" fill="#9ca3af"/>
                            <path d="M 280 250 L 330 250 L 340 280 L 340 310 L 280 310 Z" fill="#4b5563" />
                            <path d="M 285 255 L 325 255 L 330 275 L 285 275 Z" fill="url(#fuelGradient)" fillOpacity="0.4" />
                            <circle cx="90" cy="310" r="20" fill="#1f2937" /><circle cx="230" cy="310" r="20" fill="#1f2937" /><circle cx="300" cy="310" r="20" fill="#1f2937" />
                        </motion.g>

                        {/* Hose */}
                        <motion.path d={hosePath} stroke="#3f3f46" strokeWidth="6" fill="none" style={{ pathLength: hoseLength }} />

                        {/* Animated Particles */}
                        <motion.g style={{ opacity: fuelFlowOpacity }}>
                            {Array.from({ length: 8 }).map((_, i) => ( <AnimatedParticle key={`hose-${i}`} path={hosePath} duration={2} delay={i * 0.25} color="#3b82f6" /> ))}
                        </motion.g>
                        <g>
                            {Array.from({ length: 10 }).map((_, i) => ( <AnimatedParticle key={`vapor-${i}`} path={vaporPath} duration={5} delay={i * 0.5} color="#a855f7" /> ))}
                        </g>
                        <motion.g style={{ opacity: liquidOpacity }}>
                            {Array.from({ length: 10 }).map((_, i) => ( <AnimatedParticle key={`liquid-${i}`} path={liquidPath} duration={4} delay={i * 0.4} color="#ec4899" /> ))}
                        </motion.g>
                    </svg>
                </div>

                {/* Title Overlay */}
                <div className="absolute top-24 left-0 right-0 text-center pointer-events-none z-20">
                    <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">From Vapor to Value</h2>
                    <p className="mt-2 text-lg text-gray-200 drop-shadow-md">Scroll to visualize the recovery process</p>
                </div>

                {/* Text overlays */}
                <AnimatedText scrollYProgress={scrollYProgress} start={0.0} end={0.2} index={0} />
                <AnimatedText scrollYProgress={scrollYProgress} start={0.2} end={0.4} index={1} />
                <AnimatedText scrollYProgress={scrollYProgress} start={0.4} end={0.6} index={2} />
                <AnimatedText scrollYProgress={scrollYProgress} start={0.6} end={0.8} index={3} />
                <AnimatedText scrollYProgress={scrollYProgress} start={0.8} end={1.0} index={4} />

                {/* Key/Legend (static) */}
                <motion.div 
                    className="absolute bottom-8 right-8 glass-card p-4 rounded-xl border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5 } }}
                >
                    <h4 className="font-bold text-sm mb-3 text-gray-300">System Key</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]"></div><span className="text-xs text-gray-300">Vapor Flow</span></div>
                        <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#ec4899] shadow-[0_0_10px_#ec4899]"></div><span className="text-xs text-gray-300">Recovered Fuel</span></div>
                        <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]"></div><span className="text-xs text-gray-300">Incoming Fuel</span></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const HowItWorksSection: React.FC = () => {
    return (
        <>
            <MobileHowItWorks />
            <DesktopHowItWorks />
        </>
    );
}

export default HowItWorksSection;
