import { TObjAny } from 'utils/types/common';
import BattleDetailsV1 from './battleDetailsV1';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { TMod, TStatus } from 'utils/types/runData';
import BattleDetailsV2 from './battleDetailsV2';

class Ver {
  private _major: number;
  private _minor: number;
  private _patch: number;

  constructor (version: string) {
    [this._major, this._minor, this._patch] = this._getVersion(version);
  }

  public isSince(version: string) {
    const [major, minor, patch] = this._getVersion(version);
    if (major < this._major) return true;
    if (major === this._major) {
      if (minor < this._minor) return true;
      if (minor === this._minor) {
        if (patch <= this._patch) return true;
      }
    }
    return false;
  }

  private _getVersion(version: string) {
    return version.split('.').map(e => Number(e));
  }
}

function BattleDetails({ details, enemy, status }: { details: Array<TObjAny>, enemy: string, status: TStatus }) {
  const { runData: { Settings: { Mods } } } = useContext(LogContext);

  const v = (() => {
    if (Mods) {
      const guid = 'ev.lbol.utils.runLogger';
      const { Version } = Mods.find(({ GUID }) => GUID === guid) as TMod;
      const ver = new Ver(Version);
      if (ver.isSince('1.1.0')) return 2;
    }
    return 1;
  })();

  if (v === 1) return <BattleDetailsV1 details={details} />;
  else if (v === 2) return <BattleDetailsV2 details={details} enemy={enemy} status={status} />;
  else return null;
}

export default BattleDetails;