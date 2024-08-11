import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import Station from './station';
import { scrollToLevel, updateQs } from '../control';
import { useSearchParams } from 'react-router-dom';
import { TAct, TLevel } from 'utils/types/runData';
import { scrollTolerance } from 'configs/globals';

function Stations() {
  const { runData, act, setLevel, configsData } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const { Stations } = runData;
  const stations = Stations.filter(station => station.Node.Act === act);
  const length = stations.length;

  const stationsRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = (act: TAct) => {
    const timer = timerRef.current as NodeJS.Timeout;
    if (timer) clearTimeout(timer);
    const _timer = setTimeout(() => {
      const map = document.querySelector('.js-map') as HTMLDivElement;
      if (!map) return;
      const mapHeight = map.offsetHeight;
      const levels = stations.map(({ Node: { Level }}) => Level);
      for (const level of levels.reverse()) {
        const station = document.querySelector(`.js-level-${level}`) as HTMLDivElement;
        if (!station) break;
        const height = station.offsetTop - mapHeight - scrollTolerance;
        if (!level || window.scrollY >= height) {
          setLevel(level);
          scrollToLevel(level, false);
          updateQs(searchParams, setSearchParams, act, level);
          break;
        }
      }
    }, 100);
    timerRef.current = _timer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

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
      const event = 'scroll';
      window.addEventListener(event, onScroll.bind(undefined, act));
    }

    {
      const l = parseInt(searchParams.get('l') || '0') as TLevel;
      if (!l) scrollToLevel(0, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runData, act]);

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