import i18next, { ReadCallback } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string, callback: ReadCallback) => {
    import(`/public/locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources);
      })
      .catch((error) => {
        callback(error, null);
      })
  }))
  .init({
    supportedLngs: ['en', 'ja'],
    fallbackLng: 'en',
    ns: ['common'],
    debug: true
  });

export default i18next;