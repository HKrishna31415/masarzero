
import React from 'react';
import Counter from './Counter';
import { Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
}

const footerLinks: Record<string, { title: string; path: string; locked?: boolean; }[]> = {
  Solutions: [
    { title: 'Products', path: '/products' },
    { title: 'Technology', path: '/technology' },
    { title: 'Cycle System', path: '/cycle-system' },
    { title: 'Digital Twin', path: '/digital-twin' },
    { title: 'SCADA Platform', path: '/scada' },
  ],
  Impact: [
    { title: 'Environmental', path: '/environmental' },
    { title: 'Financial', path: '/financial' },
    { title: 'ROI Calculator', path: '/roi-calculator' },
    { title: 'Global', path: '/global' },
    { title: 'Data & Performance', path: '/data' },
  ],
  Resources: [
    { title: 'Gallery', path: '/gallery' },
    { title: 'Knowledge Base', path: '/knowledge' },
    { title: 'Technical Library', path: '/library' },
    { title: 'Installation Guide', path: '/installation-guide' },
    { title: 'Maintenance Manual', path: '/maintenance-guide' },
    { title: 'Validation Protocol', path: '/vru-testing' },
    { title: 'Equipment Acceptance Test', path: '/equipment-acceptance-test' },
    { title: 'Support & Service', path: '/support' },
  ],
  Company: [
    { title: 'Client Pipeline', path: '/pipeline', locked: true },
    { title: 'ESG Hub', path: '/esg' },
    { title: 'About Us', path: '/about' },
    { title: 'Investor Relations', path: '/investor' },
    { title: 'Newsroom', path: '/newsroom' },
    { title: 'Legal & Compliance', path: '/legal' },
    { title: 'Contact Us', path: '/contact' },
  ],
};

const Footer: React.FC<FooterProps> = () => {
    const navigate = useNavigate();

    return (
        <footer className="relative overflow-hidden">
            {/* Counter Section */}
            <div className="bg-[#0d1117] py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-cyan-400 mb-4">Total liters of fuel recovered for clients</h2>
                    <Counter />
                </div>
            </div>

            {/* Links Section */}
            <div className="bg-[#000212] py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {/* MasarZero Info */}
                        <div className="col-span-2 md:col-span-1">
                            <h3 
                                className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 uppercase cursor-pointer mb-2"
                                onClick={() => navigate('/')}
                            >
                                MasarZero
                            </h3>
                            <p className="text-gray-400 text-sm">Intelligent Recovery. Tangible Returns.</p>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="font-bold text-white mb-4">{category}</h4>
                                <ul className="space-y-3">
                                    {links.map(link => (
                                        <li key={link.path}>
                                            <Link 
                                                to={link.path}
                                                className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
                                            >
                                                {link.title}
                                                {link.locked && <Lock size={12} className="text-gray-500" />}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                        <p>&copy; {new
                        Date().getFullYear()} MasarZero Technologies. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
