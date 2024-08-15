import { TBaseMana } from 'utils/types/runData';
import ManaWidget from './manaWidget';

function BaseManaWidget({ baseMana }: { baseMana: TBaseMana }) {
  return (
    <div className="p-base-mana">
    {baseMana.split('').map((mana, i) => {
      return (
        <ManaWidget mana={mana} key={i} />
      );
    })}
    </div>
  )
}

export default BaseManaWidget;