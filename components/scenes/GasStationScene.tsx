
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Text, Grid, Tube } from '@react-three/drei';
import * as THREE from 'three';
import SimplifiedVRU from './SimplifiedVRU';
import FlowingParticles from './FlowingParticles';
import { useFrame } from '@react-three/fiber';

const TRUCK_SPEED = 1;
const FILL_DURATION = 15; // seconds
const CYCLE_DELAY = 10; // seconds

const Truck = React.forwardRef<THREE.Group, any>((props, ref) => (
    <group ref={ref} {...props}>
         {/* Chassis */}
        <mesh position={[0.5, 0.1, 0]}>
            <boxGeometry args={[5.5, 0.2, 1.0]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Tanker Body */}
        <mesh position={[-0.5, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.85, 0.85, 3.6, 32]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>
         {/* Tank End Caps */}
        <mesh position={[-2.3, 0.9, 0]}>
             <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} rotation={[0, -Math.PI/2, 0]}/>
             <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>
         <mesh position={[1.3, 0.9, 0]}>
             <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} rotation={[0, Math.PI/2, 0]}/>
             <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Cab */}
        <group position={[2.6, 0.8, 0]}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 1.4, 1.4]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.2} />
            </mesh>
             {/* Windshield */}
             <mesh position={[0.61, 0.2, 0]}>
                <planeGeometry args={[0.1, 0.8]} rotation={[0, Math.PI/2, 0]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>
        </group>

        {/* Wheels */}
        <group position={[0, -0.2, 0]}>
            {/* Rear */}
            <mesh position={[-1.5, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[-1.5, 0, -0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[-0.3, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[-0.3, 0, -0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
            {/* Front */}
            <mesh position={[2.6, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[2.6, 0, -0.6]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#0f172a" /></mesh>
        </group>
    </group>
));


const GasStationScene: React.FC<{ isRunning: boolean; litersRecovered?: number }> = ({ isRunning, litersRecovered = 0 }) => {
    const [truckState, setTruckState] = useState<'idle' | 'arriving' | 'filling' | 'leaving' | 'resetting'>('idle');
    const truckRef = useRef<THREE.Group>(null!);
    const timerRef = useRef(0);
    const vaporRateMultiplier = useMemo(() => truckState === 'filling' ? 5 : 1, [truckState]);

    const [isBlueFlowVisible, setIsBlueFlowVisible] = useState(false);
    const lastTriggerLiters = useRef(0);
    const blueFlowTimeoutRef = useRef<number | null>(null);

    const startPosition = useMemo(() => new THREE.Vector3(-8, -1, -15), []);
    const fillingPosition = useMemo(() => new THREE.Vector3(-8, -1, 2), []);
    const endPosition = useMemo(() => new THREE.Vector3(-8, -1, 15), []);
    const startPositionArray: [number, number, number] = [-8, -1, -15];

    useEffect(() => {
        const startCycle = () => {
             if (truckRef.current) {
                truckRef.current.position.copy(startPosition);
            }
            // Add a small delay before starting to avoid flicker
            setTimeout(() => setTruckState('arriving'), 100);
        };

        if (isRunning) {
            // Start the first cycle
            timerRef.current = window.setTimeout(startCycle, CYCLE_DELAY * 1000);
        } else {
            // When stopping, reset everything
            setTruckState('idle');
            if (truckRef.current) {
                truckRef.current.position.copy(startPosition);
            }
            if (timerRef.current) clearTimeout(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isRunning, startPosition]);

    // Effect to control the blue (Product A) flow based on recovered liters
    useEffect(() => {
        if (isRunning && litersRecovered >= lastTriggerLiters.current + 14) {
            setIsBlueFlowVisible(true);
            lastTriggerLiters.current = Math.floor(litersRecovered / 14) * 14;

            if (blueFlowTimeoutRef.current) clearTimeout(blueFlowTimeoutRef.current);
            
            blueFlowTimeoutRef.current = window.setTimeout(() => {
                setIsBlueFlowVisible(false);
            }, 3000);
        }
    }, [isRunning, litersRecovered]);

    // Reset flow state when simulation is stopped
    useEffect(() => {
        if (!isRunning) {
            setIsBlueFlowVisible(false);
            lastTriggerLiters.current = 0;
            if (blueFlowTimeoutRef.current) {
                clearTimeout(blueFlowTimeoutRef.current);
                blueFlowTimeoutRef.current = null;
            }
        }
    }, [isRunning]);


    useFrame((_, delta) => {
        if (!truckRef.current || !isRunning) return;

        switch (truckState) {
            case 'arriving':
                truckRef.current.position.lerp(fillingPosition, TRUCK_SPEED * delta);
                if (truckRef.current.position.distanceTo(fillingPosition) < 0.1) {
                    truckRef.current.position.copy(fillingPosition);
                    setTruckState('filling');
                    timerRef.current = window.setTimeout(() => setTruckState('leaving'), FILL_DURATION * 1000);
                }
                break;
            case 'leaving':
                truckRef.current.position.lerp(endPosition, TRUCK_SPEED * delta);
                if (truckRef.current.position.distanceTo(endPosition) < 0.1) {
                    setTruckState('resetting');
                }
                break;
             case 'resetting':
                 truckRef.current.position.copy(startPosition);
                 setTruckState('idle');
                 timerRef.current = window.setTimeout(() => setTruckState('arriving'), CYCLE_DELAY * 1000);
                 break;
        }
    });


    // Path for vapor from pipe 1 to VRU
    const vaporPath1 = useMemo(() => [
        new THREE.Vector3(-4, -0.5, 1.5), // Top of pipe 1
        new THREE.Vector3(-2, 0, 2),      // Collector point
        new THREE.Vector3(-0.6, -1.0, 0),   // VRU inlet
    ], []);

    // Path for vapor from pipe 2 to VRU
    const vaporPath2 = useMemo(() => [
        new THREE.Vector3(-4, -0.5, 2.0), // Top of pipe 2
        new THREE.Vector3(-2, 0, 2),      // Collector point
        new THREE.Vector3(-0.6, -1.0, 0),   // VRU inlet
    ], []);

    // Path for vapor from pipe 3 to VRU
    const vaporPath3 = useMemo(() => [
        new THREE.Vector3(-4, -0.5, 2.5), // Top of pipe 3
        new THREE.Vector3(-2, 0, 2),      // Collector point
        new THREE.Vector3(-0.6, -1.0, 0),   // VRU inlet
    ], []);

    // Path for recovered liquid (BLUE) from VRU back to UST 1
    const liquidPathBlue = useMemo(() => [
        new THREE.Vector3(0, -1.5, 0.5),    // VRU liquid out (bottom)
        new THREE.Vector3(-2, -2, 1),     // Midpoint for curve
        new THREE.Vector3(-3, -2.5, 0.5),   // Into side of UST 1
    ], []);
    
    // Path for second recovered liquid (GREEN) from VRU back to UST 1
    const liquidPathGreenToUST1 = useMemo(() => [
        new THREE.Vector3(0, -1.5, 0.5),    // VRU liquid out (bottom)
        new THREE.Vector3(-2, -2.2, 1.5),   // Midpoint for curve (slightly different path)
        new THREE.Vector3(-3, -2.5, 0.5),   // Into side of UST 1
    ], []);

    // Path for second recovered liquid (GREEN) from VRU back to UST 2
    const liquidPathGreenToUST2 = useMemo(() => [
        new THREE.Vector3(0, -1.5, 0.5),    // VRU liquid out (bottom)
        new THREE.Vector3(-2, -2.2, 2.5),   // Midpoint for curve
        new THREE.Vector3(-3, -2.5, 3.5),   // Into side of UST 2
    ], []);

    const hosePath = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-7.5, -0.5, 2), // Truck connection point
        new THREE.Vector3(-5.75, -1.5, 2), // Midpoint drape
        new THREE.Vector3(-4, -1, 2),     // UST connection point
    ]), []);


    return (
        <>
            {/* Ground Plane */}
            <Grid infiniteGrid sectionColor={'#0ea5e9'} cellColor={'#1e293b'} sectionThickness={1} cellThickness={0.5} fadeDistance={40} position={[0, -1.5, 0]} />

            {/* VRU */}
            <SimplifiedVRU position={[0, -0.75, 0]} />
            
            {/* Underground Storage Tanks (UST) - Horizontal */}
            <group>
                {/* Tank 1 */}
                <mesh position={[-4, -2.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1, 1, 2.5, 32]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <Text position={[-4, -1.2, 0.5]} fontSize={0.3}>UST 1</Text>
                
                {/* Tank 2 */}
                <mesh position={[-4, -2.5, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1, 1, 2.5, 32]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <Text position={[-4, -1.2, 3.5]} fontSize={0.3}>UST 2</Text>

                {/* Shared Vapor Pipes from USTs */}
                <mesh position={[-4, -1, 1.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
                    <meshStandardMaterial color="darkgray" />
                </mesh>
                <mesh position={[-4, -1, 2.0]}>
                    <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
                    <meshStandardMaterial color="darkgray" />
                </mesh>
                <mesh position={[-4, -1, 2.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
                    <meshStandardMaterial color="darkgray" />
                </mesh>
                 <Text position={[-4, -0.2, 2.0]} fontSize={0.3} rotation={[0, Math.PI/2, 0]}>Vapor Pipes</Text>
            </group>
            
            {/* Gas Pumps */}
            <mesh position={[3, -1, 3]}>
                <boxGeometry args={[0.5, 1, 0.5]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
             <mesh position={[4, -1, 3]}>
                <boxGeometry args={[0.5, 1, 0.5]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            <Text position={[3.5, -0.5, 3]} fontSize={0.3}>Pumps</Text>

             {/* Fuel Truck */}
            <Truck ref={truckRef} position={startPositionArray} rotation={[0, Math.PI / 2, 0]} />
            {truckState === 'filling' && (
                <Tube args={[hosePath, 20, 0.05, 8, false]}>
                    <meshStandardMaterial color="#3f3f46" />
                </Tube>
            )}

            {/* Particle Flows */}
            <FlowingParticles points={vaporPath1} count={25} color="#f59e0b" size={0.05} isRunning={isRunning} rateMultiplier={vaporRateMultiplier} />
            <FlowingParticles points={vaporPath2} count={25} color="#f59e0b" size={0.05} isRunning={isRunning} rateMultiplier={vaporRateMultiplier} />
            <FlowingParticles points={vaporPath3} count={25} color="#f59e0b" size={0.05} isRunning={isRunning} rateMultiplier={vaporRateMultiplier} />
            
            {/* Blue liquid to UST 1 */}
            {isBlueFlowVisible && <FlowingParticles points={liquidPathBlue} count={30} color="#06b6d4" size={0.06} isRunning={isRunning} />}
            
            {/* Green liquid to UST 1 & 2 */}
            <FlowingParticles points={liquidPathGreenToUST1} count={30} color="#10b981" size={0.06} isRunning={isRunning} />
            <FlowingParticles points={liquidPathGreenToUST2} count={30} color="#10b981" size={0.06} isRunning={isRunning} />
        </>
    );
};

export default GasStationScene;
