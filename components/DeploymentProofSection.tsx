import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

interface ProofBlock {
  title: string;
  location: string;
  images: string[];
  metrics: string[];
  summary: string;
}

const ProofBlockCard = ({ block, index }: { block: ProofBlock, index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % block.images.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, [block.images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % block.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + block.images.length) % block.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden border border-white/10 bg-[#0a1020] flex flex-col h-full group"
    >
      <div className="relative h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={block.images[currentImageIndex]} 
            alt={block.title} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-black/20 to-transparent" />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button onClick={prevImage} className="p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-emerald-500/20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextImage} className="p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-emerald-500/20 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {block.images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
          <h3 className="text-2xl font-bold text-white">{block.title}</h3>
          <p className="flex items-center gap-2 text-sm text-emerald-300 mt-2">
            <MapPin size={14} />
            {block.location}
          </p>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-300 leading-relaxed mb-5">{block.summary}</p>
        <div className="space-y-3 mt-auto">
          {block.metrics.map(metric => (
            <div key={metric} className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DeploymentProofSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const proofBlocks: ProofBlock[] = [
    {
      title: t('home.deploymentProof.blocks.saudi.title'),
      location: t('home.deploymentProof.blocks.saudi.location'),
      images: [
        '/saudiinstalls/abhainstall.jpeg',
        '/factorypictures/machinesinfactory.pic.jpg',
        '/machinepictures/cryocore.jpg'
      ],
      metrics: [
        t('home.deploymentProof.blocks.saudi.metrics.0'),
        t('home.deploymentProof.blocks.saudi.metrics.1'),
        t('home.deploymentProof.blocks.saudi.metrics.2'),
      ],
      summary: t('home.deploymentProof.blocks.saudi.summary'),
    },
    {
      title: t('home.deploymentProof.blocks.korea.title'),
      location: t('home.deploymentProof.blocks.korea.location'),
      images: [
        '/koreainstalls/twomachineskorea.jpeg',
        '/koreainstalls/ansansupermanstation.png',
        '/koreainstalls/baekjaestatoinjeonju.png',
        '/koreainstalls/batmanstationsuwon.png',
        '/koreainstalls/cloverstationincheon.png',
        '/koreainstalls/myeongpum.png'
      ],
      metrics: [
        t('home.deploymentProof.blocks.korea.metrics.0'),
        t('home.deploymentProof.blocks.korea.metrics.1'),
        t('home.deploymentProof.blocks.korea.metrics.2'),
      ],
      summary: t('home.deploymentProof.blocks.korea.summary'),
    },
  ];

  return (
    <section className="py-24 bg-[#020410] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_40%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-mono mb-4">{t('home.deploymentProof.badge')}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">
            {t('home.deploymentProof.title')}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t('home.deploymentProof.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {proofBlocks.map((block, index) => (
            <ProofBlockCard key={block.title} block={block} index={index} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/global')}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-black px-7 py-4 font-bold hover:bg-emerald-50 transition-colors"
          >
            {t('home.deploymentProof.explore')}
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 font-bold text-white hover:border-emerald-500/40 hover:bg-white/5 transition-colors"
          >
            {t('home.deploymentProof.request')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeploymentProofSection;
