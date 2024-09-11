import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import Station from './station';
import { useSearchParams } from 'react-router-dom';
import { TAct, TLevel } from 'utils/types/runData';
import { scrollTolerance } from 'configs/globals';
import scrollToLevel from 'utils/functions/scrollToLevel';
import updateQs from 'utils/functions/updateQs';
import ActLevel from 'utils/classes/ActLevel';
import { flushSync } from 'react-dom';

function Stations() {
  const { runData, act, setLevel, showMap, rounds, setRounds } = useContext(LogContext);
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
      const selector = showMap ? '.js-map' : '.js-holdings';
      const element = document.querySelector(selector) as HTMLDivElement;
      if (!element) return;
      const levels = stations.map(({ Node: { Level } }) => Level);
      for (const level of levels.reverse()) {
        if (!level) continue;
        const station = document.querySelector(`.js-level-${level}`) as HTMLDivElement;
        if (!station) break;
        const height = station.offsetTop - element.offsetHeight - scrollTolerance;
        console.log('onscroll', {level, bool:window.scrollY >= height});
        if (window.scrollY >= height) {
          setLevel(level);

          let currentRounds = rounds;
          const isRoundsLoaded = Object.keys(rounds).length > 0;
          console.log('onscroll',{isRoundsLoaded, rounds})
          if (!isRoundsLoaded) {
            currentRounds = new ActLevel(runData, act).rounds();
            flushSync(() => {
              console.log('onscroll',{currentRounds})
            // setRounds(currentRounds);
            });
          }
          const { maxLevel } = currentRounds;
          if (maxLevel && level === maxLevel) {
            const { minRound, maxRound } = currentRounds;
            for (let current = maxRound; current >= minRound; current--) {
              const row = station.querySelector(`.js-round-${current}`) as HTMLDivElement;
              const height = row.offsetTop - element.offsetHeight - scrollTolerance;
              console.log(row, height)
              if (window.scrollY >= height) {
                Object.assign(currentRounds, { current });
                flushSync(() => {
                  console.log('onscroll set', {currentRounds});
                setRounds(currentRounds);
                });
                break;
              }
            }
          }
          scrollToLevel(level, showMap, currentRounds, false);
          console.log('onscroll', {currentRounds,rounds})
          updateQs(searchParams, setSearchParams, act, level, currentRounds);
          break;
        }
      }
    }, 200);
    timerRef.current = _timer;
  };

  useEffect(() => {
    {
      const map = document.querySelector('.js-map') as HTMLDivElement;
      if (map) {
        const mapHeight = map.offsetHeight;
        const stations = stationsRef.current;
        const station = stationRef.current;
        if (stations && station) {
          const stationsHeight = window.innerHeight - mapHeight;
          if (!station.style.height && station.offsetHeight < stationsHeight) {
            station.style.height = stationsHeight + 'px';
          }
        }
      }
    }

    {
      const event = 'scroll';
      window.addEventListener(event, onScroll.bind(undefined, act));
    }

    {
      const l = parseInt(searchParams.get('l') || '0') as TLevel;
      if (!l) scrollToLevel(0, showMap, rounds);
    }
  }, [runData, act, showMap]);

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