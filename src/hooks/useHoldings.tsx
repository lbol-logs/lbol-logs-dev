import { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Processing from 'components/common/layouts/processing';
import { THolding, TLevel } from 'utils/types/runData';
import { TDispatch, TObj } from 'utils/types/common';
import Act from 'components/log/act';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import CardCards from 'components/log/entityCards/cardCards';
import i18next from 'i18next';

function useHoldings({ level, currentHolding, setHoldingsHeight }: { level: TLevel, currentHolding: THolding, setHoldingsHeight: TDispatch<number> }) {
  const defaultHolding = <Processing />;
  const [holding, setHolding] = useState(defaultHolding);
  const holdingsRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useTranslation();

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
    const o: TObj<[Window & typeof globalThis | HTMLDivElement, EventListenerOrEventListenerObject]> = {
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
          <div className="p-holdings__line">
            <h2 className="p-holdings__act">
              <Act />
            </h2>
            <h3 className="p-holdings__level">
              <Trans
                i18nKey="level"
                ns="log"
                values={{ level }}
              />
            </h3>
          </div>
          <div className="p-holdings__line">
            <BaseManaWidget baseMana={BaseMana} />
          </div>

          <div className="p-holdings__counts">
            <span className="p-holdings__count--cards">
              <Trans
                i18nKey="cardsCount"
                ns="log"
                values={{
                  count: Cards.length
                }}
              />
            </span>
            <span className="p-holdings__count--exhibits">
              <Trans
                i18nKey="exhibitsCount"
                ns="log"
                values={{
                  count: Exhibits.length
                }}
              />
            </span>
          </div>

          <div className="p-holdings__entities">
            <div className="p-holdings__cards">
              <CardCards cards={Cards} />
            </div>

            <div className="p-holdings__exhibits">
              <ExhibitCards exhibits={Exhibits} />
            </div>
          </div>
        </>
      );
      setHolding(holding);
    }
    else {
      setHolding(defaultHolding);
    }
  }, [currentHolding, i18next.language]);

  return {
    holdingsRef,
    holding,
    startResizing,
    stopResizing
  };
}

export default useHoldings;