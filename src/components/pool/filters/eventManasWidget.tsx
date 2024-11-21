import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { TBaseMana } from 'utils/types/runData';
import { ChangeEventHandler, useContext } from 'react';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { TPool } from 'utils/types/others';
import { toggleIsChecked } from 'utils/functions/helpers';

function EventManasWidget({ onChange, name, baseMana, excludes }: { onChange: ChangeEventHandler, name: string, baseMana: TBaseMana, excludes: string }) {
  const { filter } = useContext(CardPoolContext);

  if (!baseMana) return null;
  const { [name as keyof TPool]: ev } = filter;

  const array = excludes.split('');
  const finalBaseMana = Array.from(new Set(baseMana.split(''))).filter(mana => !array.includes(mana));

  return (
    <>
      {finalBaseMana.map(mana => {
        const isChecked = mana === ev;

        return (
          <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={mana}>
            <BaseManaWidget mana={mana} />
            <input className="p-filter__checkbox" type="radio" onChange={onChange} name={name} value={mana} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default EventManasWidget;