import { Suspense } from 'react';
import Map from './map/map';
import Processing from 'components/common/processing';
import Stations from './stations/stations';

function RunDataTemplate() {  
  return (
    <>
      <Suspense fallback={<Processing />}>
        <Map />
      </Suspense>
      <Suspense fallback={<Processing />}>
        <Stations />
      </Suspense>
    </>
  );
}

export default RunDataTemplate;