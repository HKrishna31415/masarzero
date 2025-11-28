
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlowingParticlesProps {
    points: THREE.Vector3[];
    count: number;
    color: string;
    size: number;
    isRunning: boolean;
    rateMultiplier?: number;
}

const FlowingParticles: React.FC<FlowingParticlesProps> = ({ points, count, color, size, isRunning, rateMultiplier = 1 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5), [points]);

    const particles = useMemo(() =>
        Array.from({ length: count }, () => ({
            offset: Math.random(),
            speed: Math.random() * 0.1 + 0.05,
        })),
    [count]);

    useFrame((_, delta) => {
        if (!isRunning || !meshRef.current) return;

        particles.forEach((particle, i) => {
            particle.offset = (particle.offset + delta * particle.speed * rateMultiplier) % 1;
            curve.getPointAt(particle.offset, tempObject.position);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    if (!isRunning) return null;

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color={color} />
        </instancedMesh>
    );
};

export default FlowingParticles;
