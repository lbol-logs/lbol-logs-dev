import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TObjAny } from 'utils/types/common';
import { useTranslation } from 'react-i18next';

function BuduSuanming({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;

  const chosen = Choices[0];
  {
    const { current, next: options } = configs[0];
    const { money } = eventsConfigs.get(id);

    const [next] = getNext(options);

    const props: Array<TObjAny> = [];

    const values = { 0: money };
    const _props = { values };
    for (let i = 0; i < 3; i++) {
      props[i] = _props;
    }

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const current = configs[1][chosen];
    if (current !== undefined) {
      let text;
      switch (chosen) {
        case 0:
          const { Boss } = Data;
          text = t(Boss, { ns: 'units' });
          break;
        case 1:
          const { Host } = Data;
          text = t(Host, { ns: 'units' });
          break;
        case 2:
          const { Exhibit } = Data;
          text = t(`${Exhibit}.Name`, { ns: 'exhibits' });
      }
      const currentComponents = { 0: text };

      const dialogueConfigs: TDialogueConfigs = {
        current,
        currentComponents,
        next: [],
        chosen: 0
      };

      second = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {first}
              {second}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default BuduSuanming;