import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CharactersWidget from './charactersWidget';
import DifficultiesWidget from './difficultiesWidget';
import ColorsWidget from './colorsWidget';
import RequestsTypes from './requestsTypes';
import StartingExhibitsWidget from './startingExhibitsWidget';
import ResultsWidget from './resultsWidget';
import { Form, useSearchParams } from 'react-router-dom';
import { RunListContext } from 'contexts/runListContext';
import useFilter from 'hooks/useFilter';
import ExhibitsTypes from './exhibitsTypes';
import SpellcardsWidget from './spellcardsWidget';

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
  } = useFilter({ filter, setFilter, version, configsData, searchParams });

  let startingExhibitsRow = null;
  let swappedExhibitsRow = null;

  const { sc } = filter;
  const hasSpellcard = sc ? sc.length : false;

  if (!hasSpellcard && showStartingExhibits) {
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
      <div className="p-filter__values u-flex-col">
        <ColorsWidget onChange={onCheckboxChange} swappedExhibits={swappedExhibits} />
      </div>
    </div>
    );
  }

  return (
    <Form action="./" className="p-filter" ref={formRef}>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
        <div className="p-filter__values">
          <CharactersWidget onChange={onCheckboxChange} characters={characters} />
        </div>
      </div>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('spellcard', { ns: 'runList' })}</div>
        <div className="p-filter__values">
          <SpellcardsWidget onChange={onCheckboxChange} characters={characters} />
        </div>
      </div>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('exhibit', { ns: 'common', count: 2 })}</div>
        <div className="p-filter__values u-flex-col-sp">
          <ExhibitsTypes onChange={onExhibitsTypesChange} startingExhibit={startingExhibit} swappedExhibit={swappedExhibit} />
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
        <div className="p-filter__values u-flex-col">
          <RequestsTypes onRequestsTypesChange={onRequestsTypesChange} onRequestsChange={onCheckboxChange} showRequests={showRequests} />
        </div>
      </div>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('result', { ns: 'runList' })}</div>
        <div className="p-filter__values u-flex-col-sp">
          <ResultsWidget onChange={onCheckboxChange} results={resultConfigs as Array<string>} />
        </div>
      </div>
      <div className="p-filter__buttons">
        <button className="p-filter__button p-filter__button--apply" onClick={apply}>{t('apply', { ns: 'runList' })}</button>
        <button className="p-filter__button p-filter__button--reset" onClick={reset}>{t('reset', { ns: 'runList' })}</button>
      </div>
    </Form>
  );
}

export default Filter;