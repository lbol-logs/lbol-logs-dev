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
import { checkRounds, getScrollHeight } from 'utils/functions/helpers';
import Modal from './modal';

function RunDataTemplate() {
  const { isRunDataLoaded, runData, act, setAct, setLevel, rounds, setRounds, showMap, setEntityModal } = useContext(LogContext);
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

    let r = searchParams.get('r');
    const current = parseInt(r || '-1');
    const currentRounds = checkRounds(rounds) ? rounds : new ActLevel(runData, act).rounds();
    Object.assign(currentRounds, { current });
    setRounds(currentRounds);

    if (!showMap) return;

    const height = getScrollHeight(l, showMap, rounds);
    if (!height) return;
    if (window.scrollY < height - scrollTolerance) window.scrollTo(0, height);
  }, [isRunDataLoaded, runData, act, showMap]);

  return (
    <>
      <Modal />
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