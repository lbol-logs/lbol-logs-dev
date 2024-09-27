import { TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';

function KaguyaVersusMokou({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices, Hps } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { exhibits: _exhibits } = eventsConfigs.get(id);

  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const exhibits: Array<TExhibits> = [];

  {
    const values = { 0: Hps[0] };
    props[0] = { values };
    exhibits[0] = [_exhibits[0]];
  }
  {
    const values = { 0: Hps[1] };
    props[1] = { values };
    exhibits[1] = [_exhibits[1]];
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    exhibits
  };

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default KaguyaVersusMokou;