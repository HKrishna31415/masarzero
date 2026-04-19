
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, MapPin, Phone, Mail, ChevronRight, Wrench, Thermometer, Wind, Activity, Database, Zap, Settings, AlertTriangle, Calendar, CheckCircle2, Fan, Flame, Droplets, ScanLine } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';
import VectorBorderCard from '../components/VectorBorderCard';
import { useTranslation } from '../context/TranslationContext';
import { useDict } from '../translations';

// Icon map — keyed by component id
const componentIcons: Record<string, React.ElementType> = {
  control_panel: Settings,
  flame_arrester: Flame,
  vacuum_pump: Fan,
  scrubber: Wind,
  compressor: Activity,
  refrigerator: Thermometer,
  tank: Database,
  oil_pump: Droplets,
  quality_sensor: ScanLine,
};

const technicians = [
  { name: 'John Carter', location: 'Houston, TX', phone: '1-800-555-0101', email: 'j.carter@masarzero.tech' },
  { name: 'Maria Garcia', location: 'Rotterdam, NL', phone: '+31 10 555 0202', email: 'm.garcia@masarzero.tech' },
  { name: 'Kenji Tanaka', location: 'Singapore', phone: '+65 5550 3030', email: 'k.tanaka@masarzero.tech' },
];

const frequencyStyles: { [key: string]: string } = {
  Daily: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  Weekly: 'bg-teal-500/20 text-teal-300 ring-teal-500/30',
  Monthly: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  Quarterly: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  Annually: 'bg-red-500/20 text-red-300 ring-red-500/30',
  // Arabic/Chinese frequency labels map to same styles
  '每月': 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  '每周': 'bg-teal-500/20 text-teal-300 ring-teal-500/30',
  '每季度': 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  '每年': 'bg-red-500/20 text-red-300 ring-red-500/30',
  'شهري': 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  'أسبوعي': 'bg-teal-500/20 text-teal-300 ring-teal-500/30',
  'ربع سنوي': 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  'سنوي': 'bg-red-500/20 text-red-300 ring-red-500/30',
};

const SystemSchematic = ({ onSelect, selectedId, componentNames }: { onSelect: (id: string) => void, selectedId: string, componentNames: Record<string, string> }) => {
    const parts = [
        { id: 'control_panel', label: componentNames['control_panel'] ?? 'Control Panel', x: 50, y: 12, width: 25, height: 15, icon: Settings },
        { id: 'flame_arrester', label: componentNames['flame_arrester'] ?? 'Flame Arrester', x: 12, y: 40, width: 12, height: 12, icon: Flame },
        { id: 'vacuum_pump', label: componentNames['vacuum_pump'] ?? 'Vacuum Pump', x: 30, y: 40, width: 15, height: 15, icon: Fan },
        { id: 'scrubber', label: componentNames['scrubber'] ?? 'Scrubber', x: 50, y: 40, width: 15, height: 20, icon: Wind },
        { id: 'compressor', label: componentNames['compressor'] ?? 'Compressor', x: 70, y: 40, width: 15, height: 15, icon: Activity },
        { id: 'refrigerator', label: componentNames['refrigerator'] ?? 'Condenser', x: 90, y: 40, width: 12, height: 20, icon: Thermometer },
        { id: 'quality_sensor', label: componentNames['quality_sensor'] ?? 'Gasoline Quality', x: 30, y: 65, width: 15, height: 12, icon: ScanLine },
        { id: 'tank', label: componentNames['tank'] ?? 'Gasoline Tank', x: 70, y: 80, width: 25, height: 15, icon: Database },
        { id: 'oil_pump', label: componentNames['oil_pump'] ?? 'Oil Pump', x: 40, y: 80, width: 12, height: 12, icon: Droplets },
    ];

    return (
        <div className="relative w-full aspect-[3/4] md:aspect-[16/9] bg-[#0A0E1F] rounded-3xl border border-white/10 overflow-hidden p-4 md:p-8 shadow-inner">
            {/* Schematic Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />
            
            <div className="absolute inset-0">
                {parts.map((part) => {
                    const isSelected = selectedId === part.id;
                    const Icon = part.icon;
                    
                    return (
                        <button
                            key={part.id}
                            onClick={() => onSelect(part.id)}
                            className={`absolute flex flex-col items-center justify-center rounded-xl backdrop-blur-md transition-colors duration-300 z-10 group cursor-pointer
                                ${isSelected 
                                    ? 'bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                                    : 'bg-slate-800/80 border-2 border-white/10 hover:border-emerald-500/50 hover:bg-slate-800'
                                }`}
                            style={{
                                left: `${part.x}%`,
                                top: `${part.y}%`,
                                width: `${part.width}%`,
                                height: `${part.height}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Icon 
                                size={20} 
                                className={`mb-1 md:mb-2 transition-colors ${isSelected ? 'text-emerald-300' : 'text-gray-400 group-hover:text-emerald-400'}`} 
                            />
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-1 ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {part.label}
                            </span>
                            
                            {/* Selection Brackets */}
                            {isSelected && (
                                <>
                                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-emerald-400" />
                                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-emerald-400" />
                                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-emerald-400" />
                                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-emerald-400" />
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const SupportPage: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'troubleshoot' | 'maintenance'>('troubleshoot');
    const { t } = useTranslation();
    const d = useDict().support;

    const systemComponents = useMemo(() => d.components.map(comp => ({
        ...comp,
        icon: componentIcons[comp.id] ?? Settings,
    })), [d]);

    // Build a name lookup map for the schematic labels
    const componentNames = useMemo(() => Object.fromEntries(
        d.components.map(c => [c.id, c.name])
    ), [d]);

    // Set default selected component after systemComponents is built
    const effectiveSelected = selectedComponent ?? systemComponents[0];

    const handleComponentSelect = (id: string) => {
        const comp = systemComponents.find(c => c.id === id);
        if (comp) setSelectedComponent(comp);
    };

    const headerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const fadeVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <section className="py-32 min-h-screen bg-[#000212]">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <span className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        {d.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        {d.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">{d.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        {d.description}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-6 mb-16 md:mb-24">
                    {/* Left: Interactive Schematic */}
                    <div className="lg:col-span-7">
                        <SystemSchematic 
                            onSelect={handleComponentSelect} 
                            selectedId={effectiveSelected.id}
                            componentNames={componentNames}
                        />
                    </div>

                    {/* Right: Diagnostic Interface */}
                    <div className="lg:col-span-5">
                        <VectorBorderCard className="h-full min-h-[400px] md:min-h-[600px] bg-[#0A0E1F]">
                            <div className="p-6 md:p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
                                            {React.createElement(effectiveSelected.icon, { size: 32 })}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{effectiveSelected.name}</h2>
                                            <p className="text-sm text-gray-400 mt-1 max-w-md">{effectiveSelected.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-2 mb-6 bg-black/20 p-1 rounded-lg self-start w-full">
                                    <button 
                                        onClick={() => setActiveTab('troubleshoot')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'troubleshoot' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <span className="flex items-center justify-center gap-2"><AlertTriangle size={16} /> {d.troubleshooting}</span>
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('maintenance')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'maintenance' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <span className="flex items-center justify-center gap-2"><Calendar size={16} /> {d.maintenance}</span>
                                    </button>
                                </div>

                                {/* Content Area */}
                                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'troubleshoot' ? (
                                            <motion.div 
                                                key="troubleshoot"
                                                variants={fadeVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="space-y-3"
                                            >
                                                {effectiveSelected.troubleshooting.map((item, i) => (
                                                    <AccordionItem key={i} title={item.q}>
                                                        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                                                            <LifeBuoy className="text-red-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                                                            <p className="text-gray-300 leading-relaxed">{item.a}</p>
                                                        </div>
                                                    </AccordionItem>
                                                ))}
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="maintenance"
                                                variants={fadeVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="space-y-3"
                                            >
                                                {effectiveSelected.maintenance.map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset whitespace-nowrap uppercase w-24 text-center ${frequencyStyles[item.frequency]}`}>
                                                                {item.frequency}
                                                            </span>
                                                            <span className="text-sm text-gray-300">{item.task}</span>
                                                        </div>
                                                        <CheckCircle2 className="text-gray-600 w-5 h-5" />
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </VectorBorderCard>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
                    <VectorBorderCard className="bg-[#0A0E1F] group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 transition-all duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-emerald-400 transition-colors"><Settings size={20} className="text-emerald-500"/> {d.serviceWorkflow}</h2>
                            <div className="space-y-3 text-sm text-gray-300">
                                {d.serviceSteps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5" /><span>{step}</span></div>
                                ))}
                            </div>
                        </div>
                    </VectorBorderCard>

                    <VectorBorderCard className="bg-[#0A0E1F] group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] hover:border-red-500/30 transition-all duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-red-400 transition-colors"><AlertTriangle size={20} className="text-red-500"/> {d.escalationPaths}</h2>
                            <div className="space-y-3 text-sm text-gray-300">
                                <div><span className="font-bold text-red-400">P1:</span> {d.escalation.p1}</div>
                                <div><span className="font-bold text-amber-400">P2:</span> {d.escalation.p2}</div>
                                <div><span className="font-bold text-emerald-400">P3:</span> {d.escalation.p3}</div>
                            </div>
                        </div>
                    </VectorBorderCard>

                    <VectorBorderCard className="bg-[#0A0E1F] group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:border-blue-500/30 transition-all duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-blue-400 transition-colors"><Wind size={20} className="text-blue-500"/> {d.slaAndIntake}</h2>
                            <div className="space-y-3 text-sm text-gray-300">
                                {d.sla.map((item, i) => (
                                    <div key={i} className="p-2 border border-white/5 rounded bg-black/20">{item}</div>
                                ))}
                            </div>
                        </div>
                    </VectorBorderCard>
                </div>

                {/* Find a Technician */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-16"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                            <MapPin className="text-emerald-400" /> {d.expertNetwork}
                        </h2>
                        <p className="text-gray-400">{d.expertNetworkDesc}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {technicians.map((tech) => (
                            <motion.div key={tech.name} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                                        <p className="text-xs text-emerald-400 font-mono uppercase">{tech.location}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all">
                                        <Wrench size={18} />
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <Phone size={14} /> <span>{tech.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={14} /> <span>{tech.email}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-white/5 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                                    {d.dispatchRequest} <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SupportPage;
