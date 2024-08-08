import { TCard, TExhibitObj, THolding, THoldingAction, THoldings } from 'utils/types/runData';

function holdingsReducer(holdings: THoldings, action: THoldingAction): THoldings {
  const { type, change } = action;
  const { Type, Station, ...entity } = change;
  const { Act, Level } = Station;
  const hasHolding = holdings.find(({ Act: _act, Level: _level }) => Act === _act && Level === _level);
  if (hasHolding) return holdings;
  
  const holding: THolding = {
    Act,
    Level,
    Cards: [],
    Exhibits: []
  };

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