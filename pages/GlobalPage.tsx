
import React, { useState, useMemo } from 'react';
import Globe from '../components/Globe';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types/appTypes';
import { Building, Globe as GlobeIcon, Activity, Wind, Zap, Search, MapPin, Signal, Radio, ChevronRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import VectorBorderCard from '../components/VectorBorderCard';

const projects: Project[] = [
  { 
    name: 'Houston Gas Corp Terminal',
    location: 'Houston, USA',
    countryCode: 'US',
    coordinates: [29.7604, -95.3698],
    operator: 'Houston Gas Corp',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$4.2M',
    co2_reduction: '12,500 tons/year',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2574&auto=format&fit=crop'
  },
  { 
    name: 'EuroPort Logistics Hub',
    location: 'Rotterdam, Netherlands',
    countryCode: 'NL',
    coordinates: [51.9244, 4.4777],
    operator: 'EuroPort Logistics',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$3.8M',
    co2_reduction: '11,000 tons/year',
    image: 'https://images.unsplash.com/photo-1516937941348-c096a98cb6b7?q=80&w=2670&auto=format&fit=crop'
   },
  { 
    name: 'Jubail Industrial Complex',
    location: 'Jubail, Saudi Arabia',
    countryCode: 'SA',
    coordinates: [27.0123, 49.6631],
    operator: 'Aramco Petrochemicals',
    vru_model: 'MZ-9000 Enterprise',
    status: 'Online',
    annual_revenue: '$7.1M',
    co2_reduction: '25,000 tons/year',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    name: 'Singapore Refining Co.',
    location: 'Singapore',
    countryCode: 'SG',
    coordinates: [1.3521, 103.8198],
    operator: 'SRC Global',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$5.5M',
    co2_reduction: '18,000 tons/year',
    image: 'https://images.unsplash.com/photo-1535137033828-17648eb7c7cf?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    name: 'Guanabara Bay Terminal',
    location: 'Rio de Janeiro, Brazil',
    countryCode: 'BR',
    coordinates: [-22.9068, -43.1729],
    operator: 'Petrobras',
    vru_model: 'MZ-9000 Lite',
    status: 'Online',
    annual_revenue: '$2.1M',
    co2_reduction: '6,500 tons/year',
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5bf87565?q=80&w=2642&auto=format&fit=crop'
  },
  { 
    name: 'Kwinana Industrial Area',
    location: 'Perth, Australia',
    countryCode: 'AU',
    coordinates: [-32.2350, 115.7720],
    operator: 'Wesfarmers LNG',
    vru_model: 'MZ-9000 Enterprise',
    status: 'Under Construction',
    annual_revenue: 'N/A',
    co2_reduction: 'N/A',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop'
  },
];

const StatWidget = ({ icon: Icon, label, value, subtext, color }: any) => (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 min-w-[200px] hover:border-cyan-500/30 transition-colors group">
        <div className={`p-3 rounded-lg bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{label}</p>
            <div className="text-xl font-bold text-white font-mono">{value}</div>
            {subtext && <p className="text-[10px] text-gray-500">{subtext}</p>}
        </div>
    </div>
);

const ProjectListItem = ({ project, onClick }: { project: Project, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className="group cursor-pointer flex items-center justify-between p-2 border-b border-white/5 hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg last:border-0 bg-black/20 backdrop-blur-sm"
    >
        <div className="flex items-center gap-2 overflow-hidden">
             <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.status === 'Online' ? 'bg-green-500 shadow-[0_0_4px_#22c55e]' : 'bg-yellow-500'}`} />
             <div className="truncate">
                <h4 className="text-[10px] font-bold text-gray-200 group-hover:text-cyan-300 transition-colors font-mono uppercase truncate">{project.name}</h4>
                <div className="flex items-center gap-1 text-[9px] text-gray-600 uppercase tracking-tight">
                    <span>{project.countryCode}</span>
                    <span className="text-gray-800">|</span>
                    <span>{project.vru_model}</span>
                </div>
             </div>
        </div>
        
        <div className="text-right shrink-0 pl-2">
            <div className="text-[10px] font-mono font-bold text-cyan-500/70 group-hover:text-cyan-400">
                {project.annual_revenue !== 'N/A' ? project.annual_revenue : '--'}
            </div>
        </div>
    </div>
);

const GlobalPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalSites = projects.length;
  const activeCountries = new Set(projects.map(p => p.countryCode)).size;
  const totalRevenue = projects.reduce((acc, curr) => {
      const val = parseFloat(curr.annual_revenue.replace(/[^0-9.]/g, ''));
      return isNaN(val) ? acc : acc + val;
  }, 0);

  const filteredProjects = projects.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectClick = (projectData: any) => {
    let project: Project | undefined;
    
    if ('geometry' in projectData) {
         project = projects.find(p => 
            p.coordinates[0] === projectData.geometry.coordinates[1] &&
            p.coordinates[1] === projectData.geometry.coordinates[0]
        );
    } else {
        project = projectData as Project;
    }

    if (project) {
        setSelectedProject(project);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="h-screen w-screen relative flex items-center justify-center overflow-hidden bg-[#000212]">
      
      {/* --- 3D Globe Layer --- */}
      <div className="absolute inset-0 z-0">
        <Globe projects={projects} onProjectClick={handleProjectClick} />
      </div>

      {/* --- HUD Overlay Layer --- */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col p-4 md:p-8 pt-72 pb-24 md:pb-8 justify-end">
        
        {/* Main Layout */}
        <div className="flex-1 flex flex-col md:flex-row justify-between items-end gap-6">
            
            {/* Bottom Left: Stats Telemetry */}
            <motion.div 
                className="hidden md:flex flex-col gap-3 pointer-events-auto w-64 mb-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <StatWidget 
                    icon={Building} 
                    label="Active Sites" 
                    value={<AnimatedCounter to={totalSites} />} 
                    color="text-cyan-400" 
                />
                <StatWidget 
                    icon={GlobeIcon} 
                    label="Markets Online" 
                    value={<AnimatedCounter to={activeCountries} />} 
                    color="text-purple-400" 
                />
                 <StatWidget 
                    icon={Zap} 
                    label="Global Revenue" 
                    value={<AnimatedCounter to={totalRevenue} prefix="$" suffix="M" fractionDigits={1} />} 
                    subtext="Annual Run Rate"
                    color="text-green-400" 
                />
                 <StatWidget 
                    icon={Wind} 
                    label="Carbon Offset" 
                    value={<AnimatedCounter to={73.5} suffix="k" fractionDigits={1} />} 
                    subtext="Metric Tons / Year"
                    color="text-blue-400" 
                />
            </motion.div>

            {/* Right Panel: Real-Time Feed (Project List) */}
            <motion.div 
                className="w-full md:w-72 flex flex-col gap-0 pointer-events-auto h-[40vh] md:h-[50vh] rounded-xl overflow-hidden border border-white/10 bg-[#050714]/90 backdrop-blur-md shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Panel Header */}
                <div className="p-2 border-b border-white/10 bg-white/5">
                    {/* Search Bar Only - Removed Title */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Filter signal..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded py-1 pl-7 pr-2 text-[10px] text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-600 font-mono"
                        />
                        <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {filteredProjects.map(project => (
                        <ProjectListItem 
                            key={project.name} 
                            project={project} 
                            onClick={() => handleProjectClick(project)} 
                        />
                    ))}
                </div>
                
                <div className="p-1.5 border-t border-white/5 text-[8px] text-center text-gray-700 font-mono uppercase">
                    Scanning Sector 7...
                </div>
            </motion.div>

        </div>
      </div>

      {/* --- Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      {/* Mobile Stats Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 grid grid-cols-3 gap-2 z-20">
           <div className="text-center">
                <p className="text-[9px] text-gray-400 uppercase font-bold">Sites</p>
                <p className="font-bold text-white text-lg">{totalSites}</p>
           </div>
           <div className="text-center border-l border-white/10">
                <p className="text-[9px] text-gray-400 uppercase font-bold">Markets</p>
                <p className="font-bold text-white text-lg">{activeCountries}</p>
           </div>
           <div className="text-center border-l border-white/10">
                <p className="text-[9px] text-gray-400 uppercase font-bold">Rev.</p>
                <p className="font-bold text-green-400 text-lg">${totalRevenue.toFixed(1)}M</p>
           </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
};

export default GlobalPage;
