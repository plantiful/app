import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

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
  const locales = getLocales();
  if (Array.isArray(locales)) {
    const defaultLocale = locales[0].languageCode;
    if (resources.hasOwnProperty(defaultLocale)) {
      return defaultLocale;
    }
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLanguage(),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
