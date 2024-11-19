import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import { CardPoolContext } from 'contexts/cardPoolContext';

function StartingExhibitsWidget({ onChange, startingExhibits, characters }: { onChange: ChangeEventHandler, startingExhibits: TObj<TExhibits>, characters: Array<string> }) {
  const { filter } = useContext(CardPoolContext);
  const { ex } = filter;

  return (
    <>
      {characters.map(character => {
        return (
          <div className="p-filter__character-exhibits p-filter__character-exhibits--visible" key={character}>
            {startingExhibits[character].map(exhibit => {
              const isExhibitChecked = ex ? ex.includes(exhibit) : false;

              return (
                <ExhibitWidget key={exhibit} onChange={onChange} exhibit={exhibit} name="ex" checked={isExhibitChecked} />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default StartingExhibitsWidget;