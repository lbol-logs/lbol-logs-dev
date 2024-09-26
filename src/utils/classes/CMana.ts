import { TCardMana } from 'utils/types/others';

class CMana {
  private s: string;
  public manas: Array<string> = [];

  constructor(input: TCardMana) {
    this.s = input.toString();

    do {
      const m = this.s.match(/\{(\d)([^}]+)\}/);
      if (m) {
        for (let i = 0; i < Number(m[1]); i++) this._handle(m[2], false);
        this._remove(m[0]);
      }
      else {
        this._handle(this.s);
      }
    } while (this.s.length);
  }

  private _handle(input: string, remove: boolean = true) {
    const m = input.match(/^(H+):(H[WUBRGC]{2})/);
    if (m) {
      for (let i = 0; i < m[1].length; i++) this.manas.push(m[2]);
      if (remove) this._remove(m[0]);
    }
    else {
      const mana = input[0];
      this.manas.push(mana);
      if (remove) this._remove(mana);
    }
  }

  private _remove(string: string) {
    this.s = this.s.slice(string.length);
  }
}

export default CMana;