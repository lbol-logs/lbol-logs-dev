import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';

function CharactersWidget({ onClick, characters }: { onClick: MouseEventHandler, characters: Array<string> }) {
  const { t } = useTranslation();

  return (
    <>
      {characters.map(character => {
        return (
          <label className="p-filter__toggle u-button" key={character}>
            <LazyLoadImage2 callback={getAvatarImage} name={character} alt={t(character, { ns: 'enemies' })} />
            <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="character" value={character} />
          </label>
        );
      })}
    </>
  );
}

export default CharactersWidget;