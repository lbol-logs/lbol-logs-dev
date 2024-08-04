import { useContext, useEffect } from 'react';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from './runDataTemplate';
import Summary from './summary';
import Control from './control';
// import { useSearchParams } from 'react-router-dom';

function RunDataLoaded() {
  const { act, setAct } = useContext(LogContext);
  const { setLevel } = useContext(LogContext);
  // TODO: query string
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setAct(1);
    setLevel(0);
  }, [setAct, setLevel]);
  
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