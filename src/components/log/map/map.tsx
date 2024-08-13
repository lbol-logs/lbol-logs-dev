import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import Svg from './svg';
import Icons from './icons';
import CurrentHoldings from './currentHoldings';
import Act from './act';

function Map() {
  const { runData, act, showMap } = useContext(LogContext);

  const { Stations, Acts } = runData;
  const ActObj = Acts[act - 1];

  return (
    <section className="p-map js-map">
      {!showMap && <CurrentHoldings />}
      <div className={`p-map__inner js-mapInner`} hidden={!showMap}>
        <Act />
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;