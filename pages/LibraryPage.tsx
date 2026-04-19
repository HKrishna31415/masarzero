import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileCode, FileText, Search, Send } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';
import { useTranslation } from '../context/TranslationContext';

const documents = [
  {
    id: 'doc-001',
    title: 'MZ-1 Technical Specifications',
    category: 'Spec Sheet',
    size: '2.5 MB',
    date: 'Oct 15, 2024',
    thumb: '/machinepictures/technicaldrawings/094060AB-5E8C-4324-9C59-976B35C766FF_4_5005_c.jpeg',
    desc: 'Core dimensions, utilities, performance assumptions, and deployment notes for MZ-1.',
  },
  {
    id: 'doc-002',
    title: 'Advanced Vapor Recovery Economics',
    category: 'Whitepaper',
    size: '4.1 MB',
    date: 'Sep 02, 2024',
    thumb: '/appscreenshots/financialdashboardss.png',
    desc: 'Commercial framing for recovery value, shared-success models, and deployment economics.',
  },
  {
    id: 'doc-003',
    title: 'Macau Storage Case Study',
    category: 'Case Study',
    size: '1.8 MB',
    date: 'Aug 20, 2024',
    thumb: '/factorypictures/machinesinfactory.pic.jpg',
    desc: 'Operational context, installation summary, and performance observations from a terminal-scale program.',
  },
  {
    id: 'doc-004',
    title: 'Installation and Site Prep Guide',
    category: 'Guide',
    size: '5.6 MB',
    date: 'May 12, 2024',
    thumb: '/chinainstalls/whiteunitchina.JPG',
    desc: 'Preparation, placement, electrical, telemetry, and commissioning workflow guidance.',
  },
];

const LibraryPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => [
    { id: 'All', label: t('pages.library.categories.all') },
    { id: 'Spec Sheet', label: t('pages.library.categories.spec') },
    { id: 'Whitepaper', label: t('pages.library.categories.whitepaper') },
    { id: 'Case Study', label: t('pages.library.categories.caseStudy') },
    { id: 'Guide', label: t('pages.library.categories.guide') }
  ], [t]);

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesCategory = activeFilter === 'All' || doc.category === activeFilter;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section className="py-32 min-h-screen bg-[#000212] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">{t('pages.library.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">{t('pages.library.title')}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
            {t('pages.library.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,280px] gap-6 mb-12">
          <div className="flex flex-wrap gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === cat.id
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('pages.library.search')}
              className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors placeholder-gray-600"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc, index) => (
            <VectorBorderCard key={doc.id} delay={index * 0.05} className="h-full">
              <div className="grid sm:grid-cols-[180px,1fr] h-full gap-6">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 min-h-[180px]">
                  <img src={doc.thumb} alt={doc.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-2">{doc.category}</p>
                      <h2 className="text-2xl font-bold text-white leading-snug">{doc.title}</h2>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>{doc.size}</div>
                      <div>{doc.date}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{doc.desc}</p>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-bold hover:bg-emerald-50 transition-colors">
                      <Eye size={14} />
                      {t('pages.library.actions.view')}
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                      <Download size={14} />
                      {t('pages.library.actions.download')}
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300 hover:bg-emerald-500/15 transition-colors">
                      <Send size={14} />
                      {t('pages.library.actions.request')}
                    </button>
                  </div>
                </div>
              </div>
            </VectorBorderCard>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-24">
            <FileText className="mx-auto text-gray-600 mb-4" size={28} />
            <p className="text-gray-500 font-mono uppercase">{t('common.noResults') || 'No documents found'}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: t('pages.library.items.specs.title'), text: t('pages.library.items.specs.text'), icon: FileCode, link: '/library' },
            { title: t('pages.library.items.commercial.title'), text: t('pages.library.items.commercial.text'), icon: FileText, link: '/library' },
            { title: t('pages.library.items.field.title'), text: t('pages.library.items.field.text'), icon: FileText, link: '/library' },
          ].map(item => (
            <a href={item.link} key={item.title} className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer">
              <item.icon className="text-emerald-400 mb-4" size={22} />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibraryPage;
