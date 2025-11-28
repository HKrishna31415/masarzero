import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const SceneContent = () => {
    return (
        <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const ThreeJSBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-50">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <SceneContent />
            </Canvas>
        </div>
    );
};

export default ThreeJSBackground;
