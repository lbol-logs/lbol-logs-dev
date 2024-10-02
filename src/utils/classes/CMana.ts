import { TCardMana } from 'utils/types/others';

class CMana {
  public static get(input: string | number) {
    let s = input.toString();
    const manas: TCardMana = [];

    function _handle(input: string, remove: boolean = true) {
      const m = input.match(/^(H+):(H[WUBRGC]{2})/);
      if (m) {
        for (let i = 0; i < m[1].length; i++) manas.push(m[2]);
        if (remove) _remove(m[0]);
      }
      else {
        const mana = input[0];
        manas.push(mana);
        if (remove) _remove(mana);
      }
    }

    function _remove(string: string) {
      s = s.slice(string.length);
    }

    do {
      const m = s.match(/\{(\d)([^}]+)\}/);
      if (m) {
        for (let i = 0; i < Number(m[1]); i++) _handle(m[2], false);
        _remove(m[0]);
      }
      else {
        _handle(s);
      }
    } while (s.length);

    return manas;
  }
}

export default CMana;