import { useMemo } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { acceptanceTestData } from './acceptanceTestData';
import { acceptanceTestDataZhCN } from './acceptanceTestData.zh-CN';
import { acceptanceTestDataAr } from './acceptanceTestData.ar';

export function useAcceptanceTestData() {
  const { language } = useTranslation();
  return useMemo(() => {
    if (language === 'zh-CN') return acceptanceTestDataZhCN;
    if (language === 'ar') return acceptanceTestDataAr;
    return acceptanceTestData;
  }, [language]);
}
