
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Leaf, Wind, Recycle, ShieldCheck, ArrowDown, TrendingUp, DollarSign, Activity, Zap, Crosshair, CheckCircle2, Droplets, Sprout } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import ShieldPlanetSection from '../components/ShieldPlanetSection';
import AtmosphereProtectionSection from '../components/AtmosphereProtectionSection';
import AnimatedCounter from '../components/AnimatedCounter';
import VectorBorderCard from '../components/VectorBorderCard';

const graphData = [
  { year: 'Y1', emissions: 100, profit: 20, efficiency: 65 },
  { year: 'Y2', emissions: 85, profit: 45, efficiency: 78 },
  { year: 'Y3', emissions: 60, profit: 85, efficiency: 88 },
  { year: 'Y4', emissions: 40, profit: 140, efficiency: 95 },
  { year: 'Y5', emissions: 25, profit: 210, efficiency: 99.9 },
];

// --- New Metric Data ---
const impactMetrics = [
  {
    id: 'co2',
    title: 'CO₂ Reduced',
    target: 8200000,
    suffix: ' tons',
    icon: Leaf,
    description: 'Preventing greenhouse gases from entering the atmosphere annually.',
    colorClass: 'text-cyan-400',
    hexColor: '#22d3ee'
  },
  {
    id: 'fuel',
    title: 'Fuel Recovered',
    target: 231900203,
    suffix: ' L',
    icon: Droplets,
    description: 'Turning waste vapor back into valuable, sellable liquid fuel.',
    colorClass: 'text-purple-400',
    hexColor: '#a855f7'
  },
  {
    id: 'trees',
    title: 'Tree Equivalent',
    target: 12300000,
    suffix: '',
    icon: Sprout,
    description: 'Carbon sequestration equivalent to planting millions of trees.',
    colorClass: 'text-cyan-400',
    hexColor: '#22d3ee'
  },
  {
    id: 'water',
    title: 'Water Saved',
    target: 3.1,
    fraction: 1,
    suffix: 'B L',
    icon: Recycle,
    description: 'Conserving water resources through efficient closed-loop cooling.',
    colorClass: 'text-blue-400',
    hexColor: '#60a5fa'
  },
  {
    id: 'air',
    title: 'Cleaner Air',
    target: 99.9,
    fraction: 1,
    suffix: '%',
    icon: Wind,
    description: 'Reduction in Volatile Organic Compounds (VOCs) and pollutants.',
    colorClass: 'text-cyan-400',
    hexColor: '#22d3ee'
  },
  {
    id: 'compliance',
    title: 'Compliance',
    target: 100,
    suffix: '%',
    icon: ShieldCheck,
    description: 'Surpassing strict global environmental regulations consistently.',
    colorClass: 'text-purple-400',
    hexColor: '#a855f7'
  }
];

// --- Animated Infographics Components ---

const MetricGraphic = ({ id, color }: { id: string, color: string }) => {
    const commonTransition = { duration: 2, repeat: Infinity, ease: "easeInOut" as const };

    switch (id) {
        case 'co2': // Rising Bars
            return (
                <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                    <motion.rect x="10" y="40" width="15" height="20" fill={color} animate={{ y: [40, 20, 40], height: [20, 40, 20] }} transition={{ ...commonTransition, delay: 0 }} />
                    <motion.rect x="35" y="30" width="15" height="30" fill={color} animate={{ y: [30, 10, 30], height: [30, 50, 30] }} transition={{ ...commonTransition, delay: 0.2 }} />
                    <motion.rect x="60" y="20" width="15" height="40" fill={color} animate={{ y: [20, 5, 20], height: [40, 55, 40] }} transition={{ ...commonTransition, delay: 0.4 }} />
                    <motion.rect x="85" y="50" width="15" height="10" fill={color} animate={{ y: [50, 30, 50], height: [10, 30, 10] }} transition={{ ...commonTransition, delay: 0.1 }} />
                </svg>
            );
        case 'fuel': // Liquid Fill
            return (
                <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                    <defs>
                        <linearGradient id="fuelGrad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                            <stop offset="100%" stopColor={color} stopOpacity={0.2}/>
                        </linearGradient>
                    </defs>
                    <motion.path 
                        d="M10 30 Q 25 20 50 30 T 90 30 V 60 H 10 Z" 
                        fill="url(#fuelGrad)"
                        animate={{ d: ["M10 35 Q 25 25 50 35 T 90 35 V 60 H 10 Z", "M10 25 Q 25 35 50 25 T 90 25 V 60 H 10 Z", "M10 35 Q 25 25 50 35 T 90 35 V 60 H 10 Z"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Drops */}
                    <motion.circle cx="30" cy="10" r="3" fill={color} animate={{ y: [0, 40], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }} />
                    <motion.circle cx="70" cy="5" r="2" fill={color} animate={{ y: [0, 40], opacity: [1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: 0.5 }} />
                </svg>
            );
        case 'trees': // Growing Branch
             return (
                <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                    <motion.path 
                        d="M50 60 L50 40 M50 40 L30 20 M50 40 L70 20 M50 30 L50 10" 
                        stroke={color} 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle cx="30" cy="20" r="3" fill={color} animate={{ scale: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
                    <motion.circle cx="70" cy="20" r="3" fill={color} animate={{ scale: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.7 }} />
                    <motion.circle cx="50" cy="10" r="4" fill={color} animate={{ scale: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.9 }} />
                </svg>
            );
        case 'water': // Ripples
            return (
                 <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                    <motion.circle cx="50" cy="30" r="5" stroke={color} strokeWidth="2" fill="none" 
                        animate={{ r: [5, 25], opacity: [1, 0] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} 
                    />
                    <motion.circle cx="50" cy="30" r="5" stroke={color} strokeWidth="2" fill="none" 
                        animate={{ r: [5, 25], opacity: [1, 0] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }} 
                    />
                    <circle cx="50" cy="30" r="3" fill={color} />
                </svg>
            );
        case 'air': // Wind Flow
             return (
                <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                    <motion.path d="M10 40 Q 30 20 50 40 T 90 40" stroke={color} strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M10 20 Q 30 40 50 20 T 90 20" stroke={color} strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                </svg>
            );
        case 'compliance': // Shield Pulse
             return (
                <svg viewBox="0 0 100 60" className="w-full h-16 opacity-80">
                     <motion.path 
                        d="M35 10 L65 10 L65 40 C65 50 50 60 50 60 C50 60 35 50 35 40 Z" 
                        stroke={color} 
                        strokeWidth="3" 
                        fill="none"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: "50px 35px" }}
                    />
                    <motion.path d="M42 30 L48 38 L58 25" stroke={color} strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} />
                </svg>
            );
        default:
            return null;
    }
}


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000212]/90 border border-cyan-500/30 p-3 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md">
        <p className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">Timeframe: {label}</p>
        <div className="space-y-1">
             <div className="flex items-center justify-between gap-4">
                <span className="text-cyan-400 text-xs font-bold flex items-center gap-1"><DollarSign size={10}/> Net Profit:</span>
                <span className="text-white text-sm font-mono font-bold">+${payload[0].value}k</span>
            </div>
             <div className="flex items-center justify-between gap-4">
                <span className="text-purple-400 text-xs font-bold flex items-center gap-1"><Wind size={10}/> Emissions:</span>
                <span className="text-white text-sm font-mono font-bold">{payload[1].value}%</span>
            </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- Vector UI Components ---

const TechFrame = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`relative ${className}`}>
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-sm pointer-events-none" />
        
        {/* Content */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-sm h-full w-full overflow-hidden relative z-10">
             {/* Scanline Effect */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-20 animate-scan pointer-events-none" />
            {children}
        </div>
    </div>
);

const SustainabilityChart = () => {
    return (
        <div className="w-full h-full min-h-[350px] relative">
             {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                style={{ 
                    backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }} 
            />
            
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={graphData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                    <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                    <YAxis yAxisId="left" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    
                    <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#06b6d4" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                        animationDuration={2000}
                    />
                    <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="emissions" 
                        stroke="#a855f7" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#000', stroke: '#a855f7', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff' }}
                        animationDuration={2000}
                    />
                </ComposedChart>
            </ResponsiveContainer>
            
            {/* Axis Labels */}
            <div className="absolute top-0 left-2 text-[10px] text-cyan-500 font-bold tracking-wider">REVENUE GROWTH</div>
            <div className="absolute bottom-8 right-2 text-[10px] text-purple-500 font-bold tracking-wider">EMISSION DROP</div>
        </div>
    )
}

const EnvironmentalHero = () => {
  return (
    <div className="relative w-full min-h-[100vh] flex flex-col justify-center pt-24 overflow-hidden bg-[#000212]">
      
      {/* --- Vector Background Grid --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(34, 211, 238, 0.07)" strokeWidth="1"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#000212]/80 to-[#000212]" />
      </div>

      {/* --- Animated Gradients --- */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
        animate={{ x: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
       <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Typography */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12 bg-cyan-500/50"></div>
                    <span className="text-cyan-400 text-xs font-mono font-bold tracking-[0.2em] uppercase">
                        Eco-Efficiency Engine
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95]">
                    A <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Greener</span><br />
                    Bottom Line.
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light mb-10 border-l-2 border-white/10 pl-6">
                    MasarZero technology transforms environmental compliance from a cost center into a <span className="text-white font-semibold">profit generator</span>. We prove that planetary health and profitability are not just compatible—they are synergistic.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <button className="relative group overflow-hidden bg-white text-black font-bold py-4 px-8 rounded-none skew-x-[-10deg] transition-all hover:bg-cyan-400">
                        <div className="skew-x-[10deg] flex items-center gap-2">
                             Start Calculation <TrendingUp size={18} />
                        </div>
                    </button>
                     <button className="relative group overflow-hidden border border-white/20 text-white font-bold py-4 px-8 rounded-none skew-x-[-10deg] hover:border-cyan-400 transition-all">
                        <div className="skew-x-[10deg] flex items-center gap-2">
                             View Case Studies <Activity size={18} />
                        </div>
                    </button>
                </div>
            </motion.div>

            {/* Right Column: Vector Visualization */}
            <div className="relative min-h-[500px]">
                
                {/* Main Chart Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10"
                >
                   <TechFrame>
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                                    <Activity size={18} className="text-cyan-400" />
                                    Performance Correlation
                                </h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Real-time Analysis // Node: MZ-Alpha</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></span>
                                <span className="text-[10px] font-mono text-cyan-400">LIVE FEED</span>
                            </div>
                        </div>
                        <SustainabilityChart />
                   </TechFrame>
                </motion.div>

                {/* Floating Vector Metric Cards */}
                
                {/* Card 1: Carbon Credits (Blue/Purple) */}
                <div className="absolute -top-8 -right-4 md:-right-12 z-20 w-48">
                    <VectorBorderCard delay={0.6} glowing>
                        <div className="flex items-center justify-between mb-2">
                            <Leaf size={16} className="text-purple-400" />
                            <span className="text-[9px] text-purple-400 font-bold uppercase flex items-center gap-1">
                                <CheckCircle2 size={10} /> Verified
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Carbon Credits</p>
                        <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-1">
                            +<AnimatedCounter to={125400} prefix="$" />
                        </div>
                    </VectorBorderCard>
                     {/* Connector Line */}
                     <svg className="absolute top-full right-8 w-px h-16 overflow-visible pointer-events-none hidden md:block z-0">
                        <line x1="0" y1="0" x2="0" y2="100" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="0" cy="100" r="2" fill="#a855f7" />
                    </svg>
                </div>

                {/* Card 2: Compliance Score (Cyan) */}
                <div className="absolute -bottom-8 -left-4 md:-left-12 z-20 w-52">
                    <VectorBorderCard delay={0.8}>
                        <div className="flex items-center justify-between mb-2">
                            <ShieldCheck size={16} className="text-cyan-400" />
                            <Zap size={12} className="text-blue-400 animate-pulse" />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Efficiency Rating</p>
                         <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-1">
                            <AnimatedCounter to={99.9} suffix="%" />
                        </div>
                         <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-cyan-400" 
                                initial={{ width: 0 }}
                                animate={{ width: '99.9%' }}
                                transition={{ duration: 1.5, delay: 1 }}
                            />
                        </div>
                    </VectorBorderCard>
                </div>

                 {/* Decorative Floating Icons */}
                 <motion.div 
                    className="absolute top-1/2 -right-8 text-gray-600/20 z-0 hidden md:block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 >
                    <Crosshair size={120} />
                 </motion.div>

            </div>
        </div>
      </div>
      
      {/* Scroll Prompt */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-500">Scroll to Analyze</span>
        <ArrowDown size={16} className="text-cyan-400" />
      </motion.div>

      <style>{`
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-scan {
            animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  )
}

const EnvironmentalPage: React.FC = () => {
  return (
    <section className="min-h-screen">
      
      <EnvironmentalHero />

      <div className="container mx-auto px-4 py-24 relative z-10">
        
        <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Impact Metrics</h2>
             <p className="text-gray-400 max-w-2xl mx-auto">
                Real-time environmental data reflecting our global operational footprint.
             </p>
        </div>

        {/* UNIFIED ECO-METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <VectorBorderCard key={metric.id} delay={i * 0.1} className="h-full">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <Icon size={20} className={metric.colorClass} />
                             </div>
                             <h3 className="text-lg font-bold text-white">{metric.title}</h3>
                        </div>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 ${metric.colorClass} uppercase tracking-wide`}>
                            Live
                         </span>
                    </div>

                    {/* Animated Infographic Area */}
                    <div className="flex-grow flex items-center justify-center py-4 mb-4 relative overflow-hidden rounded-lg bg-black/20 border border-white/5">
                        <MetricGraphic id={metric.id} color={metric.hexColor} />
                    </div>

                    {/* Metric Value */}
                    <div className="mb-2">
                        <div className="text-3xl font-bold font-mono flex items-baseline gap-1 text-white">
                             <AnimatedCounter 
                                to={metric.target} 
                                fractionDigits={metric.fraction || 0}
                             />
                             <span className="text-sm font-normal text-gray-400">{metric.suffix}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs leading-relaxed border-t border-white/10 pt-3 mt-auto">
                        {metric.description}
                    </p>
                </div>
              </VectorBorderCard>
            );
          })}
        </div>

        <div className="mt-32">
            <ShieldPlanetSection />
        </div>
        
        <div className="mt-5">
            <AtmosphereProtectionSection />
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalPage;
