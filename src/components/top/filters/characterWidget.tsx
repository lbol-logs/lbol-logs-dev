import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAvatarImage } from 'utils/functions/getImage';

function CharacterWidget({ character }: { character: string}) {
  const { t } = useTranslation();

  const char = t(character, { ns: 'enemies' });

  return (
    <label className="p-filter__toggle js-toggle">
      <LazyLoadImage src={getAvatarImage(character)} width={iconSize} height={iconSize} alt={char} />
      <input className="p-filter__checkbox" type="checkbox" name="character" value={char} />
    </label>
  )
}

export default CharacterWidget;