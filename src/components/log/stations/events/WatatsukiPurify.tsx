import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function WatatsukiPurify({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, LoseMax } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { maxhp, cards: _cards, misfortune } = eventsConfigs.get(id);
  const { current, next: options } = configs;

  const [next] = getNext(options);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];

  {
    const values = { 0: LoseMax };
    props[0] = { values };
    cards[0] = convertCards(_cards);
  }
  {
    const values = { 0: maxhp };
    props[1] = { values };
    cards[1] = convertCards([misfortune]);
  }

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

export default WatatsukiPurify;