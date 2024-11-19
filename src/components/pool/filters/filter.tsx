import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CharactersWidget from './charactersWidget';
import ColorsWidget from './colorsWidget';
import StartingExhibitsWidget from './startingExhibitsWidget';
import { Form, useSearchParams } from 'react-router-dom';
import { CardPoolContext } from 'contexts/cardPoolContext';
import usePool from 'hooks/usePool';
import { latestVersion } from 'configs/globals';

const toggleCheckedClassName = 'p-filter__toggle--checked';

export { toggleCheckedClassName };

function Filter() {
  const { t } = useTranslation();
  const { filter, setFilter } = useContext(CardPoolContext);
  const version = latestVersion;
  const [searchParams] = useSearchParams();

  const {
    characters,
    startingExhibits,
    swappedExhibits,
    formRef,
    onCheckboxChange,
    onRadioChange,
  } = usePool({ filter, setFilter, version, searchParams });

  return (
    <Form action="" className="p-filter" ref={formRef}>
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
      </div>
    </Form>
  );
}

export default Filter;