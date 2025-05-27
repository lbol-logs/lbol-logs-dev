import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';
import { useTranslation } from 'react-i18next';

function RemiliaMeet({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, HasExhibit } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { cards: _cards, misfortune, exhibit } = eventsConfigs.get(id);

  const choices = [0, HasExhibit ? 1 : '1_invalid', 2];

  const [next, invalids] = getNext(options, choices);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  {
    const values = { 0: t(`${misfortune}.Name`, { ns: 'cards' }) };
    props[0] = { values };
    cards[0] = convertCards(_cards.concat(misfortune));
  }
  {
    const values = { 0: t(`${exhibit}.Name`, { ns: 'exhibits' }) };
    props[1] = { values };
    cards[1] = convertCards(_cards);
    exhibits[1] = [exhibit];
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    invalids,
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

export default RemiliaMeet;