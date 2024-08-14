import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { Trans, useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import CharacterWidget from 'components/common/settings/characterWidget';
import RequestsWidget from 'components/common/settings/requestsWidget';
import ResultWidget from 'components/common/result/resultWidget';

function Summary() {
  const { runData, isRunDataLoaded, holdings } = useContext(LogContext);
  const { t } = useTranslation();
  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty, HasClearBonus, ShowRandomResult } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = Result;
  const exhibit = Exhibits[0];
  const resultData = { Character, Type, Timestamp, Difficulty, exhibit };

  // TODO: locales

  return (
    <section className="p-summary">
      <ResultWidget resultData={resultData} />
      <div className="p-summary__settings">
        <CharacterWidget character={Character} playerType={PlayerType} />
        {/* TODO: shinning exhibit */}
        <div>
          <RequestsWidget requests={Requests} />
        </div>
        {/* <p>{t('HasClearBonus', { ns: 'log' })}: {HasClearBonus.toString()}</p> */}
        <span>
          <Trans
            i18nKey="ShowRandomResult"
            ns="log"
            context={ShowRandomResult.toString()}
          />
        </span>
      </div>
      
      
      <BaseManaWidget baseMana={BaseMana} />
      <h3>{t('card', { ns: 'common', count: Cards.length })}</h3>
      <CardCards cards={Cards} />
      <h3>{t('exhibit', { ns: 'common', count: Exhibits.length })}</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;