import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/common/languageSwitcher';
import VersionSwitcher from 'components/common/versionSwitcher';
import { baseUrl } from 'configs/globals';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="l-header">
      <Link className="l-header__link" to="/">
        <img className="l-header__logo" src={`${baseUrl}/logo.svg`} alt="" />
        <h1 className="l-header__title">
          <Trans
            i18nKey="titleHeader"
            ns="common"
            components={{
              pc: <span className="u-pc"></span>
            }}
          />
        </h1>
      </Link>
      <VersionSwitcher />
      <LanguageSwitcher />
    </header>
  );
}

export default Header;