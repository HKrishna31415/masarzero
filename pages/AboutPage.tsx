
import React from 'react';
import { motion, Variants } from 'framer-motion';
import PledgeSection from '../components/PledgeSection';
import ThreeJSBackground from '../components/ThreeJSBackground';
import TimelineSection from '../components/TimelineSection';
import { BrainCircuit, Code, Cpu, Fingerprint, Globe, ShieldCheck, Users, Zap } from 'lucide-react';
import VectorBorderCard from '../components/VectorBorderCard';

const teamMembers = [
    { name: 'Dr. A. Latif Alkhaja', role: 'Managing Director', icon: Globe, bio: '20+ years in global energy infrastructure.' },
    { name: 'Mr. Yalçın Aliyev', role: 'Senior Partner', icon: Zap, bio: 'Pioneer in sustainable industrial finance.' },
    { name: 'Yang Qishan', role: 'Chief Technology Officer', icon: Cpu, bio: 'Lead architect of the MZ-9000 series.' },
    { name: 'Sultan Alkhaja', role: 'Head of Operations', icon: BrainCircuit, bio: 'Expert in large-scale deployment logistics.' },
    { name: 'Hari Krishna', role: 'Lead Engineer', icon: Code, bio: 'Specialist in SCADA and AI integration.' },
    { name: 'Ann Balushi', role: 'Director of Human Resources', icon: Users, bio: 'Driving global talent acquisition and culture.' },
];

const coreValues = [
    { title: 'Audacity', icon: Zap, text: 'We tackle the hardest problems others ignore.' },
    { title: 'Precision', icon: Fingerprint, text: 'Exact engineering for measurable results.' },
    { title: 'Symbiosis', icon: ShieldCheck, text: 'Profit and planet thriving together.' },
];

const AboutPage: React.FC = () => {
  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative py-32 min-h-screen">
      <ThreeJSBackground />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
        >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">About MasarZero</h1>
            <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg">
                MasarZero was founded by a team of veteran energy sector engineers and data scientists with a singular mission: to redefine industrial efficiency through intelligent technology. We believe that economic growth and environmental stewardship are not mutually exclusive. Our innovations are a testament to this conviction, empowering our clients to achieve tangible returns while building a sustainable legacy.
            </p>
            <motion.button 
                className="relative aurora-border font-semibold text-md px-8 py-3 rounded-full mt-10"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                Join Our Mission
            </motion.button>
        </motion.div>
      </div>

      <PledgeSection />
      
      {/* New Leadership Section */}
      <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">The Architects</h2>
              <p className="text-gray-400">Visionaries building the infrastructure of tomorrow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, i) => (
                  <VectorBorderCard key={member.name} delay={i * 0.1} className="bg-[#0A0D22]">
                      <div className="p-6 flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                              <member.icon className="text-cyan-400 w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-sm text-cyan-500 font-mono uppercase tracking-wider mb-3">{member.role}</p>
                          <p className="text-sm text-gray-400">{member.bio}</p>
                      </div>
                  </VectorBorderCard>
              ))}
          </div>
      </div>

      {/* New Corporate DNA Section */}
      <div className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-900/5 skew-y-3 transform origin-bottom-left" />
          <div className="container mx-auto px-4 relative z-10">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Corporate DNA</h2>
                  <p className="text-gray-400">The code that governs our operations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {coreValues.map((value, i) => (
                      <motion.div 
                        key={value.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 text-center hover:border-cyan-500/50 transition-colors group"
                      >
                          <value.icon className="w-12 h-12 mx-auto mb-6 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                          <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                          <p className="text-gray-400">{value.text}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>
      
      <TimelineSection />

      {/* Brand Logo Footer */}
      <motion.div 
        className="py-32 flex justify-center items-center relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
         <div className="relative p-12 rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm flex flex-col items-center">
             {/* Glow behind logo */}
             <div className="absolute inset-0 bg-cyan-500/5 blur-[80px] rounded-full"></div>
             
             <div className="text-center">
                 <h2 className="text-4xl font-bold tracking-widest text-white uppercase">Masar<span className="text-cyan-400">Zero</span></h2>
                 <p className="text-sm text-gray-500 tracking-[0.5em] mt-2 uppercase">Intelligent Recovery</p>
             </div>
         </div>
      </motion.div>
      
    </section>
  );
};

export default AboutPage;
