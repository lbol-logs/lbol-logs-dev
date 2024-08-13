import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import Svg from './svg';
import Icons from './icons';
import Act from '../act';

function Map() {
  const { runData, act } = useContext(LogContext);

  const { Acts } = runData;
  const ActObj = Acts[act - 1];

  return (
    <section className="p-map js-map">
      <div className={`p-map__inner js-mapInner`}>
        <h2 className="c-act__title">
          <Act />
          </h2>
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;