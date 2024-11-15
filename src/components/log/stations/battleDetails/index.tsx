import { TObjAny } from 'utils/types/common';
import BattleDetailsV1 from './battleDetailsV1';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { TMod, TStatus } from 'utils/types/runData';
import BattleDetailsV2 from './battleDetailsV2';
import Ver from 'utils/classes/Ver';

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