import React from 'react';
import { motion } from 'framer-motion';
import { Users, FlaskConical, Briefcase, Award } from 'lucide-react';

const impactAreas = [
    {
        icon: Users,
        title: "Community Partnerships",
        description: "We invest in STEM education programs in our local communities, inspiring the next generation of engineers and environmental scientists."
    },
    {
        icon: Briefcase,
        title: "Local Hiring & Development",
        description: "Our policy prioritizes hiring and developing local talent, ensuring our growth contributes directly to the economic vitality of the regions we operate in."
    },
    {
        icon: FlaskConical,
        title: "Innovation for Good",
        description: "The MasarZero Innovation Lab is dedicated to pioneering next-gen solutions, including affordable carbon capture and water purification technologies."
    },
    {
        icon: Award,
        title: "Employee Volunteer Program",
        description: "We provide paid time off for employees to volunteer for environmental and social causes, amplifying our positive impact beyond our core business."
    }
];

const CommunityImpactSection: React.FC = () => {
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
                <h2 className="text-3xl md:text-5xl font-bold">Community & Innovation</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                    Our responsibility extends beyond our facilities. We're committed to building stronger communities and pioneering technology for a better world.
                </p>
            </div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={sectionVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.3 }}
            >
                {impactAreas.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.title}
                            className="glass-card p-8 rounded-2xl text-center"
                            variants={cardVariants}
                        >
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyan-500/20">
                                <Icon className="w-8 h-8 text-cyan-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default CommunityImpactSection;