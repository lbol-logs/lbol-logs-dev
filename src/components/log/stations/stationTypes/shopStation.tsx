import { TStation } from 'utils/types/runData';
// import { useContext } from 'react';
// import { LogContext } from 'contexts/logContext';
// import { useTranslation } from 'react-i18next';
import RewardsWidget from '../parts/rewardsWidget';

function ShopStation({ station }: { station: TStation }) {
  const { Data } = station;

  if (!Data) return null;

  // const { Prices, Cards, Exhibits, Choice } = Data;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__body">
            <div className="p-dialogues">
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default ShopStation;