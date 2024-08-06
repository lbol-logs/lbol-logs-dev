import Loading from 'components/common/loading';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import CardsR from 'components/log/cardsR/cardsR';
import ExhibitsR from 'components/log/exhibitsR/exhibitsR';

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
      <CardsR cards={Cards} />
      <ExhibitsR exhibits={Exhibits} />
    </section>
  );
}

export default Summary;