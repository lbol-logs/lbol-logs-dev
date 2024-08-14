import { iconSize } from 'configs/globals';
import { Trans, useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/functions/getImage';

function RoundsWidget({ rounds }: { rounds: number }) {
  useTranslation();
  const alt = (
    <Trans
      i18nKey="round"
      ns="log"
      count={rounds}
    />
  );

  return (
    <span className="c-rewards__rounds">
      <LazyLoadImage src={getCommonImage('Round')} width={iconSize} height={iconSize} alt={alt} />
      {rounds}
    </span>
  );
}

export default RoundsWidget;