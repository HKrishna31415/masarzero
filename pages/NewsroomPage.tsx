import React, { useState, useMemo } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download, ExternalLink, Search, Tag, Clock, Rss, Radio, Signal, Globe } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

const NewsroomPage: React.FC = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Technology', 'Partnership', 'Deployment', 'Event'];

    // Map images to IDs since images aren't in translation dict yet
    const imageMap: Record<number, string> = {
        1: '/otherinstalls/bahraininstall.jpeg',
        2: '/otherinstalls/largeinstall.png',
        3: '/appscreenshots/dashboardss.png',
        4: '/saudiinstalls/abhainstall.jpeg',
        5: '/chinainstalls/whiteunitchina.JPG',
        6: '/koreainstalls/twomachineskorea.jpeg'
    };

    const allArticles: Article[] = useMemo(() => {
        const localizedArticles = t('pages.newsroom.articles', { returnObjects: true }) as any[];
        if (!Array.isArray(localizedArticles)) return [];
        
        return localizedArticles.map(article => ({
            ...article,
            image: imageMap[article.id] || '/otherinstalls/bahraininstall.jpeg'
        }));
    }, [t]);

    const featuredArticle = allArticles.find(a => a.featured);
    
    const filteredArticles = useMemo(() => {
        let filtered = allArticles.filter(a => !a.featured);
        
        if (activeFilter !== 'All') {
            filtered = filtered.filter(a => a.category === activeFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [activeFilter, searchQuery, allArticles]);

    return (
        <section className="min-h-screen pt-32 pb-12 bg-[#000212]">
             <div className="container mx-auto px-4">
                
                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Hero Article */}
                         {featuredArticle && !searchQuery && activeFilter === 'All' && (
                            <motion.div 
                                className="relative w-full h-[500px] rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img 
                                    src={featuredArticle.image} 
                                    alt={featuredArticle.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000212] via-[#000212]/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-10 max-w-3xl">
                                    <span className="inline-block bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider backdrop-blur-sm">
                                        {t('pages.newsroom.featured')}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-cyan-100 transition-colors">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 max-w-2xl">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                                        {t('pages.newsroom.readFull')} <ArrowRight size={14} className="text-cyan-400" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Filter Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2">
                             <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <input 
                                    type="text" 
                                    placeholder={t('pages.newsroom.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/20 py-2 pl-0 pr-8 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder-gray-600 font-mono"
                                />
                                <Search size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* Article Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {filteredArticles.map((article, i) => (
                                <VectorBorderCard key={article.id} delay={i * 0.05} className="cursor-pointer hover:bg-white/5 transition-colors group">
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded bg-black/20">
                                                {article.category}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
                                                {article.date}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-wider">{t('pages.newsroom.accessLog')}</span>
                                            <ExternalLink size={12} className="text-gray-600 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </VectorBorderCard>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sidebar Terminal */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Press Kit Terminal */}
                        <div className="bg-[#050714] border border-white/10 rounded-xl p-6 flex flex-col gap-4 h-full">
                             <div className="border-b border-white/10 pb-4 mb-2">
                                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{t('pages.newsroom.mediaUplink')}</h3>
                                 <p className="text-[10px] text-gray-500 font-mono">{t('pages.newsroom.pressKit')}</p>
                             </div>

                             <a href="#" className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 rounded p-3 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Download size={14} className="text-gray-400 group-hover:text-cyan-400" />
                                    <span className="text-xs font-bold text-gray-300">Brand Assets.zip</span>
                                </div>
                                <span className="text-[9px] text-gray-600 font-mono">24MB</span>
                             </a>
                             
                             <a href="#" className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 rounded p-3 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Download size={14} className="text-gray-400 group-hover:text-cyan-400" />
                                    <span className="text-xs font-bold text-gray-300">Product_Renders_4K.zip</span>
                                </div>
                                <span className="text-[9px] text-gray-600 font-mono">156MB</span>
                             </a>

                             <a href="#" className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 rounded p-3 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Download size={14} className="text-gray-400 group-hover:text-cyan-400" />
                                    <span className="text-xs font-bold text-gray-300">Executive_Bios.pdf</span>
                                </div>
                                <span className="text-[9px] text-gray-600 font-mono">2MB</span>
                             </a>

                             <div className="mt-auto pt-6">
                                 <div className="bg-white/5 rounded p-4 border border-white/5">
                                     <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">{t('pages.newsroom.pressContact')}</p>
                                     <a href="mailto:press@masarzero.com" className="flex items-center gap-2 text-xs text-cyan-400 hover:underline">
                                         <Mail size={12} /> press@masarzero.com
                                     </a>
                                 </div>
                             </div>
                        </div>

                    </div>
                </div>
             </div>
        </section>
    );
};

export default NewsroomPage;
