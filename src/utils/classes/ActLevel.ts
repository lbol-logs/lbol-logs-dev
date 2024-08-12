import { TAct, TLevel, TRunData } from '../types/runData';

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
    const maxAct = Object.keys(this._runData.Acts).length as TAct;
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
    else if (level > (this._maxLevel as TLevel)) l = 0;
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