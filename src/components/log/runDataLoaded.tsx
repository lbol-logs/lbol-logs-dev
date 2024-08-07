import { useContext, useEffect } from 'react';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from './runDataTemplate';
import Summary from './summary';
import Control from './control';
import { TAct, TLevel } from 'utils/types/runData';
import { useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/ActLevel';

function RunDataLoaded() {
  const { isRunDataLoaded, runData, act, setAct, setLevel } = useContext(LogContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isRunDataLoaded) return;
    let a = parseInt(searchParams.get('a') || '0') as TAct;
    let l = parseInt(searchParams.get('l') || '0') as TLevel;
    const al = new ActLevel(runData, act);
    ( { a, l } = al.actLevel(a, l) );
    setAct(a);
    setLevel(l);
    const station = document.querySelector(`.js-level-${l}`) as HTMLDivElement;
    const map = document.querySelector('.js-map') as HTMLDivElement;
    if (!station || !map) return;
    const height = station.offsetTop - map.offsetHeight;
    window.scrollTo(0, height);
  }, [isRunDataLoaded, runData, act, searchParams, setAct, setLevel]);
  
  return (
    <>
      {act === 0
        ? <Summary />
        : <RunDataTemplate />
      }
      <Control />
    </>
  );
}

export default RunDataLoaded;