import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from 'components/common/layouts/loading';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';
import { useTranslation } from 'react-i18next';
import useControl from 'hooks/useControl';

function Control() {
  const { isRunDataLoaded, runData, act, setAct, level, setLevel, round, setRound, showMap, setShowMap } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const o = useControl({ isRunDataLoaded, runData, act, setAct, setLevel, setRound, showMap, setShowMap, navigate, searchParams, setSearchParams });

  if (!o) return <Loading />;

  const {
    maxAct,
    minLevel,
    maxLevel,
    rounds,
    backToTop,
    changeAct,
    changeLevel,
    handleToggle
  } = o;

  let buttonLeft = null;
  let centerArea = null;
  let buttonRight = null;
  let buttonRight2 = null;
  const isSummary = act === 0;
  const isLastAct = act === maxAct;

  const [minRound, maxRound] = rounds;
  let value = level;

  console.log({value, level, round});
  let max = maxLevel;
  if (minRound !== undefined) {
    if (round !== undefined) {
      value += Math.max(0, round - minRound + 1);
    }
    max += (maxRound as number) - minRound + 1;
  }

console.log({value,max})
  if (isSummary) {
    buttonLeft = (
      <span className="p-control__component" onClick={backToTop}>
        <LazyLoadImage2 callback={getControlImage} name="Back" alt={t('control.back', { ns: 'log' })} />
      </span>
    );
    centerArea = (
      <span className="p-control__component p-control__component--center">
        <span className="p-control__name">{runData.Name}</span>
      </span>
    );
    buttonRight2 = (
      <span className="p-control__component" onClick={() => changeAct(maxAct)}>
        <LazyLoadImage2 callback={getControlImage} name="Skip" alt={t('control.skip', { ns: 'log' })} />
      </span>
    );
  }
  else {
    buttonLeft = (
      <span className="p-control__component" onClick={() => changeAct(-1)}>
        <LazyLoadImage2 callback={getControlImage} name="Previous" alt={t('control.previous', { ns: 'log' })} />
      </span>
    );
    centerArea = (
      <span className="p-control__component p-control__component--center">
        <input className="p-control__range" type="range" value={value} min={minLevel} max={max} onChange={(e) => changeLevel(e, maxLevel, rounds)} />
      </span>
    );

    let img;
    if (showMap) {
      img = (
        <>
          <LazyLoadImage2 className="p-control__card" callback={getCommonImage} name="Card" alt={t('card', { ns: 'common' })} />
          <LazyLoadImage2 className="p-control__exhibit" callback={getCommonImage} name="Exhibit" alt={t('exhibit', { ns: 'common' })} />
        </>
      );
    }
    else {
      img = (
        <LazyLoadImage2 callback={getControlImage} name="Map" alt={t('control.map', { ns: 'log' })} />
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
        <LazyLoadImage2 callback={getControlImage} name="Back" alt={t('control.back', { ns: 'log' })} />
      </span>
    );
  }
  else {
    buttonRight = (
      <span className="p-control__component" onClick={() => changeAct(1)}>
        <LazyLoadImage2 callback={getControlImage} name="Next" alt={t('control.next', { ns: 'log' })} />
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

export default Control;