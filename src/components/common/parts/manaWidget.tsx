import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getManaImage } from 'utils/functions/getImage';
import { TBaseMana } from 'utils/types/runData';

function ManaWidget({ mana }: { mana: TBaseMana }) {
  const { t } = useTranslation();

  const imgs = [];
  const isA = mana === 'A';
  const _mana = isA ? 'P' : mana;

  imgs[0] = (
    <LazyLoadImage src={getManaImage(_mana)} width={iconSize} height={iconSize} alt={isA ? '' : t(`mana.${_mana}`, { ns: 'common' })} />
  );
  if (isA) {
    const img = (
      <LazyLoadImage className="c-base-mana__unknown" src={getManaImage('Unknown')} width={iconSize} height={iconSize} alt={t(`mana.A`, { ns: 'common' })} />
    );
    imgs.unshift(img);
  }

  return (
    <span className="c-base-mana">
      {imgs}
    </span>
  );
}

export default ManaWidget;