import { LogContext } from 'contexts/logContext';
import { ChangeEvent, useContext } from 'react';
import { TAct, TLevel } from 'utils/types';
import { useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/ActLevel';

function Control() {
  const { runData, act, setAct, level, setLevel } = useContext(LogContext);
  //   TODO: query string
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoaded = Object.keys(runData).length; 
  if (!isLoaded) return null;

  const al = new ActLevel(runData, act);
  const maxAct: TAct = al.maxAct();
  const minLevel: TLevel = al.minLevel();
  const maxLevel: TLevel = al.maxLevel();

  function handleClick(offset: number) {
    const nextAct = act + offset as TAct;
    triggerChange(nextAct, 0);
  }
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextLevel = Number(e.target.value) as TLevel;
    triggerChange(act, nextLevel);
  }

  function triggerChange(a: TAct, l: TLevel) {
    a = al.act(a);
    l = al.level(l);
    setAct(a);
    setLevel(l);
    updateQs(a, l);
    scrollToLevel(l);
  }

  function scrollToLevel(nextLevel: TLevel) {
    const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
    const map = document.querySelector('.js-map') as HTMLDivElement;
    if (!station || !map) return;
    const height = station.offsetTop - map.offsetHeight;
    window.scrollTo(0, height);
  }

  function updateQs(a: TAct, l?: TLevel) {
    const o: Record<string, string> = {};
    if (a) o['a'] = a.toString();
    else searchParams.delete('a');
    if (l) o['l'] = l.toString();
    else searchParams.delete('l');
    setSearchParams(o);
  }

  return (
    <section className="p-control">
      <div className="p-control__inner l-inner">
        <span
          className={`p-control__component ${act === 0 ? 'p-control__component--disabled' : ''}`}
          onClick={() => handleClick(-1)}
          >&lt;</span>
        <span className={`p-control__component ${act === 0 ? 'p-control__component--disabled' : ''} p-control__component--range`}>
          <input className="p-control__range" type="range" value={level} min={minLevel} max={maxLevel} onChange={handleChange} />
        </span>
        <span
          className={`p-control__component ${act === maxAct ? 'p-control__component--disabled': ''}`}
          onClick={() => handleClick(1)}
          >&gt;</span>
      </div>
    </section>
  );
}

export default Control;