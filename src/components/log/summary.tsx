import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import ResultWidget from 'components/common/parts/resultWidget';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();
  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = Result;
  const exhibit = Exhibits[0];
  const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };

  // TODO: locales

  return (
    <section className="p-summary">
      <ResultWidget resultData={resultData} />
      <RequestsWidget requests={Requests} />
      
      
      <BaseManaWidget baseMana={BaseMana} />
      <h3>{t('card', { ns: 'common', count: Cards.length })}</h3>
      <CardCards cards={Cards} />
      <h3>{t('exhibit', { ns: 'common', count: Exhibits.length })}</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;