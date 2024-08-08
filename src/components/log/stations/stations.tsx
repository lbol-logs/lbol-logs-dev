import { LogContext } from 'contexts/logContext';
import { useCallback, useContext, useEffect, useRef } from 'react';
import Station from './station';
import { scrollToLevel, updateQs } from '../control';
import { useSearchParams } from 'react-router-dom';
import { TAct, TLevel } from 'utils/types/runData';
import { scrollHandlerCache, scrollTolerance } from 'configs/globals';

function Stations() {
  const { runData, act, setLevel } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const { Stations } = runData;
  const stations = Stations.filter(station => station.Node.Act === act);
  const length = stations.length;

  const stationsRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  
  const onScroll = useCallback((act: TAct, isScroll: boolean) => {
    const map = document.querySelector('.js-map') as HTMLDivElement;
    if (!map) return;
    const mapHeight = map.offsetHeight;
    const levels = stations.map(({ Node: { Level }}) => Level);
    for (const level of levels.reverse()) {
      const station = document.querySelector(`.js-level-${level}`) as HTMLDivElement;
      if (!station) break;
      if (!level || window.scrollY >= station.offsetTop - mapHeight - scrollTolerance) {
        setLevel(level);
        if (!isScroll) updateQs(searchParams, setSearchParams, act, level)
        scrollToLevel(level, false);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function setEventListener(act: TAct, isScroll: boolean): EventListener {
    const cache = scrollHandlerCache;
    if (!cache.has(act)) {
      cache.set(act, onScroll.bind(undefined, act, isScroll));
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
      const isScroll = (window as any).onscrollend === undefined;
      const event = isScroll ? 'scroll' : 'scrollend';
      const eventListeners = getEventListeners();
      eventListeners.forEach(eventListener => window.removeEventListener(event, eventListener));
      window.addEventListener(event, setEventListener(act, isScroll));
    }

    {
      const l = parseInt(searchParams.get('l') || '0') as TLevel;
      if (!l) scrollToLevel(0, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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