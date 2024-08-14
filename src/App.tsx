import { Navigate, Route, Routes } from 'react-router-dom';
import Top from 'components/top';
import Log from 'components/log';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import CommonProvider from 'contexts/commonContext';
import { baseUrl, languages } from 'configs/globals';
import RemoveTrailingSlash from 'components/common/utils/removeTrailingSlash';
import ScrollToTop from 'components/common/utils/scrollToTop';

function App() {
  const { t } = useTranslation();
  const { lang } = languages[i18next.language];

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={lang} />
        <title>{t('title', { ns: 'common' })} - {t('subtitle', { ns: 'common' })}</title>
        <meta name="description" content={t('description', { ns: 'common' })} />
        <link rel="manifest" href={`${baseUrl}/locales/${i18next.language}/manifest.json`} />
        <meta name="apple-mobile-web-app-title" content={t('title', { ns: 'common' })} />
      </Helmet>

      <RemoveTrailingSlash />
      <CommonProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/">
            <Route index element={<Top />} />
              <Route path=":ver/">
                <Route index element={<Top />} />
                <Route path=":id/" element={<Log />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CommonProvider>
    </HelmetProvider>
  );
}

export default App;
