import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, LifeBuoy, CheckCircle } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';

const maintenanceComponents = [
  { id: 'filtration', name: 'Filtration', title: 'Filtration System Maintenance', description: 'Ensures the purity of the vapor stream by removing contaminants before the condensation phase.', tasks: ['Inspect and clean primary filters.', 'Check for pressure drops across the filter housing.', 'Replace filter elements as per the recommended schedule.'] },
  { id: 'condenser', name: 'Condenser', title: 'Condenser Maintenance', description: 'The core of the cooling cycle, responsible for converting vapor back into a liquid state.', tasks: ['Inspect condenser coils for debris and clean them.', 'Check refrigerant levels and pressures.', 'Ensure fan motors are operating correctly.'] },
  { id: 'control', name: 'Control Panel', title: 'Control Panel Maintenance', description: 'The brain of the VRU, housing the PLC and all control logic for automated operation.', tasks: ['Verify all indicator lights are functional.', 'Check for loose electrical connections.', 'Ensure the enclosure is sealed and free from moisture.'] },
  { id: 'vacuum', name: 'Vacuum Pump', title: 'Vacuum Pump Maintenance', description: 'The vacuum pump is essential for creating the pressure differential needed to draw vapors into the system efficiently.', tasks: ['Check and change vacuum pump oil as per the schedule.', 'Inspect inlet filters and clean or replace them monthly.', 'Verify ultimate vacuum level to ensure performance.', 'Check for oil leaks around seals and fittings.'] },
  { id: 'oil', name: 'Oil Pump', title: 'Oil Pump Maintenance', description: 'Circulates lubricant and pumps recovered liquid fuel, vital for mechanical integrity and fluid transfer.', tasks: ['Check oil levels and quality.', 'Inspect for leaks around the pump housing.', 'Verify pump pressure is within operational range.'] },
  { id: 'compressor', name: 'Compressor', title: 'Compressor Maintenance', description: 'The heart of the refrigeration cycle, pressurizing the refrigerant to facilitate heat exchange.', tasks: ['Check refrigerant levels and for leaks.', 'Inspect belts for wear and tension.', 'Clean intake filters weekly.', 'Verify motor amperage draw is within spec.'] },
];

const scheduleTasks = [
  { frequency: 'Daily', task: 'General visual inspection for leaks or damage.' },
  { frequency: 'Daily', task: 'Check system pressure and temperature readings on control panel.' },
  { frequency: 'Weekly', task: 'Clean compressor intake filters.' },
  { frequency: 'Weekly', task: 'Drain liquids from filtration system housing.' },
  { frequency: 'Weekly', task: 'Conduct a detailed leak inspection on all piping and valves.' },
  { frequency: 'Monthly', task: 'Check compressor oil levels.' },
  { frequency: 'Monthly', task: 'Inspect condenser coils for debris.' },
  { frequency: 'Monthly', task: 'Test automated valve actuation.' },
  { frequency: 'Quarterly', task: 'Clean condenser coils thoroughly.' },
  { frequency: 'Quarterly', task: 'Inspect compressor belts for wear and tension.' },
  { frequency: 'Quarterly', task: 'Calibrate pressure and temperature sensors.' },
  { frequency: 'Annually', task: 'Perform emergency shut-off test.' },
  { frequency: 'Annually', task: 'Test pressure relief valves.' },
  { frequency: 'Annually', task: 'Full system diagnostic by a certified technician.' },
];

const frequencyStyles: { [key: string]: string } = {
  Daily: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  Weekly: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
  Monthly: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  Quarterly: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  Annually: 'bg-red-500/20 text-red-300 ring-red-500/30',
};

const supportTiers = [
    { name: 'Standard', price: 'Included', features: ['24/7 Remote Monitoring', 'Quarterly Health Reports', 'Software Updates', 'Email & Phone Support'] },
    { name: 'Premium', price: '$2,500/mo', features: ['All Standard Features', 'Annual On-site Inspection', 'Priority Support Queue', 'Dedicated Account Manager'] },
    { name: 'Enterprise', price: 'Custom', features: ['All Premium Features', 'Custom On-site Schedule', 'Guaranteed Response Times', 'On-site Parts Consignment'] },
]

const MaintenancePage: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState(maintenanceComponents[3]); // Default to Vacuum Pump
    
    const headerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const cardVariants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0 },
    };

    const detailVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <section className="py-32 min-h-screen">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Reliability & Support
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                        Our commitment doesn't end at installation. We provide comprehensive support and maintenance guidelines to ensure your VRU operates at peak performance for years to come.
                    </p>
                </motion.div>

                {/* Interactive Diagram Section */}
                <motion.div className="mb-24" initial="initial" whileInView="animate" variants={cardVariants} viewport={{ once: true }}>
                     <h2 className="text-3xl font-bold text-center mb-2">Interactive Maintenance Diagram</h2>
                     <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">Select a component on the diagram below to view its specific maintenance tasks and requirements.</p>
                     <div className="glass-card p-8 rounded-2xl">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-grow">
                                    {maintenanceComponents.map(comp => (
                                        <div
                                            key={comp.id}
                                            onClick={() => setSelectedComponent(comp)}
                                            className={`flex items-center justify-center p-4 text-center rounded-lg cursor-pointer border-2 transition-all duration-300 ${selectedComponent.id === comp.id ? 'bg-cyan-500/20 border-cyan-400' : 'bg-slate-900/50 border-slate-700 hover:border-cyan-600'}`}
                                            data-cursor-hover
                                        >
                                            <span className="font-semibold text-sm">{comp.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 h-4 bg-slate-700 rounded-lg"></div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-lg">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedComponent.id}
                                        variants={detailVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <h3 className="text-xl font-bold text-cyan-300 mb-2">{selectedComponent.title}</h3>
                                        <p className="text-sm text-gray-400 mb-4">{selectedComponent.description}</p>
                                        <ul className="space-y-2">
                                            {selectedComponent.tasks.map((task, i) => (
                                                <li key={i} className="flex items-start text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                     </div>
                </motion.div>

                 {/* Preventative Schedule Section */}
                <motion.div className="mb-24" initial="initial" whileInView="animate" variants={cardVariants} viewport={{ once: true }}>
                     <h2 className="text-3xl font-bold text-center mb-8">Preventative Maintenance Schedule</h2>
                     <div className="glass-card p-6 rounded-2xl">
                         <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>Frequency</span>
                            <span>Task</span>
                         </div>
                         <div className="space-y-2">
                            {scheduleTasks.map((item, i) => (
                                <div key={i} className="bg-slate-900/50 p-4 rounded-lg flex items-center justify-between gap-4">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ring-1 ring-inset whitespace-nowrap ${frequencyStyles[item.frequency]}`}>
                                        {item.frequency}
                                    </span>
                                    <p className="text-sm text-gray-300 text-right">{item.task}</p>
                                </div>
                            ))}
                         </div>
                     </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                     <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><LifeBuoy className="text-cyan-400" /> Troubleshooting</h2>
                        <p className="text-gray-400 mb-6">Common questions and solutions. Our support team is available 24/7 for more complex queries.</p>
                         <div className="space-y-2">
                           <AccordionItem title="What if system pressure is lower than normal?">
                                Check for obstructions in the intake lines and ensure all valves are in the correct position. Verify the primary filters are clean.
                           </AccordionItem>
                           <AccordionItem title="The unit is reporting a high temperature warning.">
                                Ensure the cooling unit has adequate airflow and that the ambient temperature is within operational limits. Check coolant levels.
                           </AccordionItem>
                           <AccordionItem title="How do I access my performance reports?">
                                Performance reports are emailed quarterly and are also available 24/7 through our secure SCADA platform portal.
                           </AccordionItem>
                        </div>
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Wrench className="text-cyan-400" /> Our Commitment</h2>
                         <p className="text-gray-400 mb-6">We provide unparalleled service to ensure your investment is protected and your operations run smoothly, safely, and profitably.</p>
                        <div className="space-y-4">
                            <div className="glass-card p-4 rounded-lg"><strong>24/7 Monitoring:</strong> Our network operations center (NOC) monitors your system's health in real-time, identifying potential issues before they become problems.</div>
                            <div className="glass-card p-4 rounded-lg"><strong>Certified Technicians:</strong> A global network of MasarZero-certified technicians are available for on-site support and annual inspections.</div>
                            <div className="glass-card p-4 rounded-lg"><strong>Parts Guarantee:</strong> We guarantee availability of all critical spare parts to minimize any potential downtime.</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Service & Support Tiers</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {supportTiers.map((tier, i) => (
                             <motion.div key={tier.name}
                                className={`glass-card p-8 rounded-2xl flex flex-col ${i === 1 ? 'aurora-border' : ''}`}
                                variants={cardVariants}
                                initial="initial"
                                whileInView="inView"
                                transition={{delay: i * 0.1}}
                                viewport={{once: true}}
                            >
                                <h3 className="text-2xl font-bold text-cyan-400">{tier.name}</h3>
                                <p className="text-4xl font-extrabold my-4">{tier.price}</p>
                                <ul className="space-y-3 text-left text-gray-300 flex-grow">
                                    {tier.features.map(feat => (
                                        <li key={feat} className="flex items-start">
                                            <CheckCircle className="text-green-400 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full mt-8 font-semibold py-3 rounded-lg transition-colors duration-300 ${i === 1 ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
                                    {i === 2 ? 'Contact Sales' : 'Select Plan'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MaintenancePage;
