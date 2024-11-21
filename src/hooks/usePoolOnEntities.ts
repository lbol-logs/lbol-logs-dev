import { CONFIGS_DATA, configsData, latestVersion } from 'configs/globals';
import { useEffect, useMemo, useState } from 'react';
import BMana from 'utils/classes/BMana';
import DefaultPool from 'utils/classes/DefaultPool';
import { convertCards, copyObject } from 'utils/functions/helpers';
import { TDispatch } from 'utils/types/common';
import { TCardMana, TPool } from 'utils/types/others';
import { TCards } from 'utils/types/runData';

function usePoolOnEntities({ currentFilter, validCards, setValidCards, setAddedValidCards, setRemovedValidCards }: { currentFilter: TPool, validCards: TCards, setValidCards: TDispatch<TCards>, setAddedValidCards: TDispatch<TCards>, setRemovedValidCards: TDispatch<TCards> }) {
  const [loaded, setLoaded] = useState(false);

  const { ch, ex, et } = currentFilter;

  const invalid = !ch || !ex || !ex.length;

  useMemo(() => {
    if (invalid) return;
    setLoaded(false);
    CONFIGS_DATA.fetch(latestVersion, ['cards']);
    (async() => {
        await CONFIGS_DATA.fetchAsync(latestVersion, ['characters', 'exhibits', 'events']);
        setLoaded(true);
    })();
  }, [invalid]);

  const notReady = invalid || !loaded;
  let baseMana: string;
// TODO: filterTypes
  useEffect(() => {
    const cardIds: Array<string> = [];
    if (!notReady && baseMana) {
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
        const { IsPooled, Owner, Colors = '', Cost, Type, Keywords, isMisfortune } = cardConfigs;

        if (IsPooled === false) continue;
        if (Type === 'Tool') continue;
        if (isMisfortune) continue;
        if (Keywords && Keywords.includes('Gadgets')) continue;

        const isValidCharacter = checkCharactersPool(Owner, charactersPool);
        if (!isValidCharacter) continue;

        const isValidColor = checkColorsPool(Colors);
        if (!isValidColor) continue;

        const canPayColorManas = checkColorManas(Cost);
        if (!canPayColorManas) continue;

        const canPayHybridManas = checkHybridManas(Cost);
        if (!canPayHybridManas) continue;

        const canPayAllManas = checkAllManas(Cost);
        if (!canPayAllManas) continue;

        cardIds.push(id);
      }
    }
    const filteredCards = convertCards(cardIds);

    const lastValidCards = copyObject(validCards);
    if (lastValidCards.length && filteredCards.length) {
      const addedValidCards = filteredCards.filter(({ Id }) => lastValidCards.findIndex(card => card.Id === Id) === -1);
      setAddedValidCards(addedValidCards);
      const removedValidCards = lastValidCards.filter(({ Id }) => filteredCards.findIndex(card => card.Id === Id) === -1);
      setRemovedValidCards(removedValidCards);
    }
    setValidCards(filteredCards);
  }, [currentFilter, notReady]);

  if (notReady) return;

  function checkCharactersPool(Owner: string, charactersPool: Array<string>) {
    return !Owner || charactersPool.includes(Owner);
  }

  function checkColorsPool(Colors: string) {
    return ex?.includes('KongbaiKapai') || Colors.split('').every(color => baseMana.includes(color));
  }

  function checkColorManas(Cost: TCardMana) {
    let shortage = 0;
    const b = baseMana.split('');
    for (const color of 'WUBRGC') {
      const k = Cost.filter(c => c === color).length;
      if (!k) continue;
      const diff = b.filter(c => c === color).length - k;
      if (diff < 0) shortage -= diff;
    }
    if (shortage > 0) shortage -= b.filter(c => c === 'P').length;
    return shortage <= 0;
  }

  function checkHybridManas(Cost: TCardMana) {
    const b = baseMana.split('');
    const hybrid = Cost.find(c => c.startsWith('H'));
    if (!hybrid) return true;

    const k = Cost.filter(c => c === hybrid).length;
    const [, main, sub] = hybrid.split('');
    const sum = [main, sub, 'P'].reduce((a, color) => a + b.filter(c => c === color).length, 0);
    return sum >= k;
  }

  function checkAllManas(Cost: TCardMana) {
    let k = Cost.length;
    const number = parseInt(Cost[0]);
    if (!isNaN(number)) {
      k = k - 1 + number;
    }
    if (k > 5) return true;
    return baseMana.split('').filter(c => c !== 'A').length >= k;
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