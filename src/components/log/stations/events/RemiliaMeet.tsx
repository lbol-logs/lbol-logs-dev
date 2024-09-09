import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function RemiliaMeet({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices, HasExhibit } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  const { current, next: options } = configs;
  const { cards: _cards, misfortune, exhibit } = eventConfigs;

  const choices = [0, HasExhibit ? '1_invalid' : 1, 2];

  const [next] = getNext(options, choices);
  const chosen = Choices[0];

  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  cards[0] = convertCards(_cards.concat(misfortune));
  cards[1] = convertCards(_cards);
  exhibits[1] = [exhibit];

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
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