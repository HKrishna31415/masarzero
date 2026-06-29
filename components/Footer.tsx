
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const footerLinks: Record<string, { title: string; path: string; locked?: boolean; }[]> = {
      [t('footer.categories.solutions')]: [
        { title: t('header.nav.products'), path: '/products' },
        { title: t('header.nav.technology'), path: '/technology' },
        { title: t('header.nav.cycleSystem'), path: '/cycle-system' },
        { title: t('header.nav.digitalTwin'), path: '/digital-twin' },
        { title: t('header.nav.scadaPlatform'), path: '/scada' },
      ],
      [t('footer.categories.impact')]: [
        { title: t('header.nav.environmental'), path: '/environmental' },
        { title: t('header.nav.financial'), path: '/financial' },
        { title: t('header.nav.global'), path: '/global' },
        { title: t('footer.dataPerformance'), path: '/data' },
      ],
      [t('footer.categories.resources')]: [
        { title: t('header.nav.gallery'), path: '/gallery' },
        { title: t('header.nav.knowledgeBase'), path: '/knowledge' },
        { title: t('header.nav.installationGuide'), path: '/installation-guide' },
        { title: t('header.nav.maintenanceManual'), path: '/maintenance-guide' },
        { title: t('header.nav.validationProtocol'), path: '/vru-testing' },
        { title: t('header.nav.equipmentAcceptanceTest'), path: '/equipment-acceptance-test' },
        { title: t('header.nav.supportService'), path: '/support' },
      ],
    };

    return (
        <footer className="relative overflow-hidden">
            <div className="bg-[#060a14] border-y border-white/5">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-wrap items-center gap-3 justify-center">
                        {['SGS Tested', 'Control Union Reviewed', 'ATEX Ready', 'Field Commissioned'].map(item => (
                            <div
                                key={item}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] text-gray-300"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Links Section */}
            <div className="bg-[#000212] py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* MasarZero Info */}
                        <div className="col-span-2 md:col-span-1">
                            <img 
                                src="/masarzerologo.png" 
                                alt="MasarZero" 
                                className="h-16 md:h-24 w-auto mb-4 cursor-pointer" 
                                onClick={() => navigate('/')}
                            />
                            <p className="text-gray-400 text-sm">{t('footer.tagline')}</p>
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
                                                className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-10 md:mt-20 pt-6 md:pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
