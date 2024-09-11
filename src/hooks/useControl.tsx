import { ChangeEvent } from 'react';
import { NavigateFunction, SetURLSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import scrollToLevel from 'utils/functions/scrollToLevel';
import updateQs from 'utils/functions/updateQs';
import { TDispatch } from 'utils/types/common';
import { TRound, TRounds } from 'utils/types/others';
import { TAct, TLevel, TRunData } from 'utils/types/runData';

function useControl({ isRunDataLoaded, runData, act, setAct, setLevel, setRound, showMap, setShowMap, navigate, searchParams, setSearchParams }: { isRunDataLoaded: boolean, runData: TRunData, act: TAct, setAct: TDispatch<TAct>, setLevel: TDispatch<TLevel>, setRound: TDispatch<TRound>, showMap: boolean, setShowMap: TDispatch<boolean>, navigate: NavigateFunction, searchParams: URLSearchParams, setSearchParams: SetURLSearchParams }) {
  if (!isRunDataLoaded) return;

  const al = new ActLevel(runData, act);
  const maxAct: TAct = al.maxAct();
  const minLevel: TLevel = al.minLevel();
  const maxLevel: TLevel = al.maxLevel();
  const rounds: TRounds = al.rounds();

  function backToTop() {
    navigate('../');
  }

  function changeAct(offset: number) {
    const nextAct = act + offset as TAct;
    triggerChange(nextAct, 0);
  }

  function changeLevel(e: ChangeEvent<HTMLInputElement>, maxLevel: TLevel, rounds: TRounds) {
    const nextLevel = Number(e.target.value) as TLevel;
    triggerChange(act, nextLevel, maxLevel, rounds);
  }

  function triggerChange(a: TAct, l: TLevel, maxLevel?: TLevel, rounds?: TRounds) {
    a = al.act(a);
    const level = al.level(l);
    setAct(a);
    setLevel(level);

    let r = undefined;
    if (rounds) {
      const diff = l - (maxLevel as TLevel);
      if (diff > 0) r = diff;
      setRound(r);
    }
    console.log('trigger', {r,rounds});
    updateQs(searchParams, setSearchParams, a, level, r, rounds);
    scrollToLevel(level, showMap, undefined, r, rounds);
  }

  function handleToggle() {
    setShowMap(!showMap);
  }

  return {
    maxAct,
    minLevel,
    maxLevel,
    rounds,
    backToTop,
    changeAct,
    changeLevel,
    handleToggle
  };
}

export default useControl;