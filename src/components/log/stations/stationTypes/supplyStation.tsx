import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObj, TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import {  PowerImage } from '../parts/stationWidgets';
import { useTranslation } from 'react-i18next';
import ExhibitCard from 'components/log/entityCards/exhibitCard';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import RewardsWidget from '../parts/rewardsWidget';

function SupplyStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Type, Data } = station;

  const { Choices, Exhibits, Both } = Data;

  const id = Type;
  const configs = configsData.dialogues[id];

  const { current, next: options } = configs;
  
  if (!Both) delete options[2];

  const next = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const randoms: Array<JSX.Element> = [];

  Exhibits.forEach((exhibit: string, i: number) => {
    const values = { 0: t(exhibit, { ns: 'exhibits' }) };
    props[i] = { values };
    const random = <ExhibitCard exhibit={exhibit} />
    randoms[i] = random;
  });
  if (Both) {
    const values: TObj<string> = {};
    Exhibits.forEach((exhibit: string, i: number) => {
      values[i] = t(exhibit, { ns: 'exhibits' });
    });
    props[2] = { values };
    const random = <ExhibitCards exhibits={Exhibits} />
    randoms[2] = random;
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    randoms
  };

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

export default SupplyStation;