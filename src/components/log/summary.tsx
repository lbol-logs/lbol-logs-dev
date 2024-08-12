import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import DifficultyWidget from 'components/common/parts/difficultyWidget';
import DateTime from 'components/common/parts/dateTime';
import PlayerTypeWidget from 'components/common/parts/playerTypeWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();

  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty, HasClearBonus, ShowRandomResult } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = Result;

  // TODO: locales

  return (
    <section className="p-summary">
      <p>{t(Character, { ns: 'common' })}</p>
      <PlayerTypeWidget character={Character} playerType={PlayerType} />
      {/* TODO: shinning exhibit */}
      <RequestsWidget requests={Requests} />
      <DifficultyWidget difficulty={Difficulty} />
      <p>{t(`result.${Type}`, { ns: 'common' })}</p>
      <p>{t('HasClearBonus', { ns: 'log' })}: {HasClearBonus.toString()}</p>
      <p>{t('ShowRandomResult', { ns: 'log' })}: {ShowRandomResult.toString()}</p>
      <DateTime timestamp={Timestamp} />
      <BaseManaWidget baseMana={BaseMana} />
      <h3>{t('card', { ns: 'common', count: Cards.length })}</h3>
      <CardCards cards={Cards} />
      <h3>{t('exhibit', { ns: 'common', count: Exhibits.length })}</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;