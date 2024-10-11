import ExternalLink from 'components/common/parts/externalLink';
import { Link } from 'react-router-dom';
import { TModConfigs } from 'utils/types/others';

function ModsWidget({ mods, version }: { mods: Array<TModConfigs>, version?: string }) {
  return (
    <div className="p-mods">
      {mods.map(({ GUID, Name, Version, Character, Url }) => {
        let logs = null;
        if (version) {
          logs = (
            <Link className="p-mod__logs" to={`/${version}/?ch=${Character}`}>Logs</Link>
          );
        }

        const props = { className: 'p-mod' };
        const inner = (
          <>
            <p className="p-mod__name">{Name}</p>
            <p className="p-mod__guid">{GUID}</p>
            {logs}
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
            <ExternalLink {...props} href={Url} key={GUID}>
              {inner}
            </ExternalLink>
          );
        }
      })}
    </div>
  );
}

export default ModsWidget;