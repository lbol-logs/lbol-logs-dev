import { useTranslation } from 'react-i18next';

function Processing() {
  const { t } = useTranslation();

  return (
    <>
      {t('processing', { ns: 'common' })}
    </>
  );
}

export default Processing;