import { RefObject, useContext, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TStation, TStatus } from 'utils/types/runData';
import Statuses from './parts/statuses';
import { LogContext } from 'contexts/logContext';
import CurrentChange from './currentChange';
import StationType from './stationTypes/stationType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getMapImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';

function Station({ station, innerRef }: { station: TStation, innerRef?: RefObject<HTMLDivElement>}) {
  const { t } = useTranslation();
  const { runData, setIsStationsLoaded } = useContext(LogContext);
  const { Node, Status, Type } = station;
  const { Level } = Node;

  const { Stations } = runData;
  const i = Stations.indexOf(station);
  const lastStatus = i ? Stations[i - 1].Status : runData.Settings.Status;

  useEffect(() => {
    if (innerRef) {
      setIsStationsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <LazyLoadImage className="p-station__icon" src={getMapImage(Type)} width={iconSize} height={iconSize} alt={t(`stations.${Type}`, { ns: 'log' })} />
        <Statuses status={Status} lastStatus={lastStatus as TStatus} />
      </div>
      <div className="p-station__body">
        <div className="p-station__left">
          <StationType station={station} />
        </div>
        <div className="p-station__right">
          <CurrentChange level={Level} />
        </div>
      </div>
    </div>
  );
}

export default Station;