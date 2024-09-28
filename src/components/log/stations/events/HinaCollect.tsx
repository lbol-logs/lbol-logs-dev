import { TCards, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function HinaCollect({ station }: { station: TStation }) {
  const { holdings } = useContext(LogContext);
  const { dialoguesConfigs, cardsConfigs } = configsData;

  const { Data, Id, Node: { Act, Level } } = station;

  const { Choices, Card } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;

  const [next] = getNext(options);
  const chosen = Choices[0];

  const cards: Array<TCards> = [];

  {
    const currentHoldingIndex = holdings.findIndex(({ Act: a, Level: l }) => Act === a && Level === l);
    const lastHolding = holdings[currentHoldingIndex - 1];
    const { Cards } = lastHolding;
    const _cards = Cards.filter(card => {
      const { isMisfortune, isUnremovable } = cardsConfigs.get(card);
      return isMisfortune && !isUnremovable;
    });
    cards[0] = _cards;
  }
  if (Card) cards[1] = convertCards([Card]);

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
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

export default HinaCollect;