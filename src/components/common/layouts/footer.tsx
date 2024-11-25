import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../parts/logo';
import { useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';

function Footer() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();

  return (
    <footer className="l-footer">
      <div className="l-footer__inner l-inner">
        <Link className="l-footer__link" to={`/${version}/`}>
          <Logo className="l-footer__logo" />
          <span className="c-footer__title">{t('title', { ns: 'site' })}</span>
          <span className="u-pc"> - </span>
          <span className="c-footer__subtitle">{t('subtitle', { ns: 'site' })}</span>
        </Link>
        <div className="l-footer__copyright">©2024 ed-ev</div>
      </div>
    </footer>
  );
}

export default Footer;