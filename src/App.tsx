import { Route, Routes } from 'react-router-dom';

import Top from 'components/top';
import Log from 'components/log';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Header from 'components/common/header';
import Footer from 'components/common/footer';
import VersionProvider from 'contexts/versionContext';

function App() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <html lang={i18next.language} /> 
          <title>{t('title', { ns: 'common' })}</title>
          <meta name="description" content={t('description', { ns: 'common' })} />
          <link rel="manifest" href={`${process.env.PUBLIC_URL}/locales/${i18next.language}/manifest.json`} />
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
