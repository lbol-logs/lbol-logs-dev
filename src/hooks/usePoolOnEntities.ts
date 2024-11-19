import { CONFIGS_DATA, configsData, latestVersion, modsConfigsData } from 'configs/globals';
import { TCardIds } from 'contexts/cardPoolContext';
import { useEffect, useMemo, useState } from 'react';
import BMana from 'utils/classes/BMana';
import Configs from 'utils/classes/Configs';
import DefaultPool from 'utils/classes/DefaultPool';
import { compareArrays, copyObject, getResultType, checkIsMod, getEntityNs } from 'utils/functions/helpers';
import { TDispatch, TObjString } from 'utils/types/common';
import { TPool } from 'utils/types/others';
import { TExhibits, TRequests } from 'utils/types/runData';

function usePoolOnEntities(currentFilter: TPool, setFilteredPool: TDispatch<TCardIds>) {
  const [loaded, setLoaded] = useState(false);

  // TODO
  // let filteredList = copyObject({});
  const filteredList: TCardIds = [];

  const radios = DefaultPool.radios;
  const keys = DefaultPool.keys;

  // TODO
  // for (const [key, f] of Object.entries(currentFilter)) {
  //   const isRadio = radios.includes(key);
  //   if (isRadio) {
  //     if (key === keys.rt) {
  //       const value = f as string;
  //       if (value === DefaultPool.rt.inactive) {
  //         filteredList = filteredList.filter(e => e.requests.length === 0);
  //       }
  //     }
  //   }
  //   else {
  //     const value = f as Array<string>;
  //     if (key === keys.ch) {
  //       const includesMods = value.includes('Mods');
  //       filteredList = filteredList.filter(e => {
  //         const character = e[map[key]] as string;
  //         const isCharacter = value.includes(character);
  //         const isModCharacter = includesMods ? checkIsMod(character) : false;
  //         return isCharacter || isModCharacter;
  //       });
  //     }
  //     else if (key === keys.sc) {
  //       const includesMods = value.filter(v => ['ModA', 'ModB'].includes(v)).map(v => v.replace(/^Mod/, ''));
  //       filteredList = filteredList.filter(e => {
  //         const character = e[map.ch] as string;
  //         const spellcard = character + e[map[key]] as string;
  //         const isSpellcard = value.includes(spellcard);
  //         if (isSpellcard) return true;

  //         if (!includesMods.length) return false;

  //         const isModCharacter = checkIsMod(character);
  //         if (!isModCharacter) return false;

  //         const isModSpellcard = includesMods.some(v => spellcard.endsWith(v));
  //         return isModSpellcard;
  //       });
  //     }
  //     else if (key === keys.rq) {
  //       filteredList = filteredList.filter(e => compareArrays(value, e[map[key]] as TRequests));
  //     }
  //     else if (key === keys.re) {
  //       filteredList = filteredList.filter(e => value.includes(getResultType(e[map[key]] as string)));
  //     }
  //     else if (key === keys.st) {
  //       const exhibits: TExhibits = [];
  //       const modsExhibits: TExhibits = [];
  //       for (const exhibit of value) {
  //         const [, isMod] = getEntityNs({ exhibit: { Id: exhibit } });
  //         if (isMod) modsExhibits.push(exhibit.replace(/^Mod/, ''));
  //         else exhibits.push(exhibit);
  //       }

  //       filteredList = filteredList.filter(e => {
  //         const exhibit = e[map[key]] as string;
  //         const isExhibit = exhibits.includes(exhibit);
  //         if (isExhibit) return true;

  //         const character = e[map.ch] as string;
  //         const isModCharacter = checkIsMod(character);
  //         if (!isModCharacter) return false;

  //         const { charactersConfigs } = modsConfigsData;
  //         const characterConfigs = charactersConfigs.get(character);
  //         if (characterConfigs === undefined) return false;

  //         const isModExhibit = modsExhibits.some(type => characterConfigs[type].Exhibit === exhibit);
  //         return isModExhibit;
  //       });
  //     }
  //     else {
  //       filteredList = filteredList.filter(e => value.includes(e[map[key]] as string));
  //     }
  //   }
  // }

  useEffect(() => {
    setFilteredPool(filteredList);
  }, [currentFilter]);

  const { ch, ex, et } = currentFilter;

  const invalid = !ch || !ex || !ex.length;

  useMemo(() => {
    if (invalid) return;
    setLoaded(false);
    (async() => {
        await CONFIGS_DATA.fetchAsync(latestVersion, ['characters', 'exhibits', 'events']);
        setLoaded(true);
    })();
  }, []);

  if (invalid || !loaded) return;

  const dummyConfigs = new Configs('dummy', {});
  let charactersConfigs = dummyConfigs;
  let exhibitsConfigs = dummyConfigs;
  if (loaded) {
    ({ charactersConfigs, exhibitsConfigs } = configsData);
  }

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