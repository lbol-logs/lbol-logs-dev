import { useEffect } from 'react';
import { getRunList } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TDispatch } from 'utils/types/common';
import { TRunList } from 'utils/types/others';

function useRunList(version: string, setList: TDispatch<TRunList>) {
  const list = use(getRunList(version)) as TRunList;
  useEffect(() => {
    setList(list);
  }, []);
}

export default useRunList;