import { TBaseMana } from 'utils/types/runData';
import BaseManaWidget from './baseManaWidget';

function BaseManasWidget({ baseMana }: { baseMana: TBaseMana }) {
  let extended = baseMana;
  const regExp = /\{(\d+)([WUBRGCP])\}/g;
  let m;
  while ((m = regExp.exec(baseMana)) !== null) {
    extended = extended.replace(m[0], m[2].repeat(Number(m[1])));
  }

  return (
    <div className="p-base-mana">
    {extended.split('').map((mana, i) => {
      return (
        <BaseManaWidget mana={mana} key={i} />
      );
    })}
    </div>
  );
}

export default BaseManasWidget;