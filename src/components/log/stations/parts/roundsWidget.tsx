import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/functions/getImage';

function RoundsWidget({ rounds }: { rounds: number }) {
  const { t } = useTranslation();

  return (
    <span className="c-rewards__rounds">
      <LazyLoadImage src={getCommonImage('Round')} width={iconSize} height={iconSize} alt={t('round', { ns: 'log' })} />
      {rounds}
    </span>
  );
}

export default RoundsWidget;