import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import Svg from './svg';
import Icons from './icons';
import Links from './links';

function Map() {
  const { runData, act } = useContext(LogContext);

  const { Stations, Acts } = runData;
  const ActObj = Acts[act - 1];

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const map = mapRef.current;
      const className = 'p-map--sticky';
      if (!map) return;
      if (window.scrollY >= map.offsetTop) {
        map.classList.add(className);
      }
      else {
        map.classList.remove(className);
      }
    }
    window.addEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="p-map js-map" ref={mapRef}>
      <div className="p-map__inner js-mapInner">
        <Links Stations={Stations} />
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;