import CharacterImage from 'components/common/parts/characterImage';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { TObj, TObjAny, TObjNumber } from 'utils/types/common';
import { HpWidget } from '../parts/stationWidgets';
import CardCards from 'components/log/entityCards/cardCards';
import StatusEffectsWidget from '../parts/statusEffectsWidget';
import { TStatus, TTurns } from 'utils/types/runData';
import IntentionsWidget from './intentionsWidget';

function BattleDetailsV2({ details, enemy, status: lastStatus }: { details: Array<TObjAny>, enemy: string, status: TStatus }) {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const turns = details as TTurns;
  const lastStatuses: TObj<TObjNumber> = {};

  const { Hp, Power } = lastStatus;
  const o = { Hp, Power };
  lastStatuses['Player'] = o;
  lastStatuses[enemy] = {};

  let statusEffects: Array<string> = [];

  return (
    <div className="p-battle-details">
      {turns.map((turn, i) => {
        const { Round, Turn, Id, Cards, Intentions, Status, StatusEffects } = turn;
        const isPlayer = Id === 'Player';

        let cards, intentions, status, se;
        let unit;

        if (isPlayer) {
          unit = <CharacterImage character={Character} />;
          if (Cards) cards = <CardCards cards={Cards} />;
        }
        else {
          unit = <LazyLoadImage2 callback={getCommonImage} name={Id} alt={t(Id, { ns: 'units' })} />;
          if (Intentions) intentions = <IntentionsWidget intentions={Intentions} />
        }
        // if ((i - 2) in details) {
        //   ({ Hp: lastHp } = details[i - 2]);
        // }
        // const hp = <HpWidget hp={Hp} lastHp={lastHp} />;
        se = <StatusEffectsWidget statusEffects={statusEffects} />;

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
                {/* {hp} */}
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

export default BattleDetailsV2;