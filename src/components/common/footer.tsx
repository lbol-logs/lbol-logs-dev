import { baseUrl } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="App-footer">
      <Link to='/'>
        <img src={`${baseUrl}/logo.svg`} className="App-logo" alt="logo" />
      </Link>
      <p>
        {t('title', { ns: 'common' })}
      </p>
    </footer>
  );
}

export default Footer;