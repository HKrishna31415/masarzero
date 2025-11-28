
import React from 'react';

const Particle: React.FC = () => {
  const style = {
    position: 'absolute' as 'absolute',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 2 + 1}px`,
    height: `${Math.random() * 2 + 1}px`,
    backgroundColor: `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.2})`,
    borderRadius: '50%',
    boxShadow: `0 0 ${Math.random() * 5 + 2}px rgba(0, 255, 255, 0.8)`,
    animation: `swirl ${Math.random() * 20 + 10}s linear infinite`,
    animationDelay: `${Math.random() * -30}s`
  };
  return <div style={style}></div>;
};


const ParticleBackground: React.FC = () => {
    const particles = Array.from({ length: 150 });

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <style>
            {`
                @keyframes swirl {
                0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.5; }
                25% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(90deg) scale(1.2); }
                50% { transform: translate(0, 0) rotate(180deg) scale(1); opacity: 1; }
                75% { transform: translate(${Math.random() * -200 + 100}px, ${Math.random() * -200 + 100}px) rotate(270deg) scale(1.2); }
                100% { transform: translate(0, 0) rotate(360deg) scale(1); opacity: 0.5; }
                }
            `}
            </style>
            {particles.map((_, i) => <Particle key={i} />)}
        </div>
    );
};

export default ParticleBackground;
