import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en';
import cs from './cs';

const resources = {
  en: {
    translation: en,
  },
  cs: {
    translation: cs,
  },
};

const getDefaultLanguage = () => {
  const defaultLocale = Localization.locale.split('-')[0];
  if (resources.hasOwnProperty(defaultLocale)) {
    return defaultLocale;
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: getDefaultLanguage(),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
