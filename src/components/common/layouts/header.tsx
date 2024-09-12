import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/common/parts/languageSwitcher';
import VersionWidget from 'components/common/parts/versionWidget';
import Logo from '../parts/logo';
import Meta from './meta';

function Header({ versionSwitch }: { versionSwitch?: boolean }) {
  const { t } = useTranslation();

  versionSwitch = versionSwitch === undefined ? true : versionSwitch;

  return (
    <header className="l-header">
      <Meta />
      <div className="l-header__inner l-inner">
        <Link className="l-header__link" to="/">
          <Logo className="l-header__logo" />
          <h1 className="l-header__title">
            <span className="c-header__title">{t('title', { ns: 'site' })}</span>
            <span className="c-header__subtitle u-pc"> - {t('subtitle', { ns: 'site' })}</span>
          </h1>
        </Link>
        <div className="l-header__menu">
          <Link className="l-header__button u-button" to="/about/">About</Link>
          <Link className="l-header__button u-button" to="/upload/">{t('upload', { ns: 'site' })}</Link>
        </div>
        <div className="l-header__widgets">
          <VersionWidget versionSwitch={!!versionSwitch} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;