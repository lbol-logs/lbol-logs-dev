import LazyLoadImage2 from "components/common/utils/lazyLoadImage2";
import CardCards from "components/log/entityCards/cardCards";
import ExhibitCards from "components/log/entityCards/exhibitCards";
import { getCommonImage } from "utils/functions/getImage";
import CurrentChange from "../currentChange";
import { TCardChanges, TCards, TExhibitChanges, TExhibits, TRewards, TStation } from "utils/types/runData";
import { useTranslation } from "react-i18next";
import { useContext, useMemo } from "react";
import { LogContext } from "contexts/logContext";
import { getCurrentLevel, getSameCardIndex, getSameExhibitIndex } from "utils/functions/helpers";

function RewardsWidget({ station, additionalCards }: { station: TStation, additionalCards?: TCards }) {
  const { runData, act } = useContext(LogContext);
  const { t } = useTranslation();

  const { Rewards, Node: { Level } } = station;
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

    let addedCards: TCardChanges;
    let addedExhibits: TExhibitChanges;
    let excludeCards: TCardChanges = [];
    let excludeExhibits: TExhibitChanges = [];

    {
      const { Stations, Cards, Exhibits } = runData;

      const currentCards = getCurrentLevel(Cards, Stations, act, Level);
      addedCards = currentCards.filter(({ Type }) => Type === 'Add');

      const currentExhibits = getCurrentLevel(Exhibits, Stations, act, Level);
      addedExhibits = currentExhibits.filter(({ Type }) => Type === 'Add');
    }

    cards = (
      <>
        {Cards.map((cards, i) => {
          const added = addedCards.map(addedCard => {
            const index = getSameCardIndex(cards, addedCard);
            if (index !== -1) {
              excludeCards.push(addedCard);
              return index;
            }
            else {
              return undefined;
            }
          }).filter(i => i !== undefined) as Array<number>;

          return (
            <div className="p-entity p-entity--cards" key={i}>
              <div className="p-entity__label">
                <LazyLoadImage2 callback={getCommonImage} name={'Card'} alt={t('card', { ns: 'common' })} />
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
            <LazyLoadImage2 callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} added={added} />
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