
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export interface GalleryImage {
    url: string;
    title: string;
    subtitle: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: '/saudiinstalls/abhainstall.jpeg',
    title: 'Gas Station Machine',
    subtitle: 'GEVLR-3 Retail Deployment'
  },
  {
    url: '/otherinstalls/largeinstall.png',
    title: 'Storage Facility Machine',
    subtitle: 'MZ-9000 Terminal Installation'
  },
  {
    url: '/chinainstalls/whiteunitchina.JPG',
    title: 'Smaller Machine',
    subtitle: 'Compact Recovery Unit'
  },
  {
    url: '/factorypictures/machinesinfactory.pic.jpg',
    title: 'Fabrication',
    subtitle: 'Precision Engineering'
  },
  {
    url: '/machinepictures/cryocore.jpg',
    title: 'R&D',
    subtitle: 'Cryo-Core Development'
  },
  {
    url: '/factorypictures/factoryindustrialpark.png',
    title: 'Factory',
    subtitle: 'Industrial Manufacturing'
  },
];

interface ParallaxImageProps {
    image: GalleryImage;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ image }) => {
    const ref = useRef<HTMLDivElement>(null);
    // Detect when the image card is passing through the viewport horizontally
    const { scrollXProgress } = useScroll({ target: ref, axis: 'x', offset: ["start end", "end start"] });
    
    // Parallax effect: move the inner image slightly slower than the container scroll
    const x = useTransform(scrollXProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={ref} className="relative h-[70vh] w-[80vw] md:w-[40vw] flex-shrink-0 rounded-3xl overflow-hidden group border border-white/10 mx-4">
            <motion.div style={{ x }} className="absolute inset-0 w-[140%] h-full -left-[20%]">
                 <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-cyan-400 font-mono tracking-wider text-sm uppercase">{image.subtitle}</p>
            </div>
        </div>
    );
};

const GalleryPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const items = t('pages.gallery.items', { returnObjects: true }) as { title: string; subtitle: string }[];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
        
        if (isVerticalScroll) {
             const isScrollingDown = e.deltaY > 0;
             const isScrollingUp = e.deltaY < 0;
             
             const scrollLeft = container.scrollLeft;
             const maxScrollLeft = container.scrollWidth - container.clientWidth;
             
             // Use a small tolerance for 'end' detection to allow escaping the horizontal scroll
             const isAtEnd = Math.abs(scrollLeft - maxScrollLeft) < 2;
             const isAtStart = scrollLeft < 2;

             // If scrolling down/right and NOT at the end, hijack the scroll
             if (isScrollingDown && !isAtEnd) {
                 container.scrollLeft += e.deltaY;
                 e.preventDefault();
             } 
             // If scrolling up/left and NOT at the start, hijack the scroll
             else if (isScrollingUp && !isAtStart) {
                 container.scrollLeft += e.deltaY;
                 e.preventDefault();
             }
             // If at boundaries, let the default event happen (vertical page scroll)
        }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
        container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section className="bg-[#000212] h-screen w-full flex flex-col pt-24 pb-8">
        <div className="px-12 mb-4 flex justify-between items-end shrink-0">
            <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {t('pages.gallery.title').split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    {t('pages.gallery.title').split(' ').slice(-1)[0]}
                  </span>
                </h1>
                <p className="text-gray-400 mt-2">{t('pages.gallery.subtitle')}</p>
            </div>
            <div className="flex gap-4 text-gray-500">
                 <ArrowLeft className="w-6 h-6 animate-pulse" />
                 <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
            ref={containerRef} 
            className="flex-1 flex items-center overflow-x-auto overflow-y-hidden pl-8 pr-24 pb-8 scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
        >
            {galleryImages.map((image, i) => (
                <ParallaxImage key={i} image={{ ...image, title: items[i]?.title || image.title, subtitle: items[i]?.subtitle || image.subtitle }} />
            ))}
            
             {/* CTA Card */}
             <div className="relative h-[70vh] w-[80vw] md:w-[30vw] flex-shrink-0 rounded-3xl overflow-hidden flex items-center justify-center bg-slate-900/30 border border-white/10 mx-4 group hover:bg-slate-900/50 transition-colors">
                 <div className="text-center p-8">
                     <h3 className="text-3xl font-bold mb-6 text-white">{t('pages.gallery.visitTitle')}</h3>
                     <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                         {t('pages.gallery.visitCTA')}
                     </button>
                 </div>
            </div>
        </div>
        
        <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
    </section>
  );
};

export default GalleryPage;
