import { useContext, useEffect } from 'react';
import { LogContext } from 'contexts/logContext';
import Map from './map/map';
import Stations from './stations/stations';
import Summary from './summary';
import Control from './control';
import { TAct, TLevel } from 'utils/types/runData';
import { useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import { scrollTolerance } from 'configs/globals';
import CurrentHoldings from './currentHoldings';

function RunDataTemplate() {
  const { isRunDataLoaded, runData, act, setAct, setLevel, showMap } = useContext(LogContext);
  const [searchParams] = useSearchParams();

  const isSummary = act === 0;

  useEffect(() => {
    if (!isRunDataLoaded) return;
    let a = parseInt(searchParams.get('a') || '0') as TAct;
    let l = parseInt(searchParams.get('l') || '0') as TLevel;
    const al = new ActLevel(runData, act);
    ( { a, l } = al.actLevel(a, l) );
    setAct(a);
    setLevel(l);
    const station = document.querySelector(`.js-level-${l}`) as HTMLDivElement;
    if (!station || !showMap) return;
    const selector = showMap ? '.js-map' : '.js-holdings';
    const element = document.querySelector(selector) as HTMLDivElement;
    const height = station.offsetTop - element.offsetHeight;
    if (window.scrollY < height - scrollTolerance) window.scrollTo(0, height);
  }, [isRunDataLoaded, runData, act, showMap]);

  return (
    <>
      {isSummary && (
        <Summary />
      )}
      {!isSummary && (
        <>
          {showMap
            ? <Map />
            : <CurrentHoldings />
          }
          <Stations />
        </>
      )}
      <Control />
    </>
  );
}

export default RunDataTemplate;