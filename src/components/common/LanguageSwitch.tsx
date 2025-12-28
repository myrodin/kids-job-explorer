import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];
  const otherLang = languages.find((l) => l.code !== i18n.language) || languages[1];

  const toggleLanguage = () => {
    i18n.changeLanguage(otherLang.code);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-gray-200 text-sm font-medium text-gray-700 transition-all hover:shadow-sm"
      title={`Switch to ${otherLang.label}`}
    >
      <span className="text-base">{currentLang.flag}</span>
      <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
    </button>
  );
}

export default LanguageSwitch;
