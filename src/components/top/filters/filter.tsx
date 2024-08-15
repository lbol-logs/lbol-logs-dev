import { CommonContext } from 'contexts/commonContext';
import { DOMElement, EventHandler, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterWidget from './characterWidget';

function Filter() {
  const { t } = useTranslation();

  const { configsData } = useContext(CommonContext);
  const characterConfigs = configsData.characters;

  const startingExhibit = t('startingExhibit', { ns: 'runList' });
  const swappedExhibit = t('swappedExhibit', { ns: 'runList' });
  const startingExhibits = (
    null
  );
  const swappedExhibits = (
    null
  );
  
  function onLabelClick(e: Event) {
    const className = 'p-filter__toggle--checked';
    const checkbox = e.target as HTMLInputElement;
    const label = checkbox.parentElement as HTMLElement;
    const isChecked = checkbox.checked;
    if (isChecked) label.classList.add(className);
    else label.classList.remove(className);
  }

  useEffect(() => {
    const toggles = document.querySelectorAll('.js-toggle');
    toggles.forEach(toggle => toggle.addEventListener('click', onLabelClick));
  }, []);

  return (
    <div className="p-filter js-filter">
      {/* TODO */}
        FILTER (WIP)
        <div className="p-filter__row">
          <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {Object.keys(characterConfigs).map(character => {
              return (
                <CharacterWidget character={character} key={character} />
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
        <div className="p-filter__row">
          <div className="p-filter__label">{startingExhibit}</div>
          <div className="p-filter__values">
            {startingExhibits}
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{swappedExhibit}</div>
          <div className="p-filter__values">
            {swappedExhibits}
          </div>
        </div>
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