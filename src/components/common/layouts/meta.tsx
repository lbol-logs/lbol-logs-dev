import { GA4_MEASUREMENT_ID } from 'configs/globals';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getCleanUrl } from 'utils/functions/helpers';

function Meta() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const title = t('title', { ns: 'site' });
  const subtitle = t('subtitle', { ns: 'site' });

  const page_title = `${title} - ${subtitle}`;
  const page_path = getCleanUrl();

  useEffect(() => {
    gtag('config', GA4_MEASUREMENT_ID, {
      page_title: pathname,
      page_path,
    });
  }, []);

  return (
    <Helmet>
      <link rel="canonical" href={page_path} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={page_title} />
      <meta name="twitter:description" content={t('description', { ns: 'site' })} />
      {/* <meta name="twitter:image" content={`${baseUrl}/logo512.png`} /> */}
    </Helmet>
  );
}

export default Meta;