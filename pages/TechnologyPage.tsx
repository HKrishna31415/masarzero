import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { ArrowRight, CheckCircle2, Factory, Fuel, Loader, Waves } from 'lucide-react';
import VRUModel from '../components/VRUModel';
import Sidebar from '../components/Sidebar';
import { partData, PartData } from '../partData';

const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

class TechnologyErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-emerald-300">
          <p className="text-lg font-mono uppercase tracking-widest">Rendering Offline</p>
          <p className="mt-3 text-sm text-gray-400 max-w-md text-center">
            WebGL failed to initialize in this browser. The overview content is still available.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const TechnologyPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<'mz1' | 'mz9000' | null>(null);
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);
  const webglAvailable = useMemo(() => isWebGLAvailable(), []);
  const modelRef = useRef<HTMLDivElement>(null);

  const overviewCards = [
    { icon: Fuel, title: t('pages.technology.cards.capture.title'), text: t('pages.technology.cards.capture.text') },
    { icon: Waves, title: t('pages.technology.cards.condense.title'), text: t('pages.technology.cards.condense.text') },
    { icon: Factory, title: t('pages.technology.cards.control.title'), text: t('pages.technology.cards.control.text') },
  ];

  const handlePartSelect = useCallback(
    (partName: string) => {
      if (selectedPart?.name === partName) {
        setSelectedPart(null);
        return;
      }
      const data = partData.find(p => p.name === partName);
      setSelectedPart(data || null);
    },
    [selectedPart],
  );

  const handleCloseSidebar = useCallback(() => setSelectedPart(null), []);
  const handleSelectNextPart = useCallback(() => {
    const currentIndex = selectedPart ? partData.findIndex(p => p.name === selectedPart.name) : -1;
    const nextIndex = (currentIndex + 1) % partData.length;
    setSelectedPart(partData[nextIndex]);
  }, [selectedPart]);

  const enterModel = (product: 'mz1' | 'mz9000') => {
    setSelectedProduct(product);
    if (product === 'mz1') {
      window.setTimeout(() => {
        modelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <section className="min-h-screen bg-[#050714] text-white">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 font-mono mb-4">{t('pages.technology.badge')}</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            {t('pages.technology.title')}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            {t('pages.technology.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {overviewCards.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Icon className="text-emerald-400" size={22} />
                </div>
                <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl border border-emerald-500/30 bg-[#0b1120] overflow-hidden">
            <img src="/factorypictures/machinesinfactory.pic.jpg" alt="MZ-1 units" className="w-full h-72 object-cover" />
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3">Select Product</p>
              <h2 className="text-3xl font-bold mb-4">MZ-1</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Retail-focused vapor recovery with compact deployment logic, odor improvement, site telemetry, and fuel recovery.
              </p>
              <div className="space-y-3 mb-8">
                {['Retail deployment architecture', 'Control + recovery + telemetry', 'Interactive component schematic available'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => enterModel('mz1')}
                className="inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-4 font-bold hover:bg-emerald-50 transition-colors"
              >
                {t('pages.technology.schematic.mz1')}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <img src="/otherinstalls/largeinstall.png" alt="MZ-9000 deployment" className="w-full h-72 object-cover" />
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Select Product</p>
              <h2 className="text-3xl font-bold mb-4">MZ-9000</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Terminal-oriented recovery architecture for larger storage and transfer environments. This page currently dives
                into the `MZ-1` interactive breakdown first.
              </p>
              <div className="space-y-3 mb-8">
                {['Higher-throughput environment', 'Large-site integration path', 'Detailed model view coming next'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 size={16} className="text-gray-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => enterModel('mz9000')}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 font-bold text-white hover:border-emerald-500/40 hover:bg-white/5 transition-colors"
              >
                {t('pages.technology.schematic.mz9000')}
              </button>
            </div>
          </div>
        </div>

        {selectedProduct === 'mz9000' && (
          <div className="rounded-3xl border border-white/10 bg-[#0a1120] p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4">MZ-9000 technology summary</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
              The MZ-9000 extends the same recovery logic into larger industrial footprints, with a heavier emphasis on
              throughput, site integration, and deployment-specific engineering. The current interactive 3D deep dive below
              is reserved for the MZ-1 while the MZ-9000 overview content is expanded separately.
            </p>
          </div>
        )}
      </div>

      {selectedProduct === 'mz1' && (
        <div ref={modelRef} className="h-screen w-screen relative bg-[#050714] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 z-10 p-8 pt-40 pointer-events-none bg-gradient-to-b from-[#000212] via-[#000212]/80 to-transparent">
            <div className="container mx-auto">
              <div className="pointer-events-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                  {t('pages.technology.schematic.title')}
                </h2>
                <p className="text-gray-400 mt-2 max-w-lg text-sm md:text-base">
                  {t('pages.technology.schematic.description')}
                </p>
              </div>
            </div>
          </div>

          {webglAvailable ? (
            <TechnologyErrorBoundary>
                <Canvas camera={{ position: [8, 6, 8], fov: 45 }} shadows>
                  <Suspense
                    fallback={
                      <Html center>
                          <div className="flex flex-col items-center justify-center text-emerald-300">
                            <Loader className="animate-spin mb-4" size={48} />
                            <p className="text-lg font-mono uppercase tracking-widest whitespace-nowrap">Initializing System...</p>
                          </div>
                      </Html>
                    }
                  >
                  <fog attach="fog" args={['#050714', 10, 40]} />
                  <group position={[0, -1.5, 0]}>
                    <VRUModel onPartClick={handlePartSelect} selectedPartName={selectedPart?.name || null} />
                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
                  </group>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                  <pointLight position={[-10, 5, -10]} intensity={0.5} color="#10b981" />
                  <Environment preset="city" />
                  <OrbitControls
                    enablePan={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minDistance={5}
                    maxDistance={25}
                    target={[0, 1, 0]}
                  />
                  </Suspense>
                </Canvas>
            </TechnologyErrorBoundary>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-emerald-300">
              <p className="text-lg font-mono uppercase tracking-widest">WebGL Unavailable</p>
              <p className="mt-3 text-sm text-gray-400 max-w-md text-center">
                This device does not support WebGL. The interactive MZ-1 schematic is disabled.
              </p>
            </div>
          )}

          <Sidebar part={selectedPart} onClose={handleCloseSidebar} onSelectNext={handleSelectNextPart} />

          <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
              Interactive MZ-1 environment
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnologyPage;
