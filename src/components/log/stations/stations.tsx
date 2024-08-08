import { LogContext } from 'contexts/logContext';
import { useCallback, useContext, useEffect, useRef } from 'react';
import Station from './station';
import { scrollToLevel, updateQs } from '../control';
import { useSearchParams } from 'react-router-dom';
import { TAct, TLevel } from 'utils/types/runData';
import { scrollHandlerCache, scrollTolerance } from 'configs/globals';

function Stations() {
  const { runData, act, setAct, setLevel } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const { Stations } = runData;
  const stations = Stations.filter(station => station.Node.Act === act);
  const length = stations.length;

  const stationsRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  
  const onScrollEnd = useCallback((act: TAct) => {
    const map = document.querySelector('.js-map') as HTMLDivElement;
    const mapHeight = map.offsetHeight;
    const levels = stations.map(({ Node: { Level }}) => Level);
    for (const level of levels.reverse()) {
      const station = document.querySelector(`.js-level-${level}`) as HTMLDivElement;
      if (!station) break;
      if (window.scrollY >= station.offsetTop - mapHeight - scrollTolerance) {
        setLevel(level);
        updateQs(searchParams, setSearchParams, act, level)
        scrollToLevel(level, false);
        break;
      }
    }
  }, []);
  
  function setEventListener(act: TAct): EventListener {
    const cache = scrollHandlerCache;
    if (!cache.has(act)) {
      cache.set(act, onScrollEnd.bind(undefined, act));
    }
    return cache.get(act) as EventListener;
  }
  function getEventListeners(): Array<EventListener> {
    const cache = scrollHandlerCache;
    const eventListeners: Array<EventListener> = [];
    cache.forEach(value => eventListeners.push(value));
    return eventListeners;
  }

  useEffect(() => {
    const map = document.querySelector('.js-map') as HTMLDivElement;
    const mapHeight = map.offsetHeight;
    {
      const stations = stationsRef.current;
      const station = stationRef.current;
      if (stations && station) {
        const stationsHeight = window.innerHeight - mapHeight;
        if (!station.style.height && station.offsetHeight < stationsHeight) {
          station.style.height = stationsHeight + 'px';
        }
      }
    }

    {
      const eventListeners = getEventListeners();
      eventListeners.forEach(eventListener => window.removeEventListener('scrollend', eventListener));
      window.addEventListener('scrollend', setEventListener(act));
    }
  }, [act]);

  return (
    <section className="p-stations" ref={stationsRef}>
      {stations.map((station, i) => {
        const { Node } = station;
        const { Level } = Node;
        const key = `Station_Act${act}_Level${Level}`;
        const isLastStation = i === length - 1;
        const innerRef = isLastStation ? stationRef : undefined;
        return (
          <Station station={station} key={key} innerRef={innerRef} />
        );
      })}
    </section>
  );
}

export default Stations;