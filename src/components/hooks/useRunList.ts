// import { getList } from "components/utils/getData";
// import { useEffect } from "react";

// type TSetRunListState = {
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setList: React.Dispatch<React.SetStateAction<TRunList>>
// }

// type TRunList = Record<string, any>;

// function useRunList({ setIsLoading, setList }: TSetRunListState) {
//   useEffect(() => {
//     setIsLoading(true);
//     // fetch('https://ed-ev.github.io/lbol-logs-data/1.5.1/list.json').then(res => res.json()).then((list: TRunList) => {
//     getList().then((list: TRunList) => {
//       console.log(list);
//       setList(list);
//     });
//     /*
//     setTimeout(() => {
//       setList({'a':1,'b':2});
//     }, 5000);
//     */
//     setIsLoading(false);
//   }, [setIsLoading, setList]);
// }

// export type { TRunList };

// export default useRunList;

export {};