import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function MystiaBbq({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices, Values } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { money } = eventsConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    {
      const values = { 0: Values[1] };
      props[0] = { values };
    }
    {
      const values = { 0: Values[0] };
      props[1] = { values };
    }

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
      const { current, next: options } = configs[1][Choices[0]];

      const [next] = getNext(options);

      const currentComponents = { 0: money };
      const props: Array<TObjAny> = [];

      const values = { 0: money };
      props[0] = { values };

      const dialogueConfigs: TDialogueConfigs = {
        current,
        currentComponents,
        next,
        chosen,
        props
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

export default MystiaBbq;