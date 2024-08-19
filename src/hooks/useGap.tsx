import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import GapDescription from 'components/log/stations/parts/gapDescription';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getExhibitImage } from 'utils/functions/getImage';
import { ExhibitsEnhanceDrinkTea, THolding, THoldings, TNodeObj } from 'utils/types/runData';

function useGap(isDrinkTea: boolean, holdings: THoldings, Node: TNodeObj) {
  console.log('useGap');
  const { t } = useTranslation();
  const additionalDescRef = useRef<Array<JSX.Element>>([]);
  const currentHolding = holdings.find(({ Act, Level }) => Act === Node.Act && Level === Node.Level) as THolding;

  useEffect(() => {
    if (!isDrinkTea) return;
    if (!currentHolding) return;

    const additionalDesc = [];
    for (const exhibit of Object.keys(ExhibitsEnhanceDrinkTea)) {
      const hasExhibit = currentHolding.Exhibits.find(({ Id }) => Id === exhibit);
      if (hasExhibit) {
        const desc = `Descriptions.DrinkTea_${exhibit}`;

        additionalDesc.push(
          <GapDescription desc={desc} key={desc}>
            <LazyLoadImage2 className="c-exhibit__img" callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
          </GapDescription>
        );
      }
    }
    additionalDescRef.current = additionalDesc;
    console.log('ineffect', additionalDescRef.current);
  }, [currentHolding]);

  return additionalDescRef;
}

export default useGap;