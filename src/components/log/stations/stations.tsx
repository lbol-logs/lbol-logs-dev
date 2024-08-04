import Processing from 'components/common/processing';
import { LogContext } from 'contexts/logContext';
import { Suspense, useContext } from 'react';
import Station from './station';

function Stations() {
  const { runData, act } = useContext(LogContext);

  const { Stations } = runData;
  const stations = Stations.filter(station => station.Node.Act === act )

  return (
    <>
      {stations.map(station => {
        const { Node } = station;
        const { Level } = Node;
        const key = `Station_Act${act}_Level${Level}`;
        return (
          <Suspense fallback={<Processing />} key={key}>
            <Station station={station} />
          </Suspense>
        );
      })}
    </>
  );
}

export default Stations;