import Loading from 'components/common/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';

function Summary() {
  const { runData, isRunDataLoaded } = useContext(LogContext);
  if (!isRunDataLoaded) return <Loading />;

  const { Settings, Result } = runData;
  const { Character, PlayerType, Requests, Difficulty } = Settings;
  const { Type, Timestamp, Cards, Exhibits } = Result;

  return (
    <section className="p-summary">
      <p>{Character}</p>
      <p>{PlayerType}</p>
      <p>{Requests.join(', ')}</p>
      <p>{Difficulty}</p>
      <p>{Type}</p>
      <p>{Timestamp}</p>
      <h3>Cards</h3>
      <CardCards cards={Cards} />
      <h3>Exhibits</h3>
      <ExhibitCards exhibits={Exhibits} />
    </section>
  );
}

export default Summary;