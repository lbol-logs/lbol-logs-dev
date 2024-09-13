import { getLength } from 'utils/functions/helpers';
import { TAct, TLevel, TRunData, TStation } from '../types/runData';
import { TObjAny } from 'utils/types/common';
import { TRounds } from 'utils/types/others';
import { enemiesShowDetails } from 'configs/globals';

class ActLevel {
  constructor(runData: TRunData, act: TAct) {
    this._runData = runData;
    this._act = act;
  }

  private _runData: TRunData;
  private _act: TAct;
  private _maxAct: TAct | undefined;
  private _maxLevel: TLevel | undefined;

  public minAct() {
    return 0 as TAct;
  }

  public maxAct() {
    const maxAct = getLength(this._runData.Acts) as TAct;
    this._maxAct = maxAct;
    return maxAct;
  }

  public minLevel() {
    return 0 as TLevel;
  }

  public maxLevel() {
    const maxLevel = Number(this._runData.Stations.reduce((a, b) => {
      const { Act, Level } = b.Node;
      const level = Act === this._act ? Level : 0;
      const max = Math.max(a, level);
      return max;
    }, 0)) as TLevel;
    this._maxLevel = maxLevel;
    return maxLevel;
  }

  public rounds(): TRounds {
    const defaultRounds = {} as TRounds;
    const lastStation = this._runData.Stations.at(-1) as TStation;
    const { Id } =  lastStation;
    if (!Id || !enemiesShowDetails.includes(Id)) return defaultRounds;
    const { Data } = lastStation;
    if (!Data) return defaultRounds;
    const { Details } = Data;
    if (!Details) return defaultRounds;

    const { Act, Level } = lastStation.Node;
    const [minRound, maxRound] = Details.reduce((a: [number, number], b: TObjAny) => {
      const { Round } = b;
      const min = Math.min(a[0], Round);
      const max = Math.max(a[1], Round);
      return [min, max];
    }, [Infinity, -Infinity]);
    const rounds = {
      current: -1,
      minRound,
      maxRound,
      act: Act,
      maxLevel: Level
    };
    return rounds;
  }

  public act(act: TAct) {
    let a;
    if (act < 0) a = 0;
    else if (act > (this._maxAct as TAct)) a = 0;
    else a = act;
    return a as TAct;
  }

  public level(level: TLevel) {
    let l;
    if (level < 0) l = 0;
    else if (level > (this._maxLevel as TLevel)) l = this._maxLevel;
    else l = level;
    return l as TLevel;
  }

  public actLevel(act: TAct, level: TLevel) {
    this.maxAct();
    this.maxLevel();
    const a = this.act(act);
    const l = this.level(level);
    return { a, l };
  }
}

export default ActLevel;