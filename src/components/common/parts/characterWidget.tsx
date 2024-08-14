import chacaterTypes from 'configs/chacaterTypes';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAvatarImage, getManaImage } from 'utils/functions/getImage';

// TODO
function CharacterWidget({ character, playerType }: { character: string, playerType: string }) {
  const { t } = useTranslation();
  const mana = chacaterTypes[character][playerType];

  return (
    <div className="c-character">
      <LazyLoadImage className="c-character__avatar" src={getAvatarImage(character)} width={iconSize} height={iconSize} alt={t(character, { ns: 'enemies' })} />
      <span className="c-character__type">
        <span>{t(playerType, { ns: 'common' })}</span>
        {'('}
        <LazyLoadImage className="c-character__mana u-img-vertical" src={getManaImage(mana)} width={iconSize} height={iconSize} alt={t(mana, { ns: 'common' })} />
        {')'}
      </span>
    </div>
  );
}

export default CharacterWidget;