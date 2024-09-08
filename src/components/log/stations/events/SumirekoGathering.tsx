import { SpecialExhibit, TCards, TDialogueConfigs, TradeStation, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';

function SumirekoGathering({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data } = station;

  const { Choices, Card, Cards, HasMoney } = Data;

  const id = TradeStation.SumirekoGathering.toString();
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  let card = null;
  let exhibit = null;

  if (Cards) {
    const { current, next: options } = configs[0];

    const choices: Array<number | string> = [];
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];
    const cards: Array<TCards> = [];

    const _cards = convertCards(Cards);

    if (Card) {
      cards[0] = [Card, ..._cards];
      choices.push(0);
    }
    else {
      choices.push('0_invalid');
    }

    if (HasMoney) {
      cards[1] = _cards;
      const { money } = eventConfigs;
      const values = { 0: money };
      props[1] = { values };
      choices.push(1);
    }
    else {
      choices.push('1_invalid');
    }
    choices.push(2);

    const [next, invalids] = getNext(options, choices);

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      invalids,
      cards
    };

    card = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];

      const exhibits = [[SpecialExhibit.WaijieYouxiji.toString(), SpecialExhibit.WaijieYanshuang.toString()]];

      const [next] = getNext(options);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      exhibit = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__body">
            <div className="p-dialogues">
              {card}
              {exhibit}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default SumirekoGathering;