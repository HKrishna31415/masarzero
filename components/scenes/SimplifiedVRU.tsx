
import React from 'react';
import { Text } from '@react-three/drei';

const SimplifiedVRU: React.FC<{ position: [number, number, number], scale?: [number, number, number] }> = ({ position, scale = [1, 1, 1] }) => {
    return (
        <group position={position} scale={scale}>
            {/* Main White Housing */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 1.8, 1.2]} />
                <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
            </mesh>
            
            {/* Brand Logo */}
            <Text 
                position={[0, 0.5, 0.61]} 
                fontSize={0.15} 
                color="#0ea5e9" 
                anchorX="center" 
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
                MasarZero
            </Text>

            {/* Status Light Strip */}
            <mesh position={[0, 0.75, 0.61]}>
                <boxGeometry args={[1.0, 0.05, 0.02]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} toneMapped={false} />
            </mesh>

            {/* Interface Screen */}
            <mesh position={[0, 0.1, 0.61]}>
                <boxGeometry args={[0.8, 0.5, 0.02]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>

             {/* Side Vents */}
            <mesh position={[-0.61, -0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[0.8, 0.8]} />
                 <meshStandardMaterial color="#cbd5e1" />
            </mesh>
            <mesh position={[0.61, -0.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[0.8, 0.8]} />
                 <meshStandardMaterial color="#cbd5e1" />
            </mesh>
        </group>
    );
};

export default SimplifiedVRU;
