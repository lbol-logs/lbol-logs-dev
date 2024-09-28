import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardManaImage } from 'utils/functions/getImage';
import { Image2x } from './cardModal';
import { iconSize } from 'configs/globals';

function CardManaWidget({ mana, is2x }: { mana: string, is2x?: boolean }) {
  const { t } = useTranslation();

  let bigNumber = null;

  let number = parseInt(mana);
  if (!isNaN(number)) {
    if (number > 9) {
      bigNumber = `${mana}x`;
      mana = '1';
    }
  }

  let img;
  if (is2x) {
    const size = iconSize * 2;
    img = <Image2x callback={getCardManaImage} name={mana} width={size} height={size} />;
  }
  else {
    img = <LazyLoadImage2 callback={getCardManaImage} name={mana} alt={t(`mana.${mana}`, { ns: 'common' })} />;
  }

  return (
    <span className="c-card-mana">
      {bigNumber}
      {img}
    </span>
  );
}

export default CardManaWidget;