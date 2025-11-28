
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2, Activity } from 'lucide-react';

const clients = [
    "ARAMCO", "TOTAL ENERGIES", "BP", "SHELL", "CHEVRON", "EXXONMOBIL", "ADNOC", "PETROBRAS", "EQUINOR", "ENI"
];

// Duplicate for infinite scroll
const marqueeClients = [...clients, ...clients];

const stats = [
    { icon: Globe, value: "12+", label: "Countries Deployed" },
    { icon: CheckCircle2, value: "500+", label: "Active Installations" },
    { icon: Activity, value: "99.9%", label: "Operational Uptime" },
];

const SocialProofSection: React.FC = () => {
    return (
        <section className="py-12 border-b border-white/5 bg-[#000212]">
            <div className="container mx-auto px-4 mb-12">
                <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by Global Energy Leaders</p>
                
                {/* Marquee */}
                <div className="relative flex overflow-x-hidden mask-linear-gradient">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
                        {marqueeClients.map((client, i) => (
                            <span key={i} className="text-2xl md:text-3xl font-black text-white/20 hover:text-cyan-500/50 transition-colors cursor-default">
                                {client}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16">
                        {marqueeClients.map((client, i) => (
                            <span key={i} className="text-2xl md:text-3xl font-black text-white/20 hover:text-cyan-500/50 transition-colors cursor-default">
                                {client}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center justify-center gap-4"
                            >
                                <div className="p-3 rounded-full bg-white/5">
                                    <Icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            <style>{`
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee2 {
                    animation: marquee2 25s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes marquee2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(0%); }
                }
                .mask-linear-gradient {
                    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
                }
            `}</style>
        </section>
    );
};

export default SocialProofSection;
