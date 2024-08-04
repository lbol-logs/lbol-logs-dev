import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from './runDataTemplate';
import Summary from './summary';
import Control from './control';
// import { useSearchParams } from 'react-router-dom';

function RunDataLoaded() {
  const { act } = useContext(LogContext);
  // TODO: query string
  // const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <>
      {/* Act: {searchParams.get('a')}, Level: {searchParams.get('l')} */}
      {act === 0
        ? <Summary />
        : <RunDataTemplate />
      }
      <Control />
    </>
  );
}

export default RunDataLoaded;