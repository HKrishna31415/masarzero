
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export interface GalleryImage {
    url: string;
    title: string;
    subtitle: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2574&auto=format&fit=crop',
    title: 'Houston Terminal',
    subtitle: 'MZ-9000 Pro Deployment'
  },
  {
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop',
    title: 'Command Center',
    subtitle: '24/7 Network Operations'
  },
  {
    url: 'https://images.unsplash.com/photo-1535137033828-17648eb7c7cf?q=80&w=2670&auto=format&fit=crop',
    title: 'Fabrication',
    subtitle: 'Precision Engineering'
  },
  {
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2670&auto=format&fit=crop',
    title: 'R&D Facility',
    subtitle: 'Next-Gen Testing'
  },
  {
    url: 'https://images.unsplash.com/photo-1496247749665-49cf5bf87565?q=80&w=2642&auto=format&fit=crop',
    title: 'On-Site Integration',
    subtitle: 'Seamless Retrofit'
  },
  {
    url: 'https://images.unsplash.com/photo-1516937941348-c096a98cb6b7?q=80&w=2670&auto=format&fit=crop',
    title: 'Global Logistics',
    subtitle: 'Supply Chain Excellence'
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
                <h1 className="text-4xl md:text-6xl font-bold text-white">Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Journey</span></h1>
                <p className="text-gray-400 mt-2">Scroll to explore our global impact.</p>
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
                <ParallaxImage key={i} image={image} />
            ))}
            
             {/* CTA Card */}
             <div className="relative h-[70vh] w-[80vw] md:w-[30vw] flex-shrink-0 rounded-3xl overflow-hidden flex items-center justify-center bg-slate-900/30 border border-white/10 mx-4 group hover:bg-slate-900/50 transition-colors">
                 <div className="text-center p-8">
                     <h3 className="text-3xl font-bold mb-6 text-white">See it in person.</h3>
                     <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                         Schedule Visit
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
