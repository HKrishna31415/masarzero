import { useTranslation } from '../context/TranslationContext';
import { en } from './en';
import { zhCN } from './zh-CN';
import { ar } from './ar';

export type { ResourceDict } from './en';

const dicts = { en, 'zh-CN': zhCN, ar };

/**
 * Returns the resource-page dictionary for the current language.
 * Falls back to English for any missing keys.
 *
 * Usage:
 *   const d = useDict();
 *   <h1>{d.maintenance.title}</h1>
 */
export function useDict() {
  const { language } = useTranslation();
  return dicts[language as keyof typeof dicts] ?? en;
}
