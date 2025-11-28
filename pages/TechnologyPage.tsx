
import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import VRUModel from '../components/VRUModel';
import Sidebar from '../components/Sidebar';
import { partData, PartData } from '../partData';
import { Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming router is used, or just use window history/state if not. Using simple button for now based on context.

const TechnologyPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);

  const handlePartSelect = useCallback((partName: string) => {
    if (selectedPart?.name === partName) {
      setSelectedPart(null);
      return;
    }
    const data = partData.find(p => p.name === partName);
    setSelectedPart(data || null);
  }, [selectedPart]);

  const handleCloseSidebar = useCallback(() => {
    setSelectedPart(null);
  }, []);
  
  const handleSelectNextPart = useCallback(() => {
    const currentIndex = selectedPart ? partData.findIndex(p => p.name === selectedPart.name) : -1;
    const nextIndex = (currentIndex + 1) % partData.length;
    setSelectedPart(partData[nextIndex]);
  }, [selectedPart]);

  return (
    <section className="h-screen w-screen relative bg-[#050714] overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 pt-40 pointer-events-none bg-gradient-to-b from-[#000212] via-[#000212]/80 to-transparent">
          <div className="container mx-auto flex justify-between items-start">
             <div className="pointer-events-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    MZ-9000 <span className="text-cyan-400">Schematic</span>
                </h1>
                <p className="text-gray-400 mt-2 max-w-lg text-sm md:text-base">
                    Explore the dual-layer architecture of our flagship Vapor Recovery Unit. 
                    Drag to rotate, scroll to zoom, and click components to view live telemetry.
                </p>
             </div>
          </div>
      </div>

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400">
            <Loader className="animate-spin mb-4" size={48} />
            <p className="text-lg font-mono uppercase tracking-widest">Initializing System...</p>
        </div>
      }>
        <Canvas camera={{ position: [8, 6, 8], fov: 45 }} shadows>
          <fog attach="fog" args={['#050714', 10, 40]} />
          
          <group position={[0, -1.5, 0]}>
            <VRUModel onPartClick={handlePartSelect} selectedPartName={selectedPart?.name || null} />
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
          </group>

          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#06b6d4" />
          <Environment preset="city" />
          
          <OrbitControls 
            enablePan={false} 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={25}
            target={[0, 1, 0]}
          />
        </Canvas>
      </Suspense>
      
      {/* Sidebar UI */}
      <Sidebar part={selectedPart} onClose={handleCloseSidebar} onSelectNext={handleSelectNextPart} />
      
      {/* Instructions Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
         <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
            Interactive 3D Environment &bull; v2.4.0
         </p>
      </div>
    </section>
  );
};

export default TechnologyPage;
