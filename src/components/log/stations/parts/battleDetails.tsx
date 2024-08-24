import CharacterImage from 'components/common/parts/CharacterImage';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { TObjAny } from 'utils/types/common';

function BattleDetails({ details }: { details: Array<TObjAny> }) {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  return (
    <div className="p-battle-details">
      {details.map((roundObj, i) => {
        const { Round, Id, Hp, Cards, Exhibit } = roundObj;
        const isPlayer = Id === 'Player';
        const unit = isPlayer
          ? <CharacterImage character={Character} />
          : <LazyLoadImage2 callback={getCommonImage} name={Id} alt={t(Id, { ns: 'enemies' })} />;

        return (
          <div className="p-battle-details__row" key={i}>
            <span className="p-battle-details__round">{Round}</span>
          </div>
        );
      })}
    </div>
  );
}

export default BattleDetails;