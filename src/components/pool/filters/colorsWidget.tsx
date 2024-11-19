import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from './exhibitWidget';
import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import { CardPoolContext } from 'contexts/cardPoolContext';

function ColorsWidget({ onChange, swappedExhibits }: { onChange: ChangeEventHandler, swappedExhibits: TObj<TExhibits> }) {
  const { filter } = useContext(CardPoolContext);
  const { ex } = filter;

  return (
    <>
      {Object.entries(swappedExhibits).map(([color, exhibits]) => {
        const exhibitWidgets = exhibits.map(exhibit => {
          const isExhibitChecked = ex ? ex.includes(exhibit) : false;

          return (
            <ExhibitWidget onChange={onChange} exhibit={exhibit} key={exhibit} name="ex" checked={isExhibitChecked} />
          );
        });

        return (
          <div className="p-filter__color" key={color}>
            <label>
              <BaseManaWidget mana={color} />
            </label>
            <div className="p-filter__exhibits">
              {exhibitWidgets}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ColorsWidget;