import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Svg from './svg';
import Icons from './icons';
import Links from './links';

function Map() {
  const { t } = useTranslation();
  const { runData, act } = useContext(LogContext);

  const { Stations, Acts } = runData;
  const ActObj = Acts[act - 1];

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const map = mapRef.current;
      const className = 'p-map--sticky'
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
    <section className="p-map" ref={mapRef}>
      <h3 className="p-map__title">{t('map', { ns: 'log' })}</h3>
      <div className="p-map__map js-map">
        <Links Stations={Stations} />
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;