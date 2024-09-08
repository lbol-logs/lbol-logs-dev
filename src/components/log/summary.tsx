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

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();
  if (!isRunDataLoaded) return <Loading />;

  const { Version, Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty, ShowRandomResult, IsAutoSeed, Mods } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana, Seed, ReloadTimes } = Result;
  const exhibit = Exhibits[0];
  const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };

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
            <span className="p-summary__seed">{Seed}</span>
            <IsAutoSeedWidget is={IsAutoSeed} />
          </div>
          <div className="p-summary__line">
            <span className="p-summary__version">{Version}</span>
            <ShowRandomResultWidget show={ShowRandomResult} />
            <ReloadTimesWidget count={ReloadTimes} />
          </div>
        </div>
        <ModsWidget mods={Mods} />
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