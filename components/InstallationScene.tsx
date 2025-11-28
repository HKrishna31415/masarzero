
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import SimplifiedVRU from './scenes/SimplifiedVRU';

const InstallationScene = ({ step }: { step: number }) => {
  const vruRef = useRef<THREE.Group>(null!);
  const pipeGroupRef = useRef<THREE.Group>(null!);
  const wireGroupRef = useRef<THREE.Group>(null!);
  const statusLightRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const lerpSpeed = 3 * delta;

    // 1. VRU Movement (Step 1+)
    // Descends from y=10 to y=0
    const targetY = step >= 1 ? 0 : 10;
    if (vruRef.current) {
      vruRef.current.position.y = THREE.MathUtils.lerp(vruRef.current.position.y, targetY, lerpSpeed);
    }

    // 2. Pipes Growth (Step 2+)
    const targetPipeScale = step >= 2 ? 1 : 0;
    if (pipeGroupRef.current) {
      pipeGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(pipeGroupRef.current.scale.x, targetPipeScale, lerpSpeed));
    }

    // 3. Wires Growth (Step 3+)
    const targetWireScale = step >= 3 ? 1 : 0;
    if (wireGroupRef.current) {
        wireGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(wireGroupRef.current.scale.x, targetWireScale, lerpSpeed));
    }
    
    // 4. Status Light (Step 4)
    if (statusLightRef.current) {
        const targetIntensity = step >= 4 ? 2 : 0;
        const mat = statusLightRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetIntensity, lerpSpeed);
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Grid infiniteGrid sectionColor="#0ea5e9" cellColor="#1e293b" sectionThickness={1} cellThickness={0.5} fadeDistance={30} />
      
      {/* Concrete Pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, 0]} receiveShadow>
         <boxGeometry args={[4.2, 0.2, 4.2]} />
         <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* VRU Unit */}
      <group ref={vruRef} position={[0, 10, 0]}>
        <SimplifiedVRU position={[0, 0.9, 0]} scale={[1.2, 1.2, 1.2]} />
        {/* Status Light on Unit */}
        <mesh ref={statusLightRef} position={[0, 1.8, 0.61]}>
            <boxGeometry args={[1.0, 0.05, 0.05]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0} toneMapped={false} />
        </mesh>
      </group>

      {/* Piping */}
      <group ref={pipeGroupRef} scale={[0,0,0]}>
         {/* Inlet Pipe */}
         <mesh position={[-1.5, 0.5, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} />
         </mesh>
         <mesh position={[-2.3, 0, 0]}>
             <cylinderGeometry args={[0.12, 0.12, 1]} />
             <meshStandardMaterial color="#475569" />
         </mesh>
         <Text position={[-2.3, 0.8, 0]} fontSize={0.2} color="#94a3b8">Vapor In</Text>
         
         {/* Outlet Pipe */}
         <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} />
         </mesh>
         <mesh position={[2.3, 0, 0]}>
             <cylinderGeometry args={[0.12, 0.12, 1]} />
             <meshStandardMaterial color="#475569" />
         </mesh>
         <Text position={[2.3, 0.8, 0]} fontSize={0.2} color="#94a3b8">Liquid Out</Text>
      </group>

      {/* Electrical */}
      <group ref={wireGroupRef} scale={[0,0,0]}>
          <mesh position={[0, 0.1, -2]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshStandardMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[0, 1, -1]} rotation={[Math.PI/4, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.5]} />
              <meshStandardMaterial color="#f59e0b" />
          </mesh>
          <Text position={[0, 0.5, -2.2]} fontSize={0.2} color="#f59e0b">380V Power</Text>
      </group>
      
      {/* Labels based on step */}
        {step === 0 && <Text position={[0, 2.5, 0]} fontSize={0.4} color="white" outlineWidth={0.02} outlineColor="#000">Site Ready</Text>}
        {step === 1 && <Text position={[0, 3.5, 0]} fontSize={0.4} color="white" outlineWidth={0.02} outlineColor="#000">Unit Placed</Text>}
        {step === 2 && <Text position={[0, 3.5, 0]} fontSize={0.4} color="white" outlineWidth={0.02} outlineColor="#000">Piping Connected</Text>}
        {step === 3 && <Text position={[0, 3.5, 0]} fontSize={0.4} color="white" outlineWidth={0.02} outlineColor="#000">Electrical Wired</Text>}
        {step === 4 && <Text position={[0, 3.5, 0]} fontSize={0.6} color="#22c55e" outlineWidth={0.02} outlineColor="#000">SYSTEM ONLINE</Text>}

    </group>
  );
};

export default InstallationScene;
