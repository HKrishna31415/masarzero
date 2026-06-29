import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Layers,
  FlaskConical,
  Thermometer,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductItem {
  name: string;
  label: string;
  description: string;
  metrics: string[];
  cta: string;
  image?: string;
}

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Images mapping based on product name
  const productImages: Record<string, string> = {
    'MZ-1': '/factorypictures/machinesinfactory.pic.jpg',
    'MZ-9000': '/otherinstalls/largeinstall.png',
  };
  const hiddenProductNames = new Set(['Power Filter', 'W2E', '功率滤波器', 'فلتر الطاقة']);

  const flagshipProducts = ((t('pages.products.flagship', { returnObjects: true }) as any) as ProductItem[] || [])
    .filter(p => !hiddenProductNames.has(p.name))
    .map(p => ({
      ...p,
      image: productImages[p.name] || '/factorypictures/machinesinfactory.pic.jpg'
    }));

  const solutionFamilies = [
    { icon: Layers, title: t('pages.products.solutions.custom.title'), subtitle: t('pages.products.solutions.custom.subtitle'), description: t('pages.products.solutions.custom.description') },
    { icon: FlaskConical, title: t('pages.products.solutions.fuel.title'), subtitle: t('pages.products.solutions.fuel.subtitle'), description: t('pages.products.solutions.fuel.description') },
    { icon: Thermometer, title: t('pages.products.solutions.heat.title'), subtitle: t('pages.products.solutions.heat.subtitle'), description: t('pages.products.solutions.heat.description') },
    { icon: Zap, title: t('pages.products.solutions.efficiency.title'), subtitle: t('pages.products.solutions.efficiency.subtitle'), description: t('pages.products.solutions.efficiency.description') },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-32 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000212] via-[#07101f] to-[#000212] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10 md:mb-16 max-w-4xl mx-auto"
          variants={headerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 font-mono mb-5">{t('pages.products.badge')}</p>
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            {t('pages.products.title')}
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            {t('pages.products.description')}
          </p>
        </motion.div>

        <div className="space-y-6 mb-16">
          {flagshipProducts.map((product, index) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl overflow-hidden border border-white/10 bg-[#09101d]"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[200px] md:min-h-[320px]">
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#09101d]" />
                </div>

                <div className="p-5 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      {product.label}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider">
                      {product.name}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{product.name}</h2>
                  <p className="text-gray-300 text-base leading-relaxed mb-5">{product.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {product.metrics.map(metric => (
                      <div key={metric} className="flex items-center gap-3 text-sm text-gray-200">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate(product.name === 'MZ-1' ? '/technology' : '/contact')}
                      className="inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-4 font-bold hover:bg-emerald-50 transition-colors"
                    >
                      {product.cta}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Factory className="text-emerald-400" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">{t('pages.products.solutions.title')}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {solutionFamilies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                    <Icon className="text-emerald-400" size={22} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-2">{item.subtitle}</p>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
