
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Plexus: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);

    const numPoints = 200;
    const connectionDistance = 1.8;

    const { positions, particles } = useMemo(() => {
        const positions = new Float32Array(numPoints * 3);
        const particles = [];
        for (let i = 0; i < numPoints; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            particles.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
            });
        }
        return { positions, particles };
    }, []);

    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    
    useFrame((state) => {
        const { clock } = state;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const linePositions = [];
        
        for (let i = 0; i < numPoints; i++) {
            const p = particles[i];
            
            // Subtle movement
            const time = clock.getElapsedTime();
            p.position.x += Math.sin(time + i) * 0.001;
            p.position.y += Math.cos(time + i) * 0.001;
            
            // Update position array
            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        }
        
        // Update lines
        for (let i = 0; i < numPoints; i++) {
            for (let j = i + 1; j < numPoints; j++) {
                const p1 = particles[i].position;
                const p2 = particles[j].position;
                const dist = p1.distanceTo(p2);
                
                if (dist < connectionDistance) {
                    linePositions.push(p1.x, p1.y, p1.z);
                    linePositions.push(p2.x, p2.y, p2.z);
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesRef.current.geometry = linesGeometry;
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={numPoints}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial color="#0ea5e9" size={0.05} sizeAttenuation />
            </points>
            <lineSegments ref={linesRef}>
                 <lineBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
            </lineSegments>
        </>
    );
};

const InvestorHeroAnimation: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-70">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Plexus />
            </Canvas>
        </div>
    );
};

export default InvestorHeroAnimation;
