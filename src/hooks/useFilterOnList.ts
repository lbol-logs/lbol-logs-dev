import { modsConfigsData } from 'configs/globals';
import { useEffect } from 'react';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { compareArrays, copyObject, getResultType, checkIsMod, getEntityNs } from 'utils/functions/helpers';
import { TDispatch, TObj } from 'utils/types/common';
import { TFilter, TRunList, TRunListItem } from 'utils/types/others';
import { TExhibits, TRequests } from 'utils/types/runData';

function useFilterOnList(list: TRunList, currentFilter: TFilter, setFilteredList: TDispatch<TRunList>) {
  let filteredList = copyObject(list);
  const map: TObj<keyof TRunListItem> = {
    ch: 'character',
    sc: 'type',
    st: 'shining',
    sw: 'shining',
    di: 'difficulty',
    rq: 'requests',
    re: 'result'
  };
  const texts = DefaultFilter.texts;
  const radios = DefaultFilter.radios;
  const keys = DefaultFilter.keys;

  for (const [key, f] of Object.entries(currentFilter)) {
    const isTexts = texts.includes(key);
    const isRadio = radios.includes(key);
    if (isTexts) {
      if (key === keys.na) {
        const value = (f as string).toLowerCase();
        filteredList = filteredList.filter(e => e.name && e.name.toLowerCase().includes(value));
      }
      if (key === keys.no) {
        const value = (f as string).toLowerCase();
        filteredList = filteredList.filter(e => !e.name || !e.name.toLowerCase().includes(value));
      }
      if (key === keys.rs) {
        const value = Number(f as string);
        console.log(value, !isNaN(value));
        if (!isNaN(value)) filteredList = filteredList.filter(e => e.restarts !== undefined && e.restarts <= value);
      }
    }
    else if (isRadio) {
      if (key === keys.rt) {
        const value = f as string;
        if (value === DefaultFilter.rt.inactive) {
          filteredList = filteredList.filter(e => e.requests.length === 0);
        }
      }
    }
    else {
      const value = f as Array<string>;
      if (key === keys.ch) {
        const includesMods = value.includes('Mods');
        filteredList = filteredList.filter(e => {
          const character = e[map[key]] as string;
          const isCharacter = value.includes(character);
          const isModCharacter = includesMods ? checkIsMod(character) : false;
          return isCharacter || isModCharacter;
        });
      }
      else if (key === keys.sc) {
        const includesMods = value.filter(v => ['ModA', 'ModB'].includes(v)).map(v => v.replace(/^Mod/, ''));
        filteredList = filteredList.filter(e => {
          const character = e[map.ch] as string;
          const spellcard = character + e[map[key]] as string;
          const isSpellcard = value.includes(spellcard);
          if (isSpellcard) return true;

          if (!includesMods.length) return false;

          const isModCharacter = checkIsMod(character);
          if (!isModCharacter) return false;

          const isModSpellcard = includesMods.some(v => spellcard.endsWith(v));
          return isModSpellcard;
        });
      }
      else if (key === keys.rq) {
        filteredList = filteredList.filter(e => compareArrays(value, e[map[key]] as TRequests));
      }
      else if (key === keys.re) {
        filteredList = filteredList.filter(e => value.includes(getResultType(e[map[key]] as string)));
      }
      else if (key === keys.st) {
        const exhibits: TExhibits = [];
        const modsExhibits: TExhibits = [];
        for (const exhibit of value) {
          const [, isMod] = getEntityNs({ exhibit: { Id: exhibit } });
          if (isMod) modsExhibits.push(exhibit.replace(/^Mod/, ''));
          else exhibits.push(exhibit);
        }

        filteredList = filteredList.filter(e => {
          const exhibit = e[map[key]] as string;
          const isExhibit = exhibits.includes(exhibit);
          if (isExhibit) return true;

          const character = e[map.ch] as string;
          const isModCharacter = checkIsMod(character);
          if (!isModCharacter) return false;

          const { charactersConfigs } = modsConfigsData;
          const characterConfigs = charactersConfigs.get(character);
          if (characterConfigs === undefined) return false;

          const isModExhibit = modsExhibits.some(type => characterConfigs[type].Exhibit === exhibit);
          return isModExhibit;
        });
      }
      else {
        filteredList = filteredList.filter(e => value.includes(e[map[key]] as string));
      }
    }
  }

  useEffect(() => {
    setFilteredList(filteredList);
  }, [list, currentFilter]);
}

export default useFilterOnList;