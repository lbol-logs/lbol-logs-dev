import { iconSize } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAvatarImage, getManaImage } from 'utils/functions/getImage';
import { getTypeBaseMana } from 'utils/functions/helpers';

// TODO
function CharacterWidget({ character, playerType }: { character: string, playerType: string }) {
  const { t } = useTranslation();
  const { characters } = useContext(CommonContext).configsData;
  const mana = getTypeBaseMana(characters, character, playerType);

  return (
    <div className="c-character">
      <LazyLoadImage className="c-character__avatar" src={getAvatarImage(character)} width={iconSize} height={iconSize} alt={t(character, { ns: 'enemies' })} />
      <span className="c-character__type">
        <span>{playerType}</span>
        {'('}
        <LazyLoadImage className="c-character__mana u-img-vertical" src={getManaImage(mana)} width={iconSize} height={iconSize} alt={t(mana, { ns: 'common' })} />
        {')'}
      </span>
    </div>
  );
}

export default CharacterWidget;