import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { TDispatch, TObj } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { copyObject } from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TPoolCheckbox, TPoolRadio, TPool } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';
import { useSubmit } from 'react-router-dom';
import { configsData } from 'configs/globals';
import Configs from 'utils/classes/Configs';

function usePool({ filter, setFilter, searchParams }: { filter: TPool, setFilter: TDispatch<TPool>, searchParams: URLSearchParams }) {
  const { t } = useTranslation();

  const [showPatchouliPhilosophy, setShowPatchouliPhilosophy] = useState(false);
  const [showJunkoColorless, setShowJunkoColorless] = useState(false);
  const [showCustomFilters, setShowCustomFilters] = useState(false);

  const PatchouliPhilosophy = t('PatchouliPhilosophy.Title', { ns: 'events' });
  const JunkoColorless = t('JunkoColorless.Title', { ns: 'events' });

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

  const { charactersConfigs, exhibitsConfigs } = configsData;
  const characters = charactersConfigs.ids;

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitsConfigs);

  function getExhibits(configs: Configs) {
    const startingExhibits: TObj<TExhibits> = {};
    const swappedExhibits: TObj<TExhibits> = {};
    for (const id of configs.ids) {
      const { Rarity, BaseMana, Owner } = configs.get(id);
      if (Rarity !== 'Shining') continue;
      const baseMana = BaseMana[0];
      if (Owner) {
        if (!(Owner in startingExhibits)) startingExhibits[Owner] = [];
         startingExhibits[Owner].push(id);
      }
      else {
        if (!(baseMana in swappedExhibits)) swappedExhibits[baseMana] = [];
        swappedExhibits[baseMana].push(id);
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
    apply(currentFilter);
  }

  function onEventsTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectEventsTypes(value);
    onRadioChange(e);
  }

  function onFilterTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectFilterTypes(value);
    onRadioChange(e);
  }

  function reflectTypes(key: string, value: string) {
    if (key === DefaultPool.keys.et) reflectEventsTypes(value);
    else if (key === DefaultPool.keys.ft) reflectFilterTypes(value);
  }

  function reflectEventsTypes(value: string) {
    if (!value || value === DefaultPool.et.none) {
      setShowPatchouliPhilosophy(false);
      setShowJunkoColorless(false);
    }
    if (value === DefaultPool.Events.PatchouliPhilosophy) {
      setShowPatchouliPhilosophy(true);
      setShowJunkoColorless(false);
    }
    else if (value === DefaultPool.Events.JunkoColorless) {
      setShowPatchouliPhilosophy(false);
      setShowJunkoColorless(true);
    }
  }

  function reflectFilterTypes(value: string) {
    const showCustomFilters = !!value && value === DefaultPool.ft.custom;
    setShowCustomFilters(showCustomFilters);
  }

  function apply(currentFilter: TPoolRadio = {}) {
    const data = deleteValues(currentFilter);
    submit(data);
  }

  function reset(e: MouseEvent<HTMLButtonElement>) {
    setFilter({});
    reflectEventsTypes(DefaultPool.get(DefaultPool.keys.et) as string);
    submit(null);
    e.preventDefault();
  }

  function deleteValues(currentFilter: TPoolRadio) {
    const data = new FormData(formRef.current as HTMLFormElement);
    for (const key of DefaultPool.radios) {
      const value = data.get(key);
      if (value === DefaultPool.check(key)) data.delete(key);

      if (key === DefaultPool.keys.et) {
        if (value !== DefaultPool.check(key)) {
          for (const [ev, name] of Object.entries(DefaultPool.ev)) {
            if (value === ev) {
              const v = currentFilter[name as keyof TPoolRadio] as string;
              if (v) data.set(name, v);
            }
            else {
              data.delete(name);
            }
          }
        }
      }
      data.delete(DefaultPool.sd);
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
    showCustomFilters,
    characters,
    startingExhibits,
    swappedExhibits,
    PatchouliPhilosophy,
    JunkoColorless,
    formRef,
    onCheckboxChange,
    onRadioChange,
    onEventsTypesChange,
    onFilterTypesChange,
    reset
  };
}

export default usePool;