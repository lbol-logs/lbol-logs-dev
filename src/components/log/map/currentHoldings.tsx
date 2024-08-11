import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useState } from 'react';
import { THolding } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import Processing from 'components/common/processing';
import { Trans, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import BaseManaWidget from 'components/common/baseManaWidget';

function CurrentHoldings() {
  const { act, level, holdings } = useContext(LogContext);
  const defaultHolding = <Processing />;
  const [holding, setHolding] = useState(defaultHolding);
  useTranslation();

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;

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
    <div className="p-map__holdings">
      {holding}
    </div>
  );
}

export default CurrentHoldings;