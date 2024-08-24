import { useTranslation } from 'react-i18next';
import { TObjAny } from 'utils/types/common';

function BattleDetails({ details }: { details: Array<TObjAny> }) {
  const { t } = useTranslation();

  return (
    <div className="p-battle-details">
      {details.map((roundObj, i) => {
        const { Round, Id, Hp, Cards, Exhibit } = roundObj;

        return (
          <div className="p-battle-details__row" key={i}>

          </div>
        );
      })}
    </div>
  );
}

export default BattleDetails;