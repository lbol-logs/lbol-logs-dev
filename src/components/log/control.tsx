import { LogContext } from 'contexts/logContext';
import { ChangeEvent, useContext } from 'react';
import { TAct, TLevel } from 'utils/types';

function Control() {
  const { runData, act, setAct, level, setLevel } = useContext(LogContext);

  if (!Object.keys(runData).length) return null;

  const maxAct = Object.keys(runData.Acts).length;
  const minLevel = 0;
  const maxLevel = runData.Stations.reduce((a, b) => {
    const { Act, Level } = b.Node;
    const level = Act === act ? Level : 0;
    const max = Math.max(a, level);
    return max;
  }, 0);

  function handleClick(offset: number) {
    const nextAct = act + offset as TAct;
    setAct(nextAct);
    setLevel(0);
    scrollToLevel(0);
  }
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextLevel = Number(e.target.value) as TLevel;
    setLevel(nextLevel);
    scrollToLevel(nextLevel);
  }

  function scrollToLevel(nextLevel: TLevel) {
    const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
    const map = document.querySelector('.js-map') as HTMLDivElement;
    if (!station || !map) return;
    const height = station.offsetTop - map.offsetHeight;
    window.scrollTo(0, height);
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