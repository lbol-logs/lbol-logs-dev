import { CommonContext } from 'contexts/commonContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharactersWidget from './charactersWidget';
import { TObj, TObjAny } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import DifficultiesWidget from './difficultiesWidget';
import ColorsWidget from './colorsWidget';
import RequestsWidget from './requestsWidget';
import StartingExhibitsWidget from './startingExhibitsWidget';
import ResultsWidget from './resultsWidget';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { useSearchParams } from 'react-router-dom';
import { RunListContext } from 'contexts/runListContext';
import copyObject from 'utils/functions/helpers';

const toggleCheckedClassName = 'p-filter__toggle--checked';

export { toggleCheckedClassName };

function Filter() {
  const { t } = useTranslation();
  const { filter, setFilter } = useContext(RunListContext);
  const { version, configsData } = useContext(CommonContext);
  const [searchParams] = useSearchParams();
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
  let startingExhibitsRow = null;
  let swappedExhibitsRow = null;

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

  if (showStartingExhibits) {
    startingExhibitsRow = (
      <div className="p-filter__row">
        <div className="p-filter__label">{startingExhibit}</div>
        <div className="p-filter__values">
          <StartingExhibitsWidget onChange={onCheckboxChange} startingExhibits={startingExhibits} characters={characters} />
        </div>
      </div>
    );
  }

  if (showSwappedExhibits) {
    swappedExhibitsRow = (
      <div className="p-filter__row">
      <div className="p-filter__label">{swappedExhibit}</div>
      <div className="p-filter__values p-filter__colors">
        <ColorsWidget onChange={onCheckboxChange} swappedExhibits={swappedExhibits} />
      </div>
    </div>
    );
  }
  
  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    const value = input.value;
    const isChecked = input.checked;
    const currentFilter = copyObject(filter);
    if (isChecked) {
      if (!(name in currentFilter)) currentFilter[name] = [];
      currentFilter[name].push(value);
    }
    else {
      const i = currentFilter[name].indexOf(value);
      if (i !== -1) currentFilter[name].splice(i, 1);
    }
    console.log({name,value,isChecked,currentFilter});
    setFilter(currentFilter);

    // const input = e.target as HTMLInputElement;
    // const label = input.closest('.p-filter__toggle') as HTMLLabelElement;
    // const isChecked = input.checked;
    // if (isChecked) label.classList.add(toggleCheckedClassName);
    // else label.classList.remove(toggleCheckedClassName);
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
  }

  // function onLoad() {
    // const inputs = Array.from(document.querySelectorAll('.p-filter__checkbox:checked'));
    // for (const input of inputs) {
    //   const label = input.closest('.p-filter__toggle') as HTMLLabelElement;
    //   label.classList.add(toggleCheckedClassName);
    // }
  // }

  useEffect(() => {
    const currentFilter = copyObject(filter);
    for (const [key, value] of Array.from(searchParams.entries())) {
      currentFilter[key] = value.split(',');
    }
    setFilter(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="p-filter js-filter">
      {/* TODO */}
        FILTER (WIP)
        <div className="p-filter__row">
          <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            <CharactersWidget onChange={onCheckboxChange} characters={characters} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('exhibit', { ns: 'common' })}</div>
          <div className="p-filter__values">
            <label>
              <input type="radio" name="exhibit" value="startingExhibit" onChange={onExhibitChange} />
              {startingExhibit}
            </label>
            <label>
              <input type="radio" name="exhibit" value="swappedExhibit" onChange={onExhibitChange} />
              {swappedExhibit}
            </label>
          </div>
        </div>
        {startingExhibitsRow}
        {swappedExhibitsRow}
        <div className="p-filter__row">
          <div className="p-filter__label">{t('difficulty', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            <DifficultiesWidget onChange={onCheckboxChange} difficulties={difficultyConfigs as Array<string>} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('requests', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {/* <RequestsWidget onChange={onCheckboxChange} requests={requestConfigs} /> */}
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('result', { ns: 'runList' })}</div>
          <div className="p-filter__values p-filter__values--results">
            <ResultsWidget results={resultConfigs as Array<string>} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('sort', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {/* Newest / Oldest */}
          </div>
        </div>
        <div className="p-filter__buttons">
          <div className="p-filter__button p-filter__button--apply">{t('apply', { ns: 'runList' })}</div>
          <div className="p-filter__button p-filter__button--reset">{t('reset', { ns: 'runList' })}</div>
        </div>
    </div>
  );
}

export default Filter;