
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, ShieldCheck, Link, BrainCircuit } from 'lucide-react';

const benefits = [
  { id: 'roi', icon: BarChart3, title: 'Rapid ROI', description: 'Convert emissions into assets, delivering a full return on investment often in under 18 months.' },
  { id: 'compliance', icon: ShieldCheck, title: 'Compliance & Safety', description: 'Exceed the strictest environmental and safety regulations with our automated, closed-loop systems.' },
  { id: 'automation', icon: BrainCircuit, title: 'Smart Automation', description: 'Our intelligent core self-optimizes for maximum efficiency with minimal human intervention.' },
  { id: 'scalability', icon: Link, title: 'Modular & Scalable', description: 'Easily scale your vapor recovery capacity as your operations grow with our modular architecture.' },
];

const BenefitsSection: React.FC = () => {
    const [hoveredBenefit, setHoveredBenefit] = useState(benefits[0]);

    const angleIncrement = 360 / benefits.length;

    const textVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <section className="py-20 sm:py-32 relative overflow-hidden bg-[#0A0D22]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold">Engineered for Excellence</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        Our core advantages are built into every unit, delivering performance, compliance, and profitability.
                    </p>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-16">
                    {/* Concentric Circles */}
                    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center flex-shrink-0">
                        {/* Outer Animated Ring */}
                         <motion.div 
                            className="absolute inset-0 border-2 border-blue-500/20 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        />
                         {/* Inner Static Ring */}
                        <div className="absolute inset-12 border border-white/10 rounded-full" />

                        {/* Center Text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hoveredBenefit.id}
                                className="w-48 text-center"
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">{hoveredBenefit.title}</h3>
                            </motion.div>
                        </AnimatePresence>

                        {/* Benefit Icons on the ring */}
                        {benefits.map((benefit, i) => {
                            const angle = angleIncrement * i - 90; // Start from top
                            const isHovered = hoveredBenefit.id === benefit.id;
                            return (
                                <motion.div
                                    key={benefit.id}
                                    className="absolute w-16 h-16"
                                    style={{
                                        // @ts-ignore
                                        transform: `rotate(${angle}deg) translateX(170px) rotate(${-angle}deg)`
                                    }}
                                    onMouseEnter={() => setHoveredBenefit(benefit)}
                                >
                                    <motion.div
                                        className="w-16 h-16 glass-card rounded-full flex items-center justify-center cursor-pointer border border-transparent"
                                        animate={{ 
                                            scale: isHovered ? 1.2 : 1,
                                            borderColor: isHovered ? 'rgba(59, 130, 246, 0.7)' : 'rgba(255, 255, 255, 0.1)',
                                            boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
                                        }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <benefit.icon className={`transition-colors ${isHovered ? 'text-blue-400' : 'text-gray-400'}`} size={32} />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Description Text */}
                     <div className="relative max-w-sm h-24 flex items-center">
                         <AnimatePresence mode="wait">
                            <motion.p
                                key={hoveredBenefit.id}
                                className="text-gray-300 text-center md:text-left"
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {hoveredBenefit.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;