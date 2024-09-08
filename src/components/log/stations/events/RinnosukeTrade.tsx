import { SpecialExhibit, TDialogueConfigs, TExhibits, TradeStation, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import { useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';

function RinnosukeTrade({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  useTranslation();

  const { Data } = station;

  const { Choices, Prices } = Data;

  const id = TradeStation.RinnosukeTrade.toString();
  const configs = configsData.dialogues[id];

  let sell = null;
  let exchange = null;

  {
    const { current, next: options } = configs[0];

    const choices: Array<number | string> = [];
    let exhibits: Array<TExhibits> = [];

    if (!Prices) {
      choices.push('0_invalid');
      choices.push('1_invalid');
    }
    else {
      choices.push(0);
      exhibits = Object.keys(Prices).map(exhibit => [exhibit]);
      if (exhibits.length === 2) choices.push(1);
      else choices.push('1_invalid');
    }
    choices.push(2);

    const [next, invalids] = getNext(options, choices);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    Object.values(Prices).forEach((price, i: number) => {
      const values = { 1: price };
      props[i] = { values };
    });

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      invalids,
      exhibits
    };

    sell = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];

      const exhibits = [[SpecialExhibit.WaijieYanjing.toString(), SpecialExhibit.WaijieYouxiji.toString()]];

      const [next] = getNext(options);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      exchange = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__body">
            <div className="p-dialogues">
              {sell}
              {exchange}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default RinnosukeTrade;