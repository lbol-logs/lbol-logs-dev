import { TObjAny } from "utils/types/common";

class Configs {
  private _json: TObjAny;

  constructor (json: TObjAny) {
    // console.log('configs')
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

class CardsConfigs extends Configs {
  constructor (json: TObjAny) {
    // console.log('cards');
    super(json);
  }
}

export {
  CardsConfigs
};