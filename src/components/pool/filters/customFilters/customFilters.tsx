import { ChangeEventHandler } from 'react';
import ColorFilter from './colorFilter';
import RarityFilter from './rarityFilter';
import CardTypeFilter from './cardTypeFilter';

function CustomFilters({ onChange }: { onChange: ChangeEventHandler }) {
  return (
    <>
      <ColorFilter onChange={onChange} />
      <RarityFilter onChange={onChange} />
      <CardTypeFilter onChange={onChange} />
      {/* <CostFilter onChange={onChange} /> */}
    </>
  );
}

export default CustomFilters;