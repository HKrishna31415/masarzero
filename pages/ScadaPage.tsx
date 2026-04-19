import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { Bell, Cpu, FileText, Radio, Server, ShieldCheck, Wifi } from 'lucide-react';
import ScadaScrollAnimation from '../components/ScadaScrollAnimation';

const ScadaPage: React.FC = () => {
  const { t } = useTranslation();

  const screenshots = (t('pages.scada.screenshots', { returnObjects: true }) as any[]) || [];
  const screenshotImages = [
    '/appscreenshots/dashboardss.png',
    '/appscreenshots/alertsdashboardss.png',
    '/appscreenshots/financialdashboardss.png',
    '/appscreenshots/remotecontrolss.png',
  ];

  const features = [
    { icon: Cpu, title: t('pages.scada.features.logic.title'), description: t('pages.scada.features.logic.text') },
    { icon: Wifi, title: t('pages.scada.features.remote.title'), description: t('pages.scada.features.remote.text') },
    { icon: ShieldCheck, title: t('pages.scada.features.audit.title'), description: t('pages.scada.features.audit.text') },
    { icon: Server, title: t('pages.scada.features.service.title'), description: t('pages.scada.features.service.text') },
  ];
  return (
    <>
      <ScadaScrollAnimation />

      <section className="bg-[#000212] relative -mt-24 z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-400 font-mono text-sm tracking-[0.2em] uppercase mb-4 block">{t('pages.scada.badge')}</span>
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              {t('pages.scada.title')}
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              {t('pages.scada.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-6 mb-12">
            <div className="rounded-3xl border border-white/10 bg-[#0b1021] p-5 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('pages.scada.whatItDoesTitle', { defaultValue: 'What the platform actually does' })}</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  {t('pages.scada.whatItDoesDesc1', { defaultValue: 'PinnacleOS connects machine telemetry, alarm states, service context, and commercial reporting into one operating layer. It gives teams a single place to understand how the recovery system is performing and what needs attention.' })}
                </p>
                <p>
                  {t('pages.scada.whatItDoesDesc2', { defaultValue: 'Instead of treating SCADA as a visual wrapper, the product is framed here as an operational backbone: machine visibility, exception handling, remote support coordination, and reporting discipline.' })}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Bell, label: t('pages.scada.labels.alerts', { defaultValue: 'Alerts' }), value: t('pages.scada.values.alerts', { defaultValue: 'Exception handling' }) },
                  { icon: Radio, label: t('pages.scada.labels.telemetry', { defaultValue: 'Telemetry' }), value: t('pages.scada.values.telemetry', { defaultValue: 'Live + historical context' }) },
                  { icon: FileText, label: t('pages.scada.labels.reports', { defaultValue: 'Reports' }), value: t('pages.scada.values.reports', { defaultValue: 'Operational and compliance outputs' }) },
                  { icon: Server, label: t('pages.scada.labels.service', { defaultValue: 'Service' }), value: t('pages.scada.values.service', { defaultValue: 'Remote triage and guided response' }) },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <item.icon className="text-emerald-400 mb-3" size={22} />
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {features.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <Icon className="text-emerald-400 mb-4" size={22} />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white">{t('pages.scada.productViewsTitle', { defaultValue: 'Product views' })}</h2>
              <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                {t('pages.scada.productViewsDesc', { defaultValue: 'Real screenshots are more useful here than a simulated interactive panel, so this section now shows the platform in clearer, role-based views.' })}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {screenshots.map((shot, index) => (
                <motion.div
                  key={shot.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl overflow-hidden border border-white/10 bg-[#0b1021] relative group shadow-[0_0_15px_rgba(16,185,129,0.0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000212]/80 z-10 pointer-events-none group-hover:opacity-50 transition-opacity" />
                  <img src={screenshotImages[index]} alt={shot.title} className="w-full h-48 md:h-72 object-cover relative z-0 transition-transform duration-700 group-hover:scale-105" />
                  <div className="p-6 relative z-20 border-t border-white/10 bg-[#0b1021]/80 backdrop-blur-md">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{shot.title}</h3>
                    <p className="text-gray-400">{shot.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ScadaPage;
