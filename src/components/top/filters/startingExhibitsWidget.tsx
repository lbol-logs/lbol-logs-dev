import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import { RunListContext } from 'contexts/runListContext';

function StartingExhibitsWidget({ onChange, startingExhibits, characters }: { onChange: ChangeEventHandler, startingExhibits: TObj<TExhibits>, characters: Array<string> }) {
  const { filter } = useContext(RunListContext);
  const { ch, st } = filter;

  return (
    <>
      {characters.map(character => {
        const isCharacterChecked = ch ? ch.includes(character) : true;

        return (
          <div className={`p-filter__character-exhibits ${isCharacterChecked ? 'p-filter__character-exhibits--visible' : ''}`} key={character}>
            {startingExhibits[character].map(exhibit => {
              const isExhibitChecked = st ? st.includes(exhibit) : true;

              return (
                <ExhibitWidget key={exhibit} onChange={onChange} exhibit={exhibit} name="st" checked={isExhibitChecked} />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default StartingExhibitsWidget;