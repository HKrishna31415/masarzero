
import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Loader, OrbitControls } from '@react-three/drei';
import { ArrowLeft, Info, List, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import LiveDashboard from './LiveDashboard';
import { useSimulation } from '../hooks/useSimulation';
import GasStationScene from './scenes/GasStationScene';
import StorageFacilityScene from './scenes/StorageFacilityScene';
import SimulationKey from './SimulationKey';
import SimulationDescription from './SimulationDescription';

// --- Responsive Camera Component ---
const ResponsiveCamera = ({ facilityType }: { facilityType: 'gas' | 'storage' }) => {
    const { camera, size } = useThree();
    
    useEffect(() => {
        const isMobile = size.width < 768;
        
        // Adjust camera position based on facility type and screen size
        if (facilityType === 'gas') {
            const targetPos = isMobile 
                ? new THREE.Vector3(18, 20, 25) // Further back & higher for mobile
                : new THREE.Vector3(12, 12, 18); // Closer for desktop
            
            camera.position.lerp(targetPos, 0.1);
        } else {
            const targetPos = isMobile
                ? new THREE.Vector3(15, 15, 20)
                : new THREE.Vector3(10, 10, 15);
            
            camera.position.lerp(targetPos, 0.1);
        }
        camera.updateProjectionMatrix();
    }, [size.width, facilityType, camera]);

    return null;
};


interface SimulationViewProps {
    facilityType: 'gas' | 'storage';
    onBack: () => void;
}

const SimulationView: React.FC<SimulationViewProps> = ({ facilityType, onBack }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showLegend, setShowLegend] = useState(false);
    
    // Auto-show info on load for a brief moment or generally
    useEffect(() => {
        const timer = setTimeout(() => setShowInfo(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const { litersRecovered, revenueGenerated, emissionsPrevented } = useSimulation(isRunning, facilityType);

    const Scene = facilityType === 'gas' ? GasStationScene : StorageFacilityScene;

    return (
        <div className="w-full h-full relative bg-[#000212]">
            
            {/* --- Top HUD Bar --- */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-start pointer-events-none">
                {/* Back Button */}
                <button 
                    onClick={onBack}
                    className="pointer-events-auto bg-slate-900/50 backdrop-blur-md border border-white/10 text-white p-3 rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Tools */}
                <div className="flex gap-3 pointer-events-auto">
                    {facilityType === 'gas' && (
                         <button 
                            onClick={() => setShowLegend(!showLegend)}
                            className={`p-3 rounded-full transition-all border ${showLegend ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900/50 backdrop-blur-md border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="Toggle Legend"
                        >
                            <List className="w-5 h-5" />
                        </button>
                    )}
                    
                    <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className={`p-3 rounded-full transition-all border ${showInfo ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900/50 backdrop-blur-md border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Simulation Info"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- Overlays --- */}
            <AnimatePresence>
                {showLegend && facilityType === 'gas' && (
                    <SimulationKey onClose={() => setShowLegend(false)} />
                )}
                {showInfo && facilityType === 'gas' && (
                    <SimulationDescription onClose={() => setShowInfo(false)} />
                )}
            </AnimatePresence>

            {/* --- 3D Canvas --- */}
            <Canvas shadows dpr={[1, 2]}>
                <ResponsiveCamera facilityType={facilityType} />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 15, 5]} intensity={1.5} castShadow />
                    <Scene isRunning={isRunning} litersRecovered={litersRecovered} />
                    <OrbitControls 
                        enablePan={false} 
                        maxPolarAngle={Math.PI / 2.2} 
                        minDistance={5}
                        maxDistance={50}
                    />
                </Suspense>
            </Canvas>
            <Loader />
            
            {/* --- Bottom HUD (Dashboard) --- */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-50 flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full max-w-4xl">
                     <LiveDashboard 
                        isRunning={isRunning}
                        onToggle={() => setIsRunning(!isRunning)}
                        liters={litersRecovered}
                        revenue={revenueGenerated}
                        emissions={emissionsPrevented}
                    />
                </div>
            </div>
        </div>
    );
};

export default SimulationView;
