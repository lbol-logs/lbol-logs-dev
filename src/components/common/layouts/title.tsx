import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function Title({ name }: { name: string }) {
  const { t } = useTranslation();
  const title = t('title', { ns: 'site' });
  const _title = `${name} | ${title}`;

  return (
    <Helmet>
      <title>{_title}</title>
    </Helmet>
  );
}

export default Title;