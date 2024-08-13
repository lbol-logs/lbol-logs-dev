import { LogContext } from 'contexts/logContext';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { THolding } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import Processing from 'components/common/layouts/processing';
import { Trans, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { defaultHoldingsHeight } from 'configs/globals';

function CurrentHoldings() {
  const { act, level, holdings } = useContext(LogContext);
  const defaultHolding = <Processing />;
  const [holding, setHolding] = useState(defaultHolding);
  useTranslation();

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;

  const holdingsRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [holdingsHeight, setHoldingsHeight] = useState(defaultHoldingsHeight);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((mouseMoveEvent: MouseEvent/*|TouchEvent*/) => {
    if (isResizing) {
      const height = mouseMoveEvent.clientY - (holdingsRef.current as HTMLDivElement).getBoundingClientRect().top;
      setHoldingsHeight(height);
    }
  }, [isResizing]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [holding, resize, stopResizing]);

  useEffect(() => {
    if (currentHolding) {
      const { Cards, Exhibits, BaseMana } = currentHolding;
      const holding = (
        <>
          <Trans
            i18nKey="act"
            ns="log"
            values={{
              act: act
            }}
            context={act.toString()}
          />
          <Trans
            i18nKey="level"
            ns="log"
            values={{
              level: level
            }}
          />
          <BaseManaWidget baseMana={BaseMana} />
          <Trans
            i18nKey="cardsCount"
            ns="log"
            values={{
              count: Cards.length
            }}
          />
          <CardCards cards={Cards} />
          <Trans
            i18nKey="exhibitsCount"
            ns="log"
            values={{
              count: Exhibits.length
            }}
          />
          <ExhibitCards exhibits={Exhibits} />
        </>
      );
      setHolding(holding);
    }
    else {
      setHolding(defaultHolding);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHolding, i18next.language]);

  return (
    <div
      className="p-holdings js-holdings"
      ref={holdingsRef}
      onMouseDown={(e) => e.preventDefault()}
      style={{ height: holdingsHeight }}
    >
      <div className="p-holdings__inner">
        {holding}
      </div>
      <div className="p-holdings__resizer" onMouseDown={startResizing} />
    </div>
  );
}

export default CurrentHoldings;