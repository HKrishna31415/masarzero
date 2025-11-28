
import React from 'react';
import { motion } from 'framer-motion';
import VectorBorderCard from './VectorBorderCard';

// --- Animated SVG Icons ---

const SmogFormationIcon = () => (
    <motion.svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
    >
        <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
            {/* Central Blue Spheres */}
            <circle cx="44" cy="50" r="9" fill="#2563eb" />
            <circle cx="56" cy="50" r="9" fill="#2563eb" />

            {/* Red Spheres */}
            <circle cx="36" cy="36" r="7" fill="#dc2626" />
            <circle cx="64" cy="36" r="7" fill="#dc2626" />
            <circle cx="36" cy="64" r="7" fill="#dc2626" />
            <circle cx="64" cy="64" r="7" fill="#dc2626" />
        </motion.g>
    </motion.svg>
);


const AtmosphereIcon = () => (
    <motion.svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
    >
        {/* Pulsing Rings */}
        <motion.circle cx="50" cy="50" r="30" stroke="#06b6d4" strokeWidth="2" fill="none"
            variants={{
                animate: {
                    scale: [1, 1.4],
                    opacity: [1, 0],
                }
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle cx="50" cy="50" r="30" stroke="#06b6d4" strokeWidth="2" fill="none"
             variants={{
                animate: {
                    scale: [1, 1.4],
                    opacity: [1, 0],
                }
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 2 }}
        />
        
        {/* Central Orb with Gradient */}
        <defs>
            <radialGradient id="atmosphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: '#67e8f9', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
            </radialGradient>
        </defs>
        <motion.circle cx="50" cy="50" r="30" fill="url(#atmosphereGradient)" 
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
    </motion.svg>
);


const features = [
  {
    icon: SmogFormationIcon,
    title: 'Inhibits Smog Formation (N₂O₄)',
    description: 'VRUs capture VOCs & NOx. These compounds not only form smog but also act as greenhouse gases that trap heat in the atmosphere. Preventing their release is key for cleaner air and a stable climate.',
  },
  {
    icon: AtmosphereIcon,
    title: 'Protecting Our Atmosphere',
    description: 'By capturing Volatile Organic Compounds (VOCs), VRUs reduce the formation of ground-level ozone (smog) and protect the vital stratospheric ozone layer.',
  },
];


const AtmosphereProtectionSection: React.FC = () => {
    return (
        <section className="pt-0 pb-20 sm:pb-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                             <VectorBorderCard
                                key={feature.title}
                                className="flex flex-col items-center text-center h-full"
                                delay={i * 0.1}
                            >
                                <div className="h-28 flex items-center justify-center">
                                    <Icon />
                                </div>
                                <h3 className="text-xl font-bold mt-4 mb-2 text-white">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </VectorBorderCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AtmosphereProtectionSection;
