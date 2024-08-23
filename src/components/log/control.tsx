import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from 'components/common/layouts/loading';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';
import { Trans, useTranslation } from 'react-i18next';
import { iconSize } from 'configs/globals';
import useControl from 'hooks/useControl';
import { showRandom } from 'utils/functions/helpers';

function Control() {
  const { isRunDataLoaded, runData, act, setAct, level, setLevel, showMap, setShowMap } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const o = useControl({ isRunDataLoaded, runData, act, setAct, setLevel, showMap, setShowMap, navigate, searchParams, setSearchParams });

  if (!o) return <Loading />;

  const {
    maxAct,
    minLevel,
    maxLevel,
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
          context={showRandom(runData).toString()}
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
        <LazyLoadImage2 callback={getControlImage} name={'Previous'} alt={t('control.previous', { ns: 'log' })} />
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
        <LazyLoadImage2 callback={getControlImage} name={'Next'} alt={t('control.next', { ns: 'log' })} />
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