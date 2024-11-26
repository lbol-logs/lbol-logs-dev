import { ChangeEvent, MouseEvent } from 'react';
import { NavigateFunction, SetURLSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import { copyObject, toggleAside } from 'utils/functions/helpers';
import scrollToLevel from 'utils/functions/scrollToLevel';
import updateQs from 'utils/functions/updateQs';
import { AsideType, TDispatch } from 'utils/types/common';
import { TRounds } from 'utils/types/others';
import { TAct, TLevel, TRunData } from 'utils/types/runData';

function useControl({ isRunDataLoaded, runData, act, setAct, setLevel, rounds, setRounds, showMap, setShowMap, navigate, searchParams, setSearchParams, setAsideHoldings, isFromList }: { isRunDataLoaded: boolean, runData: TRunData, act: TAct, setAct: TDispatch<TAct>, setLevel: TDispatch<TLevel>, rounds: TRounds, setRounds: TDispatch<TRounds>, showMap: boolean, setShowMap: TDispatch<boolean>, navigate: NavigateFunction, searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, setAsideHoldings: TDispatch<AsideType>, isFromList: boolean }) {
  if (!isRunDataLoaded) return;

  const al = new ActLevel(runData, act);
  const maxAct: TAct = al.maxAct();
  const minLevel: TLevel = al.minLevel();
  const maxLevel: TLevel = al.maxLevel();

  function backToTop() {
    if (isFromList) navigate(-1);
    else navigate('../');
  }

  function changeAct(offset: number) {
    const nextAct = act + offset as TAct;
    triggerChange(nextAct, 0);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const nextLevel = Number(e.target.value) as TLevel;
    triggerChange(act, nextLevel);
  }

  function onMouseDown(e: MouseEvent<HTMLInputElement>) {
    (e.target as HTMLInputElement).classList.add('active');
  }

  function onMouseUp(e: MouseEvent<HTMLInputElement>) {
    (e.target as HTMLInputElement).classList.remove('active');
  }

  const rangeProps = { onChange, onMouseDown, onMouseUp };

  function triggerChange(a: TAct, l: TLevel) {
    a = al.act(a);
    const _l = al.level(l);
    setAct(a);
    setLevel(_l);

    const currentRounds = copyObject(rounds);
    const { minRound, maxLevel } = currentRounds;
    if (maxLevel !== undefined) {
      const diff = l - (maxLevel as TLevel);
      const current = diff - 1 + minRound;
      Object.assign(currentRounds, { current });
      setRounds(currentRounds);
    }
    updateQs(searchParams, setSearchParams, a, _l, currentRounds);
    scrollToLevel(_l, showMap, currentRounds);
  }

  function handleToggle() {
    setShowMap(!showMap);
  }

  function handleAside() {
    setAsideHoldings(asideHoldings => toggleAside(asideHoldings));
  }

  return {
    maxAct,
    minLevel,
    maxLevel,
    backToTop,
    changeAct,
    rangeProps,
    handleToggle,
    handleAside
  };
}

export default useControl;