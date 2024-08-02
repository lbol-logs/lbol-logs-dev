import { getList } from 'utils/fetchData';
import { TRunList } from 'utils/types';
import { useEffect, useState } from 'react';
import use from 'utils/use';

function useList(version: string) {
  // const list = use<Awaited<ReturnType<typeof getList>>>(getList(version));
  const list = use(getList(version));
  return list;
}

export default useList;