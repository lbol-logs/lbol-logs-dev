import Mana from 'utils/Mana';
import { TAct, TBaseManaObj, TCard, TExhibitObj, THolding, THoldingAction, THoldings, TLevel } from 'utils/types/runData';

function holdingsReducer(holdings: THoldings, action: THoldingAction): THoldings {
  const { type, change } = action;
  const { Type, Station, ...entity } = change;
  const { Act, Level } = Station;

  const isActLevel = (a: TAct, l: TLevel) => {
    return ({ Act, Level }: { Act: TAct, Level: TLevel }) => {
      return Act === a && Level === l;
    }
  };

  const hasCurrentholdings = holdings.find(isActLevel(Act, Level));
  console.log({Act, Level, hasCurrentholdings: Boolean(hasCurrentholdings)});
  let currentHoldings: THolding = {} as THolding;
  if (hasCurrentholdings) {
    currentHoldings = hasCurrentholdings;
  }
  else {
    let act = Act;
    let level = Level - 1;
    if (level < 0) {
      level = 16;
      act--;
    }

    outer: for (let a = act; a >= 1; a--) {
      for (let l = level; level >= 0; level--) {
        // push every
        const hasPastHoldings = holdings.find(isActLevel(a as TAct, l as TLevel));
        console.log({Act: a, Level: l, hasPastHoldings: Boolean(hasPastHoldings)});
        if (hasPastHoldings) {
          currentHoldings = hasPastHoldings;
          break outer;
        }
      }
    }

    if (Object.keys(currentHoldings).length === 0) {
      currentHoldings = {
        Act,
        Level,
        Cards: [],
        Exhibits: [],
        BaseMana: ''
      };
    }
  }

  if (type === 'BaseMana') {
    const { BaseMana } = entity as TBaseManaObj;
    currentHoldings.BaseMana = Mana.add(currentHoldings.BaseMana, BaseMana);
  }
  else if (Type === 'Add') {
    if (type === 'Card') currentHoldings.Cards.push(entity as TCard);
    else currentHoldings.Exhibits.push(entity as TExhibitObj);
  }

  return [
    ...holdings,
    currentHoldings
  ];
}

export default holdingsReducer;