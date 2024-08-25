import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { getCommonImage } from 'utils/functions/getImage';
import CurrentChange from '../currentChange';
import { TCardChanges, TCards, TExhibitChanges, TExhibits, TRewards, TStation } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import { useContext, useMemo } from 'react';
import { LogContext } from 'contexts/logContext';
import { getCurrentLevel, getSameExhibitIndex } from 'utils/functions/helpers';
import getAddedCards from 'utils/functions/getAddedCards';
import { TObjNumber } from 'utils/types/common';

function RewardsWidget({ station, additionalCards }: { station: TStation, additionalCards?: TCards }) {
  const { runData, act } = useContext(LogContext);
  const { t } = useTranslation();

  const { Rewards, Node: { Level }, Data } = station;
  let { Cards, Exhibits } = Rewards as TRewards || {};

  const { cards, exhibits, excludes } = useMemo(() => {
    if (!Rewards) {
      if (additionalCards) {
        Cards = [additionalCards];
      }
      else {
        return {
          cards: null,
          exhibits: null,
          excludes: undefined
        };
      }
    }

    let cards;
    let exhibits = null;

    let addedCards: Array<Array<number>>;
    let excludeCards: TCardChanges = [];
    let addedExhibits: TExhibitChanges;
    const excludeExhibits: TExhibitChanges = [];

    let exhibitPrices: TObjNumber = {};
    if (Data) {
      const { Prices } = Data;
      if (Prices) {
        let _r, _u;
        ({ Remove: _r, Upgrade: _u, ...exhibitPrices } = Prices);
      }
    }

    {
      const { Stations, Cards: CardChanges, Exhibits } = runData;
      ({ addedCards, excludeCards } = getAddedCards({ CardRewards: Cards, CardChanges, Stations, act, Level }));
      const currentExhibits = getCurrentLevel(Exhibits, Stations, act, Level);
      addedExhibits = currentExhibits.filter(({ Type }) => Type === 'Add');
    }

    cards = (
      <>
        {Cards.map((cards, i) => {
          const added = addedCards[i];

          return (
            <div className="p-entity p-entity--cards" key={i}>
              <div className="p-entity__label">
                <LazyLoadImage2 callback={getCommonImage} name="Card" alt={t('card', { ns: 'common' })} />
              </div>
              <CardCards cards={cards} added={added} />
            </div>
          );
        })}
      </>
    );

    if (Exhibits) {
      const added = addedExhibits.map(addedExhibit => {
        const index = getSameExhibitIndex(Exhibits as TExhibits, addedExhibit);
        if (index !== -1) {
          excludeExhibits.push(addedExhibit);
          return index;
        }
        else {
          return undefined;
        }
      }).filter(i => i !== undefined) as Array<number>;

      exhibits = (
        <div className="p-entity p-entity--exhibits">
          <div className="p-entity__label">
            <LazyLoadImage2 callback={getCommonImage} name="Exhibit" alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} added={added} prices={exhibitPrices} />
        </div>
      );
    }

    const excludes = {
      Cards: excludeCards,
      Exhibits: excludeExhibits
    };

    return { cards, exhibits, excludes };

  }, []);
  
  return (
    <div className="p-entities">
      {cards}
      {exhibits}
      <CurrentChange level={Level} excludes={excludes} />
    </div>
  );
}

export default RewardsWidget;