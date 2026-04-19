import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import VectorBorderCard from '../components/VectorBorderCard';

const FinancialHero = () => {
  const { t } = useTranslation();
  return (
    <div className="relative pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_35%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 block">{t('pages.financial.badge')}</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.92]">
            {t('pages.financial.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
            {t('pages.financial.description')}
          </p>
        </div>
      </div>
    </div>
  );
};



const RevenueProjector = () => {
  const { t } = useTranslation();
  const [volume, setVolume] = useState(30000);
  const [price, setPrice] = useState(0.85);
  const [stations, setStations] = useState(5);

  const recoveryRate = 0.0015;
  const dailyRecovered = volume * stations * recoveryRate;
  const annualRevenue = dailyRecovered * price * 365;
  const clientShare = 0.2;
  const clientAnnualProfit = annualRevenue * clientShare;

  const data = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    cumulative: clientAnnualProfit * (i + 1),
  }));

  return (
    <div className="mb-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white">{t('pages.financial.estimator.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          {t('pages.financial.estimator.subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-[420px,1fr] gap-8">
        <div className="rounded-3xl border border-white/10 bg-[#0b1120] p-8 space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-300">{t('pages.financial.estimator.volume')}</label>
              <span className="text-emerald-400 font-mono">{volume.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-300">{t('pages.financial.estimator.stations')}</label>
              <span className="text-emerald-400 font-mono">{stations}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={stations}
              onChange={e => setStations(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-300">{t('pages.financial.estimator.fuelPrice')}</label>
              <span className="text-emerald-400 font-mono">${price.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">{t('pages.financial.estimator.results.modelOutput')}</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-gray-300">{t('pages.financial.estimator.results.recoveredLiters')}</span>
                <span className="text-2xl font-bold text-white">{Math.round(dailyRecovered).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-gray-300">{t('pages.financial.estimator.results.annualProfit')}</span>
                <span className="text-2xl font-bold text-white">${Math.round(clientAnnualProfit).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-gray-300">{t('pages.financial.estimator.results.fiveYear')}</span>
                <span className="text-2xl font-bold text-emerald-300">${Math.round(clientAnnualProfit * 5).toLocaleString()}</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-100/60 mt-4">
              {t('pages.financial.estimator.results.benchmark')}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#09101d] p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{t('pages.financial.estimator.results.cumulative')}</h3>
              <p className="text-sm text-gray-400 mt-2">{t('pages.financial.estimator.subtitle')}</p>
            </div>
            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
              {t('pages.financial.badge')}
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="profitFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickFormatter={value => `$${value / 1000}k`} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cumulative profit']}
                />
                <Area type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={3} fill="url(#profitFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinancialPage: React.FC = () => {
  const { t } = useTranslation();
  const summaryCards = [
    { icon: Wallet, title: t('pages.financial.cards.capex.title'), text: t('pages.financial.cards.capex.text') },
    { icon: TrendingUp, title: t('pages.financial.cards.value.title'), text: t('pages.financial.cards.value.text') },
    { icon: ShieldCheck, title: t('pages.financial.cards.risk.title'), text: t('pages.financial.cards.risk.text') },
    { icon: BarChart3, title: t('pages.financial.cards.product.title'), text: t('pages.financial.cards.product.text') },
  ];

  return (
    <section className="min-h-screen bg-[#000212]">
      <FinancialHero />

      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <VectorBorderCard key={card.title} delay={index * 0.1}>
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.text}</p>
                </div>
              </VectorBorderCard>
            );
          })}
        </div>


        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="rounded-3xl border border-white/10 bg-[#0f1222] p-8">
            <h2 className="text-3xl font-bold text-white mb-6">{t('pages.financial.oldStandard.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <DollarSign className="text-red-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.oldStandard.capex.title')}</h3>
                  <p className="text-gray-400 text-sm mt-1">{t('pages.financial.oldStandard.capex.text')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChart3 className="text-red-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.oldStandard.payback.title')}</h3>
                  <p className="text-gray-400 text-sm mt-1">{t('pages.financial.oldStandard.payback.text')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-red-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.oldStandard.risk.title')}</h3>
                  <p className="text-gray-400 text-sm mt-1">{t('pages.financial.oldStandard.risk.text')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#09121f] to-[#0f1b2b] p-8">
            <h2 className="text-3xl font-bold text-white mb-6">{t('pages.financial.masarzeroModel.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Wallet className="text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.masarzeroModel.capital.title')}</h3>
                  <p className="text-gray-300 text-sm mt-1">{t('pages.financial.masarzeroModel.capital.text')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PieChart className="text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.masarzeroModel.clarity.title')}</h3>
                  <p className="text-gray-300 text-sm mt-1">{t('pages.financial.masarzeroModel.clarity.text')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ArrowUpRight className="text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white">{t('pages.financial.masarzeroModel.upside.title')}</h3>
                  <p className="text-gray-300 text-sm mt-1">{t('pages.financial.masarzeroModel.upside.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RevenueProjector />
      </div>
    </section>
  );
};

export default FinancialPage;
