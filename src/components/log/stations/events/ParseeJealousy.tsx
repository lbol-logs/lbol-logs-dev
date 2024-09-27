import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function ParseeJealousy({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { Exhibit } = Data;

    const [next] = getNext(options);
    const chosen = Choices[0];

    const exhibits: Array<TExhibits> = [];

    if (Exhibit) exhibits[0] = [Exhibit];

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      exhibits
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];
      const { Exhibits } = Data;
      const { misfortune } = eventsConfigs.get(id);

      const [next] = getNext(options);

      const cards: Array<TCards> = [];
      const exhibits: Array<TExhibits> = [];

      exhibits[0] = [Exhibits[0]];
      exhibits[1] = [Exhibits[1]];
      cards[2] = convertCards([misfortune]);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        cards,
        exhibits
      };

      second = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
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

export default ParseeJealousy;