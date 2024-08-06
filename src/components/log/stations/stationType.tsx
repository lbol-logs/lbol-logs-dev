import { TStation } from 'utils/types/runData';

function StatationType({ station }: { station: TStation }) {
  const { Type, Node, Status, Data, Id, Rewards } = station;

  let data = null;
  let choices = null;
  let rounds = null;

  if (Data) {
    const { Choices, Rounds } = Data;

    if (Choices) {
      choices = (
        <p>Choices: {Data.choices.join(', ')}</p>
      );
    }

    if (Rounds) {
      rounds = (
        <p>Rounds: {Rounds}</p>
      );
    }
  }
  data = (
    <>
      {choices}
      {rounds}
    </>
  );

  return (
    <>
      <p>{Type}</p>
      {Id && (
        <p>Id: {Id}</p>
      )}
      {data}
    </>
  );
}

export default StatationType;