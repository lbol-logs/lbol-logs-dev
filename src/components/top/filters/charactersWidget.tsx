import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';
import useSearchParamArray from 'hooks/useSearchParamArray';

function CharactersWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { t } = useTranslation();

  const array = useSearchParamArray('c');
  const currentCharacters = array.length ? array : characters;

  return (
    <>
      {characters.map(character => {
        const isChecked = currentCharacters.includes(character);

        return (
          <label className="p-filter__toggle u-button" key={character}>
            <LazyLoadImage2 callback={getAvatarImage} name={character} alt={t(character, { ns: 'enemies' })} />
            <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="character" value={character} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default CharactersWidget;