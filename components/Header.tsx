
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
}

interface NavItem {
  title: string;
  path?: string;
  children?: Omit<NavItem, 'children'>[];
  locked?: boolean;
}

const navItems: NavItem[] = [
  { title: 'Home', path: '/' },
  {
    title: 'Solutions',
    children: [
      { title: 'Products', path: '/products' },
      { title: 'Technology', path: '/technology' },
      { title: 'Cycle System', path: '/cycle-system' },
      { title: 'Digital Twin', path: '/digital-twin' },
      { title: 'SCADA Platform', path: '/scada' },
    ],
  },
  {
    title: 'Impact',
    children: [
      { title: 'Environmental', path: '/environmental' },
      { title: 'Financial', path: '/financial' },
      { title: 'ROI Calculator', path: '/roi-calculator' },
      { title: 'Global', path: '/global' },
      { title: 'Gasoline Quality', path: '/data' },
    ],
  },
    {
    title: 'Resources',
    children: [
      { title: 'Gallery', path: '/gallery' },
      { title: 'Knowledge Base', path: '/knowledge' },
      { title: 'Technical Library', path: '/library' },
      { title: 'Installation Guide', path: '/installation-guide' },
      { title: 'Maintenance Manual', path: '/maintenance-guide' },
      { title: 'Validation Protocol', path: '/vru-testing' },
      { title: 'Equipment Acceptance Test', path: '/equipment-acceptance-test' },
      { title: 'Support & Service', path: '/support' },
    ],
  },
  {
    title: 'Company',
    children: [
        { title: 'ESG Hub', path: '/esg' },
        { title: 'About Us', path: '/about' },
        { title: 'Newsroom', path: '/newsroom' },
        { title: 'Legal & Compliance', path: '/legal' },
        { title: 'Contact Us', path: '/contact' },
        { title: 'Client Pipeline', path: '/pipeline', locked: true },
        { title: 'Investor Relations', path: '/investor', locked: true },
    ]
  },
];

const DropdownMenu: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isParentActive = item.children?.some(child => child.path === location.pathname);

    const menuVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div 
            className="relative hidden md:block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className={`flex items-center gap-1 transition-colors px-3 py-1 rounded-full text-sm ${
                isParentActive
                ? 'text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                : 'text-gray-300 hover:text-white'
            }`}>
                {item.title}
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-full mt-2 w-56 rounded-lg glass-card p-2"
                    >
                        {item.children?.map(child => (
                            <Link
                                key={child.path}
                                to={child.path!}
                                onClick={() => setIsOpen(false)}
                                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                                    location.pathname === child.path 
                                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                                    : 'text-gray-300 hover:bg-white/5'
                                }`}
                            >
                                <span>{child.title}</span>
                                {child.locked && <Lock size={12} className="text-gray-500" />}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isParentActive = item.children?.some(child => child.path === location.pathname);
    const isActive = item.path === location.pathname;

    if (!hasChildren) {
        return (
            <Link 
                to={item.path!}
                className={`block w-full text-left py-3 text-lg font-medium border-b border-white/5 ${isActive ? 'text-cyan-400' : 'text-white'}`}
            >
                {item.title}
            </Link>
        );
    }

    return (
        <div className="border-b border-white/5">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between py-3 text-lg font-medium ${isParentActive ? 'text-cyan-400' : 'text-white'}`}
            >
                {item.title}
                <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 bg-white/5 rounded-lg mb-2"
                    >
                        {item.children?.map(child => (
                            <Link
                                key={child.path}
                                to={child.path!}
                                className={`block w-full text-left py-3 text-sm flex items-center justify-between ${
                                    location.pathname === child.path 
                                    ? 'text-cyan-300'
                                    : 'text-gray-300'
                                }`}
                            >
                                <span>{child.title}</span>
                                {child.locked && <Lock size={12} className="text-gray-500" />}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMobileNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[10000] p-4">
      <div className="container mx-auto flex justify-between items-center glass-card rounded-full p-2 px-6 relative bg-[#000212]/80 backdrop-blur-xl">
        <h1 
          className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 uppercase cursor-pointer"
          onClick={() => handleMobileNavigate('/')}
        >
          MasarZero
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map(item =>
            item.children ? (
              <DropdownMenu key={item.title} item={item} />
            ) : (
              <Link 
                key={item.path}
                to={item.path!}
                className={`transition-colors cursor-pointer px-3 py-1 rounded-full text-sm ${
                  location.pathname === item.path
                    ? 'text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>
        
        <div className="hidden md:block">
            <Link 
                to="/pipeline"
                className="relative aurora-border font-semibold text-sm px-6 py-2 rounded-full hover:bg-blue-500/20 transition-all duration-300 flex items-center gap-2"
            >
              Client Platform
              <Lock size={12} />
            </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-white hover:text-cyan-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
        >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 md:hidden max-h-[80vh] overflow-y-auto bg-[#000212]/95 border border-white/20 shadow-2xl"
            >
                <div className="flex flex-col">
                    {navItems.map(item => (
                        <MobileMenuItem 
                            key={item.title} 
                            item={item} 
                        />
                    ))}
                     <Link 
                        to="/pipeline"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-6 w-full relative aurora-border font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Client Platform
                        <Lock size={12} />
                    </Link>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
