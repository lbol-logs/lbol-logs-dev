import { TStation } from 'utils/types/runData';
import { Trans, useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyImage, RevealImage } from '../parts/stationWidgets';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getNazrinImage, getStationImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import CardCards from 'components/log/entityCards/cardCards';

function ShopStation({ station }: { station: TStation }) {
  const { t } = useTranslation();
  const { Data } = station;

  let dialogue;

  if (Data) {

    const { Prices, Choice, Remove: removedCard, Upgrade: upgradedCard } = Data;
    const { Remove, Upgrade } = Prices;

    let tipsRemove = null;
    let tipsUpgrade = null;

    if (removedCard) {
      tipsRemove = (
        <span className="c-dialogue-tips">
          <RevealImage />
          <div className="c-dialogue-tips__body">
            <CardCards cards={[removedCard]} />
          </div>
      </span>
      );
    }

    if (upgradedCard) {
      tipsUpgrade = (
        <span className="c-dialogue-tips">
          <RevealImage />
          <div className="c-dialogue-tips__body">
            <CardCards cards={[upgradedCard]} />
          </div>
      </span>
      );
    }

    dialogue = (
      <div className="p-dialogue">
        <div className="p-dialogue__question">
          {t('Shop.CardService', { ns: 'dialogues' })}
        </div>
        <div className="p-dialogue__options">
          <div className={`p-shop-card-service p-dialogue__option ${Choice === 0 ? 'p-dialogue__option--chosen' : ''}`}>
            <div className="p-shop-card-service__inner">
              <LazyLoadImage2 className="p-shop-card-service__icon" callback={getNazrinImage} name="3" alt="" />
              <div className="p-shop-card-service__desc">
                {t('Shop.RemoveService', { ns: 'dialogues' })}
                <Trans
                  i18nKey="Shop.ShopRemovePrice"
                  ns="dialogues"
                  values={{ 0: Remove }}
                  components={{ Money: <MoneyImage /> }}
                />
              </div>
            </div>
            {tipsRemove}
          </div>
          <div className={`p-shop-card-service p-dialogue__option ${Choice === 1 ? 'p-dialogue__option--chosen' : ''}`}>
            <div className="p-shop-card-service__inner">
              <LazyLoadImage2 className="p-shop-card-service__icon" callback={getNazrinImage} name="4" alt="" />
              <div className="p-shop-card-service__desc">
                {t('Shop.UpgradeService', { ns: 'dialogues' })}
                <Trans
                  i18nKey="Shop.ShopUpgradePrice"
                  ns="dialogues"
                  values={{ 0: Upgrade }}
                  components={{ Money: <MoneyImage /> }}
                />
              </div>
            </div>
            {tipsUpgrade}
          </div>
        </div>
      </div>
    );
  }

  const size = iconSize * 2;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__body">
            <div className="p-dialogues p-dialogues--shop">
              <LazyLoadImage2 className="p-event__img" callback={getStationImage} name="ShopCardService" width={size} height={size} alt="" />
              {dialogue}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default ShopStation;