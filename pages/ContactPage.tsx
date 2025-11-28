
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, MapPin, Building2, Users, HelpCircle } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';

// --- 3D Components ---

const ParticleSphere = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate points on a sphere surface
  const [sphere] = useState(() => {
    const count = 5000;
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const Scene = () => {
  return (
    <>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ParticleSphere />
        </Float>
        <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={2 * Math.PI / 3}
        />
    </>
  );
};

// --- Data ---

const offices = [
    { city: 'Houston', country: 'USA', type: 'Global HQ', address: 'Energy Corridor, TX 77077' },
    { city: 'Rotterdam', country: 'Netherlands', type: 'EU Operations', address: 'Maasvlakte Rt, 3029' },
    { city: 'Singapore', country: 'Singapore', type: 'APAC Hub', address: 'Jurong Island Hwy' },
    { city: 'Dubai', country: 'UAE', type: 'MENA Region', address: 'Jebel Ali Free Zone' },
];

const departments = [
    { name: 'General Inquiries', email: 'hello@masarzero.com', icon: HelpCircle, desc: 'General questions and information.' },
    { name: 'Sales & Partnerships', email: 'sales@masarzero.com', icon: Building2, desc: 'Commercial inquiries and partnership opportunities.' },
    { name: 'Technical Support', email: 'support@masarzero.com', icon: Users, desc: 'Existing client support and technical assistance.' },
    { name: 'Media & Press', email: 'press@masarzero.com', icon: Globe, desc: 'Media kits and press releases.' },
];

// --- Page Component ---

const ContactPage: React.FC = () => {
    return (
        <section className="min-h-screen pt-24 pb-12 relative bg-[#000212] overflow-hidden flex flex-col items-center justify-center">
            
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 cursor-move">
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
            
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#000212]/40 to-[#000212] pointer-events-none z-0" />

            <div className="container mx-auto px-4 relative z-10 w-full pointer-events-none">
                <div className="pointer-events-auto">
                    
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Information</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Connect with our global team. Whether you're ready to deploy or just have a question, we're here to help.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        
                        {/* Left Column: Offices */}
                        <VectorBorderCard className="bg-slate-900/70 backdrop-blur-md h-full">
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <Globe className="text-cyan-400" size={24} />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">Global Nexus</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {offices.map((office, i) => (
                                        <motion.div 
                                            key={office.city}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white text-lg">{office.city}</h4>
                                                <span className="text-[9px] font-mono font-bold text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded uppercase border border-cyan-500/20">
                                                    {office.country}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1 flex items-start gap-2">
                                                <MapPin size={12} className="mt-0.5 shrink-0" />
                                                {office.address}
                                            </p>
                                            <div className="mt-3 pt-3 border-t border-white/5">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{office.type}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </VectorBorderCard>

                        {/* Right Column: Direct Contacts */}
                        <VectorBorderCard className="bg-slate-900/70 backdrop-blur-md h-full">
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <Phone className="text-cyan-400" size={24} />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">Direct Channels</h3>
                                </div>

                                <div className="space-y-4">
                                    {departments.map((dept, i) => {
                                        const Icon = dept.icon;
                                        return (
                                            <motion.a
                                                key={dept.name}
                                                href={`mailto:${dept.email}`}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer"
                                            >
                                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                                    <Icon size={20} />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{dept.name}</h4>
                                                    <p className="text-xs text-gray-400 mt-0.5">{dept.desc}</p>
                                                </div>
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-xs font-mono text-cyan-500/80 group-hover:text-cyan-400">{dept.email}</p>
                                                </div>
                                            </motion.a>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <Phone size={20} className="text-white" />
                                            <div>
                                                <p className="text-[10px] text-gray-300 uppercase font-bold">24/7 Emergency Support</p>
                                                <p className="text-lg font-mono font-bold text-white">+1 (888) 555-0199</p>
                                            </div>
                                        </div>
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </VectorBorderCard>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
