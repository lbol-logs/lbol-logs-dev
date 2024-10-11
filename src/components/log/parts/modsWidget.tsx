import { MouseEvent } from 'react';
import ExternalLink from 'components/common/parts/externalLink';
import { TModConfigs } from 'utils/types/others';
import { useNavigate } from 'react-router-dom';

function ModsWidget({ mods, version }: { mods: Array<TModConfigs>, version?: string }) {
  const navigate = useNavigate();

  return (
    <div className="p-mods">
      {mods.map(({ GUID, Name, Version, Character, Url }) => {
        let logs = null;

        const onClick = (e: MouseEvent<HTMLSpanElement>) => {
          e.preventDefault();
          const href = `/${version}/?ch=${Character}`;
          navigate(href);
        };

        if (version) {
          logs = (
            <span className="p-mod__logs" onClick={onClick}>Logs</span>
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