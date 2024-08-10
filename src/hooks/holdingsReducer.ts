import Mana from 'utils/Mana';
import { TAct, TBaseManaObj, TCard, TExhibitObj, THoldingAction, THoldings, TLevel } from 'utils/types/runData';

function holdingsReducer(holdings: THoldings, action: THoldingAction): THoldings {
  const { type, change } = action;
  const { Type, Station, ...entity } = change;
  const { Act, Level } = Station;
  let currentHolding;
  let isCurrentHolding;

  const length = holdings.length;
  if (length) {
    const lastHolding = holdings[length - 1];
    if (type === '') {
      currentHolding = { ...lastHolding, Act, Level };
      return [...holdings, currentHolding];
    }
  }

  if (!length) {
    currentHolding = newHolding();
  }
  else {
    const lastHolding = holdings[length - 1];
    const { Act: a, Level: l } = lastHolding;
    isCurrentHolding = validateActLevel(a, l);
    if (isCurrentHolding) {
      currentHolding = JSON.parse(JSON.stringify(lastHolding));
    }
    else {
      currentHolding = { ...lastHolding, Act, Level };
      // TODO: strict
      const isPresent = holdings.find(({ Act: _act, Level: _level }) => _act === Act && _level === Level);
      if (isPresent) return holdings;
    }
  }

  function newHolding() {
    return {
      Act,
      Level,
      Cards: [],
      Exhibits: [],
      BaseMana: ''
    };
  }

  function validateActLevel(a: TAct, l: TLevel) {
    // TODO: strict
    // if (Act < a || (Act === a && Level < l)) throw new Error(`Invalid holding dispatch. Current: Act ${Act} Level ${Level}, Last: Act ${a} Level ${l}`);
    const isCurrentHolding = Act === a && Level === l;
    return isCurrentHolding;
  }

  if (type === 'BaseMana') {
    const { BaseMana } = entity as TBaseManaObj;
    currentHolding.BaseMana = Mana.add(currentHolding.BaseMana, BaseMana);
  }
  else if (Type === 'Add') {
    if (type === 'Card') currentHolding.Cards.push(entity as TCard);
    else currentHolding.Exhibits.push(entity as TExhibitObj);
  }

  if (!length) {
    return [...holdings, currentHolding];
  }
  else {
    if (isCurrentHolding) {
      return [...holdings.slice(0, -1), currentHolding];
    }
    else {
      return [...holdings, currentHolding];
    }
  }
}

export default holdingsReducer;