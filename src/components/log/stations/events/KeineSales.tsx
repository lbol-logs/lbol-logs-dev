import { TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function KeineSales({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { money, power } = eventsConfigs.get(id);

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    {
      const values = { 0: money };
      props[0] = { values };
    }
    {
      const values = { 0: power };
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
      const { current, next: options } = configs[1];
      const { Questions } = Data;
      const { exhibits: _exhibits } = eventsConfigs.get(id);

      const [next] = getNext(options, Questions);

      let exhibits: Array<TExhibits> = [];

      exhibits = Questions.map((question: number) => [_exhibits[question]]);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
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

export default KeineSales;