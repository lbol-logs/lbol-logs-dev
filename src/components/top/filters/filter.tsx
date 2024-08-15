import { CommonContext } from 'contexts/commonContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterWidget from './characterWidget';
import { TObj, TObjAny } from 'utils/types/common';
import ExhibitWidget from './exhibitWidget';
import { TExhibits } from 'utils/types/runData';
import ManaWidget from 'components/common/parts/manaWidget';

function Filter() {
  const { t } = useTranslation();

  const { configsData } = useContext(CommonContext);
  const [character, setCharacter] = useState('');
  const [showStartingExhibits, setShowStartingExhibits] = useState(false);
  const [showSwappedExhibits, setSwappedExhibits] = useState(false);

  const characterConfigs = configsData.characters;
  const exhibitConfigs = configsData.exhibits;

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
  console.log({startingExhibits, swappedExhibits});

  const startingExhibit = t('startingExhibit', { ns: 'runList' });
  const swappedExhibit = t('swappedExhibit', { ns: 'runList' });

  let startingExhibitsRow = null;
  if (showStartingExhibits) {
    startingExhibitsRow = (
      <div className="p-filter__row">
        <div className="p-filter__label">{startingExhibit}</div>
        <div className="p-filter__values">
          {startingExhibits[character].map(exhibit => {
            return (
              <ExhibitWidget key={exhibit} onClick={onClick} exhibit={exhibit} />
            );
          })}
        </div>
      </div>
    );
  }

  let swappedExhibitsRow = null;
  if (showSwappedExhibits) {
    swappedExhibitsRow = (
      <div className="p-filter__row">
      <div className="p-filter__label">{swappedExhibit}</div>
      <div className="p-filter__values">
        {Object.entries(swappedExhibits).map(([color, exhibits]) => {
          return (
            <div className={`p-filter__color--${color}`}>
              <ManaWidget mana={color} />
              <div>
                {exhibits.map(exhibit => {
                  return (
                    <ExhibitWidget onClick={onClick} exhibit={exhibit} key={exhibit} />
                  );
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
    );
  }
  
  function onClick(e: React.MouseEvent<HTMLInputElement>) {
    const className = 'p-filter__toggle--checked';
    const checkbox = e.target as HTMLInputElement;
    const label = checkbox.parentElement as HTMLElement;
    const isChecked = checkbox.checked;
    if (isChecked) label.classList.add(className);
    else label.classList.remove(className);
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
          <div className="p-filter__values"></div>
            <label>
              <input type="radio" name="exhibit" value="startingExhibit" />
              {startingExhibit}
            </label>
            <label>
              <input type="radio" name="exhibit" value="swappedExhibit" />
              {swappedExhibit}
            </label>
        </div>
        {startingExhibitsRow}
        {swappedExhibitsRow}
        <div className="p-filter__row">
          <div className="p-filter__label">{t('difficulty', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('requests', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('result', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('sort', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {/* Newest / Oldest */}
          </div>
        </div>
    </div>
  );
}

export default Filter;