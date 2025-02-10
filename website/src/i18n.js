import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationES from "assets/locales/es/translation.json";
import translationEN from "assets/locales/en/translation.json";
import translationDE from "assets/locales/de/translation.json";
import translationFR from "assets/locales/fr/translation.json";
import translationPT from "assets/locales/pt/translation.json";

// Configure i18next
i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    fr: {
      translation: translationFR,
    },
    pt: {
      translation: translationPT,
    },
  },
  lng: "es", // default language
  fallbackLng: "en", // Backup language in case the translation is not found
  interpolation: {
    escapeValue: false, // React already takes care of security
  },
});

export default i18n;