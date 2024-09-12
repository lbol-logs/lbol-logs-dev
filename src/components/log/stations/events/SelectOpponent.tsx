import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import { useTranslation } from 'react-i18next';

function SelectOpponent({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Data } = station;
  const { Choices, Opponents } = Data;

  const id = 'SelectOpponent';
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];

  const { current, next: options } = configs;

  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];

  Opponents.forEach((opponent: string, i: number) => {
    const values = { 0: t(opponent, { ns: 'units' }) };
    props[i] = { values };
  });
  {
    const values = { 0: eventConfigs.power };
    props[3] = { values };
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props
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
    </div>
  );
}

export default SelectOpponent;