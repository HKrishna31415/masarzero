
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAINTENANCE_SECTIONS, Section } from '../data/maintenanceData';
import { BookOpen, ChevronRight, Settings, Wrench } from 'lucide-react';

const MaintenanceGuidePage: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(MAINTENANCE_SECTIONS[0].id);

  const activeSection = MAINTENANCE_SECTIONS.find(s => s.id === activeSectionId) || MAINTENANCE_SECTIONS[0];

  return (
    <section className="min-h-screen bg-[#000212] pt-28 pb-12 overflow-hidden relative">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-4 uppercase tracking-widest">
                <Settings size={12} />
                <span>Technical Documentation v2.4</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                Maintenance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Manual</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                Comprehensive repair guides, wiring diagrams, and troubleshooting protocols for certified MasarZero technicians.
            </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-auto lg:h-[800px]">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4 flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar pr-2">
                {MAINTENANCE_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSectionId === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSectionId(section.id)}
                            className={`w-full text-left px-4 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                                isActive 
                                ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-400'} />
                                <span className="font-bold text-sm">{section.title}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-cyan-400" />}
                        </button>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4 bg-[#0B1021] border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col">
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-20 opacity-20"></div>

                {/* Content Header */}
                <div className="p-6 md:p-8 border-b border-white/10 bg-[#0f172a] z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Wrench size={20} className="text-cyan-400" />
                        <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Module: {activeSection.id.toUpperCase()}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{activeSection.title}</h2>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSectionId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {React.createElement(activeSection.content)}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
};

export default MaintenanceGuidePage;
