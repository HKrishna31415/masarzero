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
        <section className="min-h-screen pt-24 md:pt-32 pb-12 bg-[#000212]">
             <div className="container mx-auto px-4">

                {/* Page header */}
                <div className="mb-6 md:mb-8">
                    <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-2 block">{t('pages.newsroom.badge')}</span>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{t('pages.newsroom.title')}</h1>
                </div>

                {/* Hero Article — full width on all screens */}
                {featuredArticle && !searchQuery && activeFilter === 'All' && (
                    <motion.div
                        className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 mb-6 md:mb-8"
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
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 max-w-3xl">
                            <span className="inline-block bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded mb-2 md:mb-4 uppercase tracking-wider backdrop-blur-sm">
                                {t('pages.newsroom.featured')}
                            </span>
                            <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white leading-tight mb-2 md:mb-3 group-hover:text-cyan-100 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="hidden sm:block text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                {t('pages.newsroom.readFull')} <ArrowRight size={14} className="text-cyan-400" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Main layout: articles + sidebar */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8">

                    {/* Sidebar — shows first on mobile as a compact strip */}
                    <div className="lg:col-span-4 lg:order-2">
                        <div className="bg-[#050714] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                            <div className="border-b border-white/10 pb-3 mb-1">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{t('pages.newsroom.mediaUplink')}</h3>
                                <p className="text-[10px] text-gray-500 font-mono">{t('pages.newsroom.pressKit')}</p>
                            </div>

                            {/* Downloads — horizontal scroll on mobile */}
                            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                                {[
                                    { name: 'Brand Assets.zip', size: '24MB' },
                                    { name: 'Product_Renders_4K.zip', size: '156MB' },
                                    { name: 'Executive_Bios.pdf', size: '2MB' },
                                ].map(file => (
                                    <a key={file.name} href="#" className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 rounded p-3 transition-colors group shrink-0 min-w-[200px] lg:min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Download size={13} className="text-gray-400 group-hover:text-cyan-400 shrink-0" />
                                            <span className="text-xs font-bold text-gray-300 truncate">{file.name}</span>
                                        </div>
                                        <span className="text-[9px] text-gray-600 font-mono ml-2 shrink-0">{file.size}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="bg-white/5 rounded p-3 border border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">{t('pages.newsroom.pressContact')}</p>
                                <a href="mailto:press@masarzero.com" className="flex items-center gap-2 text-xs text-cyan-400 hover:underline">
                                    <Mail size={12} /> press@masarzero.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Articles column */}
                    <div className="lg:col-span-8 lg:order-1 flex flex-col gap-5">

                        {/* Filter Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full sm:w-56 shrink-0">
                                <input
                                    type="text"
                                    placeholder={t('pages.newsroom.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/20 py-2 pl-0 pr-7 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder-gray-600 font-mono"
                                />
                                <Search size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* Article Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredArticles.map((article, i) => (
                                <VectorBorderCard key={article.id} delay={i * 0.05} className="cursor-pointer hover:bg-white/5 transition-colors group">
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded bg-black/20">
                                                {article.category}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-600">{article.date}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-3 flex-grow">
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
                </div>
             </div>
        </section>
    );
};

export default NewsroomPage;
