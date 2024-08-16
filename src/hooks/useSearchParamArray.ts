import { useSearchParams } from 'react-router-dom';

function useSearchParamArray(key: string): Array<string> {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(key);
  const array = value === null ? [] : value.split(',');
  return array;
}

export default useSearchParamArray;