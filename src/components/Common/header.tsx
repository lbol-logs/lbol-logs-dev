import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="App-header">
      <Link to='/'>
        <img src="/logo.svg" className="App-logo" alt="logo" />
      </Link>
      <p>
        {t('title', {ns: 'common'})}
      </p>
    </header>
  );
}

export default Header;