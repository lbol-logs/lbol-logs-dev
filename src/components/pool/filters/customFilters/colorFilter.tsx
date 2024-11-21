import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleIsChecked } from 'utils/functions/helpers';

function ColorFilter({ onChange }: { onChange: ChangeEventHandler }) {
  const { filter } = useContext(CardPoolContext);
  const { co } = filter;
  const { t } = useTranslation();

  const colors = 'WUBRGC'.split('');

  return (
    <>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('color', { ns: 'site' })}</div>
        <div className="p-filter__values">
          {colors.map(color => {
            const isChecked = co ? co.includes(color) : false;

            return (
              <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={color}>
                <BaseManaWidget mana={color} />
                <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="co" value={color} checked={isChecked} />
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ColorFilter;