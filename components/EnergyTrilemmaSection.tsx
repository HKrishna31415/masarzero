import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Leaf, Zap } from 'lucide-react';

interface PillarData {
    id: string;
    // Fix: Using a more specific type for lucide-react icons to resolve type errors.
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    color: string;
    iconColor: string;
    pluses: string;
    description: string;
}

type Pillar = 'security' | 'sustainability' | 'equity';

const pillars: Record<Pillar, PillarData> = {
  security: {
    id: 'security',
    icon: Lock,
    title: 'Energy Security',
    color: 'text-orange-400',
    iconColor: '#f97316',
    pluses: '+',
    description: 'By recovering valuable fuel that would otherwise be lost as vapor, our VRU technology enhances domestic energy supply, reduces dependence on new extraction, and strengthens the resilience of your energy infrastructure.'
  },
  sustainability: {
    id: 'sustainability',
    icon: Leaf,
    title: 'Environmental Sustainability',
    color: 'text-green-400',
    iconColor: '#22c55e',
    pluses: '+',
    description: 'Capturing potent greenhouse gases and volatile organic compounds (VOCs) directly combats climate change, prevents ground-level ozone formation (smog), and significantly improves local air quality for healthier communities.'
  },
  equity: {
    id: 'equity',
    icon: Zap,
    title: 'Energy Equity',
    color: 'text-blue-400',
    iconColor: '#3b82f6',
    pluses: '+++',
    description: 'The recovered hydrocarbons provide a ready-to-use, more affordable energy source. This helps to lower operational costs, which can translate to reduced energy prices and increased accessibility for communities.'
  }
};


const EnergyTrilemmaSection: React.FC = () => {
    const [activePillar, setActivePillar] = useState<Pillar | null>('sustainability');

    const containerVariants = {
        initial: { opacity: 0 },
        inView: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        inView: { opacity: 1, y: 0 },
    };

    const descriptionVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <section className="py-24">
            <motion.div
                className="container mx-auto px-4"
                variants={containerVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h2 className="text-3xl md:text-5xl font-bold">Addressing the Energy Trilemma</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-400">
                        VRU technology provides a balanced solution, making significant improvements across the three core pillars of the global energy challenge.
                    </p>
                </motion.div>
                
                <motion.div className="relative max-w-2xl mx-auto aspect-square" variants={itemVariants}>
                    <svg viewBox="0 0 400 350" className="w-full h-full">
                        <defs>
                             <linearGradient id="trilemmaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" /> 
                                <stop offset="50%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>
                        {/* Main triangle outline */}
                        <polygon points="200,10 20,320 380,320" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />

                        {/* Dashed lines to center */}
                        <line x1="200" y1="10" x2="200" y2="216" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="1" strokeDasharray="4" />
                        <line x1="20" y1="320" x2="200" y2="216" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="1" strokeDasharray="4" />
                        <line x1="380" y1="320" x2="200" y2="216" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" strokeDasharray="4" />

                        {/* Inner solution shape */}
                        <polygon points="200,120 100,290 320,290" fill="url(#trilemmaGradient)" opacity="0.6" />
                    </svg>
                    
                    {/* Pillar Icons and Labels */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                        <PillarComponent pillar={pillars.security} isActive={activePillar === 'security'} onSelect={() => setActivePillar('security')} />
                    </div>
                    <div className="absolute bottom-0 left-0 -translate-x-1/4 text-center">
                        <PillarComponent pillar={pillars.sustainability} isActive={activePillar === 'sustainability'} onSelect={() => setActivePillar('sustainability')} />
                    </div>
                    <div className="absolute bottom-0 right-0 translate-x-1/4 text-center">
                        <PillarComponent pillar={pillars.equity} isActive={activePillar === 'equity'} onSelect={() => setActivePillar('equity')} />
                    </div>
                </motion.div>

                <motion.div className="text-center mt-8 min-h-[5rem]" variants={itemVariants}>
                     <p className="text-sm text-gray-500 mb-4">Click an icon to learn more</p>
                    <AnimatePresence mode="wait">
                        {activePillar && (
                            <motion.div
                                key={activePillar}
                                variants={descriptionVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="max-w-2xl mx-auto"
                            >
                                <p className="text-gray-300">{pillars[activePillar].description}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </section>
    );
};

interface PillarProps {
    pillar: PillarData;
    isActive: boolean;
    onSelect: () => void;
}

const PillarComponent: React.FC<PillarProps> = ({ pillar, isActive, onSelect }) => {
    const { icon: Icon, title, color, iconColor, pluses } = pillar;
    return (
        <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={onSelect}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            data-cursor-hover
        >
            <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                {/* Fix: Use the 'color' prop for lucide-react icons instead of the 'style' prop to fix type error. */}
                <Icon className="w-8 h-8" color={iconColor} />
            </div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${color}`}>{title}</h3>
            <p className="font-bold text-lg text-white">{pluses}</p>
        </motion.div>
    )
}

export default EnergyTrilemmaSection;
