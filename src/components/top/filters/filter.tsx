import { CommonContext } from 'contexts/commonContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterWidget from './characterWidget';
import { TObj, TObjAny } from 'utils/types/common';
import { TExhibits } from 'utils/types/runData';
import DifficultiesWidget from './difficultiesWidget';
import ColorExhibitsWidget from './colorExhibitsWidget';
import RequestsWidget from './requestsWidget';
import StartingExhibitsWidget from './startingExhibitsWidget';
import ResultsWidget from './resultsWidget';

function Filter() {
  const { t } = useTranslation();

  const { configsData } = useContext(CommonContext);

  const defaultCharacters = ['Reimu', 'Marisa', 'Sakuya', 'Cirno'];

  const [characters, setCharacters] = useState(defaultCharacters);
  const [showStartingExhibits, setShowStartingExhibits] = useState(false);
  const [showSwappedExhibits, setShowSwappedExhibits] = useState(false);

  const {
    characters: characterConfigs,
    exhibits: exhibitConfigs,
    difficulties: difficultyConfigs,
    results: resultConfigs
  } = configsData;

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

  const [startingExhibits, swappedExhibits] = getExhibits(exhibitConfigs);

  const startingExhibit = t('startingExhibit', { ns: 'runList' });
  const swappedExhibit = t('swappedExhibit', { ns: 'runList' });

  let startingExhibitsRow = null;
  if (showStartingExhibits) {
    startingExhibitsRow = (
      <div className="p-filter__row">
        <div className="p-filter__label">{startingExhibit}</div>
        <div className="p-filter__values">
          <StartingExhibitsWidget onClick={onClick} characters={characters} startingExhibits={startingExhibits} />
        </div>
      </div>
    );
  }

  let swappedExhibitsRow = null;
  if (showSwappedExhibits) {
    swappedExhibitsRow = (
      <div className="p-filter__row">
      <div className="p-filter__label">{swappedExhibit}</div>
      <div className="p-filter__values p-filter__colors">
        {Object.entries(swappedExhibits).map(([color, exhibits]) => {
          return (
            <ColorExhibitsWidget key={color} onClick={onClick} color={color} exhibits={exhibits} />
          )
        })}
      </div>
    </div>
    );
  }
  
  function onClick(e: React.MouseEvent<HTMLInputElement>) {
    const className = 'p-filter__toggle--checked';
    const input = e.target as HTMLInputElement;
    const label = input.parentElement as HTMLElement;
    const isChecked = input.checked;
    if (isChecked) label.classList.add(className);
    else label.classList.remove(className);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <div className="p-filter js-filter">
      {/* TODO */}
        FILTER (WIP)
        <div className="p-filter__row">
          <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {Object.keys(characterConfigs).map(character => {
              return (
                <CharacterWidget onClick={onClick} character={character} key={character} />
              );
            })}
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('exhibit', { ns: 'common' })}</div>
          <div className="p-filter__values">
            <label>
              <input type="radio" name="exhibit" value="startingExhibit" onChange={onChange} />
              {startingExhibit}
            </label>
            <label>
              <input type="radio" name="exhibit" value="swappedExhibit" onChange={onChange} />
              {swappedExhibit}
            </label>
          </div>
        </div>
        {startingExhibitsRow}
        {swappedExhibitsRow}
        <div className="p-filter__row">
          <div className="p-filter__label">{t('difficulty', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            <DifficultiesWidget onClick={onClick} difficulties={difficultyConfigs as Array<string>} />
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('requests', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {/* <RequestsWidget onClick={onClick} requests={requestConfigs} /> */}
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