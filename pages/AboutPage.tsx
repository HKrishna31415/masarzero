import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BrainCircuit,
  CheckCircle2,
  Code,
  Cpu,
  Factory,
  Fingerprint,
  Globe,
  Quote,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import ThreeJSBackground from '../components/ThreeJSBackground';
import TimelineSection from '../components/TimelineSection';
import VectorBorderCard from '../components/VectorBorderCard';
import { useTranslation } from '../context/TranslationContext';



const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 min-h-screen">
      <ThreeJSBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            {t('pages.about.title')}
          </h1>
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            {t('pages.about.tagline')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <img src="/factorypictures/machinesinfactory.pic.jpg" alt="MasarZero factory" className="w-full h-full min-h-[220px] md:min-h-[360px] object-cover" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0A0D22] p-5 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <Factory className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">{t('pages.about.trustTitle')}</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('pages.about.trustDescription')}
            </p>
            <div className="space-y-4">
              {(Array.isArray(t('pages.about.trustPoints', { returnObjects: true })) ? (t('pages.about.trustPoints', { returnObjects: true }) as unknown as string[]) : []).map(point => (
                <div key={point} className="flex items-start gap-3 text-sm text-gray-200">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <VectorBorderCard className="bg-[#0A0D22] h-full">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-emerald-400" />
                <h2 className="text-3xl font-bold text-white">{t('pages.about.milestones.title')}</h2>
              </div>
              <div className="space-y-4">
                {(Array.isArray(t('pages.about.milestones.items', { returnObjects: true })) ? (t('pages.about.milestones.items', { returnObjects: true }) as unknown as string[]) : []).map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </VectorBorderCard>

          <VectorBorderCard className="bg-[#0A0D22] h-full">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-emerald-400" />
                <h2 className="text-3xl font-bold text-white">{t('pages.about.testing.title')}</h2>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t('pages.about.testing.desc')}
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['SGS', 'Control Union', 'ATEX'].map(item => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Trust Signal</p>
                    <p className="text-xl font-bold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </VectorBorderCard>
        </div>

        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.about.team.title')}</h2>
            <p className="text-gray-400">{t('pages.about.team.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Array.isArray(t('pages.about.team.members', { returnObjects: true })) ? (t('pages.about.team.members', { returnObjects: true }) as unknown as any[]) : []).map((member, i) => {
              const icons: any = {
                'Globe': Globe,
                'Zap': Zap,
                'Cpu': Cpu,
                'BrainCircuit': BrainCircuit,
                'Code': Code,
                'Users': Users
              };
              const IconComponent = icons[member.icon] || Globe;
              return (
                <VectorBorderCard key={member.name} delay={i * 0.1} className="bg-[#0A0D22]">
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 shrink-0">
                      <IconComponent className="text-emerald-400 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-emerald-500 font-mono uppercase tracking-wider mb-3">{member.role}</p>
                    <p className="text-sm text-gray-400">{member.bio}</p>
                  </div>
                </VectorBorderCard>
              );
            })}
          </div>
        </div>

        <div className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/5 skew-y-3 transform origin-bottom-left" />
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.about.dna.title')}</h2>
              <p className="text-gray-400">{t('pages.about.dna.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
              {(Array.isArray(t('pages.about.dna.values', { returnObjects: true })) ? (t('pages.about.dna.values', { returnObjects: true }) as unknown as any[]) : []).map((value, i) => {
                 const icons: any = {
                    'Audacity': Zap,
                    'Precision': Fingerprint,
                    'Trust Through Proof': ShieldCheck
                 };
                 // We can also just use indices if the above icons map is not ideal
                 const fallbackIcons = [Zap, Fingerprint, ShieldCheck];
                 const IconComponent = fallbackIcons[i] || Zap;

                 return (
                    <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="glass-card p-8 rounded-3xl border border-white/10 text-center hover:border-emerald-500/50 transition-colors group"
                    >
                    <IconComponent className="w-12 h-12 mx-auto mb-6 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                    <h3 className="text-2xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-gray-400">{value.text}</p>
                    </motion.div>
                 );
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {(Array.isArray(t('pages.about.testimonials', { returnObjects: true })) ? (t('pages.about.testimonials', { returnObjects: true }) as unknown as any[]) : []).map(item => (
            <div key={item.author} className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8 h-full">
              <Quote className="text-emerald-400 mb-5" />
              <p className="text-lg text-gray-200 leading-relaxed mb-4">“{item.quote}”</p>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{item.author}</p>
            </div>
          ))}
        </div>

        <TimelineSection />
      </div>
    </section>
  );
};

export default AboutPage;
