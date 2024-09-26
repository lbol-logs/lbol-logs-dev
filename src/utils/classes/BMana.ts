import { TBaseMana } from 'utils/types/runData';

class BMana {
  private static _colors = 'WUBRGCPA';

  static add(before: TBaseMana, change: TBaseMana) {
    const after = before.split('');
    for (const mana of change) {
      const i = after.indexOf(mana);
      if (i !== -1) {
        after.splice(i, 0, mana);
      }
      else {
        const colors = this._colors;
        let i = after.length;
        const start = colors.indexOf(mana);
        for (let j = start; j < colors.length; j++) {
          const k = after.indexOf(colors[j]);
          if (k !== -1) {
            i = k
            break;
          }
        }
        after.splice(i, 0, mana);
      }
    }
    return after.join('');
  }

  static remove(before: TBaseMana, change: TBaseMana) {
    const after = before.replace(change, '');
    return after;
  }
}

export default BMana;