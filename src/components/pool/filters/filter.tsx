import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CharactersWidget from './charactersWidget';
import ColorsWidget from './colorsWidget';
import StartingExhibitsWidget from './startingExhibitsWidget';
import { Form, useSearchParams } from 'react-router-dom';
import { CardPoolContext } from 'contexts/cardPoolContext';
import usePool from 'hooks/usePool';
import EventsTypes from './eventsTypes';
import DefaultPool from 'utils/classes/DefaultPool';
import EventManasWidget from './eventManasWidget';
import FiltersTypes from './filterTypes';
import CustomFilters from './customFilters/customFilters';
import ShowDiff from './showDiff';

function Filter({ baseManaWithoutEvent }: { baseManaWithoutEvent: string }) {
  const { t } = useTranslation();
  const { filter, setFilter } = useContext(CardPoolContext);
  const [searchParams] = useSearchParams();

  const o = usePool({ filter, setFilter, searchParams });
  if (!o) return null;

  const {
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
  } = o;

  let PatchouliPhilosophyRow = null;
  let JunkoColorlessRow = null;
  let customFiltersRows = null;

  if (showPatchouliPhilosophy) {
    PatchouliPhilosophyRow = (
      <div className="p-filter__row">
        <div className="p-filter__label">{PatchouliPhilosophy}</div>
        <div className="p-filter__values">
          <EventManasWidget onChange={onRadioChange} name={DefaultPool.et.pp} baseMana={baseManaWithoutEvent} excludes="P" />
        </div>
      </div>
    );
  }

  if (showJunkoColorless) {
    JunkoColorlessRow = (
      <div className="p-filter__row">
        <div className="p-filter__label">{JunkoColorless}</div>
        <div className="p-filter__values">
          <EventManasWidget onChange={onRadioChange} name={DefaultPool.et.jc} baseMana={baseManaWithoutEvent} excludes="CP" />
        </div>
      </div>
    );
  }

  if (showCustomFilters) {
    customFiltersRows = <CustomFilters onChange={onCheckboxChange} />;
  }

  return (
    <Form action="./" className="p-filter" ref={formRef}>
      <div className="p-filter__rows">
        <div className="p-filter__row">
          <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            <CharactersWidget onChange={onRadioChange} characters={characters} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('exhibit', { ns: 'common', count: 2 })}</div>
          <div className="p-filter__values u-flex-col">
            <div className="p-filter__exhibits p-filter__exhibits--pool">
              <StartingExhibitsWidget onChange={onCheckboxChange} startingExhibits={startingExhibits} characters={characters} />
            </div>
            <ColorsWidget onChange={onCheckboxChange} swappedExhibits={swappedExhibits} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('stations.Adventure', { ns: 'log' })}</div>
          <div className="p-filter__values u-flex-col-sp">
            <EventsTypes onChange={onEventsTypesChange} PatchouliPhilosophy={PatchouliPhilosophy} JunkoColorless={JunkoColorless} />
          </div>
        </div>
        {PatchouliPhilosophyRow}
        {JunkoColorlessRow}
        <div className="p-filter__row">
          <div className="p-filter__label">{t('showDiff', { ns: 'site' })}</div>
          <div className="p-filter__values">
            <ShowDiff />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('filter', { ns: 'runList' })}</div>
          <div className="p-filter__values p-filter__values--filterTypes u-flex-col-sp">
            <FiltersTypes onChange={onFilterTypesChange} />
          </div>
        </div>
        {customFiltersRows}
        <div className="p-filter__buttons">
          <button className="p-filter__button p-filter__button--reset" onClick={reset}>{t('reset', { ns: 'runList' })}</button>
        </div>
      </div>
    </Form>
  );
}

export default Filter;