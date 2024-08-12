import chacaterTypes from 'configs/chacaterTypes';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getManaImage } from 'utils/functions/getImage';

// TODO
function PlayerTypeWidget({ character, playerType }: { character: string, playerType: string }) {
  const { t } = useTranslation();
  const mana = chacaterTypes[character][playerType];

  return (
    <span className="c-player-type">
      <p>{t(playerType, { ns: 'common' })}</p>
      {'('}
      <LazyLoadImage src={getManaImage(mana)} width={iconSize} height={iconSize} alt={t(mana, { ns: 'common' })} />
      {')'}
    </span>
  );
}

export default PlayerTypeWidget;