import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import ResultWidget from 'components/common/parts/resultWidget';
import ShowRandomResultWidget from './parts/showRandomResultWidget';
import IsAutoSeedWidget from './parts/isAutoSeedWidget';
import ReloadTimesWidget from './parts/reloadTimesWidget';
import ModsWidget from './parts/modsWidget';
import { getResultData } from 'utils/functions/helpers';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();
  if (!isRunDataLoaded) return <Loading />;

  const { Version, Settings, Result } = runData;
  const { Requests, ShowRandomResult, IsAutoSeed, Mods } = Settings;
  const { Cards, Exhibits, BaseMana, Seed, ReloadTimes } = Result;
  const resultData = getResultData(runData);

  return (
    <section className="p-summary">
      <div className="p-summary__head">
        <div className="p-summary__widgets">
          <ResultWidget resultData={resultData} />
          <RequestsWidget requests={Requests} />
          <BaseManaWidget baseMana={BaseMana} />
        </div>
        <div className="p-summary__settings">
          <div className="p-summary__line">
            {Seed !== undefined && <span className="p-summary__seed">{Seed}</span>}
            <IsAutoSeedWidget is={IsAutoSeed} />
          </div>
          <div className="p-summary__line">
            <span className="p-summary__version">{Version}</span>
            <ShowRandomResultWidget show={ShowRandomResult} />
            {ReloadTimes !== undefined && <ReloadTimesWidget count={ReloadTimes} />}
          </div>
        </div>
        {Mods !== undefined && <ModsWidget mods={Mods} />}
      </div>
      <div className="p-summary__cards">
        <h3>{t('card', { ns: 'common', count: Cards.length })}</h3>
        <CardCards cards={Cards} />
      </div>
      <div className="p-summary__exhibits">
        <h3>{t('exhibit', { ns: 'common', count: Exhibits.length })}</h3>
        <ExhibitCards exhibits={Exhibits} />
      </div>
    </section>
  );
}

export default Summary;