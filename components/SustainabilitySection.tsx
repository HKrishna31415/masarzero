import React from 'react';
import { useTranslation } from '../context/TranslationContext';

const SustainabilitySection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold">{t('home.sustainability.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            {t('home.sustainability.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
