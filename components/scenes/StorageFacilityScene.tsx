
import React, { useMemo } from 'react';
import { Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import SimplifiedVRU from './SimplifiedVRU';
import FlowingParticles from './FlowingParticles';

const StorageFacilityScene: React.FC<{ isRunning: boolean; litersRecovered?: number }> = ({ isRunning }) => {
    const vaporPath = useMemo(() => [
        new THREE.Vector3(-5, 1, 3), // From tank 1
        new THREE.Vector3(0, -0.1, 2.5),  // To VRU
    ], []);

    const vaporPath2 = useMemo(() => [
        new THREE.Vector3(-5, 1, -3), // From tank 2
        new THREE.Vector3(0, -0.1, 2.5),   // To VRU
    ], []);

    const liquidPath = useMemo(() => [
        new THREE.Vector3(0, -0.25, 2.5),   // From VRU
        new THREE.Vector3(5, -0.25, 0),   // To recovery tank
    ], []);

    return (
        <>
            {/* Ground */}
            <Grid infiniteGrid sectionColor={'#0ea5e9'} cellColor={'#1e293b'} sectionThickness={1} cellThickness={0.5} fadeDistance={50} position={[0,-2,0]} />

            {/* VRU */}
            <SimplifiedVRU position={[0, -1.5, 0]} scale={[2, 2, 3]} />
            <Text position={[0, 0.5, 0]} fontSize={0.4}>MasarZero VRU</Text>

            {/* Storage Tanks */}
            <mesh position={[-5, 0, 3]}>
                <cylinderGeometry args={[2, 2, 4, 64]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
            <Text position={[-5, 2.5, 3]} fontSize={0.4}>Tank A</Text>
            
            <mesh position={[-5, 0, -3]}>
                <cylinderGeometry args={[2, 2, 4, 64]} />
                <meshStandardMaterial color="lightgray" />
            </mesh>
            <Text position={[-5, 2.5, -3]} fontSize={0.4}>Tank B</Text>

            {/* Recovery Tank */}
            <mesh position={[5, -1, 0]}>
                <cylinderGeometry args={[1, 1, 2, 64]} />
                <meshStandardMaterial color="#10b981" />
            </mesh>
            <Text position={[5, 0.5, 0]} fontSize={0.4}>Recovery Tank</Text>

            {/* Particle Flows */}
            <FlowingParticles points={vaporPath} count={100} color="#f59e0b" size={0.08} isRunning={isRunning} />
            <FlowingParticles points={vaporPath2} count={100} color="#f59e0b" size={0.08} isRunning={isRunning} />
            <FlowingParticles points={liquidPath} count={80} color="#06b6d4" size={0.1} isRunning={isRunning} />
        </>
    );
};

export default StorageFacilityScene;
