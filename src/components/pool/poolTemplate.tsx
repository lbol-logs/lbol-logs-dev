import BaseManasWidget from 'components/common/parts/baseManasWidget';
import Filter from './filters/filter';
import usePoolOnList from 'hooks/usePoolOnList';

function PoolTemplate() {
  // TODO
  // const { BaseMana } = usePoolOnList();
  const BaseMana = 'RRWW';

  return (
    <section className="p-card-pool">
      <BaseManasWidget baseMana={BaseMana} />
      <Filter />
    </section>
  );
}

export default PoolTemplate;