import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import Station from './station';

function Stations() {
  const { runData, act } = useContext(LogContext);

  const { Stations } = runData;
  const stations = Stations.filter(station => station.Node.Act === act )

  const stationsRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stations = stationsRef.current;
    const station = stationRef.current;
    if (!stations || !station) return;
    const map = document.querySelector('.js-map') as HTMLDivElement;
    const height = window.innerHeight - map.offsetHeight;
    if (!station.style.height && station.offsetHeight < height) {
      station.style.height = height + 'px';
    }
  }, []);

  return (
    <section className="p-stations" ref={stationsRef}>
      {stations.map((station, i, { length }) => {
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