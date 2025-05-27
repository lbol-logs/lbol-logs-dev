import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TComponents, TObjAny } from 'utils/types/common';
import { getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { useTranslation } from 'react-i18next';
import BaseManasWidget from 'components/common/parts/baseManasWidget';

function JunkoColorless({ station }: { station: TStation }) {
  const { dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, BaseMana } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;

  const [next] = getNext(options, [0, 1]);
  const chosen = getChosen(Choices, 0);

  const props: Array<TObjAny> = [];
  const befores: TComponents = [];

  const values = { 0: t(`${Id}.${options['0_0']}`, { ns: 'dialogues' }) };
  props[0] = { values };
  if (BaseMana) befores[0] = <BaseManasWidget baseMana={BaseMana} />;

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    befores
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