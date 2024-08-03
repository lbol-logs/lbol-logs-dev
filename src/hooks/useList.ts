import { getList } from 'utils/fetchData';
import { TRunList } from 'utils/types';
import { useEffect, useState } from 'react';
import use from 'utils/use';

function useList(version: string) {
  try {
    const list = use(getList(version));
    return list;
  }
  catch(e) {
    return {};
  }
}

export default useList;