import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/common/parts/languageSwitcher';
import VersionWidget from 'components/common/parts/versionWidget';
import Logo from '../parts/logo';
import Meta from './meta';
import { useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';
import { latestVersion } from 'configs/globals';

function Header({ showVersion = false, versionSwitch = false, alwaysLatest = false }: { showVersion?: boolean, versionSwitch?: boolean, alwaysLatest?: boolean }) {
  const { version, setVersion } = useContext(CommonContext);
  const { t } = useTranslation();

  return (
    <header className="l-header">
      <Meta />
      <div className="l-header__inner l-inner">
        <Link className="l-header__link" to={`/${version}/`}>
          <Logo className="l-header__logo" />
          <h1 className="l-header__title">
            <span className="c-header__title">{t('title', { ns: 'site' })}</span>
            <span className="c-header__subtitle u-pc"> - {t('subtitle', { ns: 'site' })}</span>
          </h1>
        </Link>
        <div className="l-header__menu">
          <Link className="l-header__button u-button" to="/about/">About</Link>
          <Link className="l-header__button u-button" to="/upload/">{t('upload', { ns: 'site' })}</Link>
          <Link className="l-header__button u-button" to="/pool/">{t('cardPool', { ns: 'site' })}</Link>
        </div>
        <div className="l-header__widgets">
          {showVersion && <VersionWidget className="l-header__version" version={alwaysLatest ? latestVersion : version} setVersion={setVersion} versionSwitch={!!versionSwitch} />}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;