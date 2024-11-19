import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import DefaultPool from 'utils/classes/DefaultPool';
import { TFilterRadio } from 'utils/types/others';

function EventsTypes({ onChange, PatchouliPhilosophy, JunkoColorless }: { onChange: ChangeEventHandler, PatchouliPhilosophy: string, JunkoColorless: string }) {
  const { filter } = useContext(CardPoolContext);
  const { et } = filter as TFilterRadio;

  const o = {
    none: 'N/A',
    PatchouliPhilosophy,
    JunkoColorless
  };
  const defaultType = DefaultPool.check(DefaultPool.keys.et);

  return (
    <>
      {Object.entries(o).map(([value, text]) => {
        const isChecked = (et || defaultType) === value;

        return (
          <label key={value}>
            <input type="radio" name="et" value={value} onChange={onChange} checked={isChecked} />
            {text}
          </label>
        );
      })}
    </>
  );
}

export default EventsTypes;