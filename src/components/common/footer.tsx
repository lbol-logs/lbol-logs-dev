import { baseUrl } from 'configs/globals';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="l-footer">
      <Link className="l-footer__link" to="/">
        <img className="l-footer__logo" src={`${baseUrl}/logo.svg`} alt="" />
        <Trans
            i18nKey="titleFooter"
            ns="common"
            components={{
              pc: <span className="u-pc"></span>,
              sp1: <span className="l-footer__first-half"></span>,
              sp2: <span className="l-footer__second-half"></span>
            }}
          />
      </Link>
      <div className="l-footer__copyright">©2024 ed-ev</div>
    </footer>
  );
}

export default Footer;