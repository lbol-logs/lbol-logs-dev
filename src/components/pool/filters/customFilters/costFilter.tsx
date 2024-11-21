import CardManaWidget from 'components/log/modal/cardManaWidget';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleIsChecked } from 'utils/functions/helpers';

function CostFilter({ onChange }: { onChange: ChangeEventHandler }) {
  const { filter } = useContext(CardPoolContext);
  const { tc } = filter;
  const { t } = useTranslation();

  const costs = '0123456789X'.split('');

  return (
    <>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('color', { ns: 'site' })}</div>
        <div className="p-filter__values">
          {costs.map(cost => {
            const isChecked = tc ? tc.includes(cost) : false;

            return (
              <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={cost}>
                <CardManaWidget mana={cost} />
                <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="tc" value={cost} checked={isChecked} />
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CostFilter;