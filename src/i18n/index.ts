import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 번역 파일 import
import koCommon from './locales/ko/common.json';
import koPages from './locales/ko/pages.json';
import koQuestions from './locales/ko/questions.json';
import koCategories from './locales/ko/categories.json';
import koJobs from './locales/ko/jobs.json';

import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';
import enQuestions from './locales/en/questions.json';
import enCategories from './locales/en/categories.json';
import enJobs from './locales/en/jobs.json';

const resources = {
  ko: {
    common: koCommon,
    pages: koPages,
    questions: koQuestions,
    categories: koCategories,
    jobs: koJobs,
  },
  en: {
    common: enCommon,
    pages: enPages,
    questions: enQuestions,
    categories: enCategories,
    jobs: enJobs,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    defaultNS: 'common',
    ns: ['common', 'pages', 'questions', 'categories', 'jobs'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
