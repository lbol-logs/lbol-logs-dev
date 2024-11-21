import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';

function RarityFilter({ onChange }: { onChange: ChangeEventHandler }) {
  const { filter } = useContext(CardPoolContext);
  const { rr } = filter;
  const { t } = useTranslation();

  const rarities = ['Common', 'Uncommon', 'Rare'];

  return (
    <>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('rarity', { ns: 'site' })}</div>
        <div className="p-filter__values">
          {rarities.map(rarity => {
            const isChecked = rr ? rr.includes(rarity) : false;

            return (
              <label key={rarity}>
                <input type="checkbox" onChange={onChange} name="rr" value={rarity} checked={isChecked} />
                {t(`rarities.${rarity}`, { ns: 'log' })}
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RarityFilter;