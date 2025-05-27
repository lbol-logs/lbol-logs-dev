import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';
import { useTranslation } from 'react-i18next';

function YoumuDelivery({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Card } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { misfortune, exhibit } = eventsConfigs.get(id);

  const [next] = getNext(options);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  if (Card) {
    cards[0] = convertCards([Card], true);
  }
  const values = { 0: t(`${exhibit}.Name`, { ns: 'exhibits' }), 1: t(`${misfortune}.Name`, { ns: 'cards' }) };
  props[1] = { values };
  cards[1] = convertCards([misfortune]);
  exhibits[1] = [exhibit];

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

export default YoumuDelivery;