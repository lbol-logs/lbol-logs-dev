import { TObjNumber } from 'utils/types/common';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import CardManaWidget from 'components/log/modal/cardManaWidget';

function BattleManasWidget({ mana }: { mana: string }) {
  if (mana === '0') return <CardManaWidget mana={mana} />;

  const manas: TObjNumber = {};
  const regExp = /\{?(\d*)([WUBRGCP])\}?/g;
  let m;
  while ((m = regExp.exec(mana)) !== null) {
    const count = Number(m[1]);
    const color = m[2];
    if (count) {
      manas[color] = count;
    }
    else {
      if (!(color in manas)) manas[color] = 0;
      manas[color]++;
    }
  }

  return (
    <div className="p-battle-mana">
    {Object.entries(manas).map(([color, count]) => {
      return (
        <span className="c-battle-mana" key={color}>
          <BaseManaWidget mana={color} />
          <span className="c-battle-mana-count u-text-shadow">x{count}</span>
        </span>
      );
    })}
    </div>
  );
}

export default BattleManasWidget;