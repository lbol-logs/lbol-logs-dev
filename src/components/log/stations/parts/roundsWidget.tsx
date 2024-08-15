import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage } from 'utils/functions/getImage';

function RoundsWidget({ rounds }: { rounds: number }) {
  const { t } = useTranslation();

  return (
    <span className="c-rewards__rounds">
      <LazyLoadImage2 callback={getCommonImage} name={'Round'} alt={t('round', { ns: 'log' })} />
      {rounds}
    </span>
  );
}

export default RoundsWidget;