import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation, type SupportedLanguage } from '../context/TranslationContext';

interface LanguageSwitcherProps {
  mobile?: boolean;
  onChange?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false, onChange }) => {
  const { language, setLanguage, languageOptions, t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as SupportedLanguage);
    onChange?.();
  };

  return (
    <label
      className={`relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-gray-200 ${
        mobile ? 'w-full px-4 py-3 rounded-xl' : 'px-3 py-2'
      }`}
    >
      <Languages size={mobile ? 18 : 16} className="text-emerald-300 shrink-0" />
      <select
        value={language}
        onChange={handleChange}
        aria-label={t('header.actions.languageLabel')}
        className="w-full bg-transparent text-sm font-medium outline-none appearance-none pr-6 cursor-pointer"
      >
        {languageOptions.map(option => (
          <option key={option.code} value={option.code} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-xs text-gray-400">▾</span>
    </label>
  );
};

export default LanguageSwitcher;
