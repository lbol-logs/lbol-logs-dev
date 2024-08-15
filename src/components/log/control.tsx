import { LogContext } from 'contexts/logContext';
import { ChangeEvent, useContext } from 'react';
import { TAct, TLevel } from 'utils/types/runData';
import { SetURLSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import ActLevel from 'utils/classes/ActLevel';
import { TObjString } from 'utils/types/common';
import Loading from 'components/common/layouts/loading';
import MapNodes from 'utils/classes/MapNodes';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';
import { Trans, useTranslation } from 'react-i18next';
import { iconSize } from 'configs/globals';

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
    scrollToLevel(l, showMap);
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
        <LazyLoadImage2 callback={getControlImage} name={'Back'} alt={t('control.back', { ns: 'log' })} />
      </span>
    );
    centerArea = (
      <span className="p-control__component p-control__component--center">
        <Trans
          i18nKey="ShowRandomResult"
          ns="log"
          context={runData.Settings.ShowRandomResult.toString()}
        />
      </span>
    );
    buttonRight2 = (
      <span className="p-control__component" onClick={() => changeAct(maxAct)}>
        <LazyLoadImage2 callback={getControlImage} name={'Skip'} alt={t('control.skip', { ns: 'log' })} />
      </span>
    );
  }
  else {
    buttonLeft = (
      <span className="p-control__component" onClick={() => changeAct(-1)}>
        <LazyLoadImage2 className="u-img-vertical" callback={getControlImage} name={'Previous'} width={27} height={iconSize} alt={t('control.previous', { ns: 'log' })} />
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
          <LazyLoadImage2 className="p-control__card" callback={getCommonImage} name={'Card'} alt={t('card', { ns: 'common' })} />
          <LazyLoadImage2 className="p-control__exhibit" callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />
        </>
      );
    }
    else {
      img = (
        <LazyLoadImage2 callback={getControlImage} name={'Map'} alt={t('control.map', { ns: 'log' })} />
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
        <LazyLoadImage2 callback={getControlImage} name={'Back'} alt={t('control.back', { ns: 'log' })} />
      </span>
    );
  }
  else {
    buttonRight = (
      <span className="p-control__component" onClick={() => changeAct(1)}>
        <LazyLoadImage2 className="u-img-vertical" callback={getControlImage} name={'Next'} width={27} height={iconSize} alt={t('control.next', { ns: 'log' })} />
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

function scrollToLevel(nextLevel: TLevel, showMap: boolean, scrollToY = true) {
  if (showMap) {
    const inner = document.querySelector('.js-mapInner') as HTMLDivElement;
    if (inner) {
      const { gap, length } = MapNodes.mapOptions;
      const offset = (inner.offsetWidth - gap.x - length) * 0.3;
      const x = MapNodes.x1x2(nextLevel)[0] - gap.x - offset;
      inner.scrollTo(x, 0);
    }
  }

  if (scrollToY) {
    const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
    if (station) {
      const selector = showMap ? '.js-map' : '.js-holdings';
      const element = document.querySelector(selector) as HTMLDivElement;
      const y = station.offsetTop - element.offsetHeight;
      window.scrollTo(0, y);
    }
  }
}

export default Control;

export {
  updateQs,
  scrollToLevel
};