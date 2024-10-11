import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import { RunListContext } from 'contexts/runListContext';
import ModOption from './modOption';
import { toggleIsChecked } from 'utils/functions/helpers';
import { getModdedCharacters } from './charactersWidget';

function StartingExhibitsWidget({ onChange, startingExhibits, characters }: { onChange: ChangeEventHandler, startingExhibits: TObj<TExhibits>, characters: Array<string> }) {
  const { filter } = useContext(RunListContext);
  const { ch, st } = filter;

  const character = 'Mods';
  const moddedCharacters = getModdedCharacters({ characters, ch });
  const isCharacterChecked = ch ? (!ch.length || ch.includes(character) || moddedCharacters.length > 0) : true;
  const playerTypes = ['A', 'B'];

  return (
    <>
      {characters.map(character => {
        const isCharacterChecked = ch ? (!ch.length || ch.includes(character)) : true;

        return (
          <div className={`p-filter__character-exhibits ${isCharacterChecked ? 'p-filter__character-exhibits--visible' : ''}`} key={character}>
            {startingExhibits[character].map(exhibit => {
              const isExhibitChecked = st ? st.includes(exhibit) && isCharacterChecked : false;

              return (
                <ExhibitWidget key={exhibit} onChange={onChange} exhibit={exhibit} name="st" checked={isExhibitChecked} />
              );
            })}
          </div>
        );
      })}
      <div className={`p-filter__character-exhibits ${isCharacterChecked ? 'p-filter__character-exhibits--visible' : ''}`} key={character}>
        {playerTypes.map(type => {
          const exhibit = `Mod${type}`;
          const isExhibitChecked = st ? st.includes(exhibit) && isCharacterChecked : false;

          return (
            <label className={`p-filter__toggle ${toggleIsChecked(isExhibitChecked)} u-button`} key={exhibit}>
              <ModOption><>Mod<br />{type}</></ModOption>
              <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="st" value={exhibit} checked={isExhibitChecked} />
            </label>
          );
        })}
      </div>
    </>
  );
}

export default StartingExhibitsWidget;