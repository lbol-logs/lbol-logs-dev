import { MouseEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import useSearchParamArray from 'hooks/useSearchParamArray';

function StartingExhibitsWidget({ onClick, startingExhibits, characters }: { onClick: MouseEventHandler, startingExhibits: TObj<TExhibits>, characters: Array<string> }) {
  const array = useSearchParamArray('c');
  // const currentCharacters = ['Reimu', 'Marisa', 'Sakuya', 'Cirno'];
  const currentCharacters = array.length ? array : characters;
console.log(array)
console.log(currentCharacters)
  return (
    <>
      {currentCharacters && currentCharacters.map(character => {
        return (
          <div className="p-filter__character-exhibits" key={character}>
            {startingExhibits[character].map(exhibit => {
              return (
                <ExhibitWidget key={exhibit} onClick={onClick} exhibit={exhibit} />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default StartingExhibitsWidget;