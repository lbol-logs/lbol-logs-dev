import { Outlet } from 'react-router-dom';
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
  const title = t('title', { ns: 'site' });
  const substitle = t('subtitle', { ns: 'site' });

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={lang} />
        <title>{title} - {substitle}</title>
        <meta name="description" content={t('description', { ns: 'site' })} />
        <link rel="manifest" href={`${baseUrl}/locales/${i18next.language}/manifest.json`} />
        <meta name="apple-mobile-web-app-title" content={title} />
      </Helmet>

      <RemoveTrailingSlash />
      <CommonProvider>
        <ScrollToTop />
        <Outlet />
      </CommonProvider>
    </HelmetProvider>
  );
}

export default App;
