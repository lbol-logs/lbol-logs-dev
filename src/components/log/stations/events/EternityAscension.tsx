import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';

function EternityAscension({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Card } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { hps } = eventsConfigs.get(id);

  const [next] = getNext(options);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];

  {
    const values = { 0: hps[0] };
    props[1] = { values };
  }
  {
    const values = { 0: hps[1] };
    props[2] = { values };
  }
  if (Card) cards[2] = convertCards([Card]);

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    cards
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

export default EternityAscension;