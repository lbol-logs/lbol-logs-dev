import { TAct, TCard, TExhibit, TExhibitObj, THoldingAction, THoldings, TLevel } from 'utils/types/runData';

function holdingsReducer(holdings: THoldings, action: THoldingAction): THoldings {
  const { type, change } = action;
  const { Type, Station, ...entity } = change;
  const { Act, Level } = Station;
  const holding = getHolding({ act: Act, level: Level });

  function getHolding({ act, level }: { act: TAct, level: TLevel }) {
    let holding = holdings.find(({ Act, Level }) => Act === act && Level === level);
    if (!holding) {
      holding = {
        Act: 1,
        Level: 0,
        Cards: [],
        Exhibits: []
      };
    }
    return holding;
  }

  if (Type === 'Add') {
    if (type === 'Cards') holding.Cards.push(entity as TCard);
    else holding.Exhibits.push(entity as TExhibitObj);

    return [
      ...holdings,
      holding
    ];
  }

  return holdings;
}

export default holdingsReducer;