
import React, { useEffect } from 'react';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import TechnologyPage from './pages/TechnologyPage';
import AboutPage from './pages/AboutPage';
import DataPage from './pages/DataPage';
import EnvironmentalPage from './pages/EnvironmentalPage';
import FinancialPage from './pages/FinancialPage';
import GlobalPage from './pages/GlobalPage';
import ScadaPage from './pages/ScadaPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import LibraryPage from './pages/LibraryPage';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import InvestorPage from './pages/InvestorPage';
import NewsroomPage from './pages/NewsroomPage';
import ESGPage from './pages/ESGPage';
import { AnimatePresence, motion } from 'framer-motion';
import DigitalTwinPage from './pages/DigitalTwinPage';
import SupportPage from './pages/SupportPage';
import InstallationGuidePage from './pages/InstallationGuidePage';
import RoiCalculatorPage from './pages/RoiCalculatorPage';
import PipelinePage from './pages/PipelinePage';
import EquipmentAcceptanceTestPage from './pages/EquipmentAcceptanceTestPage';
import VruTestingPage from './pages/VruTestingPage';
import GalleryPage from './pages/GalleryPage';
import CycleSystemPage from './pages/CycleSystemPage';
import MaintenanceGuidePage from './pages/MaintenanceGuidePage';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const viewVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <>
      <CustomCursor />
      <div className="bg-[#000212] relative min-h-screen">
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/technology" element={<TechnologyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/environmental" element={<EnvironmentalPage />} />
                <Route path="/financial" element={<FinancialPage />} />
                <Route path="/global" element={<GlobalPage />} />
                <Route path="/scada" element={<ScadaPage />} />
                <Route path="/knowledge" element={<KnowledgeBasePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/investor" element={<InvestorPage />} />
                <Route path="/newsroom" element={<NewsroomPage />} />
                <Route path="/esg" element={<ESGPage />} />
                <Route path="/digital-twin" element={<DigitalTwinPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/equipment-acceptance-test" element={<EquipmentAcceptanceTestPage />} />
                <Route path="/installation-guide" element={<InstallationGuidePage />} />
                <Route path="/vru-testing" element={<VruTestingPage />} />
                <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
                <Route path="/pipeline" element={<PipelinePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/cycle-system" element={<CycleSystemPage />} />
                <Route path="/maintenance-guide" element={<MaintenanceGuidePage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
