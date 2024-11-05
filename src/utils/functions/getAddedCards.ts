import { copyObject, createArray, getCurrentLevel, getSameCardIndex } from 'utils/functions/helpers';
import { TObj } from 'utils/types/common';
import { TCard, TCardChanges, TCards, TStation, TStations } from 'utils/types/runData';

function getAddedCards({ CardRewards, CardChanges, Stations, station }: { CardRewards: Array<TCards>, CardChanges: TCardChanges, Stations: TStations, station: TStation }) {
  const { Type } = station;
  const isShop = Type === 'Shop';

  const currentCards = getCurrentLevel(CardChanges, Stations, station);
  const currentAddedCards = currentCards.filter(({ Type }) => Type === 'Add');
  const excludeCards: TCardChanges = [];

  type TCM = Array<TCards>;

  const matches: TCM = createArray(CardRewards.length, _ => new Array(0));

  function isUnique(matches: TCM) {
    const cards = matches.flat();
    for (const card of cards) {
      const index = getSameCardIndex(cards, card);
      if (index !== -1) return false;
    }
    return true;
  }

  function getNextDuplicate(cards: TCards) {
    const a: TCards = [];
    for (const card of cards) {
      if (getSameCardIndex(a, card) !== -1) return card;
      else a.push(card);
    }
  }

  function getNextPotential(currentMatches: TCM, nextDuplicate: TCard) {
    for (let k = 0; k < CardRewards.length; k++) {
      for (let i = 0; i < currentMatches.length; i++) {
        const a = currentMatches[i];

        const isMin = (a.length === k + 1 && getSameCardIndex(a, nextDuplicate) !== 1);
        if (isMin) return i;
      }
    }
  }

  function getCount(cards: TCards | TCardChanges, card: TCard) {
    return cards.filter(({ Id }) => Id === card.Id).length;
  }

  CardRewards.forEach((cards, i) => {
    for (const card of cards) {
      const currentCount = matches.reduce((a, b: TCards) => a + getCount(b, card), 0);
      const totalCount = getCount(currentAddedCards, card);
      if (currentCount === totalCount) continue;

      const index = getSameCardIndex(currentAddedCards, card);
      if (index !== -1) {
        if (!(i in matches)) matches[i] = [];
        matches[i].push(card);
      }
    }
  });

  if (!isShop) {
    while (!isUnique(matches)) {
      const currentMatches = copyObject(matches);
      const nextDuplicate = getNextDuplicate(currentMatches.flat()) as TCard;
      if (!nextDuplicate) break;
      const nextPotential = getNextPotential(currentMatches, nextDuplicate);
      for (let i = 0; i < currentMatches.length; i++) {
        if (i === nextPotential) continue;
        const index = getSameCardIndex(matches[i], nextDuplicate);
        if (index !== -1) matches[i].splice(index, 1);
      }
    }
  }

  const addedCards = matches.map((array, i) => {
    const excludes: TObj<Array<number>> = {};
    const _array = array.reduce((a: Array<number>, b: TCard) => {
      {
        const index = getSameCardIndex(currentAddedCards, b);
        excludeCards.push(currentAddedCards[index]);
      }

      const { Id } = b;
      const index = getSameCardIndex(CardRewards[i], b, excludes[Id]);
      if (index !== -1) {
        if (!(Id in excludes)) excludes[Id] = [];
        excludes[Id].push(index);
        return [...a, index];
      }
      else {
        return a;
      }
    }, []);
    return _array;
  });

  return { addedCards, excludeCards };
}

export default getAddedCards;