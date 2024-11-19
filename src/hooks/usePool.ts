import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { TDispatch, TObj } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { copyObject } from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TPoolCheckbox, TPoolRadio, TPool } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';
import { useSubmit } from 'react-router-dom';
import { CONFIGS_DATA, configsData, latestVersion } from 'configs/globals';
import Configs from 'utils/classes/Configs';

function usePool({ filter, setFilter, searchParams }: { filter: TPool, setFilter: TDispatch<TPool>, searchParams: URLSearchParams }) {
  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [showPatchouliPhilosophy, setShowPatchouliPhilosophy] = useState(false);
  const [showJunkoColorless, setShowJunkoColorless] = useState(false);

  const PatchouliPhilosophy = t('PatchouliPhilosophy.Title', { ns: 'events' });
  const JunkoColorless = t('JunkoColorless.Title', { ns: 'events' });

  useMemo(() => {
    setLoaded(false);
    (async() => {
        await CONFIGS_DATA.fetchAsync(latestVersion, ['characters', 'exhibits']);
        setLoaded(true);
    })();
  }, []);

  // const dummyConfigs = new Configs('dummy', {});
  // let charactersConfigs = dummyConfigs;
  // let exhibitsConfigs = dummyConfigs;
  // if (loaded) {
  //   ({ charactersConfigs, exhibitsConfigs } = configsData);
  // }

  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

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
  }, []);

  if (!loaded) return;

  const { charactersConfigs, exhibitsConfigs } = configsData;
  const characters = charactersConfigs.ids;

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitsConfigs);

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
    apply();
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name as keyof TPoolRadio;
    const value = input.value;
    const currentFilter = copyObject(filter) as TPoolRadio;
    currentFilter[name] = value;
    setFilter(currentFilter as TPool);
    apply();
  }

  function onEventsTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectEventsTypes(value);
    onRadioChange(e);
  }

  function reflectTypes(key: string, value: string) {
    if (key === DefaultPool.keys.et) reflectEventsTypes(value);
  }

  function reflectEventsTypes(value: string) {
    if (!value || value === DefaultPool.et.none) {
      setShowPatchouliPhilosophy(false);
      setShowJunkoColorless(false);
    }
    if (value === 'PatchouliPhilosophy') {
      setShowPatchouliPhilosophy(true);
      setShowJunkoColorless(false);
    }
    else if (value === 'JunkoColorless') {
      setShowPatchouliPhilosophy(false);
      setShowJunkoColorless(true);
    }
  }

  function apply() {
    const data = deleteValues();
    submit(data);
  }

  function reset(e: MouseEvent<HTMLButtonElement>) {
    setFilter({});
    reflectEventsTypes(DefaultPool.get(DefaultPool.keys.et) as string);
    submit(null);
    e.preventDefault();
  }

  function deleteValues() {
    const data = new FormData(formRef.current as HTMLFormElement);
    for (const key of DefaultPool.radios) {
      const value = data.get(key);
      if (value === DefaultPool.check(key)) data.delete(key);
    }
    return data;
  }

  function updateTypesFilter(currentFilter: TPool, key: string) {
    const value = searchParams.get(key) || DefaultPool.get(key) as string;
    currentFilter[key as keyof TPoolRadio] = value;
    reflectTypes(key, value);
    return currentFilter;
  }

  return {
    showPatchouliPhilosophy,
    showJunkoColorless,
    characters,
    startingExhibits,
    swappedExhibits,
    PatchouliPhilosophy,
    JunkoColorless,
    formRef,
    onCheckboxChange,
    onRadioChange,
    onEventsTypesChange,
    reset
  };
}

export default usePool;