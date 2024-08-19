import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import GapDescription from 'components/log/stations/parts/gapDescription';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getExhibitImage } from 'utils/functions/getImage';
import { ExhibitsEnhanceDrinkTea, THolding, THoldings, TNodeObj } from 'utils/types/runData';

function useGap(option: string, holdings: THoldings, Node: TNodeObj) {
  const { t } = useTranslation();
  const additionalDescRef = useRef<Array<JSX.Element>>([]);
  const isDrinkTea = option === 'DrinkTea';
  const currentHolding = holdings.find(({ Act, Level }) => Act === Node.Act && Level === Node.Level) as THolding;

  useEffect(() => {
    if (!isDrinkTea) return;
    if (!currentHolding) return;

    const additionalDesc = [];
    for (const exhibit of Object.keys(ExhibitsEnhanceDrinkTea)) {
      const hasExhibit = currentHolding.Exhibits.find(({ Id }) => Id === exhibit);
      if (hasExhibit) {
        const additionalOption = `${option}_${exhibit}`;

        additionalDesc.push(
          <GapDescription option={additionalOption} key={additionalOption}>
            <LazyLoadImage2 className="c-exhibit__img" callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
          </GapDescription>
        );
      }
    }
    additionalDescRef.current = additionalDesc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHolding]);

  return additionalDescRef;
}

export default useGap;