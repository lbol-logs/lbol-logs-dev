import ManaWidget from 'components/common/parts/manaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from './exhibitWidget';
import { MouseEventHandler } from 'react';
import { TObj } from 'utils/types/common';

function ColorsWidget({ onClick, swappedExhibits }: { onClick: MouseEventHandler, swappedExhibits: TObj<TExhibits> }) {
  return (
    <>
      {Object.entries(swappedExhibits).map(([color, exhibits]) => {
        return (
          <div className="p-filter__color" key={color}>
            <ManaWidget mana={color} />
            <div className="p-filter__exhibits">
              {exhibits.map(exhibit => {
                return (
                  <ExhibitWidget onClick={onClick} exhibit={exhibit} key={exhibit} />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ColorsWidget;