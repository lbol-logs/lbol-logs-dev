import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';

function StartingExhibitsWidget({ onClick, characters, startingExhibits }: { onClick: MouseEventHandler, characters: Array<string>, startingExhibits: TObj<TExhibits> }) {
  const { t } = useTranslation();

  return (
    <>
      {characters && characters.map(character => {
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
  )
}

export default StartingExhibitsWidget;