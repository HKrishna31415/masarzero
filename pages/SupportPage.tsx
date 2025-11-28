
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, MapPin, Phone, Mail, ChevronRight, Wrench, Thermometer, Wind, Activity, Database, Zap, Settings, AlertTriangle, Calendar, CheckCircle2, Fan, Flame, Droplets, ScanLine } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';
import VectorBorderCard from '../components/VectorBorderCard';

// Unified Data Structure for Components
const systemComponents = [
    {
        id: 'control_panel',
        name: 'Control Panel',
        icon: Settings,
        description: 'The intelligent brain of the VRU, housing the PLC, HMI, and electrical distribution systems.',
        troubleshooting: [
            { q: 'Display is blank.', a: 'First, verify the main power supply to the VRU. If power is present, check the internal fuse for the control panel. A persistent issue may require a panel reset.' },
            { q: 'System reset procedure?', a: 'Yes, a system reboot sequence can be initiated through the maintenance menu. Please consult your operational manual for the step-by-step procedure.' },
        ],
        maintenance: [
            { frequency: 'Monthly', task: 'Verify all indicator lights and alarms are functional.' },
            { frequency: 'Quarterly', task: 'Check for and tighten any loose electrical connections (Power OFF).' },
            { frequency: 'Annually', task: 'Ensure the enclosure seal is intact and free from moisture ingress.' },
        ]
    },
    {
        id: 'flame_arrester',
        name: 'Flame Arrester',
        icon: Flame,
        description: 'Critical safety device installed on the vapor inlet line to prevent flame propagation into the system.',
        troubleshooting: [
            { q: 'High pressure drop at inlet.', a: 'The element bank is likely clogged with debris or particulate matter. Isolate and clean immediately.' },
            { q: 'Visible corrosion on housing.', a: 'Inspect the depth of corrosion. If structural integrity is compromised, replace the unit.' },
        ],
        maintenance: [
            { frequency: 'Monthly', task: 'Visual inspection for external damage or blockage.' },
            { frequency: 'Quarterly', task: 'Remove and clean the element bank with approved solvent.' },
            { frequency: 'Annually', task: 'Hydrostatic testing if required by local regulation.' },
        ]
    },
    {
        id: 'vacuum_pump',
        name: 'Vacuum Pump',
        icon: Fan,
        description: 'Creates the negative pressure required to draw hydrocarbon vapors from the storage tanks into the recovery system.',
        troubleshooting: [
            { q: 'Unable to reach target vacuum.', a: 'Check inlet filters for blockage. Inspect piping for leaks. Verify pump vanes are not worn.' },
            { q: 'Pump is overheating.', a: 'Check oil levels and cooling airflow. Ensure the discharge line is not blocked.' },
        ],
        maintenance: [
            { frequency: 'Weekly', task: 'Check oil level and color.' },
            { frequency: 'Quarterly', task: 'Change vacuum pump oil and replace oil mist filters.' },
            { frequency: 'Annually', task: 'Inspect and replace vanes/seals.' },
        ]
    },
    {
        id: 'scrubber',
        name: 'Scrubber / Sieve',
        icon: Wind,
        description: 'Filtration stage designed to remove particulates and moisture from the incoming vapor stream.',
        troubleshooting: [
            { q: 'High liquid level reported.', a: 'This may indicate an issue with the automated drain valve. Manually drain the scrubber and check the valve for blockages or mechanical failure.' },
            { q: 'Replacement frequency?', a: 'Scrubber media replacement depends on vapor composition. We recommend quarterly inspection and replacement every 12-18 months.' },
        ],
        maintenance: [
            { frequency: 'Weekly', task: 'Drain accumulated liquids from the scrubber housing.' },
            { frequency: 'Monthly', task: 'Check for pressure drops across the scrubber media.' },
            { frequency: 'Quarterly', task: 'Inspect internal components for corrosion or blockages.' },
            { frequency: 'Annually', task: 'Replace scrubber media as per operational hours.' },
        ]
    },
    {
        id: 'compressor',
        name: 'Compressor',
        icon: Activity,
        description: 'Pressurizes the refrigerant to facilitate the heat exchange cycle required for condensation.',
        troubleshooting: [
            { q: 'Compressor is short-cycling.', a: 'Short-cycling is often caused by either low refrigerant levels or a faulty pressure switch. Do not continue operation; contact support immediately.' },
        ],
        maintenance: [
            { frequency: 'Weekly', task: 'Clean compressor intake filters.' },
            { frequency: 'Monthly', task: 'Check compressor oil levels and top up if necessary.' },
            { frequency: 'Quarterly', task: 'Inspect drive belts for wear, tension, and alignment.' },
            { frequency: 'Annually', task: 'Test pressure relief valves.' },
        ]
    },
    {
        id: 'refrigerator',
        name: 'Refrigerator Unit',
        icon: Thermometer,
        description: 'The core cooling system responsible for condensing hydrocarbon vapors back into liquid form.',
        troubleshooting: [
            { q: 'The unit is not cooling sufficiently.', a: 'Check for obstructions around condenser coils. Ensure adequate airflow. Verify ambient temperature is within range. If issue persists, check refrigerant levels.' },
            { q: 'Unusual noise detected.', a: 'Could indicate fan obstruction or compressor issue. Power down safely and inspect visually. Contact a technician if noise continues after restart.' },
        ],
        maintenance: [
            { frequency: 'Weekly', task: 'Inspect condenser coils for debris and clean if necessary.' },
            { frequency: 'Monthly', task: 'Check refrigerant levels and system pressures.' },
            { frequency: 'Quarterly', task: 'Verify fan motors are operating correctly and free of vibration.' },
            { frequency: 'Annually', task: 'Perform a full refrigerant leak test.' },
        ]
    },
    {
        id: 'tank',
        name: 'Gasoline Tank',
        icon: Database,
        description: 'The holding vessel for recovered liquid hydrocarbons before they are returned to the main supply.',
        troubleshooting: [
            { q: 'Level sensor reading error.', a: 'The float may be stuck. Perform a manual dip test to verify actual levels. Attempt to recalibrate the sensor via the control panel.' },
            { q: 'Odor detected near tank area.', a: 'Inspect manway gaskets, vent pipes, and flange connections for vapor leaks. Ensure the pressure relief valve is seating correctly.' },
        ],
        maintenance: [
            { frequency: 'Monthly', task: 'Visual inspection of vent risers and rain caps.' },
            { frequency: 'Quarterly', task: 'Check grounding/earthing connections for continuity.' },
            { frequency: 'Annually', task: 'Inspect exterior for corrosion or physical damage.' },
            { frequency: 'Annually', task: 'Calibrate electronic level monitoring system.' },
        ]
    },
    {
        id: 'oil_pump',
        name: 'Oil Pump',
        icon: Droplets,
        description: 'Transfers the recovered liquid fuel from the holding tank back to the main underground storage.',
        troubleshooting: [
            { q: 'Pump motor running but no flow.', a: 'Check for air lock in the suction line. Ensure isolation valves are open. Check for blockage in the discharge strainer.' },
            { q: 'Pump leaking.', a: 'Mechanical seal failure is likely. Isolate pump and replace seal kit.' },
        ],
        maintenance: [
            { frequency: 'Monthly', task: 'Check for leaks around shaft seal.' },
            { frequency: 'Quarterly', task: 'Clean suction strainer.' },
            { frequency: 'Annually', task: 'Check alignment and coupling wear.' },
        ]
    },
    {
        id: 'quality_sensor',
        name: 'Gasoline Quality',
        icon: ScanLine,
        description: 'Real-time analysis unit monitoring fuel composition, RVP, and octane levels of recovered liquid.',
        troubleshooting: [
            { q: 'Inaccurate readings.', a: 'Sensor probe may be fouled. Isolate sensor and clean with approved solvent. Perform zero-calibration.' },
            { q: 'No data output.', a: 'Check signal wiring to PLC. Ensure 24V DC supply is present at the sensor head.' },
        ],
        maintenance: [
            { frequency: 'Monthly', task: 'Verify readings against manual lab sample.' },
            { frequency: 'Quarterly', task: 'Calibration with standard reference fluid.' },
            { frequency: 'Annually', task: 'Replace sensor head assembly.' },
        ]
    }
];

const technicians = [
  { name: 'John Carter', location: 'Houston, TX', phone: '1-800-555-0101', email: 'j.carter@masarzero.tech' },
  { name: 'Maria Garcia', location: 'Rotterdam, NL', phone: '+31 10 555 0202', email: 'm.garcia@masarzero.tech' },
  { name: 'Kenji Tanaka', location: 'Singapore', phone: '+65 5550 3030', email: 'k.tanaka@masarzero.tech' },
];

const frequencyStyles: { [key: string]: string } = {
  Daily: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  Weekly: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
  Monthly: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  Quarterly: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  Annually: 'bg-red-500/20 text-red-300 ring-red-500/30',
};

const SystemSchematic = ({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string }) => {
    const parts = [
        // Top Row
        { id: 'control_panel', label: 'Control Panel', x: 50, y: 12, width: 25, height: 15, icon: Settings },
        
        // Second Row (Intake & Processing)
        { id: 'flame_arrester', label: 'Flame Arrester', x: 12, y: 40, width: 12, height: 12, icon: Flame },
        { id: 'vacuum_pump', label: 'Vacuum Pump', x: 30, y: 40, width: 15, height: 15, icon: Fan },
        { id: 'scrubber', label: 'Scrubber', x: 50, y: 40, width: 15, height: 20, icon: Wind },
        { id: 'compressor', label: 'Compressor', x: 70, y: 40, width: 15, height: 15, icon: Activity },
        { id: 'refrigerator', label: 'Condenser', x: 90, y: 40, width: 12, height: 20, icon: Thermometer },

        // Bottom Row (Storage & Output)
        { id: 'quality_sensor', label: 'Gasoline Quality', x: 30, y: 65, width: 15, height: 12, icon: ScanLine },
        { id: 'tank', label: 'Gasoline Tank', x: 70, y: 80, width: 25, height: 15, icon: Database },
        { id: 'oil_pump', label: 'Oil Pump', x: 40, y: 80, width: 12, height: 12, icon: Droplets },
    ];

    return (
        <div className="relative w-full aspect-[3/4] md:aspect-[16/9] bg-[#0A0E1F] rounded-3xl border border-white/10 overflow-hidden p-4 md:p-8 shadow-inner">
            {/* Schematic Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
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
                                    ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
                                    : 'bg-slate-800/80 border-2 border-white/10 hover:border-cyan-500/50 hover:bg-slate-800'
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
                                className={`mb-1 md:mb-2 transition-colors ${isSelected ? 'text-cyan-300' : 'text-gray-400 group-hover:text-cyan-400'}`} 
                            />
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-1 ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {part.label}
                            </span>
                            
                            {/* Selection Brackets */}
                            {isSelected && (
                                <>
                                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-cyan-400" />
                                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-400" />
                                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-cyan-400" />
                                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-cyan-400" />
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
    const [selectedComponent, setSelectedComponent] = useState(systemComponents[0]);
    const [activeTab, setActiveTab] = useState<'troubleshoot' | 'maintenance'>('troubleshoot');

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
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        Operational Support
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Diagnostics</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        Interact with the schematic below to identify components and access specific maintenance protocols.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 mb-24">
                    {/* Left: Interactive Schematic */}
                    <div className="lg:col-span-7">
                        <SystemSchematic 
                            onSelect={handleComponentSelect} 
                            selectedId={selectedComponent.id} 
                        />
                    </div>

                    {/* Right: Diagnostic Interface */}
                    <div className="lg:col-span-5">
                        <VectorBorderCard className="h-full min-h-[600px] bg-[#0A0E1F]">
                            <div className="p-6 md:p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-400">
                                            {React.createElement(selectedComponent.icon, { size: 32 })}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{selectedComponent.name}</h2>
                                            <p className="text-sm text-gray-400 mt-1 max-w-md">{selectedComponent.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-2 mb-6 bg-black/20 p-1 rounded-lg self-start w-full">
                                    <button 
                                        onClick={() => setActiveTab('troubleshoot')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'troubleshoot' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <span className="flex items-center justify-center gap-2"><AlertTriangle size={16} /> Troubleshooting</span>
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('maintenance')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'maintenance' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <span className="flex items-center justify-center gap-2"><Calendar size={16} /> Maintenance</span>
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
                                                {selectedComponent.troubleshooting.map((item, i) => (
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
                                                {selectedComponent.maintenance.map((item, i) => (
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

                {/* Find a Technician */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-16"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                            <MapPin className="text-cyan-400" /> Expert Network
                        </h2>
                        <p className="text-gray-400">
                            Certified professionals ready for on-site deployment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {technicians.map((tech) => (
                            <motion.div key={tech.name} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                                        <p className="text-xs text-cyan-400 font-mono uppercase">{tech.location}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
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
                                    Dispatch Request <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
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
