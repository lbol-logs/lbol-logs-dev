import { copyObject, getSameCardIndex } from 'utils/functions/helpers';
import Mana from 'utils/classes/Mana';
import { CardsWithUpgradeCounter, TAct, TBaseManaObj, TCard, TExhibitObj, THolding, THoldingAction, THoldings, TLevel } from 'utils/types/runData';

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
    const isCurrentHolding = Act === a && Level === l;
    return isCurrentHolding;
  }

  function findCard(entity: any, afterUpgrade = false) {
    const card = copyObject(entity as TCard);
    let { IsUpgraded, UpgradeCounter } = card;
    if (afterUpgrade) {
      if (UpgradeCounter !== undefined) {
        if (UpgradeCounter === 1) IsUpgraded = false;
        (card.UpgradeCounter as number)--;
      }
      else {
        IsUpgraded = false;
      }
    }
    card.IsUpgraded = IsUpgraded;
    const index = getSameCardIndex(currentHolding.Cards, card);
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
    if (Id === CardsWithUpgradeCounter.YuyukoSing) {
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