
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ChevronDown, Terminal, Database, Activity, BookOpen, Wrench, AlertTriangle, Truck, Zap, Layers } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import VectorBorderCard from '../components/VectorBorderCard';

const categories = [
  { 
    id: 'Overview',
    icon: BookOpen, 
    title: 'System Overview', 
    color: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50'
  },
  { 
    id: 'Safety',
    icon: ShieldCheck, 
    title: 'Safety Protocols', 
    color: 'text-red-400',
    borderColor: 'group-hover:border-red-500/50'
  },
  { 
    id: 'Installation',
    icon: Truck, 
    title: 'Installation & Logistics', 
    color: 'text-purple-400',
    borderColor: 'group-hover:border-purple-500/50'
  },
  { 
    id: 'Maintenance',
    icon: Wrench, 
    title: 'Maintenance', 
    color: 'text-blue-400',
    borderColor: 'group-hover:border-blue-500/50'
  },
  { 
    id: 'Troubleshooting',
    icon: AlertTriangle, 
    title: 'Troubleshooting', 
    color: 'text-yellow-400',
    borderColor: 'group-hover:border-yellow-500/50'
  },
];

const knowledgeData: Record<string, { id: string; title: string; content: React.ReactNode; tags: string[] }[]> = {
  Overview: [
    { 
        id: 'SYS-001', 
        title: 'Introduction & Intended Use', 
        content: (
            <div className="space-y-4">
                <p>The MasarZero Vapor Recovery Unit (VRU) is designed to capture and recover hydrocarbon vapors typically generated during truck unloading or diurnal gasoline evaporation. By recovering these vapors, the system reduces emissions, improves safety, and recovers valuable saleable gasoline.</p>
                <p><strong>Intended Use:</strong> This VRU is intended solely for the recovery of hydrocarbon vapors from underground gasoline storage tanks. Use outside of this intended application, or with vapor compositions significantly different from the design basis, is prohibited.</p>
            </div>
        ),
        tags: ['General', 'Scope']
    },
    { 
        id: 'SYS-002', 
        title: 'System Components', 
        content: (
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Process System:</strong> High-quality membrane(s), membrane separation unit(s), vacuum pump, oil pump, associated piping, valves (manual and solenoid), and fittings.</li>
                <li><strong>Refrigeration System:</strong> Compressor, evaporator, condenser (cooling fan), accumulator, expansion valve, refrigerant lines, pressure/temperature sensors, separators (oil, gas-liquid).</li>
                <li><strong>Control System:</strong> PLC, HMI/Touchscreen, sensors (pressure, temperature, level), contactors, relays, power supply, and Cloud Box for remote monitoring, all housed within an Explosion-Proof Cabinet.</li>
                <li><strong>Structural/Safety:</strong> Frame, mounting hardware, automatic fire extinguisher, explosion-proof enclosures.</li>
            </ul>
        ),
        tags: ['Hardware', 'Specs']
    },
    { 
        id: 'SYS-003', 
        title: 'Operational Principles', 
        content: (
            <div className="space-y-2">
                <p>The system operates based on the following core principles:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                    <li><strong>Vapor Collection:</strong> Vapors from the source are drawn into the system via the vacuum pump.</li>
                    <li><strong>Membrane Separation:</strong> The core process utilizes a selective membrane that allows certain gases (e.g., air, nitrogen) to pass through while retaining hydrocarbon vapors.</li>
                    <li><strong>Refrigeration:</strong> A refrigeration cycle condenses recovered hydrocarbon vapors into liquid form.</li>
                    <li><strong>Liquid Handling:</strong> Recovered liquid hydrocarbons are pumped back to storage.</li>
                    <li><strong>Control & Monitoring:</strong> The PLC manages system operation based on sensor inputs and controls pumps, valves, and the compressor.</li>
                </ul>
            </div>
        ),
        tags: ['Theory', 'Process']
    },
  ],
  Safety: [
    { 
        id: 'SAF-001', 
        title: 'General Safety Guidelines', 
        content: (
            <div className="space-y-3">
                <p>Adhering to these guidelines is requisite to ensure personal safety and mitigate the risk of property damage.</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Only trained and qualified personnel should install, operate, and maintain the VRU.</li>
                    <li>Ensure that emergency response procedures are in place before operating the unit.</li>
                    <li>Maintain adequate ventilation in areas where the VRU is installed to prevent vapor accumulation.</li>
                    <li>Keep fire extinguishers and spill containment kits available near the unit.</li>
                    <li>Clearly mark hazardous zones and restrict unauthorized personnel.</li>
                </ul>
                <p className="text-red-400 font-bold mt-2">WARNING: Improper installation or operation can lead to serious safety hazards, including gas leaks or explosions.</p>
            </div>
        ),
        tags: ['General', 'Personnel']
    },
    { 
        id: 'SAF-002', 
        title: 'Electrical Safety', 
        content: (
            <div className="space-y-3">
                <p>High voltage presents a significant risk of fatal injury. Electrical work is restricted to qualified electricians.</p>
                <div className="bg-white/5 p-3 rounded border border-white/10">
                    <h4 className="font-bold text-white mb-2">Pre-Work Safety Protocol (The 5 Rules):</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-300">
                        <li>Isolation: Complete electrical isolation from all energy sources.</li>
                        <li>Lockout/Tagout (LOTO): Prevent unintentional re-energization.</li>
                        <li>Voltage Verification: Confirm de-energization using calibrated instruments.</li>
                        <li>Earthing and Short-Circuiting: Discharge residual energy.</li>
                        <li>Protection: Use barriers against adjacent live conductors.</li>
                    </ol>
                </div>
                <p><strong>Residual Energy:</strong> Capacitors store energy even when off. Allow sufficient time for discharge before accessing internal components.</p>
            </div>
        ),
        tags: ['High Voltage', 'LOTO']
    },
    { 
        id: 'SAF-003', 
        title: 'Emergency Procedures', 
        content: (
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-white">Fire or Explosion</h4>
                    <ol className="list-decimal list-inside pl-2 text-gray-300">
                        <li>Activate the nearest fire alarm and evacuate personnel.</li>
                        <li>Use foam-based or dry chemical fire extinguishers—do not use water on gasoline vapors.</li>
                        <li>Shut down the VRU system if safe to do so.</li>
                    </ol>
                </div>
                <div>
                    <h4 className="font-bold text-white">Vapor or Gas Leak</h4>
                    <ol className="list-decimal list-inside pl-2 text-gray-300">
                        <li>Evacuate the area immediately and prohibit ignition sources.</li>
                        <li>Shut down the VRU and close any isolation valves.</li>
                        <li>Ventilate the area to disperse vapors safely.</li>
                    </ol>
                </div>
            </div>
        ),
        tags: ['Emergency', 'Fire', 'Leak']
    },
  ],
  Installation: [
    { 
        id: 'INS-001', 
        title: 'Shipment Inspection & Handling', 
        content: (
            <div className="space-y-3">
                <p>Upon arrival, perform a careful visual inspection of the exterior packaging before accepting shipment.</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Look for crushed crates, torn shrink wrap, or evidence of excessive impact.</li>
                    <li><strong>Damage Documentation:</strong> Immediately photograph any damage and note it on the Bill of Lading before signing.</li>
                    <li><strong>Lifting:</strong> Utilize only designated lifting points on the skid/frame. Do NOT lift by attaching to components like the compressor or motor.</li>
                </ul>
            </div>
        ),
        tags: ['Logistics', 'Receiving']
    },
    { 
        id: 'INS-002', 
        title: 'Storage (Pre-Installation)', 
        content: (
            <div>
                <p className="mb-2">If the VRU is not scheduled for immediate installation:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Store indoors in a clean, dry, well-ventilated area.</li>
                    <li>If indoor storage is unavailable, cover loosely with a durable, breathable tarp. Do not use non-breathable plastic that traps moisture.</li>
                    <li><strong>Long-Term ({'>'}3 months):</strong> Ensure all residual liquids are drained. Place desiccant bags inside control panels. Rotate motor shafts manually every month to prevent bearing seizing.</li>
                </ul>
            </div>
        ),
        tags: ['Storage', 'Preservation']
    },
    { 
        id: 'INS-003', 
        title: 'Pre-Requisites & Site Prep', 
        content: (
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Piping:</strong> Ensure 2-inch (50mm) piping for underground tanks to prevent bottlenecks.</li>
                <li><strong>Location:</strong> Site should be away from the filling canopy to reduce risk. Ensure ample space for maintenance access.</li>
                <li><strong>Power:</strong> Confirm stable power supply (380V, 50/60Hz). Install voltage stabilization if grid is unstable.</li>
                <li><strong>Grounding:</strong> Ensure stable grounding and a level concrete pad that meets load-bearing requirements.</li>
            </ul>
        ),
        tags: ['Site Prep', 'Requirements']
    },
  ],
  Maintenance: [
    { 
        id: 'MNT-001', 
        title: 'General Maintenance Schedule', 
        content: (
            <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="p-2 bg-white/5 rounded flex justify-between"><span>Visual Inspection (Leaks/Vibration)</span> <span className="text-cyan-400 font-bold">Daily</span></div>
                <div className="p-2 bg-white/5 rounded flex justify-between"><span>Wipe down housing & check vents</span> <span className="text-cyan-400 font-bold">Weekly</span></div>
                <div className="p-2 bg-white/5 rounded flex justify-between"><span>Inspect fan blades & motor</span> <span className="text-cyan-400 font-bold">Monthly</span></div>
                <div className="p-2 bg-white/5 rounded flex justify-between"><span>Clean condenser/evaporator coils</span> <span className="text-cyan-400 font-bold">Quarterly</span></div>
                <div className="p-2 bg-white/5 rounded flex justify-between"><span>Full System Leak Test & Oil Change</span> <span className="text-cyan-400 font-bold">Annually</span></div>
            </div>
        ),
        tags: ['Schedule', 'Routine']
    },
    { 
        id: 'MNT-002', 
        title: 'Compressor & Condenser', 
        content: (
            <div className="space-y-2">
                <p>The refrigeration system is hermetically sealed, minimizing maintenance needs. However, airflow is critical.</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Coil Cleaning:</strong> Clean the outdoor coil annually or quarterly in dusty environments to remove debris.</li>
                    <li><strong>Fan Maintenance:</strong> Visually inspect the fan motor for corrosion or unusual noise. Lubricate as needed.</li>
                    <li><strong>Life Expectancy:</strong> The compressor is rated for 200,000 cycles (approx 10+ years). Refill POE oil if sight glass level is low.</li>
                </ul>
            </div>
        ),
        tags: ['Compressor', 'HVAC']
    },
    { 
        id: 'MNT-003', 
        title: 'Vacuum/Air Pump', 
        content: (
            <div className="space-y-2">
                <p><strong>Yearly Tasks:</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Check for leaks, noises, vibration, and overheating.</li>
                    <li>Clean pump exterior and replace filters.</li>
                    <li>Check oil quality and level; change oil according to manufacturer recommendations.</li>
                </ul>
                <p><strong>Note:</strong> Dispose of used oil and filters in accordance with local environmental regulations.</p>
            </div>
        ),
        tags: ['Pump', 'Vacuum']
    },
    { 
        id: 'MNT-004', 
        title: 'Evaporator (Freezing/Icing)', 
        content: (
            <div className="space-y-3">
                <p><strong>Diagnosis:</strong> Ice buildup is often caused by low airflow (dirty filters), low refrigerant charge, or sensor malfunction.</p>
                <p><strong>Thawing Procedure:</strong></p>
                <ol className="list-decimal list-inside pl-2">
                    <li>Immediately shut down the cooling system. Do NOT run the fan.</li>
                    <li>Allow passive defrost or use clean, warm (not hot) air.</li>
                    <li><strong>WARNING:</strong> Never use sharp tools or heat guns on the coil. Puncturing the tubing causes massive refrigerant leakage.</li>
                </ol>
            </div>
        ),
        tags: ['Evaporator', 'Ice']
    },
  ],
  Troubleshooting: [
    { 
        id: 'TRB-001', 
        title: 'Common Alarms & Solutions', 
        content: (
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-white">Compressor Low Pressure</h4>
                    <p>Action: Add R404A refrigerant. Perform a re-vacuum (evacuation), then recharge with 4-5 KG of refrigerant.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white">Blower/Air Pump Overload</h4>
                    <p>Action: Open the explosion-proof box and press the Reset button for the blower. If it fails to start, check for piping blockages or seize.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white">High Level Alarm (Recovered Tank)</h4>
                    <p>Diagnosis: Faulty liquid level sensor or obstruction. Repair: Replace sensor unit or check wiring harness in central panel.</p>
                </div>
            </div>
        ),
        tags: ['Alarms', 'Alerts']
    },
    { 
        id: 'TRB-002', 
        title: 'Motor Issues', 
        content: (
            <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Fails to Start:</strong> Check for tripped overload relay. Verify 3-phase voltage (L1-L2, L2-L3, L1-L3). Check for mechanical seizure.</li>
                    <li><strong>Overheats:</strong> Clean cooling fins. Check for voltage imbalance. Ensure load does not exceed rating.</li>
                    <li><strong>Runs in Reverse:</strong> Immediately de-energize. Swap two of the three power leads (e.g., swap L1 and L2) at the terminal block.</li>
                </ul>
            </div>
        ),
        tags: ['Motor', 'Electrical']
    },
    { 
        id: 'TRB-003', 
        title: 'Oil Pump Troubleshooting', 
        content: (
            <ul className="list-disc list-inside space-y-2">
                <li><strong>No Liquid Discharge:</strong> Pump may not be primed, or is rotating in the wrong direction. Perform bump test.</li>
                <li><strong>Surges in Performance:</strong> Check for air leaks in suction line or unstable electrical supply.</li>
                <li><strong>Excessive Power Consumption:</strong> Check for mechanical issues like a bent shaft, tight seals, or worn wear rings.</li>
            </ul>
        ),
        tags: ['Oil Pump', 'Hydraulics']
    },
  ]
};

const KnowledgeBasePage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('Overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase().trim();
        
        if (!lowerQuery) {
            // If no search, only show items from the active category
            return (knowledgeData[activeCategory] || []).map(item => ({
                ...item,
                categoryName: categories.find(c => c.id === activeCategory)?.title || activeCategory
            }));
        }

        // Search is active: Search globally across ALL categories
        const allResults: any[] = [];
        
        Object.entries(knowledgeData).forEach(([catId, items]) => {
            const catTitle = categories.find(c => c.id === catId)?.title || catId;
            
            items.forEach(item => {
                const matches = 
                    item.title.toLowerCase().includes(lowerQuery) ||
                    item.id.toLowerCase().includes(lowerQuery) ||
                    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
                
                if (matches) {
                    allResults.push({
                        ...item,
                        categoryName: catTitle
                    });
                }
            });
        });

        return allResults;
    }, [activeCategory, searchQuery]);

    return (
        <section className="relative min-h-screen bg-[#000212] pt-32 pb-24 overflow-hidden">
            <ParticleBackground />
            
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-6 uppercase tracking-widest">
                        <Terminal size={12} />
                        <span>Integrated Technical Manual v2.4</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                        Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Nexus</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        Official technical documentation, operational procedures, and maintenance protocols for MasarZero systems.
                    </p>
                </motion.div>

                {/* Search & Filter Interface */}
                <div className="flex flex-col gap-8">
                    
                    {/* Search Bar */}
                    <div className="relative group max-w-2xl mx-auto w-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
                        <div className="relative flex items-center bg-[#0a0f1e] rounded-xl border border-white/10 shadow-2xl">
                            <Search size={20} className="ml-4 text-gray-500" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search manual (e.g., 'Compressor', 'Safety')..."
                                className="w-full bg-transparent border-none py-4 px-4 text-lg text-white focus:ring-0 placeholder-gray-600 font-mono"
                            />
                            <div className="pr-4 hidden md:block text-[10px] font-mono text-cyan-500 uppercase">
                                {filteredItems.length} Topics Found
                            </div>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className={`flex flex-wrap justify-center gap-4 transition-opacity duration-300 ${searchQuery ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${isActive ? `bg-white/10 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]` : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <Icon size={16} className={isActive ? category.color : ''} />
                                    <span className="font-bold text-sm uppercase tracking-wider">{category.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-4 mt-4">
                        
                        {searchQuery && (
                            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
                                Search Results across all categories:
                            </div>
                        )}

                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => {
                                const isExpanded = expandedItems[item.id];
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <VectorBorderCard 
                                            className={`cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-slate-900/80' : 'bg-slate-900/40 hover:bg-slate-900/60'}`}
                                        >
                                            <div onClick={() => toggleExpand(item.id)}>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`mt-1 p-2 rounded bg-white/5 border border-white/10 ${isExpanded ? 'text-cyan-400 border-cyan-500/30' : 'text-gray-500'}`}>
                                                            {isExpanded ? <Activity size={20} /> : <Database size={20} />}
                                                        </div>
                                                        <div>
                                                            <h3 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
                                                                {item.title}
                                                            </h3>
                                                            
                                                            {/* Category indicator only visible during search */}
                                                            {searchQuery && (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-[9px] font-bold uppercase bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
                                                                        {item.categoryName}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div className="flex gap-2 mt-2">
                                                                {item.tags.map(tag => (
                                                                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-500 uppercase border border-white/5">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : 'text-gray-600'}`}>
                                                        <ChevronDown size={20} />
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pt-6 mt-6 border-t border-white/10 text-gray-300 leading-relaxed text-sm md:text-base">
                                                                <div className="flex gap-2 mb-4 text-cyan-500 font-mono text-xs uppercase tracking-widest items-center">
                                                                    <Zap size={14} />
                                                                    <span>Reference ID: {item.id}</span>
                                                                    {searchQuery && (
                                                                        <>
                                                                            <span className="mx-2 text-slate-600">|</span>
                                                                            <Layers size={14} className="text-purple-400" />
                                                                            <span className="text-purple-400">{item.categoryName}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {item.content}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </VectorBorderCard>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        
                        {filteredItems.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                                    <Search size={24} />
                                </div>
                                <p className="text-gray-500 font-mono uppercase">
                                    {searchQuery ? `No matches found for "${searchQuery}"` : 'No Records Found'}
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default KnowledgeBasePage;
