import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TChoice } from 'utils/types/others';

function ShinmyoumaruForge({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices, HasUpgradableBasics, HasNonBasics, LoseMax } = Data;

  const id = Id as string;
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];

  const { upgrade, transform } = eventConfigs;
  const { current, next: options } = configs;

  const choices: Array<number | string> = [];

  if (HasUpgradableBasics) choices.push(0);
  if (HasNonBasics) choices.push(1);
  choices.push(2, 3);

  const [next] = getNext(options, choices);
  const chosen = choices.indexOf(Choices[0]) as TChoice;

  const props: Array<TObjAny> = [];

  if (HasUpgradableBasics) {
    const values = { 0: upgrade };
    props[0] = { values };
  }
  {
    const values = { 0: transform, 1: LoseMax };
    const i = choices.indexOf(2);
    props[i] = { values };
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

export default ShinmyoumaruForge;