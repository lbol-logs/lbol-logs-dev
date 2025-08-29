import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { TDispatch, TObj } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { copyObject, scroll } from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TFilter, TFilterCheckbox, TFilterRadio } from 'utils/types/others';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { useSubmit } from 'react-router-dom';
import { configsData } from 'configs/globals';
import Configs from 'utils/classes/Configs';

function useFilter({ filter, setFilter, version, searchParams }: { filter: TFilter, setFilter: TDispatch<TFilter>, version: string, searchParams: URLSearchParams }) {
  const { t } = useTranslation();

  const [showModFilter, setShowModFilter] = useState(false);
  const [showStartingExhibits, setShowStartingExhibits] = useState(false);
  const [showSwappedExhibits, setShowSwappedExhibits] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const { charactersConfigs, exhibitsConfigs } = configsData;
  const difficultyConfigs = use(getConfigs(version, 'difficulties'));
  const resultConfigs = use(getConfigs(version, 'results'));

  const characters = charactersConfigs.ids;

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitsConfigs);
  const startingExhibit = t(DefaultFilter.ExhibitTypes.startingExhibit, { ns: 'runList' });
  const swappedExhibit = t(DefaultFilter.ExhibitTypes.swappedExhibit, { ns: 'runList' });

  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

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

  function updateCheckbox(filter: TFilterCheckbox, name: string, value: string, isChecked: boolean) {
    const currentFilter = copyObject(filter) as TFilterCheckbox;
    if (!(name in currentFilter)) currentFilter[name] = DefaultFilter.get(name) as Array<string>;
    if (isChecked) {
      if (!currentFilter[name].includes(value)) currentFilter[name].push(value);
    }
    else {
      const i = currentFilter[name].indexOf(value);
      if (i !== -1) currentFilter[name].splice(i, 1);
    }
    return currentFilter;
  }

  function handleColor(filter: TFilterCheckbox, input: HTMLInputElement, isChecked: boolean) {
    const parent = input.closest('.p-filter__color') as HTMLDivElement;
    const sws: Array<HTMLInputElement> = Array.from(parent.querySelectorAll(`[name="${DefaultFilter.et.sw}"]`));
    let currentFilter = filter;
    for (const sw of sws) {
      sw.checked = isChecked;
      currentFilter = updateCheckbox(currentFilter, sw.name, sw.value, isChecked);
    }
    return currentFilter;
  }

  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    const value = input.value;
    const isChecked = input.checked;
    let currentFilter = updateCheckbox(filter, name, value, isChecked);
    console.log({name,value})
    if (name === DefaultFilter.keys.ch && value === DefaultFilter.ch.Mods) setShowModFilter(isChecked);
    if (name === DefaultFilter.et.co) currentFilter = handleColor(currentFilter, input, isChecked);
    setFilter(currentFilter);
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name as keyof TFilterRadio;
    const value = input.value;
    const currentFilter = copyObject(filter) as TFilterRadio;
    currentFilter[name] = value;
    setFilter(currentFilter as TFilter);
  }

  function onExhibitsTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectExhibitsTypes(value);
    onRadioChange(e);
  }
  function onRequestsTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectRequestsTypes(value);
    onRadioChange(e);
  }

  function reflectTypes(key: string, value: string) {
    if (key === DefaultFilter.keys.et) reflectExhibitsTypes(value);
    else if (key === DefaultFilter.keys.rt) reflectRequestsTypes(value);
  }

  function reflectModFilter(currentFilter: TFilter) {
    const key = DefaultFilter.keys.ch;
    const value = searchParams.getAll(key);
    const showModFilter = value && value.includes(DefaultFilter.ch.Mods);
    setShowModFilter(showModFilter);
  }

  function reflectExhibitsTypes(value: string) {
    if (!value || value === DefaultFilter.et.all) {
      setShowStartingExhibits(false);
      setShowSwappedExhibits(false);
    }
    if (value === DefaultFilter.ExhibitTypes.startingExhibit) {
      setShowStartingExhibits(true);
      setShowSwappedExhibits(false);
    }
    else if (value === DefaultFilter.ExhibitTypes.swappedExhibit) {
      setShowStartingExhibits(false);
      setShowSwappedExhibits(true);
    }
  }

  function reflectRequestsTypes(value: string) {
    setShowRequests(value === DefaultFilter.rt.active);
  }

  function apply(e: MouseEvent<HTMLButtonElement>) {
    const data = deleteValues();
    submit(data);
    scroll();
    e.preventDefault();
  }

  function reset(e: MouseEvent<HTMLButtonElement>) {
    setFilter({});
    reflectExhibitsTypes(DefaultFilter.get(DefaultFilter.keys.et) as string);
    submit(null);
    scroll();
    e.preventDefault();
  }

  function deleteValues() {
    const data = new FormData(formRef.current as HTMLFormElement);
    for (const key of DefaultFilter.radios) {
      const value = data.get(key);
      if (value === DefaultFilter.check(key)) data.delete(key);
    }
    for (const key of DefaultFilter.texts) {
      const s = data.get(key) as string;
      if (s !== null) {
        const value = s.trim();
        if (value === '') data.delete(key);
        else data.set(key, value);
      }
    }
    data.delete(DefaultFilter.et.co);
    return data;
  }

  function updateTypesFilter(currentFilter: TFilter, key: string) {
    const value = searchParams.get(key) || DefaultFilter.get(key) as string;
    currentFilter[key as keyof TFilterRadio] = value;
    reflectTypes(key, value);
    return currentFilter;
  }

  useEffect(() => {
    let currentFilter: TFilter = {};
    const keys = DefaultFilter.keys;
    const radios = DefaultFilter.radios;

    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!(key in keys)) continue;
      if (radios.includes(key)) continue;
      if (!(key in currentFilter)) currentFilter[key] = [];
      (currentFilter[key] as Array<string>).push(value);
    }

    reflectModFilter(currentFilter);
    for (const key of radios) {
      currentFilter = updateTypesFilter(currentFilter, key);
    }

    setFilter(currentFilter);
  }, [searchParams]);

  return {
    showModFilter,
    showStartingExhibits,
    showSwappedExhibits,
    showRequests,
    difficultyConfigs,
    resultConfigs,
    characters,
    startingExhibits,
    swappedExhibits,
    startingExhibit,
    swappedExhibit,
    formRef,
    onCheckboxChange,
    onExhibitsTypesChange,
    onRequestsTypesChange,
    apply,
    reset
  };
}

export default useFilter;