
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const advancedFeatures = [
    { text: '250x Return on Energy', description: 'Our system is incredibly efficient, generating 250 times the energy it consumes.' },
    { text: '5x Better Than Competitors', description: 'Outperforms the nearest competitor by a factor of five, maximizing your reclaimed fuel.' },
    { text: '99.9% Recovery Rate', description: 'Capture virtually all valuable vapor, ensuring minimal waste and maximum earnings.' },
];

const competitorLimitations = [
    { text: 'Up to 50x Return on Energy', description: 'Standard systems offer significantly lower energy efficiency, impacting your bottom line.' },
    { text: 'Standard Performance', description: 'Limited by older technology, leaving valuable fuel vapors and potential revenue behind.' },
    { text: '~85-95% Recovery Rate', description: 'A noticeable percentage of vapor is lost, directly translating to lost income.' },
];

const ComparisonSection: React.FC = () => {
    // Fix: Using variants for animations to resolve potential TypeScript typing issues.
    const sectionVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <motion.div 
            className="text-center mb-24"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
        >
            <span className="text-sm font-bold text-cyan-400 tracking-widest uppercase">Unmatched Performance</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Why We're The Clear Choice
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                Our technology doesn't just compete. It defines a new standard for efficiency and profitability.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                {/* Advanced System Card */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col">
                    <h2 className="text-2xl font-bold">Our Advanced System</h2>
                    <p className="text-gray-400 mt-1 mb-6">The pinnacle of vapor recovery technology.</p>
                    <div className="space-y-4 flex-grow">
                        {advancedFeatures.map(feature => (
                            <div key={feature.text} className="flex items-start">
                                <CheckCircle2 className="text-green-400 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">{feature.text}</h3>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <p className="text-xs text-gray-500 mt-6">*Performance metrics for our new Ascent A-200 models. Not applicable to GEVLR models.</p>
                    <button className="w-full mt-4 relative aurora-border font-bold py-3 rounded-lg text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300">
                        Learn More
                    </button>
                </div>

                {/* Standard Competitors Card */}
                <div className="bg-slate-800/20 p-8 rounded-2xl border border-slate-700 flex flex-col">
                     <h2 className="text-2xl font-bold text-gray-300">Standard Competitors</h2>
                    <p className="text-gray-400 mt-1 mb-6">The conventional, less effective alternative.</p>
                    <div className="space-y-4 flex-grow">
                        {competitorLimitations.map(item => (
                             <div key={item.text} className="flex items-start">
                                <XCircle className="text-red-400 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-300">{item.text}</h3>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 bg-slate-700/50 text-gray-300 font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">
                        The Old Way
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default ComparisonSection;
