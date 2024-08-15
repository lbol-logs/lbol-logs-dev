import { iconSize } from 'configs/globals';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAvatarImage } from 'utils/functions/getImage';

function CharacterWidget({ onClick, character }: { onClick: MouseEventHandler, character: string}) {
  const { t } = useTranslation();

  return (
    <label className="p-filter__toggle">
      <LazyLoadImage src={getAvatarImage(character)} width={iconSize} height={iconSize} alt={t(character, { ns: 'enemies' })} />
      <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="character" value={character} />
    </label>
  )
}

export default CharacterWidget;