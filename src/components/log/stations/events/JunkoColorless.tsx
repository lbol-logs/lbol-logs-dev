import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';

function JunkoColorless({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Data, Id } = station;

  const { Choices, BaseMana } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];

  const { current, next: options } = configs;

  const [next] = getNext(options, [0, 1]);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const tips: Array<JSX.Element> = [];

  const values = { 0: t(`${Id}.${options['0_0']}`, { ns: 'dialogues' }) };
  props[0] = { values };
  if (BaseMana) tips[0] = <BaseManaWidget baseMana={BaseMana} />;

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    tips
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

export default JunkoColorless;