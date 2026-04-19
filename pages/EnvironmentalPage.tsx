
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Leaf, Wind, Recycle, ShieldCheck, ArrowDown, TrendingUp, DollarSign, Activity, Zap, Crosshair, CheckCircle2, Droplets, Sprout } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import ShieldPlanetSection from '../components/ShieldPlanetSection';
import AtmosphereProtectionSection from '../components/AtmosphereProtectionSection';
import AnimatedCounter from '../components/AnimatedCounter';
import VectorBorderCard from '../components/VectorBorderCard';
import { useTranslation } from '../context/TranslationContext';

const graphData = [
  { year: 'W1', emissions: 100, profit: 15, efficiency: 65 },
  { year: 'W2', emissions: 92, profit: 28, efficiency: 70 },
  { year: 'W3', emissions: 85, profit: 45, efficiency: 78 },
  { year: 'W4', emissions: 72, profit: 68, efficiency: 82 },
  { year: 'W5', emissions: 60, profit: 95, efficiency: 88 },
  { year: 'W6', emissions: 48, profit: 125, efficiency: 92 },
  { year: 'W7', emissions: 40, profit: 160, efficiency: 95 },
  { year: 'W8', emissions: 32, profit: 200, efficiency: 98 },
  { year: 'W9', emissions: 25, profit: 245, efficiency: 99 },
];

// --- New Metric Data definition moved inside component ---

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
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#000212]/90 border border-emerald-500/30 p-3 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
        <p className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">{t('pages.environmental.chart.timeframe')}: {label}</p>
        <div className="space-y-1">
             <div className="flex items-center justify-between gap-4">
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><DollarSign size={10}/> {t('pages.environmental.chart.netProfit')}:</span>
                <span className="text-white text-sm font-mono font-bold">+${payload[0].value}k</span>
            </div>
             <div className="flex items-center justify-between gap-4">
                <span className="text-teal-400 text-xs font-bold flex items-center gap-1"><Wind size={10}/> {t('pages.environmental.metrics.air.title')}:</span>
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
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50 rounded-br-sm pointer-events-none" />
        
        {/* Content */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-sm h-full w-full overflow-hidden relative z-10">
             {/* Scanline Effect */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-20 animate-scan pointer-events-none" />
            {children}
        </div>
    </div>
);

const SustainabilityChart = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[320px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={graphData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis 
                        dataKey="year" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        fontWeight="bold" 
                        dy={10}
                    />
                    <YAxis yAxisId="left" hide />
                    <YAxis yAxisId="right" hide />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ stroke: 'rgba(16, 185, 129, 0.4)', strokeWidth: 1 }} 
                    />
                    
                    <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                        animationDuration={1500}
                    />
                    <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="emissions" 
                        stroke="#8b5cf6" 
                        strokeWidth={4} 
                        dot={false}
                        activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff' }}
                        animationDuration={1500}
                    />
                </ComposedChart>
            </ResponsiveContainer>
            
            {/* Axis Labels */}
            <div className="absolute top-0 left-2 text-[10px] text-emerald-400 font-bold tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('pages.environmental.chart.revenue')}
            </div>
            <div className="absolute bottom-12 right-2 text-[10px] text-violet-400 font-bold tracking-widest flex items-center gap-2">
                {t('pages.environmental.chart.emissions')}
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            </div>
        </div>
    )
}

const EnvironmentalHero = () => {
  const { t } = useTranslation();
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
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
        animate={{ x: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
       <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
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
                    <div className="h-px w-12 bg-emerald-500/50"></div>
                    <span className="text-emerald-400 text-xs font-mono font-bold tracking-[0.2em] uppercase">
                        {t('pages.environmental.hero.badge')}
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95]">
                    {t('pages.environmental.hero.title')}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light mb-10 border-l-2 border-white/10 pl-6">
                    {t('pages.environmental.hero.description')}
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <a href="https://calc.masarzero.com" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden bg-white text-black font-bold py-4 px-8 rounded-none skew-x-[-10deg] transition-all hover:bg-emerald-400">
                        <div className="skew-x-[10deg] flex items-center gap-2">
                             {t('common.startCalculation') || 'Start Calculation'} <TrendingUp size={18} />
                        </div>
                    </a>
                     <a href="/library" className="relative group overflow-hidden border border-white/20 text-white font-bold py-4 px-8 rounded-none skew-x-[-10deg] hover:border-emerald-400 transition-all cursor-pointer">
                        <div className="skew-x-[10deg] flex items-center gap-2">
                             {t('common.viewCaseStudies') || 'View Case Studies'} <Activity size={18} />
                        </div>
                    </a>
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
                   <TechFrame className="h-[420px]">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                                    <Activity size={18} className="text-emerald-400" />
                                    {t('pages.environmental.chart.title')}
                                </h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{t('pages.environmental.chart.subtitle')}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-tighter">{t('pages.environmental.chart.liveFeed')}</span>
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
                            <Leaf size={16} className="text-teal-400" />
                            <span className="text-[9px] text-teal-400 font-bold uppercase flex items-center gap-1">
                                <CheckCircle2 size={10} /> {t('pages.environmental.features.verified')}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{t('pages.environmental.features.carbonCredits')}</p>
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
                            <ShieldCheck size={16} className="text-emerald-400" />
                            <Zap size={12} className="text-teal-400 animate-pulse" />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{t('pages.environmental.features.efficiencyRating')}</p>
                         <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-1">
                            <AnimatedCounter to={99} suffix="%+" />
                        </div>
                         <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: '99%' }}
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
        <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-500">{t('pages.environmental.scrolling')}</span>
        <ArrowDown size={16} className="text-emerald-400" />
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
    const { t } = useTranslation();
    const impactMetrics = [
      {
        id: 'co2',
        title: t('pages.environmental.metrics.co2.title'),
        target: 8200000,
        suffix: ' tons',
        icon: Leaf,
        description: t('pages.environmental.metrics.co2.description'),
        colorClass: 'text-emerald-400',
        hexColor: '#34d399'
      },
      {
        id: 'fuel',
        title: t('pages.environmental.metrics.fuel.title'),
        target: 231900203,
        suffix: ' L',
        icon: Droplets,
        description: t('pages.environmental.metrics.fuel.description'),
        colorClass: 'text-teal-400',
        hexColor: '#14b8a6'
      },
      {
        id: 'trees',
        title: t('pages.environmental.metrics.trees.title'),
        target: 12300000,
        suffix: '',
        icon: Sprout,
        description: t('pages.environmental.metrics.trees.description'),
        colorClass: 'text-emerald-400',
        hexColor: '#34d399'
      },
      {
        id: 'water',
        title: t('pages.environmental.metrics.water.title'),
        target: 3.1,
        fraction: 1,
        suffix: 'B L',
        icon: Recycle,
        description: t('pages.environmental.metrics.water.description'),
        colorClass: 'text-teal-400',
        hexColor: '#14b8a6'
      },
      {
        id: 'air',
        title: t('pages.environmental.metrics.air.title'),
        target: 99,
        suffix: '%+',
        icon: Wind,
        description: t('pages.environmental.metrics.air.description'),
        colorClass: 'text-emerald-400',
        hexColor: '#34d399'
      },
      {
        id: 'compliance',
        title: t('pages.environmental.metrics.compliance.title'),
        target: 100,
        suffix: '%',
        icon: ShieldCheck,
        description: t('pages.environmental.metrics.compliance.description'),
        colorClass: 'text-teal-400',
        hexColor: '#14b8a6'
      }
    ];

  return (
    <section className="min-h-screen">
      
      <EnvironmentalHero />

      <div className="container mx-auto px-4 py-24 relative z-10">
        
        <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.environmental.title')}</h2>
             <p className="text-gray-400 max-w-2xl mx-auto">
                {t('pages.environmental.subtitle')}
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
                            {t('common.live') || 'Live'}
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

        <div className="mt-24 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">{t('pages.environmental.beforeAfter.title')}</h2>
                <div className="space-y-5 text-sm">
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-red-300 mb-2">{t('pages.environmental.beforeAfter.before.label')}</p>
                        <p className="text-gray-300">{t('pages.environmental.beforeAfter.before.text')}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-2">{t('pages.environmental.beforeAfter.after.label')}</p>
                        <p className="text-gray-300">{t('pages.environmental.beforeAfter.after.text')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">{t('pages.environmental.odorValue.title')}</h2>
                <p className="text-gray-400 leading-relaxed mb-5">
                    {t('pages.environmental.odorValue.description')}
                </p>
                <div className="space-y-4 text-sm text-gray-300">
                    {(Array.isArray(t('pages.environmental.odorValue.points', { returnObjects: true })) ? (t('pages.environmental.odorValue.points', { returnObjects: true }) as unknown as string[]) : []).map((point, i) => (
                        <div key={i}>{point}</div>
                    ))}
                </div>
            </div>
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
