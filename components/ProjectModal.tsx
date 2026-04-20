import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, MapPin, Building, Settings, TrendingUp, Leaf, ExternalLink, Activity, ScanLine, Cpu, Crosshair, ChevronLeft, ChevronRight, Map, List } from 'lucide-react';
import { Project } from '../types/appTypes';
import { useTranslation } from '../context/TranslationContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [installView, setInstallView] = useState<'list' | 'map'>('list');

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
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
        className="relative w-full max-w-5xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl shadow-emerald-500/10 border border-white/10 bg-[#050714]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Left Panel: Visuals & Status --- */}
        <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full bg-black group overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt={`${project.name} - ${currentImageIndex + 1}`} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100 transform" 
              />
            </AnimatePresence>
            
            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050714] via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050714]/80 md:to-transparent pointer-events-none" />
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />

            {/* Navigation Controls (If multiple images) */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Pagination Indicator */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  {images.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-emerald-400 w-3' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Status Indicator Top Left */}
            <div className="absolute top-6 left-6 z-20">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-emerald-500/30 backdrop-blur-md">
                     <div className={`w-2 h-2 rounded-full ${project.status === 'Online' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500'}`} />
                     <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                         {project.status === 'Online' ? t('pages.global.modal.online') : project.status}
                     </span>
                 </div>
            </div>

            {/* Tech Overlay Bottom Left */}
             <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-emerald-400/80 space-y-1">
                <div className="flex items-center gap-2 text-white mb-2">
                    <ScanLine size={14} className="animate-pulse text-emerald-400" />
                    <span className="tracking-widest uppercase font-bold">{t('pages.global.modal.siteLocated')}</span>
                </div>
                <div className="flex gap-4">
                    <div>
                        <span className="text-gray-500 block">{t('pages.global.modal.latitude')}</span>
                        <span>{project.coordinates[0].toFixed(4)} N</span>
                    </div>
                     <div>
                        <span className="text-gray-500 block">{t('pages.global.modal.longitude')}</span>
                        <span>{project.coordinates[1].toFixed(4)} E</span>
                    </div>
                </div>
             </div>
             
             {/* Center Crosshair Decorative */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-white pointer-events-none">
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
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                     <MapPin size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{project.countryCode} // {project.location}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-none">{project.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-300">ID: MZ-{Math.floor(Math.random() * 9000) + 1000}</span>
                    <span className="flex items-center gap-1.5"><Cpu size={12} /> {t('pages.global.modal.unitType')}: <span className="text-emerald-400 font-bold">{project.vru_model.includes('9000') ? '9000 SERIES' : 'MZ-1'}</span></span>
                </div>
            </div>

            {/* Metrics Grid - Readout Style */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <ReadoutBox 
                    label={t('pages.global.modal.annualRevenue')} 
                    value={project.annual_revenue} 
                    icon={TrendingUp} 
                    accentColor="border-emerald-500/50 text-emerald-400" 
                />
                <ReadoutBox 
                    label={t('pages.global.modal.co2Reduction')} 
                    value={project.co2_reduction} 
                    icon={Leaf} 
                    accentColor="border-emerald-500/50 text-emerald-400" 
                />
                <ReadoutBox 
                    label={t('pages.global.modal.hardwareModel')} 
                    value={project.vru_model} 
                    icon={Settings} 
                    accentColor="border-teal-500/50 text-teal-400" 
                />
                <ReadoutBox 
                    label={t('pages.global.modal.operator')} 
                    value={project.operator} 
                    icon={Building} 
                    accentColor="border-teal-500/50 text-teal-400" 
                />
            </div>

            {/* Installations List (Conditional) */}
            {project.installations && (
                <div className="mb-8 overflow-hidden rounded-lg border border-white/5 bg-white/5">
                    <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">{t('pages.global.modal.deploymentNetwork')} // {project.installations.length} {t('pages.global.modal.sites')}</span>
                         <div className="flex items-center gap-2">
                             <Activity size={12} className="text-emerald-500 animate-pulse" />
                             {/* Toggle list / map — only show map toggle if any site has coords */}
                             {project.installations.some(s => s.lat) && (
                                 <div className="flex bg-black/40 rounded p-0.5 border border-white/10">
                                     <button
                                         onClick={() => setInstallView('list')}
                                         className={`p-1 rounded transition-colors ${installView === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
                                         title="List view"
                                     >
                                         <List size={12} />
                                     </button>
                                     <button
                                         onClick={() => setInstallView('map')}
                                         className={`p-1 rounded transition-colors ${installView === 'map' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
                                         title="Map view"
                                     >
                                         <Map size={12} />
                                     </button>
                                 </div>
                             )}
                         </div>
                    </div>

                    {installView === 'list' ? (
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            <table className="w-full text-[10px] text-left border-collapse">
                                <thead className="sticky top-0 bg-[#050714] text-gray-500 uppercase font-bold">
                                    <tr>
                                        <th className="p-3 border-b border-white/5">{t('pages.global.modal.siteKrEn')}</th>
                                        <th className="p-3 border-b border-white/5">{t('pages.global.modal.locationAddress')}</th>
                                        <th className="p-3 border-b border-white/5 text-right">{t('pages.global.modal.date')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {project.installations.map((site) => (
                                        <tr key={site.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-3 font-medium">
                                                <div className="text-white group-hover:text-emerald-400 transition-colors">{site.kr_name}</div>
                                                <div className="text-gray-500">{site.en_name}</div>
                                            </td>
                                            <td className="p-3 text-gray-400 font-mono">{site.address}</td>
                                            <td className="p-3 text-right text-gray-500 font-mono whitespace-nowrap">{site.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Deep Dive Map View */
                        <div className="h-64 relative bg-[#0a0f1e] overflow-hidden">
                            {/* China bounding box: lat 18-53, lng 73-135 */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                            />
                            <div className="absolute top-2 left-3 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">Deep Dive — Geographic Distribution</div>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Rough China outline hint */}
                                <rect x="5" y="5" width="90" height="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            </svg>
                            {project.installations.filter(s => s.lat && s.lng).map((site) => {
                                // Map lat/lng to SVG % coords within China bounds
                                // lat: 18-53 → y: 95-5 (inverted)
                                // lng: 73-135 → x: 5-95
                                const x = ((site.lng! - 73) / (135 - 73)) * 90 + 5;
                                const y = 95 - ((site.lat! - 18) / (53 - 18)) * 90;
                                return (
                                    <div
                                        key={site.id}
                                        className="absolute group"
                                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] cursor-pointer hover:scale-150 transition-transform" />
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-50 pointer-events-none">
                                            <div className="bg-[#050714] border border-emerald-500/30 rounded px-2 py-1 text-[9px] font-mono text-white whitespace-nowrap shadow-xl">
                                                <div className="text-emerald-400 font-bold">{site.en_name}</div>
                                                <div className="text-gray-400">{site.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            
            {/* Footer / Additional Tech Data */}
            <div className="mt-auto bg-white/5 rounded-lg p-4 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex gap-6 text-xs font-mono">
                     <div>
                        <span className="block text-gray-500 mb-0.5">{t('pages.global.modal.uptime')}</span>
                        <span className="text-white font-bold">99%+</span>
                     </div>
                     <div>
                        <span className="block text-gray-500 mb-0.5">{t('pages.global.modal.efficiency')}</span>
                        <span className="text-emerald-400 font-bold">OPTIMAL</span>
                     </div>
                 </div>
                 
                 <button 
                    onClick={() => {
                        if (project.installations?.some(s => s.lat)) {
                            setInstallView('map');
                            // Scroll to the installations section
                            document.querySelector('.custom-scrollbar')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="w-full sm:w-auto group flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all px-5 py-2.5 rounded shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    style={project.installations?.some(s => s.lat)
                        ? { background: 'linear-gradient(135deg,#10b981,#0d9488)', color: '#000' }
                        : { background: '#10b981', color: '#000' }
                    }
                 >
                    {project.installations?.some(s => s.lat) ? (
                        <><Map size={14} className="group-hover:scale-110 transition-transform" /> Map Locations</>
                    ) : (
                        <>{t('pages.global.modal.accessTelemetry')}<ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                    )}
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
