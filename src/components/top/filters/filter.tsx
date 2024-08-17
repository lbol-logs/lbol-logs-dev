import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CharactersWidget from './charactersWidget';
import DifficultiesWidget from './difficultiesWidget';
import ColorsWidget from './colorsWidget';
import RequestsWidget from './requestsWidget';
import StartingExhibitsWidget from './startingExhibitsWidget';
import ResultsWidget from './resultsWidget';

import { Form, useSearchParams } from 'react-router-dom';
import { RunListContext } from 'contexts/runListContext';

import useFilter from 'hooks/useFilter';

const toggleCheckedClassName = 'p-filter__toggle--checked';

export { toggleCheckedClassName };

function Filter() {
  const { t } = useTranslation();
  const { filter, setFilter } = useContext(RunListContext);
  const { version, configsData } = useContext(CommonContext);
  const [searchParams] = useSearchParams();

  const {
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
  } = useFilter({ filter, setFilter, version, configsData, searchParams });

  let startingExhibitsRow = null;
  let swappedExhibitsRow = null;

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

  return (
    <Form action="./" className="p-filter js-filter" ref={formRef}>
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
              <input type="radio" name="e" value="startingExhibit" onChange={onExhibitChange} />
              {startingExhibit}
            </label>
            <label>
              <input type="radio" name="e" value="swappedExhibit" onChange={onExhibitChange} />
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
            {/* <SortWidget onChange={onRadioChange} /> */}
          </div>
        </div>
        <div className="p-filter__buttons">
          <button className="p-filter__button p-filter__button--apply">{t('apply', { ns: 'runList' })}</button>
          <button className="p-filter__button p-filter__button--reset" onClick={reset}>{t('reset', { ns: 'runList' })}</button>
        </div>
    </Form>
  );
}

export default Filter;