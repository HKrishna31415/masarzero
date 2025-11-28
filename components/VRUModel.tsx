
import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, useCursor, Box, Cylinder, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Types & Interfaces ---

interface InteractivePartProps {
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  onPartClick: (name: string) => void;
  isSelected: boolean;
  children: React.ReactNode;
  labelOffset?: [number, number, number];
}

// --- Helper Components ---

const InteractivePart: React.FC<InteractivePartProps> = ({ 
    name, position, rotation = [0, 0, 0], scale = 1, onPartClick, isSelected, children, labelOffset = [0, 1, 0] 
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

  const finalScale = Array.isArray(scale) ? new THREE.Vector3(...scale) : new THREE.Vector3(scale, scale, scale);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle hover/select pulse
      const targetScaleScalar = isSelected ? 1.05 : isHovered ? 1.02 : 1;
      const targetScale = finalScale.clone().multiplyScalar(targetScaleScalar);
      groupRef.current.scale.lerp(targetScale, delta * 10);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation as any}
      onClick={(e) => { e.stopPropagation(); onPartClick(name); }}
      onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
      onPointerOut={() => setIsHovered(false)}
    >
      {children}
      
      {/* Selection Highlight */}
      {(isSelected || isHovered) && (
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1.2, 1.2]} /> 
            <meshBasicMaterial color={isSelected ? "#22d3ee" : "#ffffff"} wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* Floating Label */}
      <Html position={labelOffset} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
         <div className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap transition-all duration-300 ${isSelected ? 'bg-cyan-500 text-black' : isHovered ? 'bg-white/20 text-white backdrop-blur-sm' : 'opacity-0 translate-y-2'}`}>
            {name}
         </div>
      </Html>
    </group>
  );
};

const FlowLine: React.FC<{ points: THREE.Vector3[], color?: string, speed?: number }> = ({ points, color = '#06b6d4', speed = 1 }) => {
    const [dashOffset, setDashOffset] = useState(0);
    
    useFrame((_, delta) => {
        setDashOffset((prev) => prev - delta * speed);
    });

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.03, 8, false]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
};

// --- Part Models ---

// Bottom Layer Parts
const VacuumPump = () => (
    <group>
        <Box args={[0.8, 0.6, 1.2]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </Box>
        <Cylinder args={[0.3, 0.3, 0.8]} rotation={[0, 0, Math.PI/2]} position={[0.6, 0.3, 0]}>
            <meshStandardMaterial color="#1e293b" />
        </Cylinder>
        <Box args={[0.2, 0.4, 0.2]} position={[0, 0.7, 0.4]}><meshStandardMaterial color="black"/></Box>
    </group>
);

const MembraneSieve = () => (
    <group>
        {/* Base Plate */}
        <Box args={[1.0, 0.1, 0.6]} position={[0, 0.05, 0]}>
             <meshStandardMaterial color="#334155" />
        </Box>
        {/* Two Vertical Sieve Cylinders */}
        <Cylinder args={[0.18, 0.18, 1.1, 32]} position={[-0.25, 0.6, 0]}>
             <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.18, 0.18, 1.1, 32]} position={[0.25, 0.6, 0]}>
             <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </Cylinder>
        {/* Top Manifold */}
        <Box args={[0.8, 0.15, 0.2]} position={[0, 1.2, 0]}>
            <meshStandardMaterial color="#475569" />
        </Box>
        {/* Connecting Piping */}
        <Cylinder args={[0.06, 0.06, 0.6]} rotation={[0, 0, Math.PI/2]} position={[0, 0.3, 0]}>
             <meshStandardMaterial color="#64748b" />
        </Cylinder>
    </group>
);

const Compressor = () => (
    // Cylinder + Sphere cap
    <group>
        <Cylinder args={[0.45, 0.45, 1.4, 32]} position={[0, 0.7, 0]}>
             <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.5} />
        </Cylinder>
        <Sphere args={[0.45, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, 1.4, 0]}>
             <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.5} />
        </Sphere>
        <Box args={[1.1, 0.1, 1.1]} position={[0, 0.05, 0]}><meshStandardMaterial color="#111827" /></Box>
    </group>
);

const GasolineTank = () => (
    <group>
         {/* Metal Rectangular Tank */}
         <Box args={[1.8, 0.9, 1.2]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
         </Box>
         {/* Fittings/Cap */}
         <Cylinder args={[0.15, 0.15, 0.1]} position={[0.5, 0.95, 0]}>
             <meshStandardMaterial color="#334155" />
         </Cylinder>
         <Cylinder args={[0.15, 0.15, 0.1]} position={[-0.5, 0.95, 0]}>
             <meshStandardMaterial color="#334155" />
         </Cylinder>
    </group>
);

const OilPump = () => (
    <group>
        <Box args={[0.4, 0.5, 0.4]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#dc2626" />
        </Box>
        <Cylinder args={[0.2, 0.2, 0.6]} rotation={[0, 0, Math.PI/2]} position={[0.4, 0.25, 0]}>
            <meshStandardMaterial color="#7f1d1d" />
        </Cylinder>
    </group>
);

const FlameArrester = () => (
    <group>
        <Cylinder args={[0.12, 0.12, 0.4]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        <Cylinder args={[0.18, 0.18, 0.15]} rotation={[0, 0, Math.PI/2]} position={[0, 0, 0]}>
             <meshStandardMaterial color="#991b1b" />
        </Cylinder>
    </group>
);

const RearFan = () => (
    <group>
        <Box args={[1.2, 1.2, 0.2]}>
             <meshStandardMaterial color="#1e293b" />
        </Box>
        <Cylinder args={[0.5, 0.5, 0.22, 32]} rotation={[Math.PI/2, 0, 0]}>
            <meshStandardMaterial color="#0f172a" />
        </Cylinder>
        {/* Blades */}
        <group rotation={[0, 0, Math.PI/4]}>
            <Box args={[0.1, 0.9, 0.24]}><meshStandardMaterial color="#334155" /></Box>
            <Box args={[0.9, 0.1, 0.24]}><meshStandardMaterial color="#334155" /></Box>
        </group>
    </group>
);

// Top Layer Parts
const CoolingUnit = () => (
    <group>
        {/* Main Radiator Block */}
        <Box args={[2.5, 0.8, 1.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#e2e8f0" />
        </Box>
        {/* Fans */}
        <group position={[-0.8, 0.81, 0]}>
            <Cylinder args={[0.5, 0.5, 0.1, 32]}>
                <meshStandardMaterial color="#334155" />
            </Cylinder>
            <Box args={[0.9, 0.05, 0.1]} rotation={[0, Math.PI/4, 0]}><meshStandardMaterial color="black" /></Box>
             <Box args={[0.9, 0.05, 0.1]} rotation={[0, -Math.PI/4, 0]}><meshStandardMaterial color="black" /></Box>
        </group>
        <group position={[0.8, 0.81, 0]}>
            <Cylinder args={[0.5, 0.5, 0.1, 32]}>
                <meshStandardMaterial color="#334155" />
            </Cylinder>
            <Box args={[0.9, 0.05, 0.1]} rotation={[0, Math.PI/4, 0]}><meshStandardMaterial color="black" /></Box>
             <Box args={[0.9, 0.05, 0.1]} rotation={[0, -Math.PI/4, 0]}><meshStandardMaterial color="black" /></Box>
        </group>
    </group>
);

const ExpansionValve = () => (
    <group>
        <Box args={[0.2, 0.3, 0.2]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
        </Box>
        <Cylinder args={[0.15, 0.1, 0.2]} position={[0, 0.4, 0]}>
             <meshStandardMaterial color="#d97706" />
        </Cylinder>
    </group>
);

const PLCControl = () => (
    <group>
        <Box args={[0.8, 1.0, 0.2]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#1e293b" roughness={0.2} />
        </Box>
        {/* Screen */}
        <Box args={[0.6, 0.4, 0.02]} position={[0, 0.65, 0.11]}>
            <meshBasicMaterial color="#0ea5e9" />
        </Box>
        {/* Buttons */}
        <Cylinder args={[0.05, 0.05, 0.05]} rotation={[Math.PI/2, 0, 0]} position={[-0.2, 0.3, 0.1]}>
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
        </Cylinder>
        <Cylinder args={[0.05, 0.05, 0.05]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.3, 0.1]}>
            <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        <Cylinder args={[0.05, 0.05, 0.05]} rotation={[Math.PI/2, 0, 0]} position={[0.2, 0.3, 0.1]}>
            <meshStandardMaterial color="#eab308" />
        </Cylinder>
    </group>
);


// --- Main Model Component ---

interface VRUModelProps {
  onPartClick: (name: string) => void;
  selectedPartName: string | null;
}

const VRUModel: React.FC<VRUModelProps> = ({ onPartClick, selectedPartName }) => {
    
    // Dimensions
    const frameWidth = 4;
    const frameDepth = 2.5;
    const topY = 2;
    const bottomY = 0;

    // Part Positions
    // Bottom
    const pumpPos: [number, number, number] = [-1.2, bottomY, 0.5];
    const flameArresterPos: [number, number, number] = [-1.8, 0.5, 0.5]; // Before pump
    const compressorPos: [number, number, number] = [0.5, bottomY, -0.5];
    const tankPos: [number, number, number] = [1.2, bottomY, 0.5];
    const oilPumpPos: [number, number, number] = [1.5, bottomY, -0.8];
    
    // Top
    const coolingPos: [number, number, number] = [0, topY, 0];
    // Membrane/Sieve moved to Center of Back Edge
    const sievePos: [number, number, number] = [0, topY, -1.15];

    const expValvePos: [number, number, number] = [-1.5, topY, 0.5];
    const plcPos: [number, number, number] = [1.8, topY + 0.5, 1.26]; // Attached to frame front right
    
    // Fan on the shorter side (X face, Vapor Inlet side), moved to Top Half
    const fanPos: [number, number, number] = [-frameWidth/2, topY + 0.5, 0]; 

    // Flow Paths
    const vaporFlow = useMemo(() => [
        new THREE.Vector3(-2.5, 0.5, 0.5), // Inlet
        new THREE.Vector3(...flameArresterPos),
        new THREE.Vector3(...pumpPos).add(new THREE.Vector3(0, 0.6, 0)), // Pump Top
        
        // Pump to Sieve
        new THREE.Vector3(-1.2, 2.5, 0.5), // Up
        new THREE.Vector3(-1.2, 2.5, -1.15), // Back to align with Sieve Z
        new THREE.Vector3(-0.3, 2.5, -1.15), // Right to Sieve Input
        new THREE.Vector3(...sievePos).add(new THREE.Vector3(-0.3, 1.1, 0)), // Into Sieve Manifold

        // Sieve to Compressor
        new THREE.Vector3(...sievePos).add(new THREE.Vector3(0.3, 1.1, 0)), // Out Sieve Manifold
        new THREE.Vector3(0.5, 2.5, -1.15), // Right
        new THREE.Vector3(0.5, 2.5, -0.5), // Forward
        new THREE.Vector3(...compressorPos).add(new THREE.Vector3(0, 1.4, 0)), // Down to Compressor
        
        // Compressor to Cooling
        new THREE.Vector3(...compressorPos).add(new THREE.Vector3(0, 1.4, 0)),
        new THREE.Vector3(0.5, topY, -0.5), 
        new THREE.Vector3(...coolingPos).add(new THREE.Vector3(0.5, 0.4, -0.5)), 
    ], []);

    const liquidFlow = useMemo(() => [
        new THREE.Vector3(...coolingPos).add(new THREE.Vector3(1, 0, 0.5)), // Out Cooling
        new THREE.Vector3(1, topY, 0.5),
        new THREE.Vector3(1.2, bottomY + 1, 0.5), // Down to tank
        new THREE.Vector3(...tankPos).add(new THREE.Vector3(0, 0.8, 0)),
        new THREE.Vector3(...oilPumpPos).add(new THREE.Vector3(0, 0.4, 0)),
        new THREE.Vector3(2.5, 0.5, -0.8) // Outlet
    ], []);
    
    const refrigerantLoop = useMemo(() => [
        new THREE.Vector3(...compressorPos).add(new THREE.Vector3(0, 1.4, 0)),
        new THREE.Vector3(-1.5, topY, 0.5), // Up to Exp Valve
        new THREE.Vector3(...expValvePos).add(new THREE.Vector3(0, 0.3, 0)),
        new THREE.Vector3(...coolingPos).add(new THREE.Vector3(-1, 0.4, 0)), // Into Cooling
    ], []);


    return (
        <group>
            {/* --- Frame Structure --- */}
            <group>
                {/* Floor Grid (Bottom) */}
                <gridHelper args={[frameWidth + 1, 10, 0x1e293b, 0x0f172a]} position={[0, 0.01, 0]} />
                {/* Floor Grid (Top Shelf) */}
                <mesh position={[0, topY, 0]} rotation={[-Math.PI/2, 0, 0]}>
                    <planeGeometry args={[frameWidth, frameDepth]} />
                    <meshBasicMaterial color="#1e293b" transparent opacity={0.5} side={THREE.DoubleSide} />
                </mesh>
                <gridHelper args={[frameWidth, 8, 0x334155, 0x1e293b]} position={[0, topY + 0.01, 0]} scale={[1, 1, frameDepth/frameWidth]} />

                {/* Pillars */}
                {[
                    [-frameWidth/2, -frameDepth/2], [frameWidth/2, -frameDepth/2],
                    [-frameWidth/2, frameDepth/2], [frameWidth/2, frameDepth/2]
                ].map(([x, z], i) => (
                    <mesh key={i} position={[x, 2, z]}>
                        <boxGeometry args={[0.1, 4, 0.1]} />
                        <meshStandardMaterial color="#475569" />
                    </mesh>
                ))}
                
                {/* Top Frame */}
                <mesh position={[0, 4, -frameDepth/2]}>
                    <boxGeometry args={[frameWidth, 0.1, 0.1]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[0, 4, frameDepth/2]}>
                    <boxGeometry args={[frameWidth, 0.1, 0.1]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[-frameWidth/2, 4, 0]}>
                    <boxGeometry args={[0.1, 0.1, frameDepth]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[frameWidth/2, 4, 0]}>
                    <boxGeometry args={[0.1, 0.1, frameDepth]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
            </group>

            {/* --- Bottom Level Parts --- */}
            <InteractivePart name="Vacuum Pump" position={pumpPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Vacuum Pump'}>
                <VacuumPump />
            </InteractivePart>

            {/* Compressor stayed bottom, shape updated previously */}
            <InteractivePart name="Compressor" position={compressorPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Compressor'} labelOffset={[0, 2, 0]}>
                <Compressor />
            </InteractivePart>

            <InteractivePart name="Gasoline Tank" position={tankPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Gasoline Tank'} labelOffset={[0, 1.2, 0]}>
                <GasolineTank />
            </InteractivePart>

            <InteractivePart name="Oil Pump" position={oilPumpPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Oil Pump'}>
                <OilPump />
            </InteractivePart>
            
            <InteractivePart name="Flame Arrester" position={flameArresterPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Flame Arrester'} labelOffset={[0, 0.5, 0]}>
                <FlameArrester />
            </InteractivePart>

            {/* --- Top Level Parts --- */}
            
            {/* Membrane/Sieve moved to Center Back */}
            <InteractivePart name="Membrane and Molecular Sieve" position={sievePos} onPartClick={onPartClick} isSelected={selectedPartName === 'Membrane and Molecular Sieve'} labelOffset={[0, 1.5, 0]}>
                <MembraneSieve />
            </InteractivePart>

            <InteractivePart name="Cooling Unit" position={coolingPos} onPartClick={onPartClick} isSelected={selectedPartName === 'Cooling Unit'}>
                <CoolingUnit />
            </InteractivePart>

            <InteractivePart name="Expansion Valve" position={expValvePos} onPartClick={onPartClick} isSelected={selectedPartName === 'Expansion Valve'} labelOffset={[0, 0.8, 0]}>
                <ExpansionValve />
            </InteractivePart>

             {/* PLC is mounted on the frame, effectively top level */}
            <InteractivePart name="PLC Control System" position={plcPos} rotation={[0, -Math.PI/6, 0]} onPartClick={onPartClick} isSelected={selectedPartName === 'PLC Control System'}>
                <PLCControl />
            </InteractivePart>
            
             {/* Fan attached to side frame (Vapor Inlet Side), moved UP */}
            <InteractivePart 
                name="Ventilation Fan" 
                position={fanPos} 
                rotation={[0, -Math.PI/2, 0]} 
                onPartClick={onPartClick} 
                isSelected={selectedPartName === 'Ventilation Fan'}
            >
                <RearFan />
            </InteractivePart>

            {/* --- Pipes & Flow --- */}
            <FlowLine points={vaporFlow} color="#22d3ee" speed={2} />
            <FlowLine points={liquidFlow} color="#ec4899" speed={1.5} />
            <FlowLine points={refrigerantLoop} color="#10b981" speed={3} />

            {/* Inlet/Outlet Labels */}
            <Text position={[-2.8, 0.8, 0.5]} fontSize={0.2} color="#9ca3af">Vapor Inlet</Text>
            <Text position={[2.8, 0.8, -0.8]} fontSize={0.2} color="#9ca3af">Fuel Outlet</Text>

        </group>
    );
};

export default VRUModel;
