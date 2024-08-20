import LazyLoadImage2 from "components/common/utils/lazyLoadImage2";
import CardCards from "components/log/entityCards/cardCards";
import ExhibitCards from "components/log/entityCards/exhibitCards";
import { getCommonImage } from "utils/functions/getImage";
import CurrentChange from "../currentChange";
import { TRewards, TStation } from "utils/types/runData";
import { useTranslation } from "react-i18next";

function RewardsWidget({ station }: { station: TStation }) {
  const { t } = useTranslation();

  const { Rewards, Node: { Level } } = station;
  const { Cards, Exhibits } = Rewards as TRewards || {};

  let cards = null;
  let exhibits = null;

  if (Rewards) {
    cards = (
      <>
        {Cards.map((cards, i) => {
          return (
            <div className="p-entities__rewards p-entities__rewards--cards" key={i}>
              <div className="p-entities__label">
                <LazyLoadImage2 callback={getCommonImage} name={'Card'} alt={t('card', { ns: 'common' })} />
              </div>
              <CardCards cards={cards} />
            </div>
          );
        })}
      </>
    );

    if (Exhibits) {
      exhibits = (
        <div className="p-entities__rewards p-entities__rewards--exhibits">
          <div className="p-entities__label">
            <LazyLoadImage2 callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} />
        </div>
      );
    }
  }
  
  return (
    <div className="p-entities">
      {cards}
      {exhibits}
      <CurrentChange level={Level} />
    </div>
  );
}

export default RewardsWidget;