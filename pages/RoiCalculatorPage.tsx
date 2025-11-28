
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend, ReferenceLine, AreaChart, Area, Cell } from 'recharts';
import { TrendingUp, BarChart as BarChartIcon, Leaf, DollarSign, Percent, GanttChartSquare, Info, Sliders, Calculator, PieChart, Activity } from 'lucide-react';
import PriceAssistantModal from '../components/PriceAssistantModal';
import VectorBorderCard from '../components/VectorBorderCard';
import AnimatedCounter from '../components/AnimatedCounter';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const value = data.value;
        
        return (
            <div className="bg-[#0f172a]/95 border border-cyan-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">{data.name}</p>
                <p className="font-bold text-sm" style={{ color: data.fill }}>
                    {prefix}{Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{suffix}
                </p>
            </div>
        );
    }
    return null;
};

// --- UI Components ---

const SliderInput = ({ label, value, min, max, step, unit, prefix = '', onChange, format = (v: number) => v.toString(), infoAction }: any) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
        <div className="mb-6 group">
            <div className="flex justify-between items-end mb-3">
                 <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-300 group-hover:text-cyan-300 transition-colors">{label}</label>
                    {infoAction && (
                        <button onClick={infoAction} className="text-gray-500 hover:text-white transition-colors">
                            <Info size={14} />
                        </button>
                    )}
                </div>
                <span className="font-mono text-lg font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                    {prefix}{format(value)} <span className="text-xs text-gray-500 font-normal">{unit}</span>
                </span>
            </div>
            <div className="relative h-2 bg-slate-800 rounded-full cursor-pointer">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                    style={{ width: `${percentage}%` }}
                />
                <input 
                    type="range" 
                    min={min} 
                    max={max} 
                    step={step} 
                    value={value} 
                    onChange={(e) => onChange(Number(e.target.value))} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none transition-transform group-hover:scale-125"
                    style={{ left: `${percentage}%`, marginLeft: '-8px' }}
                />
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, subtext, colorClass = "text-cyan-400" }: any) => (
    <VectorBorderCard className="h-full">
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                    <Icon size={16} className={colorClass} />
                    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">{value}</div>
            </div>
            {subtext && <p className="text-xs text-gray-500 mt-2 border-t border-white/5 pt-2">{subtext}</p>}
        </div>
    </VectorBorderCard>
);


// --- Calculator Logic ---

const SimplifiedCalculator = () => {
    const [volume, setVolume] = useState(60000);
    const [price, setPrice] = useState(0.75);
    const [days, setDays] = useState(330);

    const { annualRevenue, roiPeriod, co2Reduction, chartData } = useMemo(() => {
        const recoveryRate = 0.999;
        const annualVolume = volume * days * recoveryRate;
        const annualRevenue = annualVolume * price;
        const investmentCost = 750000;
        const roiPeriod = annualRevenue > 0 ? (investmentCost / annualRevenue) * 12 : 0;
        const co2Reduction = (annualVolume * 2.3) / 1000; 
        const monthlyRevenue = annualRevenue / 12;
        const chartData = Array.from({ length: 12 }, (_, i) => ({
            month: `Month ${i + 1}`,
            revenue: monthlyRevenue * (i + 1),
            cost: investmentCost,
        }));

        return { annualRevenue, roiPeriod, co2Reduction, chartData };
    }, [volume, price, days]);

    return (
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Controls Side */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#0f172a]/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <Sliders size={20} />
                        </div>
                        <h3 className="font-bold text-lg">Quick Inputs</h3>
                    </div>
                    
                    <SliderInput 
                        label="Daily Vapor Volume" 
                        value={volume} 
                        min={5000} 
                        max={200000} 
                        step={1000} 
                        unit="L" 
                        onChange={setVolume} 
                        format={formatNumber} 
                    />
                    <SliderInput 
                        label="Fuel Price" 
                        value={price} 
                        min={0.20} 
                        max={1.50} 
                        step={0.01} 
                        unit="/ L" 
                        prefix="$" 
                        onChange={setPrice} 
                        format={(v: number) => v.toFixed(2)} 
                    />
                    <SliderInput 
                        label="Operating Days / Year" 
                        value={days} 
                        min={200} 
                        max={365} 
                        step={1} 
                        unit="days" 
                        onChange={setDays} 
                    />
                </div>

                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-6 rounded-2xl">
                    <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4">Estimated Impact</h4>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">Annual Revenue</span>
                            <span className="text-xl font-bold text-white">{formatCurrency(annualRevenue)}</span>
                        </div>
                        <div className="h-px bg-cyan-500/20" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">CO₂ Saved</span>
                            <span className="text-xl font-bold text-green-400">{formatNumber(Math.round(co2Reduction))} tons</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualization Side */}
            <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <StatCard 
                        icon={DollarSign} 
                        label="Annual Revenue" 
                        value={formatCurrency(annualRevenue)} 
                        subtext="Gross revenue generated from recovered fuel"
                        colorClass="text-green-400"
                    />
                    <StatCard 
                        icon={GanttChartSquare} 
                        label="Payback Period" 
                        value={roiPeriod > 0 ? `${roiPeriod.toFixed(1)} Months` : 'Immediate'} 
                        subtext="Time to recover estimated hardware investment"
                        colorClass="text-blue-400"
                    />
                </div>

                <div className="bg-[#0f172a]/50 border border-white/10 rounded-2xl p-6 h-[400px] relative overflow-hidden">
                     <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-cyan-400" />
                        Cumulative Revenue Projection (Year 1)
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val.replace('Month ', 'M')} />
                            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <ReferenceLine y={750000} label="Breakeven (Est. CapEx)" stroke="#ef4444" strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const AdvancedCalculator = () => {
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    
    // State
    const [volume, setVolume] = useState(60000);
    const [uptime, setUptime] = useState(95);
    const [efficiency, setEfficiency] = useState(99.9);
    const [price, setPrice] = useState(0.75);
    const [capex, setCapex] = useState(750000);
    const [depreciationPeriod, setDepreciationPeriod] = useState(10);
    const [discountRate, setDiscountRate] = useState(8);
    const [energyCosts, setEnergyCosts] = useState(800);
    const [maintenanceCosts, setMaintenanceCosts] = useState(500);
    const [annualConsumables, setAnnualConsumables] = useState(5000);
    const [annualWarranty, setAnnualWarranty] = useState(15000);
    const [carbonPrice, setCarbonPrice] = useState(50);
    const [finesAvoided, setFinesAvoided] = useState(50000);

    // Calculations
    const { 
        annualRevenue, annualOpex, netProfit, paybackPeriod, co2Reduction, 
        carbonCreditValue, totalAnnualValue, npv, irr, waterfallData, profitProjectionData 
    } = useMemo(() => {
        const annualOperatingDays = 365 * (uptime / 100);
        const annualVolume = volume * annualOperatingDays * (efficiency / 100);
        const grossRevenue = annualVolume * price;
        const additionalOpex = annualConsumables + annualWarranty;
        const annualOpexTotal = (energyCosts + maintenanceCosts) * 12 + additionalOpex;
        const annualDepreciation = capex / depreciationPeriod;
        const profitBeforeTax = grossRevenue - annualOpexTotal - annualDepreciation;
        const netProfit = grossRevenue - annualOpexTotal;
        const paybackPeriod = capex > 0 && netProfit > 0 ? (capex / netProfit) * 12 : 0;
        const co2Reduction = (annualVolume * 2.3) / 1000;
        const carbonCreditValue = co2Reduction * carbonPrice;
        const complianceValue = finesAvoided;
        const totalAnnualValue = netProfit + carbonCreditValue + complianceValue;
        
        // Waterfall Data
        let cumulative = 0;
        const waterfallRaw = [
            { name: 'Revenue', value: grossRevenue, fill: '#22c55e' }, // Green
            { name: 'OpEx', value: -annualOpexTotal, fill: '#ef4444' }, // Red
            { name: 'Depreciation', value: -annualDepreciation, fill: '#f59e0b' }, // Orange
            { name: 'Credits', value: carbonCreditValue + complianceValue, fill: '#3b82f6' }, // Blue
            { name: 'Net Value', value: 0, isTotal: true, fill: '#06b6d4' }, // Cyan
        ];
        
        const waterfallData = waterfallRaw.map(item => {
            let start = 0;
            let end = 0;
            
            if (item.isTotal) {
                start = 0;
                end = cumulative;
                item.value = cumulative; 
            } else {
                if (item.value >= 0) {
                    start = cumulative;
                    end = cumulative + item.value;
                } else {
                    // Negative bar: start is lower (more positive physically in stacked logic, but logically subtracts)
                    // For Recharts Range: [min, max]
                    // If cumulative is 100 and value is -20. 
                    // We want bar from 80 to 100.
                    start = cumulative + item.value;
                    end = cumulative;
                }
                cumulative += item.value;
            }

            return { ...item, range: [start, end] };
        });

        // 5-Year Projection
        const profitProjectionData = Array.from({ length: 6 }, (_, i) => ({
            year: `Year ${i}`,
            profit: i === 0 ? -capex : -capex + (totalAnnualValue * i),
        }));

        // NPV & IRR
        const cashFlows = Array(5).fill(totalAnnualValue);
        const calculateNPV = (rate: number) => cashFlows.reduce((acc, val, t) => acc + val / Math.pow(1 + rate / 100, t + 1), -capex);
        const npv = calculateNPV(discountRate);
        
        // Simple IRR approximation
        let irr = 0;
        let minDiff = Infinity;
        for(let r = 0; r < 100; r+=0.1) {
            const diff = Math.abs(calculateNPV(r));
            if(diff < minDiff) { minDiff = diff; irr = r; }
        }

        return { 
            annualRevenue: grossRevenue, annualOpex: annualOpexTotal, netProfit, 
            paybackPeriod, co2Reduction, carbonCreditValue, totalAnnualValue, 
            npv, irr, waterfallData, profitProjectionData 
        };
    }, [volume, price, capex, energyCosts, maintenanceCosts, efficiency, carbonPrice, uptime, depreciationPeriod, discountRate, finesAvoided, annualConsumables, annualWarranty]);

    return (
        <div className="grid lg:grid-cols-12 gap-8">
             {/* Inputs Column */}
             <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-24 overflow-y-auto max-h-[85vh] pr-2 custom-scrollbar">
                <div className="bg-[#0f172a]/50 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-cyan-300"><Activity size={18}/> Operational</h3>
                    <SliderInput label="Vapor Volume" value={volume} min={5000} max={200000} step={1000} unit="L/day" onChange={setVolume} format={formatNumber} />
                    <SliderInput label="Efficiency" value={efficiency} min={95} max={99.9} step={0.1} unit="%" onChange={setEfficiency} format={(v: number) => v.toFixed(1)} />
                    <SliderInput label="Uptime" value={uptime} min={80} max={100} step={1} unit="%" onChange={setUptime} />
                </div>

                <div className="bg-[#0f172a]/50 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-green-400"><DollarSign size={18}/> Financial & OpEx</h3>
                    <SliderInput label="Fuel Price" value={price} min={0.2} max={1.5} step={0.01} unit="/L" prefix="$" onChange={setPrice} format={(v: number) => v.toFixed(2)} infoAction={() => setIsPriceModalOpen(true)} />
                    <SliderInput label="CapEx" value={capex} min={0} max={2000000} step={50000} unit="" prefix="$" onChange={setCapex} format={formatNumber} />
                    <SliderInput label="Monthly Energy" value={energyCosts} min={100} max={5000} step={50} unit="" prefix="$" onChange={setEnergyCosts} format={formatNumber} />
                    <SliderInput label="Maintenance/Mo" value={maintenanceCosts} min={100} max={5000} step={50} unit="" prefix="$" onChange={setMaintenanceCosts} format={formatNumber} />
                </div>

                <div className="bg-[#0f172a]/50 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-400"><Leaf size={18}/> ESG & Regulatory</h3>
                    <SliderInput label="Carbon Price" value={carbonPrice} min={10} max={200} step={5} unit="/ton" prefix="$" onChange={setCarbonPrice} format={formatNumber} />
                    <SliderInput label="Fines Avoided" value={finesAvoided} min={0} max={250000} step={10000} unit="" prefix="$" onChange={setFinesAvoided} format={formatNumber} />
                </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-8 space-y-8">
                {/* KPI Banner */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={PieChart} label="Total Annual Value" value={formatCurrency(Math.round(totalAnnualValue))} colorClass="text-cyan-400" />
                    <StatCard icon={GanttChartSquare} label="Payback Period" value={paybackPeriod > 0 ? `${paybackPeriod.toFixed(1)} Mo` : 'Immediate'} colorClass="text-purple-400" />
                    <StatCard icon={TrendingUp} label="5-Year IRR" value={`${irr.toFixed(1)}%`} colorClass="text-green-400" />
                    <StatCard icon={Leaf} label="Carbon Removed" value={formatNumber(Math.round(co2Reduction))} subtext="Tons per Year" colorClass="text-emerald-400" />
                </div>

                {/* Waterfall Chart */}
                <div className="bg-[#0f172a]/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6">Annual Financial Waterfall</h3>
                    <div className="h-[350px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={waterfallData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip prefix="$" />} />
                                <Bar dataKey="range">
                                    {waterfallData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} radius={[4, 4, 4, 4] as any} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profit Projection */}
                <div className="bg-[#0f172a]/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6">5-Year Cumulative Cash Flow</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={profitProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip prefix="$" />} />
                                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Breakeven", fill: "#ef4444", fontSize: 10 }} />
                                <Line type="monotone" dataKey="profit" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, fill: '#06b6d4', strokeWidth: 0}} activeDot={{r: 6, strokeWidth: 0}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <PriceAssistantModal 
                isOpen={isPriceModalOpen}
                onClose={() => setIsPriceModalOpen(false)}
                onApplyPrice={setPrice}
            />
        </div>
    );
};


const RoiCalculatorPage: React.FC = () => {
    const [mode, setMode] = useState<'simplified' | 'advanced'>('simplified');

    const pageVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.6 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <section className="min-h-screen pt-32 pb-24 bg-[#000212]">
            <div className="container mx-auto px-4">
                
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Precision Modeling</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                            ROI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Engine</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Configure operational parameters to model exact financial outcomes. Switch between a quick estimate and a comprehensive financial analysis.
                        </p>
                    </motion.div>
                </div>

                {/* Mode Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white/5 p-1.5 rounded-full border border-white/10 relative flex">
                         {/* Sliding Background */}
                        <motion.div 
                            className="absolute top-1.5 bottom-1.5 bg-cyan-600 rounded-full shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                            initial={false}
                            animate={{ 
                                left: mode === 'simplified' ? '6px' : '50%', 
                                width: 'calc(50% - 9px)',
                                x: mode === 'advanced' ? '3px' : '0'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        
                        <button 
                            onClick={() => setMode('simplified')}
                            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${mode === 'simplified' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Quick Estimate
                        </button>
                        <button 
                            onClick={() => setMode('advanced')}
                            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${mode === 'advanced' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Deep Dive Model
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {mode === 'simplified' ? <SimplifiedCalculator /> : <AdvancedCalculator />}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
};

export default RoiCalculatorPage;
