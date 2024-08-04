// import { useSearchParams } from 'react-router-dom';
import Map from './map/map';
import Stations from './stations/stations';
// import { TAct, TLevel } from 'utils/types';
// import { useContext, useEffect } from 'react';
// import { LogContext } from 'contexts/logContext';

function RunDataTemplate() {
  // const [searchParams] = useSearchParams();
  // const { setAct, setLevel } = useContext(LogContext);

  // useEffect(() => {
  //   // if (isLoaded) {
  //     const a = parseInt(searchParams.get('a') || '0') as TAct;
  //     const l = parseInt(searchParams.get('l') || '0') as TLevel;
  //     console.log({a, l});
  //     setAct(a);
  //     setLevel(l);
  //     const station = document.querySelector(`.js-level-${l}`) as HTMLDivElement;
  //     const map = document.querySelector('.js-map') as HTMLDivElement;
  //     console.log({station, map});
  //     if (!station || !map) return;
  //     const height = station.offsetTop - map.offsetHeight;
  //     console.log({height});
  //     window.scrollTo(0, height);
  //   // }
  // }, [searchParams, setAct, setLevel]);

  return (
    <>
      <Map />
      <Stations />
    </>
  );
}

export default RunDataTemplate;