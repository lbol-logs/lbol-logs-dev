import { LogContext } from 'contexts/logContext';
import { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from 'components/common/layouts/loading';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';
import { useTranslation } from 'react-i18next';
import useControl from 'hooks/useControl';
import { CommonContext } from 'contexts/commonContext';
import { toggleAside } from 'utils/functions/helpers';

function Control() {
  const { asideHoldings, setAsideHoldings } = useContext(CommonContext);
  const { isRunDataLoaded, runData, act, setAct, level, setLevel, rounds, setRounds, showMap, setShowMap } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isFromList, setIsFromList] = useState(false);

  useMemo(() => {
    if (state && state.isFromList) setIsFromList(true);
  }, []);

  const o = useControl({ isRunDataLoaded, runData, act, setAct, setLevel, rounds, setRounds, showMap, setShowMap, navigate, searchParams, setSearchParams, setAsideHoldings, isFromList });

  if (!o) return <Loading />;

  const {
    maxAct,
    minLevel,
    maxLevel,
    backToTop,
    changeAct,
    changeLevel,
    handleToggle,
    handleAside
  } = o;

  let buttonLeft = null;
  let centerArea = null;
  let buttonRight = null;
  let buttonRight2 = null;
  const isSummary = act === 0;
  const isLastAct = act === maxAct;
  const isAside = asideHoldings !== '';

  let value = level;
  let max = maxLevel;

  const { current, minRound, maxRound, act: _act } = rounds;
  if (act === _act) {
    if (current >= 0) {
      value += Math.max(0, current - minRound + 1);
    }
    max += maxRound - minRound + 1;
  }

  if (isSummary) {
    buttonLeft = (
      <span className="p-control__component" onClick={backToTop}>
        <LazyLoadImage2 callback={getControlImage} name="Return" alt={t('control.return', { ns: 'log' })} />
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
        <input className="p-control__range" type="range" value={value} min={minLevel} max={max} onChange={changeLevel} />
      </span>
    );

    let img;
    if (isAside) {
      buttonRight2 = (
        <span className="p-control__component p-control__arrow" onClick={handleAside}>
            <LazyLoadImage2 callback={getControlImage} name="Arrow" alt={t(`control.${toggleAside(asideHoldings)}`, { ns: 'log' })} />
        </span>
      );
    }
    else {
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