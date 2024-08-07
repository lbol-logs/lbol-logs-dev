import { LogContext } from 'contexts/logContext';
import { ChangeEvent, useContext } from 'react';
import { TAct, TLevel } from 'utils/types/runData';
import { useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/ActLevel';
import { TObjString } from 'utils/types/common';
import Loading from 'components/common/loading';
import MapNodes from 'utils/MapNodes';

function Control() {
  const { isRunDataLoaded, runData, act, setAct, level, setLevel } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();

  if (!isRunDataLoaded) return <Loading />;

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
    const map = document.querySelector('.js-map') as HTMLDivElement;
    if (!map) return;

    const inner = map.querySelector('.js-mapInner') as HTMLDivElement;
    if (inner) {
      const { gap, length } = MapNodes.mapOptions;
      const offset = (inner.offsetWidth - gap - length)/ 2;
      const x = MapNodes.x1x2(nextLevel)[0] - gap - offset;
      inner.scrollTo(x, 0);
    }

    const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
    if (station) {
      const y = station.offsetTop - map.offsetHeight;
      window.scrollTo(0, y);
    }
  }

  function updateQs(a: TAct, l?: TLevel) {
    const o: TObjString = {};
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