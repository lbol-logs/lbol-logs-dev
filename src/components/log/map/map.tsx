import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import Svg from './svg';
import Icons from './icons';
import Links from './links';
import CurrentHoldings from './currentHoldings';
import Act from '../stations/act';

function Map() {
  const { runData, act, showMap } = useContext(LogContext);

  const { Stations, Acts } = runData;
  const ActObj = Acts[act - 1];

  return (
    <section className="p-map js-map">
      {!showMap && <CurrentHoldings />}
      <div className={`p-map__inner ${showMap ? '' : 'p-map__inner--hidden'} js-mapInner`}>
        <Act />
        <Links Stations={Stations} />
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;