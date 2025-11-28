
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { X, MapPin, Building, Settings, TrendingUp, Leaf, ExternalLink, Activity, ScanLine, Cpu, Crosshair } from 'lucide-react';
import { Project } from '../types/appTypes';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  
  const backdropVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants: Variants = {
    initial: { scale: 0.95, opacity: 0, y: 30 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { scale: 0.95, opacity: 0, y: 30, transition: { type: 'tween', duration: 0.2 } },
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-8"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full max-w-5xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl shadow-cyan-500/10 border border-white/10 bg-[#050714]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Left Panel: Visuals & Status --- */}
        <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full bg-black group overflow-hidden">
            <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100 transform" 
            />
            
            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050714] via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050714]/80 md:to-transparent" />
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />

            {/* Status Indicator Top Left */}
            <div className="absolute top-6 left-6 z-20">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-cyan-500/30 backdrop-blur-md">
                     <div className={`w-2 h-2 rounded-full ${project.status === 'Online' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500'}`} />
                     <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">{project.status}</span>
                 </div>
            </div>

            {/* Tech Overlay Bottom Left */}
             <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-cyan-400/80 space-y-1">
                <div className="flex items-center gap-2 text-white mb-2">
                    <ScanLine size={14} className="animate-pulse text-cyan-400" />
                    <span className="tracking-widest uppercase font-bold">Site Located</span>
                </div>
                <div className="flex gap-4">
                    <div>
                        <span className="text-gray-500 block">LATITUDE</span>
                        <span>{project.coordinates[0].toFixed(4)} N</span>
                    </div>
                     <div>
                        <span className="text-gray-500 block">LONGITUDE</span>
                        <span>{project.coordinates[1].toFixed(4)} E</span>
                    </div>
                </div>
             </div>
             
             {/* Center Crosshair Decorative */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-white">
                <Crosshair size={64} strokeWidth={0.5} />
             </div>
        </div>

        {/* --- Right Panel: Data HUD --- */}
        <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-[#050714] relative">
             {/* Close Button */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-50 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
                <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-8 border-b border-white/5 pb-6">
                <div className="flex items-center gap-2 text-cyan-500 mb-2">
                     <MapPin size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{project.countryCode} // {project.location}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-none">{project.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-300">ID: MZ-{Math.floor(Math.random() * 9000) + 1000}</span>
                    <span className="flex items-center gap-1.5"><Cpu size={12} /> Unit Type: Enterprise</span>
                </div>
            </div>

            {/* Metrics Grid - Readout Style */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <ReadoutBox 
                    label="Annual Revenue" 
                    value={project.annual_revenue} 
                    icon={TrendingUp} 
                    accentColor="border-green-500/50 text-green-400" 
                />
                <ReadoutBox 
                    label="CO₂ Reduction" 
                    value={project.co2_reduction} 
                    icon={Leaf} 
                    accentColor="border-cyan-500/50 text-cyan-400" 
                />
                <ReadoutBox 
                    label="Hardware Model" 
                    value={project.vru_model} 
                    icon={Settings} 
                    accentColor="border-blue-500/50 text-blue-400" 
                />
                <ReadoutBox 
                    label="Operator" 
                    value={project.operator} 
                    icon={Building} 
                    accentColor="border-purple-500/50 text-purple-400" 
                />
            </div>
            
            {/* Footer / Additional Tech Data */}
            <div className="mt-auto bg-white/5 rounded-lg p-4 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex gap-6 text-xs font-mono">
                     <div>
                        <span className="block text-gray-500 mb-0.5">UPTIME</span>
                        <span className="text-white font-bold">99.98%</span>
                     </div>
                     <div>
                        <span className="block text-gray-500 mb-0.5">EFFICIENCY</span>
                        <span className="text-cyan-400 font-bold">OPTIMAL</span>
                     </div>
                     <div>
                        <span className="block text-gray-500 mb-0.5">PRESSURE</span>
                        <span className="text-white font-bold">1.2 PSI</span>
                     </div>
                 </div>
                 
                 <button className="w-full sm:w-auto group flex items-center justify-center gap-2 text-xs font-bold text-black bg-cyan-500 hover:bg-cyan-400 uppercase tracking-wider transition-all px-5 py-2.5 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    Access Telemetry
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                 </button>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReadoutBox: React.FC<{ label: string, value: string, icon: React.ComponentType<any>, accentColor: string }> = ({ label, value, icon: Icon, accentColor }) => (
    <div className={`relative bg-slate-900/50 border-l-2 p-4 rounded-r-lg transition-all duration-300 hover:bg-slate-800 group ${accentColor.split(' ')[0]}`}>
        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 border-t border-r border-white/20"></div>
        </div>
        <div className="flex items-center gap-2 mb-1.5 text-gray-500">
            <Icon size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
        </div>
        <div className={`text-lg font-bold font-mono truncate ${accentColor.split(' ')[1]}`}>{value}</div>
    </div>
);

export default ProjectModal;
