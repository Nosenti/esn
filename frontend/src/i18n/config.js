import i18n from "i18next";                      
import HttpApi from "i18next-http-backend"
import { initReactI18next } from "react-i18next";
import enTranslation from '../../public/locales/en/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';

i18n
    .use(HttpApi)
  .use(initReactI18next)
  .init({                   
    // lng: "en", 
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        
        translation:enTranslation 
      },
      fr: {
        translation: frTranslation
      },
    },
  });

export default i18n;