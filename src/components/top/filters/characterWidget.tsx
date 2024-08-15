import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';

function CharacterWidget({ onClick, character }: { onClick: MouseEventHandler, character: string }) {
  const { t } = useTranslation();

  return (
    <label className="p-filter__toggle u-button">
      <LazyLoadImage2 callback={getAvatarImage} name={character} alt={t(character, { ns: 'enemies' })} />
      <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="character" value={character} />
    </label>
  )
}

export default CharacterWidget;