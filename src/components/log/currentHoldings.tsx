import { LogContext } from 'contexts/logContext';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { THolding } from 'utils/types/runData';
import CardCards from './entityCards/cardCards';
import ExhibitCards from './entityCards/exhibitCards';
import Processing from 'components/common/layouts/processing';
import { Trans, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import { defaultHoldingsHeight } from 'configs/globals';
import Act from './act';

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

  function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
    return e && 'touches' in e;
  }

  const resize = useCallback((event: MouseEvent | TouchEvent) => {
    if (isResizing) {
      let clientY;
      if (isTouchEvent(event)) {
        clientY = event.touches[0].clientY;
      }
      else {
        clientY = event.clientY;
      }
      if (clientY === undefined) return;
      const height = clientY - (holdingsRef.current as HTMLDivElement).getBoundingClientRect().top;
      setHoldingsHeight(height);
    }
  }, [isResizing]);

  useEffect(() => {
    const resizer = (document.querySelector('.p-holdings__resizer') as HTMLDivElement);
    const o: Record<string, [Window & typeof globalThis | HTMLDivElement, EventListenerOrEventListenerObject]> = {
      'mousemove': [window, resize as EventListenerOrEventListenerObject],
      'mouseup': [window, stopResizing],
      'touchmove': [resizer, resize as EventListenerOrEventListenerObject],
      'touchend': [resizer, stopResizing],
      'touchcancel': [resizer, stopResizing]
    };
    
    Object.entries(o).forEach(([event, [e, handler]]) => e.addEventListener(event, handler));

    return () => {
      Object.entries(o).forEach(([event, [e, handler]]) => e.removeEventListener(event, handler));
    };
  }, [holding, resize, stopResizing]);

  useEffect(() => {
    if (currentHolding) {
      const { Cards, Exhibits, BaseMana } = currentHolding;
      const holding = (
        <>
          <Act />
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
      onTouchStart={(e) => e.preventDefault()}
      onTouchEnd={(e) => e.preventDefault()}
      onTouchCancel={(e) => e.preventDefault()}
      style={{ height: holdingsHeight }}
    >
      <div className="p-holdings__inner">
        {holding}
      </div>
      <div
        className="p-holdings__resizer js-resizer"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        onTouchEnd={stopResizing}
        onTouchCancel={stopResizing}
      />
    </div>
  );
}

export default CurrentHoldings;