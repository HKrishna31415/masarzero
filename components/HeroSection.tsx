
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  // Text Reveal Variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const HeadingLine = ({ text, className }: { text: string, className: string }) => (
      <motion.h1 
        className={className}
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
  );

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#000212]">
      {/* 3D Background - Fixed Full Coverage */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
         <HeroBackground />
      </div>
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000212]/20 to-[#000212] z-10 pointer-events-none"></div>
      
      <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="overflow-hidden mb-2 md:mb-4">
           <HeadingLine 
                text="Intelligent Recovery." 
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400" 
           />
        </div>
        <div className="overflow-hidden">
             <HeadingLine 
                text="Tangible Returns." 
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500" 
           />
        </div>
        
        <motion.p 
            className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
        >
          MasarZero pioneers advanced Vapor Recovery Units, transforming emissions into revenue while safeguarding the environment through AI-driven engineering.
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6, type: "spring" }}
            className="mt-12 relative z-30" 
        >
            <MagneticButton 
                onClick={() => navigate('/products')}
                className="group relative aurora-border bg-slate-900/80 backdrop-blur-md font-bold text-lg px-10 py-4 rounded-full overflow-hidden flex items-center gap-3 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 cursor-pointer border border-white/20 z-50"
            >
                <span className="relative z-10 text-white group-hover:text-cyan-300 transition-colors duration-300">Discover Our Technology</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-cyan-400" />
                
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </MagneticButton>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm">
            <motion.div 
                className="w-1 h-2 bg-cyan-400 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
