import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, HardHat } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const safetyStats = [
    { icon: ShieldCheck, to: 0.05, fractionDigits: 2, label: 'Total Recordable Incident Rate (TRIR)' },
    { icon: HeartPulse, to: 0, label: 'Lost Time Injuries (LTI)' },
    { icon: HardHat, to: 15000, suffix: '+ hours', label: 'Annual Employee Safety Training' },
];

const SafetyDashboard: React.FC = () => {
    const sectionVariants = {
        initial: { opacity: 0 },
        inView: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const cardVariants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    } as const;

    return (
        <section className="py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold">Commitment to Health & Safety</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    The well-being of our employees, partners, and communities is our highest priority. We maintain a world-class safety culture through rigorous training and proactive measures.
                </p>
            </div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                variants={sectionVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.3 }}
            >
                {safetyStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            className="relative p-8 rounded-2xl glass-card text-center flex flex-col items-center justify-center"
                            variants={cardVariants}
                        >
                            <Icon className="w-12 h-12 text-cyan-300 mb-4" />
                            <AnimatedCounter 
                                to={stat.to} 
                                fractionDigits={stat.fractionDigits}
                                suffix={stat.suffix}
                                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
                            />
                            <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default SafetyDashboard;