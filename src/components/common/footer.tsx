import { baseUrl } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="l-footer">
      <Link className="l-footer__link" to="/">
        <img className="l-footer__logo" src={`${baseUrl}/logo.svg`} alt="" />
        {t('title', { ns: 'common' })}
      </Link>
      <div className="l-footer__copyright">©2024 ed-ev</div>
    </footer>
  );
}

export default Footer;