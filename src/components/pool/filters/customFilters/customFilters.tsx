import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { TExhibits } from 'utils/types/runData';
import ExhibitWidget from '../exhibitWidget';
import { ChangeEventHandler, useContext } from 'react';
import { TObj } from 'utils/types/common';
import { CardPoolContext } from 'contexts/cardPoolContext';

function CustomFilters({ onChange }: { onChange: ChangeEventHandler }) {
  const { filter } = useContext(CardPoolContext);
  const { ex } = filter;
// TODO
  return (
    <>
      <div className="p-filter__row">
        <div className="p-filter__label">A</div>
        <div className="p-filter__values">
          A
        </div>
      </div>

      <div className="p-filter__row">
        <div className="p-filter__label">B</div>
        <div className="p-filter__values">
          B
        </div>
      </div>
    </>
  );
}

export default CustomFilters;