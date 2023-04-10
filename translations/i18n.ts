// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import cs from "./cs";

const resources = {
  en: {
    translation: en,
  },
  cs: {
    translation: cs,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
