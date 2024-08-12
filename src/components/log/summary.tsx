import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();

  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty, HasClearBonus, ShowRandomResult } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = Result;

  // TODO: locales
  // chacaters
  // requets

  return (
    <section className="p-summary">
      <p>{t(Character, { ns: 'characters' })}</p>
      <p>{t(PlayerType, { ns: 'characters' })}</p>
      <div>
        <span>{t('Requests', { ns: 'common' })}</span>
        {Requests.map(Request => {
          return (
            <span key={Request}>{t(Request, { ns: 'requests' })}</span>
          )
        })}
      </div>
      <p>{Difficulty}</p>
      <p>{Type}</p>
      <p>{t('HasClearBonus', { ns: 'log' })}: {HasClearBonus}</p>
      <p>{t('ShowRandomResult', { ns: 'log' })}: {ShowRandomResult}</p>
      <p>{Timestamp}</p>
      <BaseManaWidget baseMana={BaseMana} />
      <h3>{t('card', { ns: 'common', count: Cards.length })}</h3>
      <CardCards cards={Cards} />
      <h3>{t('exhibit', { ns: 'common', count: Exhibits.length })}</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;