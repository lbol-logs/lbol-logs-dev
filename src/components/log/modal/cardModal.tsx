import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { cardSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';

function CardModal({ card }: { card: TCard }) {
  const { t } = useTranslation();
  const { Id } = card;

  // TODO
  // const { width, height } = cardArtSize;

  const props = { srcSet: null };

  return (
    <div className="p-modal__card">
      <span className="p-modal__name">{t(Id, { ns: 'cards' })}</span>
              {/* <span className="p-modal__name">{t(`${Id}.Name`, { ns: 'cards' })}</span> */}

      <DescriptionWidget ns="cards" {...card} />

      {/* <LazyLoadImage2 callback={getCardImage} name={Id} width={width} height={height} alt="" props={props} /> */}
    </div>
  );
}

export default CardModal;