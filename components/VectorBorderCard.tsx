
import React from 'react';
import { motion } from 'framer-motion';

interface VectorBorderCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    glowing?: boolean;
}

const VectorBorderCard: React.FC<VectorBorderCardProps> = ({ children, className = "", delay = 0, glowing = false }) => (
    <motion.div
        className={`relative group rounded-xl ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        {/* Animated Gradient Border */}
        <div className={`absolute -inset-[1px] bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 rounded-xl opacity-50 group-hover:opacity-100 blur-[1px] transition-opacity duration-500 ${glowing ? 'opacity-100' : ''}`}></div>

        {/* Main Card Background */}
        <div className="relative h-full bg-[#050714] rounded-xl overflow-hidden">
            {/* Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:animate-scan pointer-events-none"></div>

            <div className="relative z-10 p-6 h-full">
                {children}
            </div>
        </div>
    </motion.div>
);

export default VectorBorderCard;
