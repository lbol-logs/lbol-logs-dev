import { LogContext } from 'contexts/logContext';
import { ChangeEvent, useContext } from 'react';
import { TAct, TLevel } from 'utils/types/runData';
import { SetURLSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import { TObjString } from 'utils/types/common';
import Loading from 'components/common/layouts/loading';
import MapNodes from 'utils/classes/MapNodes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';

function Control() {
  const { isRunDataLoaded, runData, act, setAct, level, setLevel, showMap, setShowMap } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isRunDataLoaded) return <Loading />;
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
    scrollToLevel(l);
  }

  function handleToggle() {
    setShowMap(!showMap);
  }

  let buttonLeft = null;
  let centerArea = null;
  let buttonRight = null;
  let buttonRight2 = null;
  const isSummary = act === 0;
  const isLastAct = act === maxAct;

  if (isSummary) {
    buttonLeft = (
      <span className="p-control__component" onClick={backToTop}>
        <LazyLoadImage src={getControlImage('Back')} width={iconSize} height={iconSize} alt={t('control.back', { ns: 'common' })} />
      </span>
    );
    centerArea = (
      <span className="p-control__component p-control__component--center">
        {
          // TODO: character (icon, type, shiningexhibit), difficulty, requests, result
        }
      </span>
    );
    buttonRight2 = (
      <span className="p-control__component" onClick={() => changeAct(maxAct)}>
        <LazyLoadImage src={getControlImage('Skip')} width={iconSize} height={iconSize} alt={t('control.skip', { ns: 'common' })} />
      </span>
    );
  }
  else {
    buttonLeft = (
      <span className="p-control__component" onClick={() => changeAct(-1)}>
        <LazyLoadImage className="u-img-vertical" src={getControlImage('Previous')} width={27} height={iconSize} alt={t('control.previous', { ns: 'common' })} />
      </span>
    );
    centerArea = (
      <span className="p-control__component p-control__component--center">
        <input className="p-control__range" type="range" value={level} min={minLevel} max={maxLevel} onChange={changeLevel} />
      </span>
    );

    let img;
    if (showMap) {
      img = (
        <>
          <LazyLoadImage className="p-control__card" src={getCommonImage('Card')} width={iconSize} height={iconSize} alt={t('card', { ns: 'common' })} />
          <LazyLoadImage className="p-control__exhibit" src={getCommonImage('Exhibit')} width={iconSize} height={iconSize} alt={t('card', { ns: 'exhibit' })} />
        </>
      );
    }
    else {
      img = (
        <LazyLoadImage src={getControlImage('Map')} width={iconSize} height={iconSize} alt={t('control.map', { ns: 'common' })} />
      );
    }
    buttonRight2 = (
      <span className="p-control__component" onClick={handleToggle}>
        {img}
      </span>
    );
  }

  if (isLastAct) {
    buttonRight = (
      <span className="p-control__component" onClick={() => changeAct(-maxAct)}>
        <LazyLoadImage src={getControlImage('Back')} width={iconSize} height={iconSize} alt={t('control.back', { ns: 'common' })} />
      </span>
    );
  }
  else {
    buttonRight = (
      <span className="p-control__component" onClick={() => changeAct(1)}>
        <LazyLoadImage className="u-img-vertical" src={getControlImage('Next')} width={27} height={iconSize} alt={t('control.next', { ns: 'common' })} />
      </span>
    );
  };

  return (
    <section className="p-control">
      <div className="p-control__inner l-inner">
        {centerArea}
        {buttonLeft}
        {buttonRight}
        {buttonRight2}
      </div>
    </section>
  );
}

function updateQs(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, a: TAct, l?: TLevel) {
  const o: TObjString = {};
  if (a) o['a'] = a.toString();
  else searchParams.delete('a');
  if (l) o['l'] = l.toString();
  else searchParams.delete('l');
  setSearchParams(o, { replace: true });
}

function scrollToLevel(nextLevel: TLevel, scrollToY = true) {
  const map = document.querySelector('.js-map') as HTMLDivElement;
  if (!map) return;

  const inner = map.querySelector('.js-mapInner') as HTMLDivElement;
  if (inner) {
    const { gap, length } = MapNodes.mapOptions;
    const offset = (inner.offsetWidth - gap.x - length) * 0.3;
    const x = MapNodes.x1x2(nextLevel)[0] - gap.x - offset;
    inner.scrollTo(x, 0);
  }

  if (!scrollToY) return;
  const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
  if (station) {
    const y = station.offsetTop - map.offsetHeight;
    window.scrollTo(0, y);
  }
}

export default Control;

export {
  updateQs,
  scrollToLevel
};