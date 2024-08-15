import ManaWidget from 'components/common/parts/manaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from './exhibitWidget';
import { MouseEventHandler } from 'react';

function ColorExhibitsWidget({ onClick, color, exhibits }: { onClick: MouseEventHandler, color: string, exhibits: TExhibits }) {
  return (
    <div className="p-filter__color">
      <ManaWidget mana={color} />
      <div className="p-filter__exhibits">
        {exhibits.map(exhibit => {
          return (
            <ExhibitWidget onClick={onClick} exhibit={exhibit} key={exhibit} />
          );
        })}
      </div>
    </div>
  )
}

export default ColorExhibitsWidget;