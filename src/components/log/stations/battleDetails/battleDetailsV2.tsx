import { useTranslation } from 'react-i18next';
import { TObj, TObjAny, TObjNumber } from 'utils/types/common';
import CardCards from 'components/log/entityCards/cardCards';
import StatusEffectsWidgetV2 from './parts/statusEffectsWidgetV2';
import { TStatus, TTurns } from 'utils/types/runData';
import IntentionsWidget from './parts/intentionsWidget';
import RoundTurnWidget from './parts/roundTurnWidget';
import BattleStatusWidget from './parts/battleStatusWidget';
import BattleDetailsItem from './parts/battleDetailsItem';

function BattleDetailsV2({ details, enemy, status: lastStatus }: { details: Array<TObjAny>, enemy: string, status: TStatus }) {
  const { t } = useTranslation();

  const turns = details as TTurns;
  const lastStatuses: TObj<TObjNumber> = {};

  const { Hp, Power } = lastStatus;
  const o = { Hp, Power };
  lastStatuses['Player'] = o;
  lastStatuses[enemy] = {};

  const startOfTurn = t('startOfTurn', { ns: 'log' });
  const endOfTurn = t('endOfTurn', { ns: 'log' });

  return (
    <div className="p-battle-details">
      {turns.map((turn, i) => {
        const { Round, Turn, Id, Cards, Intentions, Status, StatusEffects } = turn;
        const isPlayer = Id === 'Player';

        let cards, intentions;

        if (Cards) cards = <BattleDetailsItem label={startOfTurn} children={<CardCards cards={Cards} />} />;
        if (Intentions) intentions = <BattleDetailsItem label={endOfTurn} children={<IntentionsWidget intentions={Intentions} />} />;

        const status = <BattleDetailsItem label={endOfTurn} children={<BattleStatusWidget status={Status} lastStatus={lastStatuses[Id]} />} />;
        lastStatuses[Id] = Status;

        const se = <BattleDetailsItem label={endOfTurn} children={<StatusEffectsWidgetV2 statusEffects={StatusEffects} />} />;

        return (
          <div className={`p-battle-details__row ${isPlayer ? 'p-battle-details__row--player' : 'p-battle-details__row--enemy'} js-round-${Round}`} key={i}>
            <div className="p-battle-details__body">
              <RoundTurnWidget round={Round} turn={Turn} id={Id} />
              {cards}
              {status}
              {se}
              {intentions}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BattleDetailsV2;