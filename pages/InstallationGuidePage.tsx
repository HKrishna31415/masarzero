
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { ChevronRight, ChevronLeft, CheckCircle2, Play, Server, Box } from 'lucide-react';
import InstallationScene from '../components/InstallationScene';
import ElectricalWiringDiagram from '../components/ElectricalWiringDiagram';
import ConnectivityDiagram from '../components/ConnectivityDiagram';
import VectorBorderCard from '../components/VectorBorderCard';

const installSteps = [
    {
        id: 'prep',
        title: "Site Preparation",
        type: 'physical',
        desc: "Ensure the foundation is ready for deployment.",
        checklist: [
            "Verify concrete pad dimensions (2m x 2m min)",
            "Confirm load bearing capacity > 2500kg",
            "Ensure 1m clearance on all sides",
            "Verify grounding rod installation"
        ]
    },
    {
        id: 'placement',
        title: "Unit Placement",
        type: 'physical',
        desc: "Positioning the VRU onto the pad.",
        checklist: [
            "Inspect crane lifting points",
            "Lift unit using spreader bar",
            "Align base holes with anchor bolts",
            "Torque anchor bolts to spec (150 Nm)"
        ]
    },
    {
        id: 'electrical',
        title: "Electrical Termination",
        type: 'technical',
        desc: "High voltage power connection.",
        checklist: [
            "Isolate Main Power (LOTO Procedure)",
            "Connect Phases L1, L2, L3 to XT1 Block",
            "Connect Neutral (N) and PE Ground",
            "Verify Cable Gland Tightness"
        ]
    },
    {
        id: 'connectivity',
        title: "Telemetry Uplink",
        type: 'technical',
        desc: "Establishing cloud data connection.",
        checklist: [
            "Insert SIM Card into V-BOX or Connect Ethernet",
            "Power on Control Circuit (220V)",
            "Verify V-BOX 'NET' LED is blinking",
            "Confirm 'Online' status in PinnacleOS App"
        ]
    },
    {
        id: 'commissioning',
        title: "System Boot",
        type: 'physical', // Reusing physical for 3D lights animation or custom
        desc: "Final startup sequence.",
        checklist: [
            "Open isolation valves",
            "Engage main breaker",
            "Check motor rotation direction",
            "Verify system pressure stabilizes"
        ]
    }
];

const InstallationGuidePage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < installSteps.length - 1) setCurrentStep(curr => curr + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1);
    };

    const activeStepData = installSteps[currentStep];

    return (
        <section className="py-24 min-h-screen bg-[#000212] overflow-hidden flex flex-col">
            <div className="container mx-auto px-4 flex-grow flex flex-col">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2 block">
                            Field Deployment
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Installation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Guide</span>
                        </h1>
                    </div>
                    
                    {/* Step Progress Indicator */}
                    <div className="flex gap-2">
                        {installSteps.map((step, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 w-8 md:w-12 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-cyan-400 scale-110' : i < currentStep ? 'bg-blue-600' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="grid lg:grid-cols-12 gap-6 flex-grow">
                    
                    {/* Left Panel: The Visualizer (Swaps based on Step Type) */}
                    <div className="lg:col-span-8 bg-[#050714] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl min-h-[500px]">
                        <div className="absolute top-6 left-6 z-20 pointer-events-none">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-cyan-400 flex items-center gap-2">
                                {activeStepData.type === 'physical' ? <Box size={14} /> : <Server size={14} />}
                                {activeStepData.type === 'physical' ? 'SPATIAL VIEW' : 'SCHEMATIC VIEW'}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeStepData.id === 'electrical' ? (
                                <motion.div 
                                    key="electrical"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="w-full h-full"
                                >
                                    <ElectricalWiringDiagram />
                                </motion.div>
                            ) : activeStepData.id === 'connectivity' ? (
                                <motion.div 
                                    key="connectivity"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="w-full h-full"
                                >
                                    <ConnectivityDiagram />
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="3d-scene"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="w-full h-full"
                                >
                                    <Canvas camera={{ position: [6, 5, 6], fov: 45 }} shadows>
                                        <ambientLight intensity={0.5} />
                                        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                                        <pointLight position={[-5, 5, -5]} color="#0ea5e9" intensity={1} />
                                        
                                        <InstallationScene step={currentStep} />
                                        
                                        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
                                        <Environment preset="city" />
                                        <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} minDistance={5} maxDistance={15} />
                                    </Canvas>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Panel: Instructions */}
                    <div className="lg:col-span-4 flex flex-col">
                        <VectorBorderCard className="h-full bg-[#0A0E1F] flex flex-col">
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="mb-6">
                                    <span className="text-5xl font-black text-white/5 block -ml-1 mb-2">0{currentStep + 1}</span>
                                    <h2 className="text-2xl font-bold text-white mb-2">{activeStepData.title}</h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">{activeStepData.desc}</p>
                                </div>

                                <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex-grow">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Play size={12} /> Action Items
                                    </h3>
                                    <div className="space-y-4">
                                        {activeStepData.checklist.map((item, i) => (
                                            <motion.div 
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3 group cursor-pointer"
                                            >
                                                <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-cyan-500 transition-colors flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                                    <button 
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                                    >
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                    <button 
                                        onClick={nextStep}
                                        disabled={currentStep === installSteps.length - 1}
                                        className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-900/20"
                                    >
                                        {currentStep === installSteps.length - 1 ? 'Finish' : 'Next Step'}
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </VectorBorderCard>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InstallationGuidePage;
