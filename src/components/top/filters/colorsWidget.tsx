import ManaWidget from 'components/common/parts/manaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from './exhibitWidget';
import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import { toggleIsChecked } from 'utils/functions/helpers';
import { RunListContext } from 'contexts/runListContext';

function ColorsWidget({ onChange, swappedExhibits }: { onChange: ChangeEventHandler, swappedExhibits: TObj<TExhibits> }) {
  const { filter } = useContext(RunListContext);
  const { co, sw } = filter;

  return (
    <>
      {Object.entries(swappedExhibits).map(([color, exhibits]) => {
        let isAllExhibitsChecked = true;
        const exhibitWidgets = exhibits.map(exhibit => {
          const isExhibitChecked = sw ? sw.includes(exhibit) : false;
          if (!isExhibitChecked) isAllExhibitsChecked = false;

          return (
            <ExhibitWidget onChange={onChange} exhibit={exhibit} key={exhibit} name="sw" checked={isExhibitChecked} />
          );
        });
        const isColorChecked = isAllExhibitsChecked || (co ? co.includes(color): false);

        return (
          <div className="p-filter__color" key={color}>
            <label className={`p-filter__toggle ${toggleIsChecked(isColorChecked)} u-button`}>
              <ManaWidget mana={color} />
              <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="co" value={color} checked={isColorChecked} />
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