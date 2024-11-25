import { configsData } from 'configs/globals';
import { useEffect } from 'react';
import BMana from 'utils/classes/BMana';
import DefaultPool from 'utils/classes/DefaultPool';
import { convertCards, copyObject } from 'utils/functions/helpers';
import { TDispatch } from 'utils/types/common';
import { TCardMana, TPool } from 'utils/types/others';
import { TCards } from 'utils/types/runData';

function usePoolOnEntities({ currentFilter, validCards, setValidCards, setAddedValidCards, setRemovedValidCards }: { currentFilter: TPool, validCards: TCards, setValidCards: TDispatch<TCards>, setAddedValidCards: TDispatch<TCards>, setRemovedValidCards: TDispatch<TCards> }) {
  const { ch, ex, et, ft, co, rr, ct, tc } = currentFilter;

  const invalid = !ch || !ex || !ex.length;

  let baseMana: string;

  useEffect(() => {
    const cardIds: Array<string> = [];
    if (!invalid && baseMana) {
      const { cardsConfigs, exhibitsConfigs } = configsData;
      const { ids } = cardsConfigs;
      const charactersPool = [ch];
      ex.forEach(exhibit => {
        const { Owner } = exhibitsConfigs.get(exhibit);
        if (Owner && !charactersPool.includes(Owner)) charactersPool.push(Owner);
      });

      for (const id of ids) {
        const config = cardsConfigs.get(id);
        const cardConfigs = config.getAll();
        const { IsPooled, Owner, Colors = '', Cost, Rarity, Type, IsXCost, Keywords, isMisfortune } = cardConfigs;

        if (IsPooled === false) continue;
        if (Type === 'Tool') continue;
        if (isMisfortune) continue;
        if (Keywords && Keywords.includes('Gadgets')) continue;

        if (ft === DefaultPool.CardFilters.ChooseFriend) {
          if (Type !== 'Friend') continue;
        }
        const colors: Array<string> = Colors.split('');
        if (co && colors.every(color => !co.includes(color))) continue;
        if (rr && !rr.includes(Rarity)) continue;
        if (ct && !ct.includes(Type)) continue;

        let totalCost = Cost.length;
        const number = parseInt(Cost[0]);
        if (!isNaN(number)) {
          totalCost = totalCost - 1 + number;
        }

        if (tc && !tc.includes(totalCost.toString())) {
          const matchX = tc.includes('X') && IsXCost;
          if (!matchX) continue;
        }

        const isValidCharacter = checkCharactersPool(Owner, charactersPool);
        if (!isValidCharacter) continue;

        const isValidColor = checkColorsPool(colors);
        if (!isValidColor) continue;

        const canPayColorManas = checkColorManas(Cost);
        if (!canPayColorManas) continue;

        const canPayHybridManas = checkHybridManas(Cost);
        if (!canPayHybridManas) continue;

        const canPayAllManas = checkAllManas(totalCost);
        if (!canPayAllManas) continue;

        cardIds.push(id);
      }
    }
    const filteredCards = convertCards(cardIds);
    let addedValidCards: TCards = [];
    let removedValidCards: TCards = [];

    const lastValidCards = copyObject(validCards);
    if (lastValidCards.length && filteredCards.length) {
      addedValidCards = filteredCards.filter(({ Id }) => lastValidCards.findIndex(card => card.Id === Id) === -1);
      removedValidCards = lastValidCards.filter(({ Id }) => filteredCards.findIndex(card => card.Id === Id) === -1);
    }
    setAddedValidCards(addedValidCards);
    setRemovedValidCards(removedValidCards);
    setValidCards(filteredCards);
  }, [currentFilter, invalid]);

  if (invalid) return;

  function checkCharactersPool(Owner: string, charactersPool: Array<string>) {
    if (ft === DefaultPool.CardFilters.LilyChun || ft === DefaultPool.CardFilters.ChooseFriend) return true;
    else if (ft === DefaultPool.CardFilters.FindCollection) return Owner !== charactersPool[0];
    return !Owner || charactersPool.includes(Owner);
  }

  function checkColorsPool(colors: Array<string>) {
    if (ft === DefaultPool.CardFilters.ChooseFriend) return true;
    return ex?.includes('KongbaiKapai') || colors.every(color => baseMana.includes(color));
  }

  function checkColorManas(Cost: TCardMana) {
    let shortage = 0;
    const b = baseMana.split('');
    for (const color of 'WUBRGC') {
      const hasColorCost = Cost.filter(c => c === color).length;
      if (!hasColorCost) continue;
      const diff = b.filter(c => c === color).length - hasColorCost;
      if (diff < 0) shortage -= diff;
    }
    if (shortage > 0) shortage -= b.filter(c => c === 'P').length;
    return shortage <= 0;
  }

  function checkHybridManas(Cost: TCardMana) {
    const b = baseMana.split('');
    const hybridMana = Cost.find(c => c.startsWith('H'));
    if (!hybridMana) return true;

    const hybridCount = Cost.filter(c => c === hybridMana).length;
    const [, main, sub] = hybridMana.split('');
    const sum = [main, sub, 'P'].reduce((a, color) => a + b.filter(c => c === color).length, 0);
    return sum >= hybridCount;
  }

  function checkAllManas(totalCost: number) {
    if (ft === DefaultPool.CardFilters.LilyChun) return totalCost === 1;
    else if (ft === DefaultPool.CardFilters.ChooseFriend) return totalCost < 5;
    if (totalCost > 5) return true;
    const baseManaCount = baseMana.split('').filter(c => c !== 'A').length;
    return baseManaCount >= totalCost;
  }

  const { charactersConfigs, exhibitsConfigs } = configsData;

  const characterConfigs = charactersConfigs.get(ch);
  const { BaseMana } = characterConfigs;

  baseMana = BaseMana;
  for (const exhibit of ex) {
    const exhibitConfigs = exhibitsConfigs.get(exhibit);
    const { BaseMana } = exhibitConfigs;
    baseMana = BMana.add(baseMana, BaseMana);
  }

  const baseManaWithoutEvent = baseMana;

  const defaultType = DefaultPool.check(DefaultPool.keys.et);
  if (et !== undefined && et !== defaultType) {
    const { eventsConfigs } = configsData;
    if (eventsConfigs.has(et)) {
      const config = eventsConfigs.get(et);
      const { mana } = config;

      const key = DefaultPool.ev[et as keyof typeof DefaultPool.ev];
      const remove = currentFilter[key as keyof TPool] as string;

      if (remove) {
        baseMana = BMana.remove(baseMana, remove);
        baseMana = BMana.add(baseMana, mana);
      }
    }
  }

  return {
    baseMana,
    baseManaWithoutEvent
  };
}

export default usePoolOnEntities;