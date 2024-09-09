import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function TewiThreat({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  const { moneys } = eventConfigs;

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    const values = { 0: moneys[0] };
    props[0] = { values };

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];
      const { card, misfortune } = eventConfigs;

      const [next] = getNext(options);

      const props: Array<TObjAny> = [];
      const cards: Array<TCards> = [];

      {
        const values = { 0: moneys[0] };
        props[0] = { values };
        cards[0] = convertCards([card]);
      }
      {
        const values = { 0: moneys[1] };
        props[1] = { values };
      }
      cards[2] = convertCards([misfortune]);

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

export default TewiThreat;