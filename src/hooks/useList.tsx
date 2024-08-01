import { getList } from "utils/getData";
import { TRunList } from "utils/types";
import { useEffect } from "react";

type TUseList = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setList: React.Dispatch<React.SetStateAction<TRunList>>,
  version: string
};

function UseList({ setIsLoading, setList, version }: TUseList) {
  useEffect(() => {
    setIsLoading(true);
    getList(version).then((list: TRunList) => {
      setList(list);
      setIsLoading(false);
    });
  }, [setIsLoading, setList, version]);

  return null;
}

export default UseList;