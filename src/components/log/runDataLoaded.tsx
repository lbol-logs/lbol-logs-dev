import { useContext, useEffect } from 'react';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from './runDataTemplate';
import Summary from './summary';
import Control from './control';
import { TAct, TLevel } from 'utils/types';
import { useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/ActLevel';

function RunDataLoaded() {
  const { runData, act, setAct, setLevel, isLoaded } = useContext(LogContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!Object.keys(runData).length) return;
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

    const className = 'p-map--sticky';
    if (height >= map.offsetTop) {
      map.classList.add(className);
    }
  }, [runData, searchParams, setAct, setLevel, isLoaded]);
  
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