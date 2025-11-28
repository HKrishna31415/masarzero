
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, BookOpen, BarChart2, Filter, FileCode, Search } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';

const documents = [
  { 
    id: 'doc-001',
    title: 'MZ-9000 Series Technical Specifications', 
    category: 'Spec Sheet', 
    size: '2.5 MB',
    date: 'Oct 15, 2024',
    icon: FileCode,
    color: 'text-cyan-400',
    desc: 'Detailed hardware breakdown, electrical requirements, and performance curves for the 9000 series.'
  },
  { 
    id: 'doc-002',
    title: 'Whitepaper: The Economics of Advanced Vapor Recovery', 
    category: 'Whitepaper', 
    size: '4.1 MB',
    date: 'Sep 02, 2024',
    icon: BookOpen,
    color: 'text-purple-400',
    desc: 'Comprehensive analysis of ROI methodologies and global market trends in fuel recovery.'
  },
  { 
    id: 'doc-003',
    title: 'Case Study: Mid-Stream Operator Increases Profitability by 15%', 
    category: 'Case Study', 
    size: '1.8 MB',
    date: 'Aug 20, 2024',
    icon: BarChart2,
    color: 'text-green-400',
    desc: 'Real-world data from a 6-month pilot program at a major logistics hub in Rotterdam.'
  },
  { 
    id: 'doc-004',
    title: 'MZ-CC 500 Carbon Capture Module Datasheet', 
    category: 'Spec Sheet', 
    size: '1.5 MB',
    date: 'Jul 10, 2024',
    icon: FileCode,
    color: 'text-cyan-400',
    desc: 'Technical data for our add-on carbon capture module, including compatibility matrices.'
  },
  { 
    id: 'doc-005',
    title: 'Whitepaper: AI-Powered Predictive Maintenance in VRUs', 
    category: 'Whitepaper', 
    size: '3.2 MB',
    date: 'Jun 05, 2024',
    icon: BookOpen,
    color: 'text-purple-400',
    desc: 'How machine learning models reduce downtime by predicting component failures before they occur.'
  },
  { 
    id: 'doc-006',
    title: 'Installation & Site Prep Guide', 
    category: 'Guide', 
    size: '5.6 MB',
    date: 'May 12, 2024',
    icon: FileText,
    color: 'text-blue-400',
    desc: 'Step-by-step manual for site preparation, concrete pad requirements, and electrical hookups.'
  },
];

const categories = ['All', 'Spec Sheet', 'Whitepaper', 'Case Study', 'Guide'];

const LibraryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesCategory = activeFilter === 'All' || doc.category === activeFilter;
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-32 min-h-screen bg-[#000212] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
               backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
           }} 
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              Digital Archive
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Library</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
            Access our collection of in-depth technical documents, whitepapers, and case studies. Securely encrypted and always up-to-date.
          </p>
        </motion.div>

        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                            activeFilter === cat 
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                            : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search archives..." 
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-600 font-mono"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {filteredDocs.map((doc, i) => {
                    const Icon = doc.icon;
                    return (
                        <VectorBorderCard key={doc.id} delay={i * 0.05} className="h-full group cursor-pointer">
                            <div className="flex flex-col h-full">
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${doc.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase bg-white/5 px-2 py-1 rounded mb-1">
                                            {doc.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-gray-600">
                                            {doc.size}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                                        {doc.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                        {doc.desc}
                                    </p>
                                </div>

                                {/* Card Footer */}
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-gray-600">
                                        UPDATED: {doc.date}
                                    </span>
                                    <button className="flex items-center gap-2 text-xs font-bold text-cyan-500 uppercase tracking-wider hover:text-white transition-colors group/btn">
                                        Download
                                        <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </VectorBorderCard>
                    );
                })}
            </AnimatePresence>
        </div>

        {filteredDocs.length === 0 && (
            <div className="text-center py-24">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                    <Filter size={24} />
                </div>
                <p className="text-gray-500 font-mono uppercase">No documents found matching criteria.</p>
            </div>
        )}

      </div>
    </section>
  );
};

export default LibraryPage;
