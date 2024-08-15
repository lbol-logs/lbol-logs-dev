import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getManaImage } from 'utils/functions/getImage';
import { TBaseMana } from 'utils/types/runData';

function ManaWidget({ mana }: { mana: TBaseMana }) {
  const { t } = useTranslation();

  const imgs = [];
  const isA = mana === 'A';
  const _mana = isA ? 'P' : mana;

  imgs[0] = (
    <LazyLoadImage2 callback={getManaImage} name={_mana} width={iconSize} height={iconSize} alt={isA ? '' : t(`mana.${_mana}`, { ns: 'common' })} />
  );
  if (isA) {
    const img = (
      <LazyLoadImage2 className="c-base-mana__unknown" callback={getManaImage} name="Unknown" width={iconSize} height={iconSize} alt={t(`mana.A`, { ns: 'common' })} />
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