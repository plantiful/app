import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en";
import cs from "./cs";
import al from "./al";
import sk from "./sk";

const translations = {
  en,
  cs,
  al,
  sk,
};

const resources = Object.keys(translations).reduce((acc, lang) => {
  acc[lang] = {
    translation: translations[lang],
  };
  return acc;
}, {} as Record<string, { translation: Record<string, string> }>);

const getDefaultLanguage = () => {
  const defaultLocale = Localization.locale.split("-")[0];
  if (resources.hasOwnProperty(defaultLocale)) {
    return defaultLocale;
  }
  return "en";
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: getDefaultLanguage(),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
