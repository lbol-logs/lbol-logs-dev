import { TDialogueConfigs, TStation } from 'utils/types/runData';
import CurrentChange from '../currentChange';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getEnemyImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObj, TObjAny } from 'utils/types/common';
import { getNext, showRandom } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import EventHead from '../parts/eventHead';

function EntryStation({ station }: { station: TStation }) {
  const { runData, configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Data, Node: { Level }} = station;

  if (!Data) return null;

  const { Choices, Options } = Data;

  const id = 'Debut';
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];
  const hasBonus = runData.Settings.HasClearBonus;
  const rand = showRandom(runData);

  let advantages = null;

  {
    const { current, next: _next } = configs[0];
    const choices = ["0"];
    if (hasBonus) choices.push("1", Options[0], Options[1]);
    const next = getNext(_next);
    let chosen = Choices[0];
    if (chosen > 1) {
      chosen = Options[chosen - 2] + 2;
    }
    const props: Array<TObjAny> = [];
    const randoms: Array<JSX.Element> = [];

    if (rand) {
    
    }

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      randoms
    };
  }

  const choices = (
    <div className="p-dialogues">
      {advantages}
      {/* <DialoguesWidget id={id} choices={choicesOverride} randoms={randoms} /> */}
    </div>
  );

  const size = iconSize * 2;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} callback={getEnemyImage} name="Eirin" />
          <div className="p-event__body">
            {choices}
          </div>
        </div>
      </div>
      <div className="p-entities">
        <CurrentChange level={Level} />
      </div>
    </div>
  );
}

export default EntryStation;