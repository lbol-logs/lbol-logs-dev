import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace, callback) => {
    import(`/public/locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources)
      })
      .catch((error) => {
        callback(error, null)
      })
  }))
  .init({
    supportedLngs: ['en', 'ja'],
    fallbackLng: 'ja',
    ns: ['common']
  });