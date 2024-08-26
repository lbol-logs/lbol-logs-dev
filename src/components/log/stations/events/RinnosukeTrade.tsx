import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObj, TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import { useTranslation } from 'react-i18next';
import ExhibitCard from 'components/log/entityCards/exhibitCard';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyImage } from '../parts/stationWidgets';

function RinnosukeTrade({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Data } = station;

  const { Choices, Prices } = Data;

  const id = 'RinnosukeTrade';
  const configs = configsData.dialogues[id];

  const { current, next: options } = configs[0];
  
  const choices: Array<number | string> = [];
  let exhibits: Array<string> = [];

  if (!Prices) {
    choices.push('0_invalid');
  }
  else {
    choices.push(0);
    exhibits = Object.keys(Prices);
    if (exhibits.length < 2) choices.push('1_invalid');
    else choices.push(1);
  }
  choices.push(2);

  const [next, invalids] = getNext(options, choices);
  const chosen = Choices[0];
console.log({next})
  const props: Array<TObjAny> = [];
  const randoms: Array<JSX.Element> = [];

  choices.forEach((_, i: number) => {
    const exhibit = exhibits[i];
    if (exhibit) {
      const values = {
        0: t(exhibit, { ns: 'exhibits' }),
        1: Prices[exhibit]
      };
      const components = { Money: <MoneyImage /> };
      props[i] = { values, components };
      const random = <ExhibitCard exhibit={exhibit} />;
      randoms[i] = random;
    }
  });

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    randoms,
    invalids
  };

  // TODO exchange

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
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

export default RinnosukeTrade;