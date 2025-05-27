import { TCards, TDialogueConfigs, TExhibits, TRewards, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';
import { MoneyImage } from '../parts/stationWidgets';

function YachieOppression({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Exhibit, Id: enemyGroupId, Rounds } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { misfortune } = eventsConfigs.get(id);

    const [next] = getNext(options);
    const chosen = getChosen(Choices, 0);

    const cards: Array<TCards> = [];
    const exhibits: Array<TExhibits> = [];

    if (Exhibit) exhibits[0] = [Exhibit];
    cards[1] = convertCards([misfortune]);

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      cards,
      exhibits
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = getChosen(Choices, 1);
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];
      const { Money } = station.Rewards as TRewards;

      const [next] = getNext(options);

      const exhibits: Array<TExhibits> = [];

      exhibits[0] = [Exhibit];

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      const money = (
        <span className="c-station__money">
          <MoneyImage />
          {Money}
        </span>
      );

      second = (
        <>
          <EnemyCards id={enemyGroupId} />
          <div className="c-station__stats">
            <RoundsWidget rounds={Rounds} />
            {money}
          </div>
          <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
        </>
      );
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {first}
              {second}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default YachieOppression;