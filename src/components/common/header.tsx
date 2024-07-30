import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/common/languageSwitcher';
import VersionChecker from 'components/common/versionChecker';
import { useParams } from 'react-router-dom';
import { defaultVersion } from 'configs/globals';

function Header() {
  const { t } = useTranslation();
  
  const { ver = defaultVersion } = useParams<{ ver: string }>();

  return (
    <header className="App-header">
      <Link to='/'>
        <img src="/logo.svg" className="App-logo" alt="logo" />
      </Link>
      <p>
        {t('title', { ns: 'common' })}
      </p>
      <VersionChecker ver={ver} />
      <LanguageSwitcher />
    </header>
  );
}

export default Header;