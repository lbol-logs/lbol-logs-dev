import { ChangeEvent } from 'react';
import { NavigateFunction, SetURLSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import scrollToLevel from 'utils/functions/scrollToLevel';
import updateQs from 'utils/functions/updateQs';
import { TDispatch } from 'utils/types/common';
import { TAct, TLevel, TRunData } from 'utils/types/runData';

function useControl({ isRunDataLoaded, runData, act, setAct, setLevel, showMap, setShowMap, navigate, searchParams, setSearchParams }: { isRunDataLoaded: boolean, runData: TRunData, act: TAct, setAct: TDispatch<TAct>, setLevel: TDispatch<TLevel>, showMap: boolean, setShowMap: TDispatch<boolean>, navigate: NavigateFunction, searchParams: URLSearchParams, setSearchParams: SetURLSearchParams }) {
  if (!isRunDataLoaded) return;

  const al = new ActLevel(runData, act);
  const maxAct: TAct = al.maxAct();
  const minLevel: TLevel = al.minLevel();
  const maxLevel: TLevel = al.maxLevel();

  function backToTop() {
    navigate('../');
  }

  function changeAct(offset: number) {
    const nextAct = act + offset as TAct;
    triggerChange(nextAct, 0);
  }

  function changeLevel(e: ChangeEvent<HTMLInputElement>) {
    const nextLevel = Number(e.target.value) as TLevel;
    triggerChange(act, nextLevel);
  }

  function triggerChange(a: TAct, l: TLevel) {
    a = al.act(a);
    l = al.level(l);
    setAct(a);
    setLevel(l);
    updateQs(searchParams, setSearchParams, a, l);
    scrollToLevel(l, showMap);
  }

  function handleToggle() {
    setShowMap(!showMap);
  }

  return {
    maxAct,
    minLevel,
    maxLevel,
    backToTop,
    changeAct,
    changeLevel,
    handleToggle
  };
}

export default useControl;