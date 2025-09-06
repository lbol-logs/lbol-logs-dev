import { useState } from 'react';
import ExternalLink from 'components/common/parts/externalLink';
import { TModConfigs } from 'utils/types/others';
import { Link } from 'react-router-dom';
import { modsThreshold } from 'configs/globals';

function ModsWidget({ mods, version, collapse = false }: { mods: Array<TModConfigs>, version?: string, collapse?: boolean }) {
  const [collapsed, setCollapsed] = useState(Boolean(collapse));

  const inner = (
    <div className="p-mods__inner">
      {mods.map(({ GUID, Name, Version, Character, Url }, i) => {
        let logs = null;
        if (version) {
          logs = (
            <Link className="p-mod__logs" to={`/${version}/?ch=Mods&mc=${Character}`}>Logs</Link>
          );
        }

        const isCollapsed = collapsed && i >= modsThreshold;
        const props = { className: `p-mod ${isCollapsed ? 'p-mod--collapsed': ''}` };
        const inner = (
          <>
            <p className="p-mod__name">{Name}</p>
            <p className="p-mod__guid">{GUID}</p>
            <div className="p-mod__right">
              {logs}
              <p className="p-mod__version">{Version}</p>
            </div>
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

  let toggle = null;
  if (collapse && mods.length > modsThreshold) {
    const onClick = () => setCollapsed(!collapsed);

    toggle = (
      <div className={`p-mods__button ${collapsed ? 'p-mods__button--collapsed' : ''}`} onClick={onClick}>
        {collapsed ? '▼': '▲'}
      </div>
    );
  }

  return (
    <div className="p-mods">
      {inner}
      {toggle}
    </div>
  );
}

export default ModsWidget;