import { TMods } from 'utils/types/runData';

function ModsWidget({ mods }: { mods: TMods}) {
  return (
    <div className="p-mods">
      {mods.map(({ GUID, Name, Version}) => {
        return (
          <div className="p-mod" key={GUID}>
            <p className="p-mod__name">{Name}</p>
            <p className="p-mod__guid">{GUID}</p>
            <p className="p-mod__version">{Version}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ModsWidget;