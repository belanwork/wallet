import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from './locales/en/common.json';
import commonRU from './locales/ru/common.json';

const resources: Resource = {
  en: {
    common: commonEN,
  },
  ru: {
    common: commonRU,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React уже экранирует значения
  },
  lng: 'ru', // можно сменить язык по умолчанию
  ns: ['common'],
  resources,
});

export default i18n;
