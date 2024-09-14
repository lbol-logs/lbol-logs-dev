import CharacterImage from 'components/common/parts/characterImage';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { TObjAny } from 'utils/types/common';
import { HpWidget } from './stationWidgets';
import CardCards from 'components/log/entityCards/cardCards';
import StatusEffectsWidget from './statusEffectsWidget';
import { CommonContext } from 'contexts/commonContext';

function BattleDetails({ details }: { details: Array<TObjAny> }) {
  const { holdingsWidth, asideHoldings } = useContext(CommonContext);
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const style = (asideHoldings.toString()  ? { '--holdings-width': Math.min(Math.max(487, holdingsWidth), 801) + 'px' } : {}) as React.CSSProperties;

  let statusEffects: Array<string> = [];

  return (
    <div className="p-battle-details" style={style}>
      {details.map((roundObj, i) => {
        const { Round, Id, Hp, Cards, Se } = roundObj;
        const isPlayer = Id === 'Player';
        let unit, cards, se;
        let lastHp;
        if (isPlayer) {
          unit = <CharacterImage character={Character} />;
          cards = <CardCards cards={Cards} />;
        }
        else {
          unit = <LazyLoadImage2 callback={getCommonImage} name={Id} alt={t(Id, { ns: 'units' })} />;
          if (Se) statusEffects = [...statusEffects, Se];
          se = <StatusEffectsWidget statusEffects={statusEffects} />;
        }
        if ((i - 2) in details) {
          ({ Hp: lastHp } = details[i - 2]);
        }
        const hp = <HpWidget hp={Hp} lastHp={lastHp} />;

        return (
          <div className={`p-battle-details__row ${isPlayer ? 'p-battle-details__row--player' : 'p-battle-details__row--enemy'} js-round-${Round}`} key={i}>
            <div className="p-battle-details__body">
              <div className="p-battle-details__line">
                <span className="p-battle-details__round">
                  <Trans
                    i18nKey="roundCounter"
                    ns="log"
                    values={{ 0: Round }}
                  />
                  </span>
                {unit}
                {hp}
              </div>
              {cards}
              {se}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BattleDetails;