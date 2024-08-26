import { ChangeEventHandler, useContext } from 'react';
import { RunListContext } from 'contexts/runListContext';
import { toggleIsChecked } from 'utils/functions/helpers';
import CharacterImage from 'components/common/parts/characterImage';

function CharactersWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { filter } = useContext(RunListContext);
  const { ch } = filter;

  return (
    <>
      {characters.map(character => {
        const isChecked = ch ? ch.includes(character) : false;

        return (
          <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={character}>
            <CharacterImage character={character} />
            <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="ch" value={character} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default CharactersWidget;