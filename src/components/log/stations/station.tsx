import { RefObject, useContext, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TStation, TStatus } from 'utils/types/runData';
import Act from './act';
import Statuses from './statuses';
import { LogContext } from 'contexts/logContext';
import CurrentChange from './currentChange';
import StationType from './stationType';

function Station({ station, innerRef }: { station: TStation, innerRef?: RefObject<HTMLDivElement>}) {
  useTranslation();
  const { runData, setIsStationsLoaded } = useContext(LogContext);
  const { Node, Status } = station;
  const { Level } = Node;

  const { Stations } = runData;
  const i = Stations.indexOf(station);
  const lastStatus = i ? Stations[i - 1].Status : runData.Settings.Status;

  useEffect(() => {
    if (innerRef) {
      setIsStationsLoaded(true);
    }
  }, [innerRef, setIsStationsLoaded]);

  return (
    <div className={`p-station ${innerRef ? 'p-station--last' : ''} js-level-${Level}`} ref={innerRef}>
      {!Level && <Act /> }
      <div className="p-station__head">
        <h3 className="p-station__level">
          <Trans
            i18nKey="level"
            ns="log"
            children={{
              level: Level
            }}
          />
        </h3>
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