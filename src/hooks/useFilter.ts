import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { TConfigsData, TDispatch, TObj, TObjAny } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import copyObject from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TFilter, TFilterCheckbox, TFilterRadio } from 'utils/types/others';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { useSubmit } from 'react-router-dom';

function useFilter({ filter, setFilter, version, configsData, searchParams }: { filter: TFilter, setFilter: TDispatch<TFilter>, version: string, configsData: TConfigsData, searchParams: URLSearchParams }) {
  const { t } = useTranslation();

  const [showStartingExhibits, setShowStartingExhibits] = useState(false);
  const [showSwappedExhibits, setShowSwappedExhibits] = useState(false);

  const characterConfigs = configsData.characters;
  const exhibitConfigs = configsData.exhibits;
  const difficultyConfigs = use(getConfigs(version, 'difficulties'));
  const resultConfigs = use(getConfigs(version, 'results'));

  const characters = Object.keys(characterConfigs);

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitConfigs);
  const startingExhibit = t('startingExhibit', { ns: 'runList' });
  const swappedExhibit = t('swappedExhibit', { ns: 'runList' });

  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  function getExhibits(configs: TObjAny) {
    const startingExhibits: TObj<TExhibits> = {};
    const swappedExhibits: TObj<TExhibits> = {};
    for (const [id, { Rarity, BaseMana, Owner }] of Object.entries(configs)) {
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
    const sws: Array<HTMLInputElement> = Array.from(parent.querySelectorAll(`[name="${DefaultFilter.sw}"]`));
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
    if (name === DefaultFilter.co) currentFilter = handleColor(currentFilter, input, isChecked);
    setFilter(currentFilter);
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name as keyof TFilterRadio;
    const value = input.value;
    const currentFilter = copyObject(filter) as TFilterRadio;
    if (!(name in currentFilter)) currentFilter[name] = DefaultFilter.get(name) as string;
    currentFilter[name] = value;
    setFilter(currentFilter as TFilter);
  }

  function onExhibitsTypesChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    reflectExhibitsTypes(value);
    onRadioChange(e);
  }

  function reflectExhibitsTypes(value: string) {
    if (!value || value === DefaultFilter.all) {
      setShowStartingExhibits(false);
      setShowSwappedExhibits(false);
    }
    if (value === 'startingExhibit') {
      setShowStartingExhibits(true);
      setShowSwappedExhibits(false);
    }
    else if (value === 'swappedExhibit') {
      setShowStartingExhibits(false);
      setShowSwappedExhibits(true);
    }
  }

  function apply(e: MouseEvent<HTMLButtonElement>) {
    const data = deleteValues();
    submit(data);
    e.preventDefault();
  }

  function reset(e: MouseEvent<HTMLButtonElement>) {
    setFilter({});
    reflectExhibitsTypes(DefaultFilter.get(DefaultFilter.et) as string);
    submit(null);
    e.preventDefault();
  }

  function deleteValues() {
    const data = new FormData(formRef.current as HTMLFormElement);
    const et = data.get(DefaultFilter.et);
    if (et === DefaultFilter.all) data.delete(DefaultFilter.et);
    data.delete(DefaultFilter.co);
    return data;
  }

  useEffect(() => {
    const currentFilter: TFilter = {};
    const etKey = DefaultFilter.et;

    for (const [key, value] of Array.from(searchParams.entries())) {
      if (key === etKey) {
      }
      else {
        if (!(key in currentFilter)) currentFilter[key] = [];
        (currentFilter[key] as Array<string>).push(value);
      }
    }

    const etValue = searchParams.get(etKey) || DefaultFilter.get(etKey) as string;
    currentFilter[etKey as keyof TFilterRadio] = etValue;
    reflectExhibitsTypes(etValue);

    setFilter(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    showStartingExhibits,
    showSwappedExhibits,
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
    apply,
    reset
  };
}

export default useFilter;