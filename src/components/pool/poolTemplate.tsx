import BaseManasWidget from 'components/common/parts/baseManasWidget';
import Filter from './filters/filter';
import usePoolOnEntities from 'hooks/usePoolOnEntities';
import { useContext, useMemo } from 'react';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { useSearchParams } from 'react-router-dom';
import { TPool, TPoolCheckbox, TPoolRadio } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';
import CardCards from 'components/log/entityCards/cardCards';
import Modal from 'components/log/modal';

function PoolTemplate() {
  const { filteredPool, setFilteredPool } = useContext(CardPoolContext);
  const [searchParams] = useSearchParams();

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
    baseManaWithoutEvent = ''
  } = o || {};

  return (
    <section className="p-card-pool">
      <Modal />
      <BaseManasWidget baseMana={baseMana} />
      <Filter baseManaWithoutEvent={baseManaWithoutEvent} />
      <h2>WIP</h2>
      <CardCards cards={filteredPool} />
    </section>
  );
}

export default PoolTemplate;