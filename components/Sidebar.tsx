
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ChevronRight } from 'lucide-react';
import { PartData, LiveDataConfig } from '../partData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from 'recharts';

// --- Data Generation Logic ---
const generateInitialData = (config: LiveDataConfig) => {
  let data = [];
  const { key1, domain1, key2, domain2 } = config;
  const range1 = domain1[1] - domain1[0];
  const range2 = domain2[1] - domain2[0];

  for (let i = 10; i >= 0; i--) {
    const point: { time: string, [key: string]: any } = { time: `${1270 + i * 5}s` };
    point[key1] = Math.random() * (range1 * 0.4) + (domain1[0] + range1 * 0.3);
    point[key2] = Math.random() * (range2 * 0.4) + (domain2[0] + range2 * 0.3);
    data.push(point);
  }
  return data;
};

// --- Tooltip for Charts ---
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  config?: LiveDataConfig;
}

const CustomTooltip = ({ active, payload, label, config }: CustomTooltipProps) => {
  if (active && payload && payload.length && config) {
    return (
      <div className="glass-card p-2 text-xs rounded">
        <p className="label">{`${label}`}</p>
        <p style={{ color: config.color1 }}>{`${config.label1}: ${payload[0].value.toFixed(2)} ${config.unit1}`}</p>
        <p style={{ color: config.color2 }}>{`${config.label2}: ${payload[1].value.toFixed(2)} ${config.unit2}`}</p>
      </div>
    );
  }
  return null;
};

// --- Part-Specific View Components ---

const LiveTrendsView: React.FC<{ part: PartData }> = ({ part }) => {
    const config = part.liveDataConfig!;
    const [data, setData] = useState(() => generateInitialData(config));

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData.slice(1)];
                const lastTime = parseInt(newData[newData.length - 1].time.replace('s', ''));
                const point: { time: string, [key: string]: any } = { time: `${lastTime + 5}s` };
                const range1 = config.domain1[1] - config.domain1[0];
                const range2 = config.domain2[1] - config.domain2[0];
                point[config.key1] = Math.random() * (range1 * 0.4) + (config.domain1[0] + range1 * 0.3);
                point[config.key2] = Math.random() * (range2 * 0.4) + (config.domain2[0] + range2 * 0.3);
                newData.push(point);
                return newData;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [config]);

    return (
        <div className="glass-card p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Live Trends</h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`color_${config.key1}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={config.color1} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={config.color1} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke={config.color1} fontSize={10} domain={config.domain1} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke={config.color2} fontSize={10} domain={config.domain2} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip config={config} />} />
                        <Area yAxisId="left" type="monotone" dataKey={config.key1} stroke={config.color1} fill={`url(#color_${config.key1})`} strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey={config.key2} stroke={config.color2} strokeWidth={1.5} dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const RadialProgress: React.FC<{ value: number; max: number; unit: string; label: string; color: string }> = ({ value, max, unit, label, color }) => {
    const percentage = (value / max) * 100;
    const strokeWidth = 8;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-700/50" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
                    <circle
                        className="transition-all duration-500"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="50"
                        cy="50"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold" style={{color}}>{value}</span>
                    <span className="text-xs text-gray-400">{unit}</span>
                </div>
            </div>
            <span className="mt-2 text-sm font-semibold">{label}</span>
        </div>
    );
};


const PumpStatusView: React.FC<{ part: PartData }> = ({ part }) => {
    const data = part.pumpData!;
    return (
        <div className="glass-card p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-center">Live Pump Status</h3>
            <div className="flex justify-around items-center">
                <RadialProgress value={data.rpm.value} max={data.rpm.max} unit="RPM" label="Speed" color="#22d3ee" />
                <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">{data.pressure.value}</div>
                    <div className="text-sm text-gray-400">{data.pressure.unit}</div>
                    <div className="mt-2 text-sm font-semibold">Pressure</div>
                </div>
            </div>
        </div>
    );
};

const SystemStatusView: React.FC<{ part: PartData }> = ({ part }) => {
    const getStatusColor = (state: 'ok' | 'warn' | 'idle') => {
        switch (state) {
            case 'ok': return 'bg-green-400';
            case 'warn': return 'bg-yellow-400';
            case 'idle': return 'bg-gray-400';
        }
    };
    return (
        <div className="glass-card p-4 rounded-lg">
            <h3 className="font-semibold mb-3">System Status</h3>
            <div className="space-y-3 text-sm">
                {part.status.map(item => (
                    item.metric.includes('Reservoir') && item.value.includes('%') ? (
                        <div key={item.metric}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">{item.metric}</span>
                                <span className="font-semibold text-green-400">{item.value}</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                                <div className="bg-green-400 h-1.5 rounded-full" style={{width: item.value}}></div>
                            </div>
                        </div>
                    ) : (
                        <div key={item.metric} className="flex justify-between items-center">
                            <span className="text-gray-300">{item.metric}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-100">{item.value}</span>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(item.state!)} ${item.state === 'ok' ? 'animate-pulse' : ''}`}></div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};


const renderPartDetails = (part: PartData) => {
    switch (part.viewType) {
        case 'live-trends': return <LiveTrendsView part={part} />;
        case 'pump-status': return <PumpStatusView part={part} />;
        case 'system-status': return <SystemStatusView part={part} />;
        default: return <SystemStatusView part={part} />;
    }
}

// --- Main Sidebar Component ---
const Sidebar: React.FC<{ part: PartData | null, onClose: () => void, onSelectNext: () => void }> = ({ part, onClose, onSelectNext }) => {
  // Fix: Using variants for animations to resolve potential TypeScript typing issues.
  const sidebarVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: '0%', opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };
  
  return (
    <AnimatePresence>
      {part && (
        <motion.div
          variants={sidebarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-24 right-4 bottom-4 w-full max-w-sm z-40 sidebar-glass flex flex-col rounded-2xl shadow-2xl shadow-cyan-500/10"
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-300">{part.name}</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{part.description}</p>
          </div>

          <div className="p-6 flex-grow overflow-y-auto space-y-6">
            {renderPartDetails(part)}
            {part.viewType !== 'system-status' && <SystemStatusView part={part} />}
          </div>

          <div className="p-6 border-t border-white/10 mt-auto flex items-center gap-3">
            <button className="w-full flex items-center justify-center gap-2 bg-white/5 font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300">
              <FileText size={16} />
              Spec Sheet
            </button>
            <button 
                onClick={onSelectNext}
                className="flex-shrink-0 flex items-center justify-center gap-2 relative aurora-border font-semibold text-sm pl-6 pr-4 py-3 rounded-full hover:bg-cyan-400/20 transition-all duration-300"
            >
              Next Part
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
