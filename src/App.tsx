import { Navigate, Route, Routes } from 'react-router-dom';

import Top from 'components/top';
import Log from 'components/log';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import VersionProvider from 'contexts/versionContext';
import { baseUrl } from 'configs/globals';
import RemoveTrailingSlash from 'components/common/removeTrailingSlash';

function App() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18next.language} /> 
        <title>{t('title', { ns: 'common' })} - {t('subtitle', { ns: 'common' })}</title>
        <meta name="description" content={t('description', { ns: 'common' })} />
        <link rel="manifest" href={`${baseUrl}/locales/${i18next.language}/manifest.json`} />
      </Helmet>
      
      <RemoveTrailingSlash />
      <VersionProvider>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/:ver/" element={<Top />} />
          <Route path="/:ver/:id/" element={<Log />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </VersionProvider>
    </HelmetProvider>
  );
}

export default App;
