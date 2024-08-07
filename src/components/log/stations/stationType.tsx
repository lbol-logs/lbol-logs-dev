import { TStation } from 'utils/types/runData';
import ExhibitCards from '../entityCards/exhibitCards';
import CardCards from '../entityCards/cardCards';

function StatationType({ station }: { station: TStation }) {
  const { Type, Data, Id, Rewards } = station;

  let data = null;
  let choices = null;
  let rounds = null;
  let rewards = null;

  if (Data) {
    const { Choices, Rounds } = Data;

    if (Choices) {
      choices = (
        <p>Choices: {Choices.join(', ')}</p>
      );
    }

    if (Rounds) {
      rounds = (
        <p>Rounds: {Rounds}</p>
      );
    }
  }
  if (Rewards) {
    const { Money, Cards, Exhibits } = Rewards;
    let exhibits = null;

    const cards = (
      <div className="c-rewards__cards">
        <h4>Card rewards</h4>
        {Cards.map((cards, i) => {
          return (
            <CardCards cards={cards} key={i} />
          );
        })}
      </div>
    );

    if (Exhibits) {
      exhibits = (
        <div className="c-rewards_exhibits">
          <h4>Exhibit rewards</h4>
          <ExhibitCards exhibits={Exhibits} />
        </div>
      );
    }
    rewards = (
      <div className="c-rewards">
        <p>Money: {Money}</p>
        {cards}
        {exhibits}
      </div>
    );
  }
  data = (
    <>
      {choices}
      {rounds}
      {rewards}
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