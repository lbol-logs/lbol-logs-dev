import { ChangeEventHandler } from 'react';
import ColorFilter from './colorFilter';

function CustomFilters({ onChange }: { onChange: ChangeEventHandler }) {
  return (
    <>
      <ColorFilter onChange={onChange} />
      {/* <RarityFilter onChange={onChange} />
      <CardTypeFilter onChange={onChange} />
      <CostFilter onChange={onChange} /> */}
    </>
  );
}

export default CustomFilters;