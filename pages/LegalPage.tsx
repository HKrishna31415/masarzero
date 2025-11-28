
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    Gavel,
    Shield,
    Atom,
    Cookie,
    CheckCircle2,
    FlaskConical,
    Leaf,
    Car,
    Globe,
    Euro,
    BarChart,
    Award,
    ShieldCheck,
    Lock,
    ChevronDown,
} from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';

// Section Data
const legalSections = [
    {
        id: 'terms',
        icon: Gavel,
        title: 'Terms of Service',
        summary: 'Governs your access to our proprietary technology and services.',
        content: `By accessing or using the services of MasarZero ("MZ"), you agree to be bound by these Terms of Service. These terms govern your access to and use of our proprietary technology, hardware, software, and associated documentation.`,
        details: [
            {
                subtitle: '1. Use of Service',
                text: 'You are granted a non-exclusive, non-transferable, revocable license to use our services strictly in accordance with these terms and for the purpose of environmental compliance and vapor recovery management.'
            },
            {
                subtitle: '2. Intellectual Property',
                text: 'All technology, patents, trademarks, and content are the exclusive property of MZ. Unauthorized reproduction, distribution, or creation of derivative works is strictly prohibited.'
            }
        ],
        buttonText: 'Read Full Terms'
    },
    {
        id: 'privacy',
        icon: Shield,
        title: 'Privacy Policy',
        summary: 'How we collect, encrypt, and safeguard operational data.',
        content: `MZ is committed to protecting your data. This policy outlines how we collect, use, and safeguard the information generated and processed by our systems.`,
        details: [
            {
                subtitle: 'Data Collection & Usage',
                points: [
                    'Operational Data: We collect real-time data from our vapor recovery units (VRUs) for performance monitoring, predictive maintenance, and compliance reporting. This data is anonymized wherever possible.',
                    'Client Information: We collect business contact information for account management, billing, and support services.',
                    'Data Security: All data is encrypted in transit and at rest using industry-standard protocols. Access is strictly controlled and monitored.'
                ]
            }
        ],
        buttonText: 'Read Full Policy'
    },
    {
        id: 'compliance',
        icon: Atom,
        title: 'Regulatory Compliance',
        summary: 'Adherence to EPA, CARB, ATEX, and global environmental standards.',
        content: `Our technology is designed to meet and exceed stringent environmental regulations. We ensure our systems are compliant with local, national, and international standards.`,
        details: [
            {
                points: [
                    'EPA & Clean Air Act: Our systems are engineered for compliance with the U.S. Environmental Protection Agency (EPA) regulations, including the Clean Air Act.',
                    'Global Standards: We monitor and adapt to evolving international environmental standards to ensure global operational compliance for our partners.',
                    'Automated Reporting: Our software provides automated, audit-ready reports to simplify your compliance documentation and submission processes.'
                ]
            }
        ],
        buttonText: 'View Standards'
    },
    {
        id: 'cookies',
        icon: Cookie,
        title: 'Cookie Policy',
        summary: 'Transparent usage of essential and analytical cookies.',
        content: `Our website uses minimal cookies to enhance user experience and analyze site traffic. We believe in a transparent and non-intrusive browsing experience.`,
        details: [
            {
                subtitle: 'Types of Cookies Used',
                points: [
                    'Essential Cookies: Necessary for the website to function, such as session management and security.',
                    'Analytics Cookies: We use privacy-respecting analytics to understand how visitors interact with our site, helping us to improve our services. We do not use third-party tracking cookies for advertising.'
                ]
            }
        ],
        buttonText: 'Manage Preferences'
    },
];

// Certifications Data
const certifications = [
  { icon: Award, name: 'ISO 9001:2015', status: 'Active', id: 'ISO-9001' },
  { icon: BarChart, name: 'ATEX Directive', status: 'Active', id: 'ATEX' },
  { icon: CheckCircle2, name: 'SGS Certified', status: 'Active', id: 'SGS' },
  { icon: FlaskConical, name: 'API Spec Q1', status: 'Pending', id: 'API' },
  { icon: Leaf, name: 'EPA Compliance', status: 'Pending', id: 'EPA' },
  { icon: Car, name: 'CARB Compliant', status: 'Pending', id: 'CARB' },
  { icon: Shield, name: 'UL Listed', status: 'Pending', id: 'UL' },
  { icon: Globe, name: 'Intertek ETL', status: 'Pending', id: 'ETL' },
  { icon: Euro, name: 'CE Marking', status: 'Pending', id: 'CE' },
];

const LegalPage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const headerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const cardVariants: Variants = {
        initial: { opacity: 0, scale: 0.95 },
        inView: { opacity: 1, scale: 1 },
        hover: { y: -5, transition: { duration: 0.2 } }
    };
    
    const certVariants = {
        initial: { opacity: 0, y: 20 },
        inView: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-32 min-h-screen bg-[#000212]">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <ShieldCheck size={24} className="text-cyan-400" />
                        <span className="text-sm font-mono font-bold text-cyan-500 uppercase tracking-widest">Compliance Mainframe</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Center</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
                        Transparency and security are the bedrock of our operations. Access our regulatory frameworks, terms of use, and certification portfolio.
                    </p>
                </motion.div>
                
                {/* Main Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    {legalSections.map((section, index) => {
                        const Icon = section.icon;
                        const isExpanded = expandedSection === section.id;
                        
                        return (
                            <VectorBorderCard key={section.id} delay={index * 0.1} className="h-full">
                                <motion.div 
                                    className="h-full flex flex-col"
                                    variants={cardVariants}
                                    initial="initial"
                                    whileInView="inView"
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan-400">
                                            <Icon size={28} />
                                        </div>
                                        {isExpanded ? (
                                             <button 
                                                onClick={() => setExpandedSection(null)}
                                                className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors"
                                             >
                                                 Close
                                             </button>
                                        ) : (
                                            <Lock size={16} className="text-gray-600" />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{section.summary}</p>
                                    
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-black/20 rounded-lg p-4 mb-6 border border-white/5 text-sm text-gray-300 space-y-4">
                                                    <p>{section.content}</p>
                                                     {section.details && section.details.map((detail, dIndex) => (
                                                        <div key={dIndex}>
                                                            {detail.subtitle && <h4 className="font-bold text-white mb-1 text-xs uppercase">{detail.subtitle}</h4>}
                                                            {detail.points ? (
                                                                <ul className="list-disc list-inside space-y-1 text-gray-400 pl-2">
                                                                    {detail.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-gray-400">{detail.text}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <button 
                                            onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                            className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
                                        >
                                            {isExpanded ? 'Collapse Details' : section.buttonText}
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
                                        </button>
                                        <div className="text-[10px] font-mono text-gray-600 uppercase">
                                            DOC_ID: {section.id.toUpperCase()}_v2.4
                                        </div>
                                    </div>
                                </motion.div>
                            </VectorBorderCard>
                        );
                    })}
                </div>

                {/* Certifications Wall */}
                <motion.div 
                    className="mb-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Wall of Trust</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We adhere to the highest global standards for quality, safety, and environmental management.
                        </p>
                    </div>

                    <div className="glass-card rounded-2xl border border-white/10 p-8 bg-gradient-to-b from-slate-900/50 to-[#050714]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {certifications.map((cert, index) => {
                                const Icon = cert.icon;
                                const isActive = cert.status === 'Active';
                                return (
                                    <motion.div
                                        key={cert.id}
                                        variants={certVariants}
                                        initial="initial"
                                        whileInView="inView"
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className={`relative group p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square ${isActive ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10' : 'bg-white/0 border-transparent opacity-50 grayscale hover:grayscale-0 hover:opacity-80'}`}
                                    >
                                        {isActive && (
                                            <div className="absolute top-3 right-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                            </div>
                                        )}
                                        <Icon className={`w-10 h-10 mb-4 transition-colors ${isActive ? 'text-cyan-400 group-hover:text-white' : 'text-gray-500'}`} />
                                        <h4 className="font-bold text-sm text-white mb-1">{cert.name}</h4>
                                        <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-green-400' : 'text-yellow-500'}`}>
                                            {cert.status}
                                        </span>
                                        {isActive && (
                                            <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/30 rounded-xl transition-colors duration-500 pointer-events-none" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default LegalPage;
