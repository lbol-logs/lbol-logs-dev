import { ChangeEventHandler } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import useSearchParamArray from 'hooks/useSearchParamArray';

function StartingExhibitsWidget({ onChange, startingExhibits, characters }: { onChange: ChangeEventHandler, startingExhibits: TObj<TExhibits>, characters: Array<string> }) {
  const array = useSearchParamArray('c');
  const currentCharacters = array.length ? array : characters;

  return (
    <>
      {currentCharacters && currentCharacters.map(character => {
        return (
          <div className="p-filter__character-exhibits" key={character}>
            {startingExhibits[character].map(exhibit => {
              return (
                <ExhibitWidget key={exhibit} onChange={onChange} exhibit={exhibit} />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default StartingExhibitsWidget;