import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TComponents, TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';

function MiyoiBartender({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices, Ids, Id: enemyGroupId, Exhibit, Rounds } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { exhibit, money, misfortunes } = eventsConfigs.get(id);

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];
    const cards: Array<TCards> = [];
    const exhibits: Array<TExhibits> = [];
    const afters: TComponents = [];

    exhibits[0] = [exhibit];

    const values = { 0: money };
    props[1] = { values };
    cards[1] = convertCards(misfortunes);

    if (Exhibit) exhibits[2] = [Exhibit];
    afters[2] = (
      <div className="p-enemies-container">
        {Ids.map((id: string, i: number) => {
          return (
            <EnemyCards id={id} key={i} />
          );
        })}
      </div>
    );

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      cards,
      exhibits,
      afters
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];

      const [next] = getNext(options);

      const exhibits: Array<TExhibits> = [];

      if (Exhibit) exhibits[0] = [Exhibit];

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      second = (
        <>
          <EnemyCards id={enemyGroupId} />
          <div className="c-station__stats">
            <RoundsWidget rounds={Rounds} />
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

export default MiyoiBartender;