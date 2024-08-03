import { Suspense } from 'react';
import Map from './map/map';
import Processing from 'components/common/processing';

function RunDataTemplate() {  
  return (
    <>
      <Suspense fallback={<Processing />}>
        <Map />
      </Suspense>
    </>
  );
}

export default RunDataTemplate;