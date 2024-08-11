import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getManaImage } from 'utils/getImage';
import { TBaseMana } from 'utils/types/runData';

function BaseManaWidget({ baseMana }: { baseMana: TBaseMana}) {
  const { t } = useTranslation();

  return (
    <div className="p-base-mana">
    {baseMana.split('').map((mana, i) => {
      let imgs = [];
      const isA = mana === 'A';
      const _mana = isA ? 'P' : mana;

      imgs[0] = (
        <LazyLoadImage src={getManaImage(_mana)} width={iconSize} height={iconSize} alt={t(`mana.${_mana}`, { ns: 'common' })} />
      );
      if (isA) {
        const img = (
          <LazyLoadImage className="c-base-mana__unknown" src={getManaImage('Unknown')} width={iconSize} height={iconSize} alt={t(`mana.Unknown`, { ns: 'common' })} />
        );
        imgs.unshift(img);
      }

      return (
        <span className="c-base-mana" key={i}>
          {imgs}
        </span>
      );
    })}
    </div>
  )
}

export default BaseManaWidget;