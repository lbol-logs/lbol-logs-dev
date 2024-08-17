import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';
import { RunListContext } from 'contexts/runListContext';
import { toggleIsChecked } from 'utils/functions/helpers';

function CharactersWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { ch } = filter;

  return (
    <>
      {characters.map(character => {
        const isChecked = ch ? ch.includes(character) : false;

        return (
          <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={character}>
            <LazyLoadImage2 callback={getAvatarImage} name={character} alt={t(character, { ns: 'enemies' })} />
            <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="ch" value={character} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default CharactersWidget;