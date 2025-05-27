import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function DoremyPortal({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Exhibit } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { money, exhibit, misfortune } = eventsConfigs.get(id);
  const { current, next: options } = configs;

  const [next] = getNext(options);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  exhibits[0] = [exhibit];
  const values = { 0: money };
  props[1] = { values };
  cards[1] = convertCards([misfortune]);
  if (Exhibit) {
    exhibits[1] = [Exhibit];
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    cards,
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

export default DoremyPortal;