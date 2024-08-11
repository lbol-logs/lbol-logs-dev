import Loading from 'components/common/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/baseManaWidget';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  const { t } = useTranslation();

  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty, HasClearBonus, ShowRandomResult } = Settings;
  const { Type, Timestamp, Cards, Exhibits, BaseMana } = Result;

  return (
    <section className="p-summary">
      <p>{t(Character, { ns: 'Characters' })}</p>
      <p>{PlayerType}</p>
      <p>{Requests.join(', ')}</p>
      <p>{Difficulty}</p>
      <p>{Type}</p>
      <p>HasClearBonus: {HasClearBonus}</p>
      <p>ShowRandomResult: {ShowRandomResult}</p>
      <p>{Timestamp}</p>
      <BaseManaWidget baseMana={BaseMana} />
      <h3>Cards</h3>
      <CardCards cards={Cards} />
      <h3>Exhibits</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;