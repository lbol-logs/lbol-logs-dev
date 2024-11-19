import BaseManasWidget from 'components/common/parts/baseManasWidget';
import Filter from './filters/filter';
import usePoolOnEntities from 'hooks/usePoolOnEntities';
import { useContext, useMemo } from 'react';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { useSearchParams } from 'react-router-dom';
import { TPool, TPoolCheckbox, TPoolRadio } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';

function PoolTemplate() {
  const { setFilteredPool } = useContext(CardPoolContext);
  const [searchParams] = useSearchParams();

  // TODO
  const currentFilter = useMemo(() => {
    const currentFilter: TPool = {};
    const keys = DefaultPool.keys;
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!(key in keys)) continue;
      if (DefaultPool.radios.includes(key)) {
        currentFilter[key as keyof TPoolRadio] = value;
      }
      else {
        const _key = key as keyof TPoolCheckbox;
        if (!(key in currentFilter)) currentFilter[_key] = [];
        (currentFilter[_key] as Array<string>).push(value);
      }
    }
    return currentFilter;
  }, [searchParams]);
  const o = usePoolOnEntities(currentFilter, setFilteredPool);
  const {
    baseMana = '',
    baseManaWithoutEvent
  } = o || {};
  // const BaseMana = 'RRWW';

  return (
    <section className="p-card-pool">
      <BaseManasWidget baseMana={baseMana} />
      <Filter baseManaWithoutEvent={baseManaWithoutEvent} />
    </section>
  );
}

export default PoolTemplate;