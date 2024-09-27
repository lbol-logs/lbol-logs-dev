import { TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { createArray, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TChoice } from 'utils/types/others';

function KosuzuBookstore({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { Exhibits } = Data;

    const choices: Array<number> = createArray(Exhibits.length, (_, i) => i);
    choices.push(3);
    const chosen = choices.indexOf(Choices[0]) as TChoice;

    const exhibits: Array<TExhibits> = [];

    Exhibits.forEach((exhibit: string, i: number) => exhibits[i] = [exhibit]);

    const [next] = getNext(options, choices);

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
      const { Returns } = Data;
      const { money } = eventsConfigs.get(id);

      const choices: Array<number | string> = [0];

      const currentComponents = { 0: money };
      const props: Array<TObjAny> = [];
      const exhibits: Array<TExhibits> = [];

      const values = { 0: money };
      props[0] = { values };

      if (Returns) {
        const offset = 1;
        Returns.forEach((exhibit: string, i: number) => {
          choices.push(i + offset);
          exhibits[i + offset] = [exhibit];
        });
      }
      else {
        choices.push('1_invalid');
      }

      const [next, invalids] = getNext(options, choices);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        currentComponents,
        next,
        chosen,
        props,
        invalids,
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

export default KosuzuBookstore;