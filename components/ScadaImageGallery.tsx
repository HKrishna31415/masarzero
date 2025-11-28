import React from 'react';
import { motion, Variants } from 'framer-motion';

const galleryItems = [
    {
        image: 'https://placehold.co/600x400/0f172a/94a3b8/png?text=Dashboard',
        caption: 'Central Dashboard'
    },
    {
        image: 'https://placehold.co/600x400/1e293b/64748b/png?text=Mobile+View',
        caption: 'Mobile Responsive'
    },
    {
        image: 'https://placehold.co/600x400/334155/e2e8f0/png?text=Analytics',
        caption: 'Deep Analytics'
    },
    {
        image: 'https://placehold.co/600x400/082f49/7dd3fc/png?text=Alerts',
        caption: 'Instant Alerts'
    },
    {
        image: 'https://placehold.co/600x400/164e63/a5f3fc/png?text=Remote+Control',
        caption: 'Remote Control'
    },
    {
        image: 'https://placehold.co/600x400/1e3a8a/93c5fd/png?text=Reports',
        caption: 'Custom Reports'
    },
];

const ScadaImageGallery: React.FC = () => {
    const containerVariants = {
        initial: {},
        inView: { transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 50 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <section className="py-24 bg-[#0A0D22]">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold">Explore the Platform</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        A closer look at the powerful, intuitive interfaces of PinnacleOS.
                    </p>
                </motion.div>
                
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="inView"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group relative glass-card rounded-2xl overflow-hidden"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <img src={item.image} alt={item.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-xl font-bold text-white">{item.caption}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ScadaImageGallery;