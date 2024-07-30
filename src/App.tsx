import { Route, Routes } from 'react-router-dom';

import Top from 'components/top';
import Log from 'components/log';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Footer from 'components/common/footer';
import VersionProvider from 'contexts/versionContext';
import { baseUrl } from 'configs/globals';

function App() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <html lang={i18next.language} /> 
          <title>{t('title', { ns: 'common' })}</title>
          <meta name="description" content={t('description', { ns: 'common' })} />
          <link rel="manifest" href={`${baseUrl}/locales/${i18next.language}/manifest.json`} />
        </Helmet>
        
        <VersionProvider>
          <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/:ver/' element={<Top />} />
            <Route path='/:ver/:id/' element={<Log />} />
          </Routes>
        </VersionProvider>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
