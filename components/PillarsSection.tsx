import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, CheckCircle } from 'lucide-react';

const socialPillars = [
    'Fair wages and comprehensive benefits for all employees.',
    'Ongoing professional development and training programs.',
    'Commitment to diversity, equity, and inclusion at all levels.',
    'Annual community engagement and STEM education initiatives.'
];

const governancePillars = [
    'Independent board oversight of all ESG commitments.',
    'Strict anti-corruption and ethical conduct policies.',
    'Transparent reporting on performance and sustainability metrics.',
    'Robust data privacy and cybersecurity protocols.'
];

const PillarsSection: React.FC = () => {
    return (
        <section className="py-24">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Social Pillar */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Users className="w-10 h-10 text-cyan-300" />
                        <h2 className="text-3xl font-bold">Social Responsibility</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        Our people and our communities are the foundation of our success. We are dedicated to fostering a supportive, inclusive, and equitable environment where everyone can thrive.
                    </p>
                    <ul className="space-y-3">
                        {socialPillars.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Governance Pillar */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Scale className="w-10 h-10 text-cyan-300" />
                        <h2 className="text-3xl font-bold">Ethical Governance</h2>
                    </div>
                    <p className="text-gray-400 mb-6">
                        We operate with the highest level of integrity and transparency. Our governance framework ensures accountability and ethical decision-making across the entire organization.
                    </p>
                     <ul className="space-y-3">
                        {governancePillars.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default PillarsSection;
