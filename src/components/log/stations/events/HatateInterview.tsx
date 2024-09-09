import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function HatateInterview({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];

    const [next] = getNext(options);
    const chosen = Choices[0];

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];
      const { Values } = Data;
      const { cards: _cards, misfortune } = eventConfigs;

      const [next] = getNext(options);

      const props: Array<TObjAny> = [];
      const cards: Array<TCards> = [];

      _cards.forEach((card: string, i: number) => {
        if (i === 2) cards[i] = convertCards([card, misfortune]);
        else cards[i] = convertCards([card]);
      });

      {
        const values = { 1: Values[0] };
        props[1] = { values };
      }
      {
        const values = { 1: Values[1] };
        props[3] = { values };
      }

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        props,
        cards
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

export default HatateInterview;