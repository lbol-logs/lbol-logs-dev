import CharacterImage from 'components/common/parts/characterImage';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';

function RoundTurnWidget({ round, turn, id }: { round: number, turn: number, id: string }) {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const isPlayer = id === 'Player';

  let unit;

  if (isPlayer) unit = <CharacterImage character={Character} />;
  else unit = <LazyLoadImage2 callback={getCommonImage} name={id} alt={t(id, { ns: 'units' })} />;

  return (
    <div className="p-battle-details__line">
      <span className="p-battle-details__round">
        <Trans
          i18nKey="roundCounter"
          ns="log"
          values={{ 0: round }}
        />
      </span>
      <span className="p-battle-details__turn">
        <Trans
          i18nKey="turnCounter"
          ns="log"
          values={{ 0: turn }}
        />
      </span>
      {unit}
    </div>
  );
}

export default RoundTurnWidget;