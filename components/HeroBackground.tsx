
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const ParticleSystem = ({ count = 5000 }) => {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport, size } = useThree();

  // Check if mobile based on canvas size
  const isMobile = size.width < 768;
  const spreadScale = isMobile ? 1.5 : 4.0; 
  
  // Determine radius based on screen size
  const liquidRadius = isMobile ? 1.5 : 2.2;
  
  // Greatly reduce particle count on mobile for performance and visual clarity
  const particleCount = isMobile ? 600 : count;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      // Initial random positions (Vapor state - chaotic cloud)
      // Spread wide to cover screen
      const x = (Math.random() - 0.5) * 35 * spreadScale;
      const y = (Math.random() - 0.5) * 35 * spreadScale;
      const z = (Math.random() - 0.5) * 25;
      
      // Target sphere positions (Liquid state - ordered sphere)
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Tighter radius for liquid look, with slight surface variation
      const r = liquidRadius + (Math.random() * 0.15); 
      
      const tx = r * Math.sin(phi) * Math.cos(theta);
      const ty = r * Math.sin(phi) * Math.sin(theta);
      const tz = r * Math.cos(phi);

      temp.push({ 
        current: new THREE.Vector3(x, y, z),
        vaporPos: new THREE.Vector3(x, y, z),
        liquidPos: new THREE.Vector3(tx, ty, tz),
        // Randomize speed slightly for organic feel
        speed: 0.5 + Math.random() * 0.5, 
        // Randomize noise offset
        noiseOffset: Math.random() * 100
      });
    }
    return temp;
  }, [particleCount, spreadScale, liquidRadius]);

  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const colors = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  
  const colorVapor = new THREE.Color('#22d3ee'); // Cyan
  const colorLiquid = new THREE.Color('#312e81'); // Deep Indigo
  const tempColor = new THREE.Color();

  useFrame((state) => {
    if (!mesh.current) return;

    const t = state.clock.getElapsedTime();
    // Cycle: Vapor (0-4s) -> Condense (4-8s) -> Liquid (8-12s) -> Evaporate (12-16s)
    const cycleDuration = 16;
    const timeInCycle = t % cycleDuration;

    let phase = 0; // 0 = Vapor, 1 = Liquid

    if (timeInCycle < 4) {
        // Staying as Vapor (churning)
        phase = 0;
    } else if (timeInCycle < 8) {
        // Condensing
        // Ease in out cubic
        let p = (timeInCycle - 4) / 4;
        phase = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    } else if (timeInCycle < 12) {
        // Staying as Liquid (pulsing)
        phase = 1;
    } else {
        // Evaporating
        // Explosive ease out
        let p = (timeInCycle - 12) / 4;
        phase = 1 - (1 - Math.pow(1 - p, 3));
    }

    // Mouse interaction (parallax) - reduced on mobile
    const mx = isMobile ? 0 : state.mouse.x * 2;
    const my = isMobile ? 0 : state.mouse.y * 2;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // VAPOR BEHAVIOR: Swirling noise
      const noiseX = Math.sin(t * 0.5 + p.noiseOffset) * 2;
      const noiseY = Math.cos(t * 0.3 + p.noiseOffset) * 2;
      
      const vx = p.vaporPos.x + noiseX;
      const vy = p.vaporPos.y + noiseY;
      const vz = p.vaporPos.z;

      // LIQUID BEHAVIOR: Tight sphere with heartbeat
      // Subtle breathe effect
      const breathe = 1 + Math.sin(t * 3) * 0.02;
      const lx = p.liquidPos.x * breathe;
      const ly = p.liquidPos.y * breathe;
      const lz = p.liquidPos.z * breathe;

      // Interpolate Position
      // We use linear interpolation for the base movement
      const x = THREE.MathUtils.lerp(vx, lx, phase);
      const y = THREE.MathUtils.lerp(vy, ly, phase);
      const z = THREE.MathUtils.lerp(vz, lz, phase);

      // Apply mouse parallax inversely proportional to phase
      const parallaxStrength = (1 - phase) * 0.5;

      positions[i * 3] = x + mx * parallaxStrength;
      positions[i * 3 + 1] = y + my * parallaxStrength;
      positions[i * 3 + 2] = z;

      // Interpolate Color
      tempColor.lerpColors(colorVapor, colorLiquid, phase);
      
      // Add a flash of white during the moment of condensation/evaporation
      if (phase > 0.1 && phase < 0.9 && timeInCycle > 4 && timeInCycle < 8) {
           tempColor.offsetHSL(0, 0, 0.1); 
      }

      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
    
    // Rotate entire system slowly
    mesh.current.rotation.y = t * 0.05;
    mesh.current.rotation.z = t * 0.02;
  });

  // FIX: Move key={particleCount} to <points> to force full reconstruction of the mesh and geometry 
  // when particle count changes (resize). This prevents WebGL buffer mismatch errors.
  return (
    <points ref={mesh} key={particleCount}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.length}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.18 : 0.08} // Larger particles on mobile for visibility
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#000212]">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 45 }} 
        className="w-full h-full"
        dpr={[1, 2]} // Handle high DPI screens
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={['#000212', 10, 40]} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
           <ParticleSystem />
        </Float>
      </Canvas>
      {/* Vignette Overlay for better text contrast */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#000212]/50 to-[#000212] pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
