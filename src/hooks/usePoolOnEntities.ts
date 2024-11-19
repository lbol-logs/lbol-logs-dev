import { CONFIGS_DATA, configsData, latestVersion } from 'configs/globals';
import { useEffect, useMemo, useState } from 'react';
import BMana from 'utils/classes/BMana';
import DefaultPool from 'utils/classes/DefaultPool';
import { convertCards } from 'utils/functions/helpers';
import { TDispatch } from 'utils/types/common';
import { TPool } from 'utils/types/others';
import { TCards } from 'utils/types/runData';

function usePoolOnEntities(currentFilter: TPool, setFilteredPool: TDispatch<TCards>) {
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

  useEffect(() => {
    const cardIds: Array<string> = [];
    if (!notReady) {
      const { cardsConfigs } = configsData;
      const { ids } = cardsConfigs;

      for (const id of ids) {
        const config = cardsConfigs.get(id);
        const cardConfigs = config.getAll();
        const { Owner, isMisfortune } = cardConfigs;

        if (isMisfortune) continue;
        if (Owner === ch) cardIds.push(id);
      }
    }
    const filteredList = convertCards(cardIds);
    setFilteredPool(filteredList);
  }, [currentFilter, notReady]);

  if (notReady) return;

  const { charactersConfigs, exhibitsConfigs } = configsData;

  const characterConfigs = charactersConfigs.get(ch);
  const { BaseMana } = characterConfigs;

  let baseMana = BaseMana;
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

  // TODO: setAdd, setRemove (last currentCardIds)
  // TODO: setCurrentCardIds

  return {
    baseMana,
    baseManaWithoutEvent
  };
}

export default usePoolOnEntities;