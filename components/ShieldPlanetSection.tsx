
import React from 'react';
import { motion } from 'framer-motion';
import VectorBorderCard from './VectorBorderCard';

// --- Animated SVG Icons ---

const AirPollutionIcon = () => (
    <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }}
    >
        {/* Membrane */}
        <motion.line x1="50" y1="20" x2="50" y2="80" stroke="#06b6d4" strokeWidth="2"
            variants={{ initial: { pathLength: 0 }, animate: { pathLength: 1, transition: { duration: 1 } } }}
        />
        
        {/* Polluted Dots (darker blue/purple) */}
        {[...Array(5)].map((_, i) => (
            <motion.circle key={`unfiltered-${i}`} cx="30" r="3" fill="#818cf8"
                variants={{
                    initial: { y: 25 + i * 10 },
                    animate: { 
                        x: [30, 48],
                        opacity: [1, 0],
                        transition: { duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'linear' }
                    }
                }}
            />
        ))}

        {/* Clean Dots (lighter blue) */}
        {[...Array(3)].map((_, i) => (
            <motion.circle key={`filtered-${i}`} cx="52" r="3" fill="#7dd3fc"
                variants={{
                    initial: { x: 52, opacity: 0 },
                    animate: { 
                        x: [52, 75],
                        opacity: [1, 0],
                        transition: { duration: 1.5, delay: 1 + i * 0.4, repeat: Infinity, ease: 'linear' }
                    }
                }}
            />
        ))}
    </motion.svg>
);


const ConservesResourcesIcon = () => (
    <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }}
    >
        {/* Cyclohexane structure */}
        <motion.path
            d="M50 25 L71.65 37.5 L71.65 62.5 L50 75 L28.35 62.5 L28.35 37.5 Z"
            stroke="#e5e7eb"
            strokeWidth="3"
            variants={{
                initial: { pathLength: 0 },
                animate: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } }
            }}
        />
        {/* Animated atoms appearing at corners */}
        <motion.circle cx="50" cy="25" r="4" fill="#60a5fa" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1 } } }} />
        <motion.circle cx="71.65" cy="37.5" r="4" fill="#60a5fa" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.1 } } }} />
        <motion.circle cx="71.65" cy="62.5" r="4" fill="#60a5fa" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.2 } } }} />
        <motion.circle cx="50" cy="75" r="4" fill="#60a5fa" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.3 } } }} />
        <motion.circle cx="28.35" cy="62.5" r="4" fill="#60a5fa" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.4 } } }} />
        <motion.circle cx="28.35" cy="37.5" r="4" fill="#60a5fa" variants={{ initial: { scale:0 }, animate: { scale: 1, transition: { delay: 1.5 } } }} />
    </motion.svg>
);


const PreventsOzoneFormationIcon = () => (
    <motion.svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
    >
        {/* Center Circle */}
        <motion.circle cx="50" cy="50" r="20" stroke="#06b6d4" strokeWidth="3" fill="none"
            variants={{ initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1, transition: { duration: 1.5 } } }}
        />
        
        {/* Rotating Satellites - Explicit Transform Origin for correct rotation center */}
        <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
            <circle cx="50" cy="15" r="4" fill="#38bdf8" />
            <circle cx="50" cy="85" r="4" fill="#38bdf8" />
            <circle cx="15" cy="50" r="4" fill="#38bdf8" />
            <circle cx="85" cy="50" r="4" fill="#38bdf8" />
            
            {/* Connecting lines for orbit visual */}
            <circle cx="50" cy="50" r="35" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        </motion.g>

         <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
            <circle cx="75" cy="25" r="3" fill="#818cf8" />
            <circle cx="25" cy="75" r="3" fill="#818cf8" />
        </motion.g>

    </motion.svg>
);


const ImprovesSafetyIcon = () => (
    <motion.svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
    >
        {/* Shield */}
        <motion.path
            d="M50 15 L85 30 L85 60 C85 80 50 95 50 95 C50 95 15 80 15 60 L15 30 Z"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            variants={{ 
                initial: { pathLength: 0, opacity: 0 }, 
                animate: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut' } } 
            }}
        />
        {/* Spark */}
        <motion.path
            d="M20 50 L35 50 M40 45 L30 55 M40 55 L30 45"
            stroke="#facc15"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
                initial: { x: 0, opacity: 0 },
                animate: {
                    x: [0, 10, 10, 0],
                    opacity: [1, 1, 0, 0],
                    transition: { duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }
                }
            }}
        />
        {/* Shield Glow/Block effect */}
         <motion.path
            d="M50 15 L85 30 L85 60 C85 80 50 95 50 95 C50 95 15 80 15 60 L15 30 Z"
            fill="#16a34a"
            variants={{
                initial: { opacity: 0 },
                animate: {
                    opacity: [0, 0.4, 0],
                    transition: { duration: 0.5, delay: 1.3, repeat: Infinity, repeatDelay: 2.5 }
                }
            }}
        />
        {/* Checkmark */}
        <motion.path
            d="M38 52 L48 62 L65 45"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            variants={{ initial: { pathLength: 0 }, animate: { pathLength: 1, transition: { duration: 0.5, delay: 0.8 } } }}
        />
    </motion.svg>
);


const shieldFeatures = [
  {
    icon: AirPollutionIcon,
    title: 'Reduces Air Pollution',
    description: 'Filters over 95% of Volatile Organic Compounds (VOCs) and other harmful vapors before they enter the atmosphere.',
  },
  {
    icon: ConservesResourcesIcon,
    title: 'Conserves Resources',
    description: 'Recovers valuable hydrocarbon vapors and converts them back into usable liquid products, preventing resource waste.',
  },
  {
    icon: PreventsOzoneFormationIcon,
    title: 'Prevents Ozone Formation',
    description: 'By capturing VOCs, VRUs help prevent the formation of ground-level ozone (smog), a major component of air pollution.',
  },
  {
    icon: ImprovesSafetyIcon,
    title: 'Improves Safety',
    description: 'Reduces the risk of fire and explosion by minimizing flammable vapor concentrations at industrial sites.',
  },
];

const ShieldPlanetSection: React.FC = () => {
    return (
        <section className="pt-20 sm:pt-32 pb-0">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold">A Shield For Our Planet</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                        VRUs deliver a powerful combination of environmental protection, resource conservation, and improved safety.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {shieldFeatures.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <VectorBorderCard
                                key={feature.title}
                                className="flex flex-col items-center text-center h-full"
                                delay={i * 0.1}
                            >
                                <div className="h-24 flex items-center justify-center">
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

export default ShieldPlanetSection;
