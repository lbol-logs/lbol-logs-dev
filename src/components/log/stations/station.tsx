import { RefObject, useContext, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TActObj, TStation, TStatus } from 'utils/types/runData';
import StatusWidget from './parts/statuses';
import { LogContext } from 'contexts/logContext';
import StationType from './stationTypes/stationType';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getBossImage, getMapImage } from 'utils/functions/getImage';
import { getEntityNs } from 'utils/functions/helpers';

function Station({ station, innerRef }: { station: TStation, innerRef?: RefObject<HTMLDivElement> }) {
  const { t } = useTranslation();
  const { runData, setIsStationsLoaded } = useContext(LogContext);
  const { Node, Status, Type } = station;
  const { Act, Level } = Node;

  const { Acts, Stations } = runData;
  const i = Stations.indexOf(station);
  const lastStatus = i ? Stations[i - 1].Status : runData.Settings.Status;

  let callback;
  let type: string = Type;
  const isBoss = type === 'Boss';

  let isMod = false;

  if (isBoss) {
    const { Boss } = Acts.find(({ Act: _act }) => _act === Act) as TActObj;
    type = Boss as string;
    callback = getBossImage;
    [, isMod] = getEntityNs({ enemyGroup: { Id: Boss } });
  }
  else {
    if (type === 'Enemy') {
      if (Level > 10) type += 'Strong';
      type += 2 - Level % 2;
    }
    if (type === 'Trade') type += Act;
    callback = getMapImage;
  }

  useEffect(() => {
    if (innerRef) {
      setIsStationsLoaded(true);
    }
  }, [innerRef]);

  return (
    <div className={`p-station ${innerRef ? 'p-station--last' : ''} js-level-${Level}`} ref={innerRef}>
      <div className="p-station__head">
        <h3 className="p-station__level">
          <Trans
            i18nKey="level"
            ns="log"
            values={{
              level: Level
            }}
          />
        </h3>
        <LazyLoadImage2 className="p-station__icon" callback={callback} name={type} alt={t(`stations.${Type}`, { ns: 'log' })} isMod={isMod} />
        <StatusWidget status={Status} lastStatus={lastStatus as TStatus} />
      </div>

      <StationType station={station} />
    </div>
  );
}

export default Station;