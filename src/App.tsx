import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { defaultVersion } from 'configs/globals';
import { createContext, useState } from 'react';

import Top from 'components/top';
import Log from 'components/log';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Header from 'components/common/header';
import Footer from 'components/common/footer';

export const VersionContext = createContext({} as {
  version: string
  setVersion: React.Dispatch<React.SetStateAction<string>>
})

function App() {
  const [version, setVersion] = useState(defaultVersion);
  const value = {
    version,
    setVersion
  };
  const { t } = useTranslation();

  return (
    <div className="App">
      <Helmet>
        <html lang={i18next.language} /> 
        <title>{t('title', { ns: 'common' })}</title>
        <meta name="description" content={t('description', { ns: 'common' })} />
        <link rel="manifest" href={`${process.env.PUBLIC_URL}/locales/${i18next.language}/manifest.json`} />
      </Helmet>
      <Header />
      <VersionContext.Provider value={value}>
        <BrowserRouter basename="/lbol-logs">
          <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/:ver/' element={<Top />} />
            <Route path='/:ver/:id/' element={<Log />} />
          </Routes>
        </BrowserRouter>
      </VersionContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
