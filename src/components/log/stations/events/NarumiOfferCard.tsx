import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function NarumiOfferCard({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const eventConfigs = eventsConfigs.get(id);
  const configs = dialoguesConfigs.get(id);

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
    const { Type } = Data;

    const type = (Type as string).toLowerCase();

    const { current, next: options } = configs[1][type];

    const [next] = getNext(options);
    const chosen = Choices[1];

    const props: Array<TObjAny> = [];

    let values: TObjAny;
    const maxhp = eventConfigs[type];
    if (type === 'uncommon') {
      const { percent } = eventConfigs;
      values = { 0: percent, 1: maxhp };
    }
    else {
      values = { 0: maxhp };
    }
    props[0] = { values };

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    second = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
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

export default NarumiOfferCard;