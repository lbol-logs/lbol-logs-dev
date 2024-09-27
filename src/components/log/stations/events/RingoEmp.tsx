import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';
import { useTranslation } from 'react-i18next';

function RingoEmp({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data, Id } = station;

  const { Choices, Cards } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { card, misfortune } = eventsConfigs.get(id);

  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];

  const values = { 0: t(`${misfortune}.Name`, { ns: 'cards' }) };
  props[1] = { values };
  cards[0] = convertCards([card]);
  const _cards = [misfortune];
  if (Cards) _cards.unshift(...Cards);
  cards[1] = convertCards(_cards);

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

export default RingoEmp;