import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardManaImage } from 'utils/functions/getImage';

function CardManaWidget({ mana }: { mana: string }) {
  const { t } = useTranslation();

  let bigNumber = null;

  let number = parseInt(mana);
  if (!isNaN(number)) {
    if (number > 9) {
      bigNumber = `${mana}x`;
      mana = '1';
    }
  }

  return (
    <span className="c-card-mana">
      {bigNumber}
      <LazyLoadImage2 callback={getCardManaImage} name={mana} alt={t(`mana.${mana}`, { ns: 'common' })} />
    </span>
  );
}

export default CardManaWidget;