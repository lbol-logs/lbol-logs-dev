import { useTranslation } from 'react-i18next';

function Loading() {
  const { t } = useTranslation();

  return (
    <>
      {t('loading', { ns: 'common' })}
    </>
  );
}

export default Loading;