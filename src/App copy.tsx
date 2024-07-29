import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <Helmet>
        <html lang={i18next.language} /> 
        <title>{t('title', {ns: 'common'})}</title>
        <meta name="description" content={t('description', {ns: 'common'})} />
        <link rel="manifest" href={`${process.env.PUBLIC_URL}/locales/${i18next.language}/manifest.json`} />
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {t('title', {ns: 'common'})}
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
