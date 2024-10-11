import { ChangeEventHandler, useContext } from 'react';
import { RunListContext } from 'contexts/runListContext';
import { toggleIsChecked } from 'utils/functions/helpers';
import CharacterImage from 'components/common/parts/characterImage';
import ModOption from './modOption';

function CharactersWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { filter } = useContext(RunListContext);
  const { ch } = filter;

  const character = 'Mods';
  const isChecked = ch ? ch.includes(character) : false;
  const moddedCharacters = getModdedCharacters({ characters, ch });

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
      <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={character}>
        <ModOption>Mods</ModOption>
        <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="ch" value={character} checked={isChecked} />
      </label>
      {moddedCharacters.map(character => {
        return (
          <input type="hidden" name="ch" value={character} defaultChecked={true} key={character} />
        );
      })}
    </>
  );
}

export default CharactersWidget;

function getModdedCharacters({ characters, ch }: { characters: Array<string>, ch: Array<string> }) {
  const character = 'Mods';
  const moddedCharacters = [];
  if (ch !== undefined) {
    for (const c of ch) {
      if (c === character) continue;
      if (!characters.includes(c)) moddedCharacters.push(c);
    }
  }
  return moddedCharacters;
}

export {
  getModdedCharacters
};