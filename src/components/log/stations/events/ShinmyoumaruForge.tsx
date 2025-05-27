import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';

function ShinmyoumaruForge({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, HasUpgradableBasics, HasNonBasics, LoseMax } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { upgrade, transform } = eventsConfigs.get(id);
  const { current, next: options } = configs;

  const choices: Array<number | string> = [];

  if (HasUpgradableBasics) choices.push(0);
  if (HasNonBasics) choices.push(1);
  choices.push(2, 3);

  const [next] = getNext(options, choices);
  const chosen = getChosen(Choices, 0, choices);

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