
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../context/TranslationContext';

interface HeaderProps {
}

interface NavItem {
  title: string;
  path?: string;
  children?: Omit<NavItem, 'children'>[];
  locked?: boolean;
}

const useNavItems = (): NavItem[] => {
  const { t } = useTranslation();

  return [
    { title: t('header.nav.home'), path: '/' },
    {
      title: t('header.nav.solutions'),
      children: [
        { title: t('header.nav.products'), path: '/products' },
        { title: t('header.nav.technology'), path: '/technology' },
        { title: t('header.nav.cycleSystem'), path: '/cycle-system' },
        { title: t('header.nav.digitalTwin'), path: '/digital-twin' },
        { title: t('header.nav.scadaPlatform'), path: '/scada' },
      ],
    },
    {
      title: t('header.nav.impact'),
      children: [
        { title: t('header.nav.environmental'), path: '/environmental' },
        { title: t('header.nav.financial'), path: '/financial' },
        { title: t('header.nav.global'), path: '/global' },
        { title: t('header.nav.gasolineQuality'), path: '/data' },
      ],
    },
    {
      title: t('header.nav.resources'),
      children: [
        { title: t('header.nav.gallery'), path: '/gallery' },
        { title: t('header.nav.knowledgeBase'), path: '/knowledge' },
        { title: t('header.nav.technicalLibrary'), path: '/library' },
        { title: t('header.nav.installationGuide'), path: '/installation-guide' },
        { title: t('header.nav.maintenanceManual'), path: '/maintenance-guide' },
        { title: t('header.nav.validationProtocol'), path: '/vru-testing' },
        { title: t('header.nav.equipmentAcceptanceTest'), path: '/equipment-acceptance-test' },
        { title: t('header.nav.supportService'), path: '/support' },
      ],
    },
    {
      title: t('header.nav.company'),
      children: [
        { title: t('header.nav.esgHub'), path: '/esg' },
        { title: t('header.nav.aboutUs'), path: '/about' },
        { title: t('header.nav.newsroom'), path: '/newsroom' },
        { title: t('header.nav.legalCompliance'), path: '/legal' },
        { title: t('header.nav.contactUs'), path: '/contact' },
        { title: t('header.nav.clientPipeline'), path: '/pipeline', locked: true },
        { title: t('header.nav.investorRelations'), path: '/investor', locked: true },
      ],
    },
  ];
};

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
                ? 'text-white bg-gradient-to-r from-emerald-500/10 to-teal-500/10'
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
                                    ? 'text-white bg-gradient-to-r from-emerald-500/20 to-teal-500/20'
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
                className={`block w-full text-left py-3 text-lg font-medium border-b border-white/5 ${isActive ? 'text-emerald-400' : 'text-white'}`}
            >
                {item.title}
            </Link>
        );
    }

    return (
        <div className="border-b border-white/5">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between py-3 text-lg font-medium ${isParentActive ? 'text-emerald-400' : 'text-white'}`}
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
                                    ? 'text-emerald-300'
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
  const { t } = useTranslation();
  const navItems = useNavItems();

  const handleMobileNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[10000] p-4">
      <div className="container mx-auto flex justify-between items-center glass-card rounded-full p-2 px-6 relative bg-[#000212]/80 backdrop-blur-xl">
        <h1 
          className="cursor-pointer flex items-center"
          onClick={() => handleMobileNavigate('/')}
        >
          <img src="/masarzerologo.png" alt="MasarZero" className="h-12 md:h-14 w-auto" />
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
                    ? 'text-white bg-gradient-to-r from-emerald-500/10 to-teal-500/10' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
                href="https://calc.masarzero.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm px-5 py-2 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-all duration-300"
            >
              {t('header.actions.calculator')}
            </a>
            <a
                href="https://app.masarzero.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aurora-border font-semibold text-sm px-6 py-2 rounded-full hover:bg-emerald-500/20 transition-all duration-300 flex items-center gap-2"
            >
              {t('header.actions.clientPlatform')}
              <Lock size={12} />
            </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
            <div className="max-w-[150px]">
              <LanguageSwitcher />
            </div>
            <button 
                className="p-2 text-white hover:text-emerald-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={t('header.actions.toggleMenu')}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
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
                    <LanguageSwitcher mobile onChange={() => setIsMobileMenuOpen(false)} />
                    {navItems.map(item => (
                        <MobileMenuItem 
                            key={item.title} 
                            item={item} 
                        />
                    ))}
                     <a
                        href="https://calc.masarzero.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-6 w-full font-semibold text-sm px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {t('header.actions.calculator')}
                    </a>
                     <a
                        href="https://app.masarzero.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-3 w-full relative aurora-border font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {t('header.actions.clientPlatform')}
                        <Lock size={12} />
                    </a>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
