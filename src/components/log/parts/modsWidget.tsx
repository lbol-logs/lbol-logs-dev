import ExternalLink from 'components/common/parts/externalLink';
import { TMod } from 'utils/types/runData';

function ModsWidget({ mods }: { mods: Array<TMod & { Url?: string }> }) {
  return (
    <div className="p-mods">
      {mods.map(({ GUID, Name, Version, Url }) => {
        const props = { className: 'p-mod' };
        const inner = (
          <>
            <p className="p-mod__name">{Name}</p>
            <p className="p-mod__guid">{GUID}</p>
            <p className="p-mod__version">{Version}</p>
          </>
        );

        if (Url === undefined) {
          return (
            <div {...props} key={GUID}>
              {inner}
            </div>
          );
        }
        else {
          return (
            <ExternalLink {...props} href={Url}>
              {inner}
            </ExternalLink>
          );
        }
      })}
    </div>
  );
}

export default ModsWidget;