import { TDialoguesConfigs, TStation } from 'utils/types/runData';
import CurrentChange from '../currentChange';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getEnemyImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import DialoguesWidget from '../parts/dialoguesWidget';
import { useContext } from 'react';
import { TObj, TObjAny } from 'utils/types/common';
import { getNext, showRandom } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';

function EntryStation({ station }: { station: TStation }) {
  const { runData, configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Data, Node: { Level }} = station;

  if (!Data) return null;

  const { Choices, Options } = Data;
  const id = 'Debut';
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];
  
  const randoms: Array<TObj<JSX.Element>> = [];

  const dialoguesConfigs: TDialoguesConfigs = [];
  {
    const { current, next: _next } = configs[0];
    const next = getNext(_next);
    const chosen = Choices[0];
    const props: Array<TObjAny> = [];
    const randoms: Array<JSX.Element> = [];

    if (showRandom(runData)) {
    
    }

    dialoguesConfigs.push({
      id,
      current,
      next,
      chosen,
      props,
      randoms
    });
  }

  let c1 = Choices[1];
  if (c1 > 1) {
    c1 = Options[c1 - 1] + 2;
  }

  const choices = (
    <div>
      {/* <DialoguesWidget id={id} choices={choicesOverride} randoms={randoms} /> */}
    </div>
  );

  const additionalElements = (
    null
  );

  const size = iconSize * 2;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__head">
            <LazyLoadImage2 className="p-event__img" callback={getEnemyImage} name="Eirin" width={size} height={size} alt={''} />
            <div className="p-event__text">
              <p className="p-event__title">{t(`${id}.Title`, { ns: 'events' })}</p>
              <p className="p-event__host">{t(`${id}.Host`, { ns: 'events' })}</p>
            </div>
          </div>
          <div className="p-event__body">
            {choices}
            {additionalElements}
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