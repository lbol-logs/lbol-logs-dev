import { TDialogueConfigs, TExhibit, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObj, TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import { useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';
import ExhibitImages from 'components/common/parts/exhibitImages';

function Supply({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Type, Data } = station;

  const { Choices, Exhibits, Both } = Data;

  const id = Type;
  const configs = configsData.dialogues[id];

  const { current, next: options } = configs;
  
  if (!Both) delete options[2];

  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const tips: Array<JSX.Element> = [];

  // Exhibits.forEach((exhibit: string, i: number) => {
  //   const values = { 0: t(exhibit, { ns: 'exhibits' }) };
  //   props[i] = { values };
  //   const tip = <ExhibitCard exhibit={exhibit} />;
  //   tips[i] = tip;
  // });
  if (Both) {
    const values: TObj<string> = {};
    Exhibits.forEach((exhibit: TExhibit, i: number) => {
      values[i] = t(exhibit, { ns: 'exhibits' });
    });
    props[2] = { values };
    const tip = <ExhibitImages exhibits={Exhibits} />;
    tips[2] = tip;
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    tips,
    exhibits: Exhibits
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

export default Supply;