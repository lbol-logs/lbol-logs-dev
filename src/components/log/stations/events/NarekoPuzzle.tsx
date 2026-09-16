import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { convertCards, getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function NarekoPuzzle({ station }: { station: TStation }) {
  const { dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Trade } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;

  const keys = ['A', 'B', 'C'];
  const choices: Array<number> = Object.keys(Trade).map(k => keys.indexOf(k));
  choices.push(3);

  const [next] = getNext(options, choices);
  const chosen = getChosen(Choices, 0, choices);

  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  for (const k of Object.keys(Trade)) {
    const i = choices.indexOf(keys.indexOf(k));
    const { Card, IsUpgraded, Exhibit } = Trade[k];
    cards[i] = convertCards([Card], IsUpgraded);
    if (Exhibit) exhibits[i] = [Exhibit];
  }

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

export default NarekoPuzzle;