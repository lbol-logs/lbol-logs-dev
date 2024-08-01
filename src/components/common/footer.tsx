import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from './logo';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="l-footer">
      <Link className="l-footer__link" to="/">
        <Logo className="l-footer__logo" />
        <span className="c-footer__title">{t('title', { ns: 'common' })}</span>
        <span className="u-pc"> - </span>
        <span className="c-footer__subtitle">{t('subtitle', { ns: 'common' })}</span>
      </Link>
      <div className="l-footer__copyright">©2024 ed-ev</div>
    </footer>
  );
}

export default Footer;