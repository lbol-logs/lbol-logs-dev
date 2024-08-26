import { TStation } from 'utils/types/runData';
import { Trans, useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyImage } from '../parts/stationWidgets';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getStationImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';

function ShopStation({ station }: { station: TStation }) {
  const { t } = useTranslation();
  const { Data } = station;

  let dialogue;

  if (Data) {

    const { Prices, Choice } = Data;
    const { Remove, Upgrade } = Prices;

    dialogue = (
      <div className="p-dialogue">
        <div className="p-dialogue__options">
          <div className={`p-dialogue__option ${Choice === 0 ? 'p-dialogue__option--chosen' : ''}`}>
            {t('Shop.RemoveService', { ns: 'dialogues' })}
            <Trans
              i18nKey="Shop.ShopRemovePrice"
              ns="dialogues"
              values={{ 0: Remove }}
              components={{ Money: <MoneyImage /> }}
            />
          </div>
          <div className={`p-dialogue__option ${Choice === 1 ? 'p-dialogue__option--chosen' : ''}`}>
            {t('Shop.UpgradeService', { ns: 'dialogues' })}
            <Trans
              i18nKey="Shop.ShopUpgradePrice"
              ns="dialogues"
              values={{ 0: Upgrade }}
              components={{ Money: <MoneyImage /> }}
            />
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
            <div className="p-dialogues">
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