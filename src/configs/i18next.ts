import i18next, { ReadCallback } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { assetsDir, fallbackLanguage, languages, modsDirDev, modsNamespaces, namespaces } from 'configs/globals';
import ModsNs from 'utils/classes/ModsNs';

const lngs = Object.keys(languages);
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string, callback: ReadCallback) => {
    const dir = ModsNs.is(namespace) ? modsDirDev : assetsDir;
    const ns = ModsNs.remove(namespace);

    import(`/public/${dir}/locales/${language}/${ns}.json`)
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
    fallbackLng: fallbackLanguage,
    nsSeparator: false,
    interpolation: {
      escapeValue: false
    },
    ns: namespaces.concat(ModsNs.adds(modsNamespaces))
  });

export default i18next;