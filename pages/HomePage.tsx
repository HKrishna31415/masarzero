
import React from 'react';
import HeroSection from '../components/HeroSection';
import SocialProofSection from '../components/SocialProofSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesSection from '../components/FeaturesSection';
import ProductShowcaseSection from '../components/ProductShowcaseSection';
import SustainabilitySection from '../components/SustainabilitySection';

interface HomePageProps {
}

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <>
            <HeroSection />
            <SocialProofSection />
            <HowItWorksSection />
            <FeaturesSection />
            <ProductShowcaseSection />
            <SustainabilitySection />
        </>
    );
};

export default HomePage;
