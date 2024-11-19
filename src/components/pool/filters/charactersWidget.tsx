import { ChangeEventHandler, useContext } from 'react';
import { toggleIsChecked } from 'utils/functions/helpers';
import CharacterImage from 'components/common/parts/characterImage';
import { CardPoolContext } from 'contexts/cardPoolContext';

function CharactersWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { filter } = useContext(CardPoolContext);
  const { ch } = filter;

  return (
    <>
      {characters.map(character => {
        const isChecked = ch === character;

        return (
          <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={character}>
            <CharacterImage character={character} />
            <input className="p-filter__checkbox" type="radio" onChange={onChange} name="ch" value={character} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default CharactersWidget;