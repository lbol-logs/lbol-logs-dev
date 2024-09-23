import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getBaseManaImage } from 'utils/functions/getImage';
import { TBaseMana } from 'utils/types/runData';

function BaseManaWidget({ mana }: { mana: TBaseMana }) {
  const { t } = useTranslation();

  const imgs = [];
  const isA = mana === 'A';
  const _mana = isA ? 'P' : mana;

  imgs[0] = (
    <LazyLoadImage2 callback={getBaseManaImage} name={_mana} alt={isA ? '' : t(`mana.${_mana}`, { ns: 'common' })} key={_mana} />
  );
  if (isA) {
    const img = (
      <LazyLoadImage2 className="c-base-mana__unknown" callback={getBaseManaImage} name="Unknown" alt={t(`mana.A`, { ns: 'common' })} key="A" />
    );
    imgs.unshift(img);
  }

  return (
    <span className="c-base-mana">
      {imgs}
    </span>
  );
}

export default BaseManaWidget;