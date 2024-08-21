import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import GapDescription from 'components/log/stations/parts/gapDescription';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getExhibitImage } from 'utils/functions/getImage';
import { ExhibitsEnhanceDrinkTea, THolding, THoldings, TNodeObj, TRunData } from 'utils/types/runData';

function useGap({ option, runData, holdings, Node }: { option: string, runData: TRunData, holdings: THoldings, Node: TNodeObj }) {
  const { t } = useTranslation();

  const additionalDescRef = useRef<Array<JSX.Element>>([]);

  const currentHolding = holdings.find(({ Act, Level }) => Act === Node.Act && Level === Node.Level) as THolding;

  const PayForUpgrade = 'PayForUpgrade';
  const hasPayForUpgrade = runData.Settings.Requests.includes(PayForUpgrade);

  useEffect(() => {
    const additionalDesc = [];
  
    switch (option) {
      case 'DrinkTea':
        if (!currentHolding) return;

        for (const exhibit of Object.keys(ExhibitsEnhanceDrinkTea)) {
          const hasExhibit = currentHolding.Exhibits.find(({ Id }) => Id === exhibit);
          if (hasExhibit) {
            const additionalOption = `${option}_${exhibit}`;

            additionalDesc.push(
              <GapDescription option={additionalOption} key={additionalOption}>
                <LazyLoadImage2 className="c-exhibit__img u-img-vertical-align" callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
              </GapDescription>
            );
          }
        }
        break;
      case 'UpgradeCard':
        if (hasPayForUpgrade) {
          const additionalOption = `${option}_${PayForUpgrade}`;

          additionalDesc.push(
            <GapDescription option={additionalOption} key={additionalOption} />
          );
        }
        break;
    }
    additionalDescRef.current = additionalDesc;
  }, [currentHolding]);

  return additionalDescRef;
}

export default useGap;