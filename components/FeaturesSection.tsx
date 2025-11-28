
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import { Cpu, Wind, Layers, Wifi, ShieldCheck, Activity } from 'lucide-react';
import * as THREE from 'three';

const features = [
  { id: 'cryo', icon: Wind, title: 'Cryogenic Capture', description: 'Patented sub-zero condensation technology achieving 99.9% recovery efficiency.' },
  { id: 'ai', icon: Cpu, title: 'Adaptive Intelligence', description: 'Self-learning algorithms optimize pressure and temperature in real-time.' },
  { id: 'modular', icon: Layers, title: 'Modular Architecture', description: 'Plug-and-play scalability designed for terminals of any capacity.' },
  { id: 'iot', icon: Wifi, title: 'IoT Connectivity', description: 'Native integration with PinnacleOS for remote command and control.' },
  { id: 'safety', icon: ShieldCheck, title: 'Ex-Proof Design', description: 'Certified for Zone 1 hazardous environments with intrinsic safety barriers.' },
  { id: 'health', icon: Activity, title: 'Predictive Health', description: 'Automated diagnostics detect anomalies to prevent downtime before it occurs.' },
];

const TechCore = () => {
    const sphereRef = useRef<THREE.Mesh>(null!);
    const ringRef1 = useRef<THREE.Mesh>(null!);
    const ringRef2 = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.4;
            const scale = 1.8 + Math.sin(t * 1.5) * 0.1;
            sphereRef.current.scale.set(scale, scale, scale);
        }
        
        if (ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.2;
            ringRef1.current.rotation.y = t * 0.2;
        }

        if (ringRef2.current) {
            ringRef2.current.rotation.x = -t * 0.3;
            ringRef2.current.rotation.z = t * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Central Energy Sphere */}
            <Sphere args={[1, 64, 64]} ref={sphereRef}>
                <MeshDistortMaterial
                    color="#06b6d4"
                    attach="material"
                    distort={0.6}
                    speed={3}
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#0891b2"
                    emissiveIntensity={0.8}
                />
            </Sphere>
            
            {/* Outer Rings representing containment/field */}
            <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.02, 16, 100]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.3} />
            </mesh>
            
            <mesh ref={ringRef2}>
                <torusGeometry args={[3.5, 0.03, 16, 100]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} transparent opacity={0.2} />
            </mesh>

            <Sparkles count={80} scale={6} size={4} speed={0.4} opacity={0.6} color="#a5f3fc" />
        </Float>
    );
};

const FeaturesSection: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState<typeof features[0] | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const radius = isMobile ? 140 : 320;

    return (
        <section className="py-32 relative overflow-hidden bg-[#020410] min-h-[900px] flex flex-col items-center">
            
            {/* Background Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-10" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }} 
            />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center h-full">
                <div className="text-center mb-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Dominance</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Our proprietary architecture combines cryogenic physics with neural network logic.
                        </p>
                    </motion.div>
                </div>

                {/* Main Interactive Diagram - Increased top margin to avoid intersection */}
                <div className="relative w-full max-w-5xl aspect-square md:aspect-[16/9] flex items-center justify-center mt-32 md:mt-40">
                    
                    {/* 3D Scene Layer */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true }}>
                             <ambientLight intensity={0.5} />
                             <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                             <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                             <TechCore />
                        </Canvas>
                    </div>

                    {/* Features Circle Layout */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {features.map((feature, index) => {
                            const total = features.length;
                            const angleDeg = (index / total) * 360 - 90; // Start top
                            const angleRad = (angleDeg * Math.PI) / 180;
                            
                            const isActive = activeFeature?.id === feature.id;
                            const Icon = feature.icon;

                            const x = Math.cos(angleRad) * radius;
                            const y = Math.sin(angleRad) * radius;

                            return (
                                <motion.div
                                    key={feature.id}
                                    className="absolute z-20"
                                    style={{ x, y }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, type: 'spring' }}
                                >
                                    <div 
                                        className="relative group cursor-pointer"
                                        onMouseEnter={() => setActiveFeature(feature)}
                                        onMouseLeave={() => setActiveFeature(null)}
                                        onClick={() => setActiveFeature(feature)}
                                    >
                                        {/* Connector Line to Center (Visual only when active) */}
                                        <motion.div 
                                            className="absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent origin-left -z-10"
                                            style={{ 
                                                width: radius, 
                                                transform: `rotate(${angleDeg + 180}deg)`,
                                                opacity: isActive ? 0.5 : 0
                                            }}
                                        />

                                        {/* Icon Button */}
                                        <motion.div 
                                            className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border backdrop-blur-xl transition-all duration-300 relative overflow-hidden -ml-6 -mt-6 md:-ml-8 md:-mt-8
                                                ${isActive 
                                                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.6)]' 
                                                    : 'bg-slate-900/80 border-white/10 text-gray-400 hover:border-cyan-500/50 hover:text-white'
                                                }`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Icon size={isMobile ? 20 : 28} strokeWidth={1.5} />
                                            
                                            {/* Scanning effect on hover */}
                                            {isActive && (
                                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                            )}
                                        </motion.div>

                                        {/* Label (Desktop: Always visible, Mobile: Hidden to avoid clutter) */}
                                        <motion.div 
                                            className={`absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center transition-all duration-300 hidden md:block ${isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'}`}
                                        >
                                            <p className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                {feature.title}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Center Detail Card (Shows on Hover/Click) */}
                        <AnimatePresence mode="wait">
                            {activeFeature && (
                                <motion.div 
                                    key={activeFeature.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute z-30 pointer-events-none text-center max-w-[280px] md:max-w-xs"
                                >
                                    <div className="glass-card p-6 rounded-2xl border border-cyan-500/30 bg-[#000212]/80 backdrop-blur-xl shadow-2xl relative">
                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg" />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 rounded-br-lg" />
                                        
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{activeFeature.title}</h3>
                                        <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-4 rounded-full" />
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {activeFeature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Default State (When nothing hovered) */}
                        {!activeFeature && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute z-30 pointer-events-none text-center"
                            >
                                <p className="text-xs font-mono text-cyan-500/50 uppercase tracking-[0.2em] animate-pulse">
                                    System Idle // Hover Nodes
                                </p>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
