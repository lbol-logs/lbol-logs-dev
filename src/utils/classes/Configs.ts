import { TObjAny } from "utils/types/common";

class Configs {
  private _json: TObjAny;

  constructor (json: TObjAny) {
    this._json = json;
  }

  get(id: string) {
    return this._json[id];
  }

  get ids() {
    return Object.keys(this._json);
  }
}

export default Configs;