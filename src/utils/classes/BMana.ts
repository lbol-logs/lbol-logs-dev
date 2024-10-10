import { TBaseMana } from 'utils/types/runData';
import CMana from './CMana';

class BMana {
  private static _colors = 'WUBRGCPAN';

  static add(before: TBaseMana, change: TBaseMana) {
    const [current, changes] = this._parse(before, change);
    for (const mana of changes) {
      const i = current.indexOf(mana);
      if (i !== -1) {
        current.splice(i, 0, mana);
      }
      else {
        const colors = this._colors;
        let i = current.length;
        const start = colors.indexOf(mana);
        for (let j = start; j < colors.length; j++) {
          const k = current.indexOf(colors[j]);
          if (k !== -1) {
            i = k
            break;
          }
        }
        current.splice(i, 0, mana);
      }
    }
    return current.join('');
  }

  static remove(before: TBaseMana, change: TBaseMana) {
    const [current, changes] = this._parse(before, change);
    for (const mana of changes) {
      const i = current.indexOf(mana);
      current.splice(i, 1);
    }
    return current.join('');
  }

  private static _parse(before: TBaseMana, change: TBaseMana) {
    return [CMana.get(before), CMana.get(change)];
  }
}

export default BMana;