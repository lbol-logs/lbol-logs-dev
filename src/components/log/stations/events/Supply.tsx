import { TDialogueConfigs, TExhibit, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObj, TObjAny } from 'utils/types/common';
import { getChosen, getEntityNs, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';

function Supply({ station }: { station: TStation }) {
  const { dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Type, Data } = station;

  if (!Data) return null;

  const { Choices, Exhibits, Both } = Data;

  const id = Type;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;

  if (!Both) delete options[2];

  const [next] = getNext(options);
  const choices = Object.keys(options).map(option => Number(option));
  const chosen = getChosen(Choices, 0, choices);

  const props: Array<TObjAny> = [];
  const exhibits: Array<TExhibits> = [];

  exhibits[0] = [Exhibits[0]];
  exhibits[1] = [Exhibits[1]];
  if (Both) {
    const values: TObj<string> = {};
    Exhibits.forEach((exhibit: TExhibit, i: number) => {
      const [ns] = getEntityNs({ exhibit: { Id: exhibit} });
      values[i] = t(`${exhibit}.Name`, { ns });
    });
    props[2] = { values };
    exhibits[2] = Exhibits
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    exhibits
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