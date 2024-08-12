import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/common/parts/languageSwitcher';
import VersionSwitcher from 'components/common/parts/versionSwitcher';
import Logo from '../parts/logo';

function Header({ isTop, isLog }: { isTop?: boolean, isLog?: boolean }) {
  const { t } = useTranslation();

  return (
    <header className={`l-header ${isTop ? 'l-header--sticky' : ''}`}>
      <div className="l-header__inner l-inner">
        <Link className="l-header__link" to="/">
          <Logo className="l-header__logo" />
          <h1 className="l-header__title">
            <span className="c-header__title">{t('title', { ns: 'common' })}</span>
            <span className="c-header__subtitle u-pc"> - {t('subtitle', { ns: 'common' })}</span>
          </h1>
        </Link>
        <VersionSwitcher isLog={!!isLog} />
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default Header;