import { copyObject } from 'utils/functions/helpers';
import Mana from 'utils/classes/Mana';
import { TRange3 } from 'utils/types/common';
import { CardWithUpgradeCounter, exhibitCounters, TAct, TBaseManaObj, TCard, TExhibitObj, THolding, THoldingAction, THoldings, TLevel } from 'utils/types/runData';

function holdingsReducer(holdings: THoldings, action: THoldingAction): THoldings {
  const { type, change } = action;
  const { Type, Station, ...entity } = change;
  const { Act, Level } = Station;
  let currentHolding: THolding;
  let isCurrentHolding;

  const length = holdings.length;
  if (length) {
    const lastHolding = holdings[length - 1];
    if (type === '') {
      currentHolding = { ...copyObject(lastHolding), Act, Level };
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
      currentHolding = copyObject(lastHolding);
    }
    else {
      currentHolding = { ...copyObject(lastHolding), Act, Level };
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

  function findCard(entity: any, afterUpgrade = false) {
    let { Id, IsUpgraded, UpgradeCounter } = entity as TCard;
    if (afterUpgrade) {
      if (UpgradeCounter) {
        if (UpgradeCounter === 1) IsUpgraded = false;
      }
      else {
        IsUpgraded = false;
      }
    }
    const index = currentHolding.Cards.findIndex((card: TCard) => {
      return card.Id === Id && card.IsUpgraded === IsUpgraded && card.UpgradeCounter === UpgradeCounter
    });
    return index;
  }

  function findExhibit(entity: any) {
    const { Id } = entity as TExhibitObj;
    const index = currentHolding.Exhibits.findIndex((exhibit: TExhibitObj) => exhibit.Id === Id);
    return index;
  }

  function upgradeCard(index: number) {
    const card = currentHolding.Cards[index];
    const { Id } = card;
    card.IsUpgraded = true;
    if (Id === CardWithUpgradeCounter.YuyukoSing) {
      (card.UpgradeCounter as number)++;
    }
  }

  if (type === 'BaseMana') {
    const { BaseMana } = entity as TBaseManaObj;
    if (Type === 'Add') {
      currentHolding.BaseMana = Mana.add(currentHolding.BaseMana, BaseMana);
    }
    else if (Type === 'Remove') {
      currentHolding.BaseMana = Mana.remove(currentHolding.BaseMana, BaseMana);
    }
  }
  else if (Type === 'Add') {
    if (type === 'Card') {
      currentHolding.Cards.push(entity as TCard);
    }
    else if (type === 'Exhibit') {
      const exhibit = entity as TExhibitObj;
      const { Id } = exhibit;
      if (Id in exhibitCounters) {
        const { initial } = exhibitCounters[Id];
        exhibit.Counter = initial as TRange3;
      }
      currentHolding.Exhibits.push(exhibit);
    }
  }
  else if (Type === 'Remove') {
    if (type === 'Card') {
      const index = findCard(entity);
      currentHolding.Cards.splice(index, 1);
    }
    else if (type === 'Exhibit') {
      const index = findExhibit(entity);
      currentHolding.Exhibits.splice(index, 1);
    }
  }
  else if (Type === 'Upgrade') {
    if (type === 'Card') {
      const index = findCard(entity, true);
      upgradeCard(index);
    }
    else if (type === 'Exhibit') {
      const index = findExhibit(entity);
      currentHolding.Exhibits[index].Counter = (entity as TExhibitObj).Counter;
    }
  }
  else if (Type === 'Use') {
    if (type === 'Exhibit') {
      const index = findExhibit(entity);
      if (index !== -1) (currentHolding.Exhibits[index].Counter as number)--;
    }
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