import ManaWidget from 'components/common/parts/manaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from './exhibitWidget';
import { ChangeEventHandler } from 'react';
import { TObj } from 'utils/types/common';

function ColorsWidget({ onChange, swappedExhibits }: { onChange: ChangeEventHandler, swappedExhibits: TObj<TExhibits> }) {
  return (
    <>
      {Object.entries(swappedExhibits).map(([color, exhibits]) => {
        return (
          <div className="p-filter__color" key={color}>
            <ManaWidget mana={color} />
            <div className="p-filter__exhibits">
              {exhibits.map(exhibit => {
                return (
                  <ExhibitWidget onChange={onChange} exhibit={exhibit} key={exhibit} />
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