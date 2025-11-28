
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BarChart2, 
    Wifi, 
    Bell, 
    Settings, 
    Terminal, 
    Activity, 
    Cpu, 
    ShieldCheck, 
    LayoutDashboard, 
    PieChart, 
    AlertTriangle, 
    CheckCircle2,
    Server,
    Download
} from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ScadaScrollAnimation from '../components/ScadaScrollAnimation';
import ScadaImageGallery from '../components/ScadaImageGallery';

// --- Mock Data Generators ---
const generateTrendData = () => Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    flow: 3800 + Math.random() * 400,
    pressure: 98 + Math.random() * 5,
}));

const healthData = [
    { component: 'Vacuum Pump A', status: 'Optimal', load: 78 },
    { component: 'Vacuum Pump B', status: 'Standby', load: 0 },
    { component: 'Compressor', status: 'Optimal', load: 65 },
    { component: 'Cooling Unit', status: 'Warning', load: 92 }, // Simulated issue
    { component: 'Filter Bank', status: 'Optimal', load: 45 },
];

// --- Sub-components for the Interactive Dashboard ---

const DashboardSidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
    <div className="w-16 md:w-64 border-r border-white/10 flex flex-col bg-slate-900/50 backdrop-blur-md">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-black">P</div>
            <span className="font-bold text-white hidden md:block tracking-wide">PinnacleOS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'analytics', icon: PieChart, label: 'Analytics' },
                { id: 'health', icon: Activity, label: 'System Health' },
                { id: 'alerts', icon: Bell, label: 'Alerts', badge: 2 },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${activeTab === item.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon size={20} />
                    <span className="hidden md:block text-sm font-medium">{item.label}</span>
                    {item.badge && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden md:block">{item.badge}</span>}
                </button>
            ))}
        </nav>
        <div className="p-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Settings size={20} />
                <span className="hidden md:block text-sm font-medium">Settings</span>
            </button>
        </div>
    </div>
);

const OverviewTab = () => {
    const [data, setData] = useState(generateTrendData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const next = [...prev.slice(1)];
                const lastTime = parseInt(prev[prev.length - 1].time);
                next.push({
                    time: `${(lastTime + 1) % 24}:00`,
                    flow: 3800 + Math.random() * 400,
                    pressure: 98 + Math.random() * 5,
                });
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 h-full overflow-y-auto p-1">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Current Flow Rate</p>
                    <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-white">{Math.round(data[data.length-1].flow)} <span className="text-sm text-gray-500 font-normal">SCFM</span></h3>
                        <span className="text-green-400 text-xs mb-1">↑ 2.4%</span>
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">System Pressure</p>
                    <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-white">{data[data.length-1].pressure.toFixed(1)} <span className="text-sm text-gray-500 font-normal">PSI</span></h3>
                        <span className="text-gray-400 text-xs mb-1">Stable</span>
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                     <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Daily Recovery</p>
                    <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-cyan-400">$2,450 <span className="text-sm text-gray-500 font-normal">EST</span></h3>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-slate-800/30 rounded-xl p-6 border border-white/5 h-64">
                <h4 className="text-sm font-semibold text-gray-300 mb-4">Real-time Vapor Recovery Trend</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{top: 5, right: 0, left: -20, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Area type="monotone" dataKey="flow" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorFlow)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-black/20 p-2 rounded border border-white/5 font-mono">
                <Terminal size={12} />
                <span>[SYSTEM] Connection stable. Latency: 24ms. Encryption: AES-256.</span>
            </div>
        </div>
    );
};

const HealthTab = () => (
    <div className="space-y-4 h-full overflow-y-auto p-1">
        <h3 className="text-lg font-bold text-white mb-4">Component Status</h3>
        <div className="space-y-3">
            {healthData.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-white/5 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'Optimal' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : item.status === 'Warning' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'}`} />
                        <div>
                            <p className="font-medium text-sm">{item.component}</p>
                            <p className="text-xs text-gray-500">{item.status}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">Load</p>
                        <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${item.load > 90 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                                style={{ width: `${item.load}%` }} 
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PlatformPreview = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="w-full max-w-6xl mx-auto h-[600px] glass-card rounded-2xl border border-white/10 shadow-2xl flex overflow-hidden my-24 relative group">
             {/* Glow Effect behind dashboard */}
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"></div>
             
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 flex flex-col bg-[#0B1021] relative z-10">
                {/* Top Header */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/30">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-mono text-gray-300">STATION: HT-05 <span className="text-gray-600">|</span> HOUSTON, TX</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 font-mono hidden sm:block">v2.4.1-stable</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                            JD
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {activeTab === 'overview' && <OverviewTab />}
                            {activeTab === 'analytics' && (
                                <div className="flex items-center justify-center h-full text-gray-500 flex-col">
                                    <PieChart size={48} className="mb-4 opacity-50" />
                                    <p>Advanced analytics module loaded.</p>
                                </div>
                            )}
                            {activeTab === 'health' && <HealthTab />}
                            {activeTab === 'alerts' && (
                                 <div className="flex items-center justify-center h-full text-gray-500 flex-col">
                                    <Bell size={48} className="mb-4 opacity-50" />
                                    <p>No critical alerts. System nominal.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

// --- Bento Grid Features ---

const FeatureCard = ({ icon: Icon, title, description, className }: any) => (
    <div className={`glass-card p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group ${className}`}>
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 transition-colors">
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
);

const BentoFeatures = () => (
    <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Beyond Monitoring</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">PinnacleOS isn't just a dashboard; it's an intelligent command center that actively optimizes your infrastructure.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6">
            <FeatureCard 
                icon={Cpu} 
                title="AI Optimization Core" 
                description="Our proprietary algorithm adjusts vacuum pressure and cooling cycles in real-time based on ambient temperature and vapor density."
                className="md:col-span-2 bg-gradient-to-br from-slate-900/80 to-slate-900/40" 
            />
            <FeatureCard 
                icon={Wifi} 
                title="Edge Computing" 
                description="Critical decisions are made locally on the VRU's controller for millisecond latency, while data syncs to the cloud for analysis."
            />
            <FeatureCard 
                icon={ShieldCheck} 
                title="Compliance Engine" 
                description="Automated generation of EPA and local regulatory reports. Audit-ready data stored immutably."
            />
            <FeatureCard 
                icon={Server} 
                title="Remote Diagnostics" 
                description="Our support team can remotely troubleshoot 90% of issues without a site visit, reducing downtime and costs."
                className="md:col-span-2 bg-gradient-to-bl from-slate-900/80 to-slate-900/40"
            />
        </div>
    </div>
);


const ScadaPage: React.FC = () => {
  return (
    <>
      <ScadaScrollAnimation />

      <section className="bg-[#000212] relative -mt-24 z-10 pt-32 pb-12">
        <div className="container mx-auto px-4">
            {/* Introduction */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4 block">Introducing PinnacleOS</span>
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                The Operating System for <br/> Industrial Sustainability.
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400">
                Hardware is only half the solution. Our secure, cloud-native platform gives you granular control and crystal-clear visibility into your vapor recovery operations.
            </p>
          </motion.div>

            {/* The Dashboard Mockup */}
            <PlatformPreview />
            
            {/* Bento Grid */}
            <BentoFeatures />

             {/* CTA */}
             <div className="text-center my-12">
                 <button className="relative aurora-border font-semibold text-lg px-10 py-4 rounded-full hover:bg-cyan-400/20 transition-all duration-300 inline-flex items-center gap-3 group">
                    <Download className="group-hover:translate-y-1 transition-transform" size={20} />
                    Request Platform Demo
                 </button>
             </div>
        </div>
      </section>
      
      <ScadaImageGallery />
    </>
  );
};

export default ScadaPage;
