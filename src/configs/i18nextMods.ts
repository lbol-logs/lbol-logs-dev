import i18next, { ReadCallback } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import { languages, modsNamespaces } from 'configs/globals';

const lngs = Object.keys(languages);
const i18nextModInstance = i18next.createInstance();
i18nextModInstance
  .use(LanguageDetector)
  // .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string, callback: ReadCallback) => {
    import(`/public/mods/docs/locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources);
      })
      .catch((error) => {
        callback(error, null);
      });
  }))
  .init({
    // debug: true,
    supportedLngs: lngs,
    fallbackLng: 'en',
    nsSeparator: false,
    interpolation: {
      escapeValue: false
    },
    ns: modsNamespaces
  });

export default i18nextModInstance;

function useModTranslation() {
  const { t: tMod } = useTranslation(undefined, { i18n: i18nextModInstance });
  return { tMod };
}

export {
  useModTranslation
};