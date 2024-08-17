import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TConfigsData, TDispatch, TObj, TObjAny } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import copyObject from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import { TFilter, TFilterCheckbox, TFilterRadio } from 'utils/types/others';
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
    return [startingExhibits, swappedExhibits];;
  }

  function getDefaultValue(name: string) {
    switch (name) {
      case 'ch':
        return [];
      case 'e':
        return 'startingExhibit';
      case 'st':
        return Object.values(startingExhibits).flat();
      default:
        return [];
    }
  }

  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    const value = input.value;
    const isChecked = input.checked;
    const currentFilter = copyObject(filter) as TFilterCheckbox;
    if (!(name in currentFilter)) currentFilter[name] = getDefaultValue(name) as Array<string>;
    if (isChecked) {
      currentFilter[name].push(value);
    }
    else {
      const i = currentFilter[name].indexOf(value);
      if (i !== -1) currentFilter[name].splice(i, 1);
    }
    console.log({name, value, isChecked, currentFilter})
    setFilter(currentFilter);
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    const value = input.value;
    const currentFilter = copyObject(filter) as TFilterRadio;
    if (!(name in currentFilter)) currentFilter[name] = getDefaultValue(name) as string;
    currentFilter[name] = value;
    setFilter(currentFilter);
  }

  function onExhibitChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    if (value === 'startingExhibit') {
      setShowStartingExhibits(true);
      setShowSwappedExhibits(false);
    }
    else if (value === 'swappedExhibit') {
      setShowStartingExhibits(false);
      setShowSwappedExhibits(true);
    }
    onRadioChange(e);
  }
  
  // const submit = useSubmit();
  function reset() {
    // const form = formRef.current as HTMLFormElement;
    setFilter({});
    // form.reset();
    // submit(null);
  }

  useEffect(() => {
    const currentFilter = copyObject(filter);
    for (const [key, value] of Array.from(searchParams.entries())) {
      currentFilter[key] = value.split(',');
    }
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
    onRadioChange,
    onExhibitChange,
    reset
  };
}

export default useFilter;