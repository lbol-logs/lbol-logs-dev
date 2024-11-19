import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { TDispatch, TObj } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { copyObject } from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TPoolCheckbox, TPoolRadio, TPool } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';
import { useSubmit } from 'react-router-dom';
import { CONFIGS_DATA, configsData } from 'configs/globals';
import Configs from 'utils/classes/Configs';

function usePool({ filter, setFilter, version, searchParams }: { filter: TPool, setFilter: TDispatch<TPool>, version: string, searchParams: URLSearchParams }) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  
  useMemo(() => {
    setLoaded(false);
    (async() => {
        await CONFIGS_DATA.fetchAsync(version, ['characters', 'exhibits']);
        setLoaded(true);
    })();
  }, [version]);
  const dummyConfigs = new Configs('dummy', {});
  let charactersConfigs = dummyConfigs;
  let exhibitsConfigs = dummyConfigs;
  if (loaded) {
    ({ charactersConfigs, exhibitsConfigs } = configsData);
  }

  const characters = charactersConfigs.ids;

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitsConfigs);

  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  function getExhibits(configs: Configs) {
    const startingExhibits: TObj<TExhibits> = {};
    const swappedExhibits: TObj<TExhibits> = {};
    for (const id of configs.ids) {
      const { Rarity, BaseMana, Owner } = configs.get(id);
      if (Rarity !== 'Shining') continue;
      if (Owner) {
        if (!(Owner in startingExhibits)) startingExhibits[Owner] = [];
         startingExhibits[Owner].push(id);
      }
      else {
        if (!(BaseMana in swappedExhibits)) swappedExhibits[BaseMana] = [];
        swappedExhibits[BaseMana].push(id);
      }
    }
    return [startingExhibits, swappedExhibits];
  }

  function updateCheckbox(filter: TPoolCheckbox, name: keyof TPoolCheckbox, value: string, isChecked: boolean) {
    const currentFilter = copyObject(filter) as TPoolCheckbox;
    if (!(name in currentFilter)) currentFilter[name] = DefaultPool.get(name) as Array<string>;
    if (isChecked) {
      if (!currentFilter[name]?.includes(value)) currentFilter[name]?.push(value);
    }
    else {
      const i = currentFilter[name]?.indexOf(value);
      if (i !== undefined && i !== -1) currentFilter[name]?.splice(i, 1);
    }
    return currentFilter;
  }

  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name as keyof TPoolCheckbox;
    const value = input.value;
    const isChecked = input.checked;
    const currentFilter = updateCheckbox(filter, name, value, isChecked);
    setFilter(currentFilter);
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name as keyof TPoolRadio;
    const value = input.value;
    const currentFilter = copyObject(filter) as TPoolRadio;
    currentFilter[name] = value;
    setFilter(currentFilter as TPool);
  }

  function reflectTypes(key: string, value: string) {
    // if (key === DefaultPool.keys.et) reflectExhibitsTypes(value);
    // else if (key === DefaultPool.keys.rt) reflectRequestsTypes(value);
  }

  function reflectRequestsTypes(value: string) {
    // seteShowRequests(value === DefaultPool.rt.active);
  }

  function updateTypesFilter(currentFilter: TPool, key: string) {
    const value = searchParams.get(key) || DefaultPool.get(key) as string;
    currentFilter[key as keyof TPoolRadio] = value;
    reflectTypes(key, value);
    return currentFilter;
  }

  useEffect(() => {
    let currentFilter: TPool = {};
    const keys = DefaultPool.keys;
    const radios = DefaultPool.radios;

    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!(key in keys)) continue;
      if (radios.includes(key)) continue;
      const _key = key as keyof TPoolCheckbox;
      if (!(key in currentFilter)) currentFilter[_key] = [];
      (currentFilter[_key] as Array<string>).push(value);
    }

    for (const key of radios) {
      currentFilter = updateTypesFilter(currentFilter, key);
    }

    setFilter(currentFilter);
  }, [searchParams]);

  return {
    characters,
    startingExhibits,
    swappedExhibits,
    formRef,
    onCheckboxChange,
    onRadioChange
  };
}

export default usePool;