import { configsData, modsConfigsData } from 'configs/globals';
import { TCardIds } from 'contexts/cardPoolContext';
import { useEffect } from 'react';
import BMana from 'utils/classes/BMana';
import DefaultPool from 'utils/classes/DefaultPool';
import { compareArrays, copyObject, getResultType, checkIsMod, getEntityNs } from 'utils/functions/helpers';
import { TDispatch } from 'utils/types/common';
import { TPool } from 'utils/types/others';
import { TExhibits, TRequests } from 'utils/types/runData';

function usePoolOnEntities(currentFilter: TPool, setFilteredPool: TDispatch<TCardIds>) {
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

  const { ch, ex } = currentFilter;

  if (!ch || !ex || !ex.length) return;

  const { charactersConfigs, exhibitsConfigs } = configsData;
  const characterConfigs = charactersConfigs.get(ch);
  const { BaseMana } = characterConfigs;

  let baseMana = BaseMana;
  for (const exhibit of ex) {
    const exhibitConfigs = exhibitsConfigs.get(exhibit);
    const { BaseMana } = exhibitConfigs;
    baseMana = BMana.add(baseMana, BaseMana);
  }

  // TODO: setAdd, setRemove (last currentCardIds)
  // TODO: setCurrentCardIds

  return {
    baseMana
  };
}

export default usePoolOnEntities;