import { MouseEventHandler } from 'react';
import { TObj } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import useSearchParamArray from 'hooks/useSearchParamArray';

function StartingExhibitsWidget({ onClick, startingExhibits }: { onClick: MouseEventHandler, startingExhibits: TObj<TExhibits> }) {
  // const [searchParams] = useSearchParams();
  // const c = searchParams.get('c') || '';
  // console.log(c);
  // console.log(c.split(','));
  const c = useSearchParamArray('c');
  console.log(c);

    const characters = ['Reimu', 'Marisa', 'Sakuya', 'Cirno'];

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