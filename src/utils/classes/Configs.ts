import { TConfigsData, TObj, TObjAny } from 'utils/types/common';
import CMana from './CMana';
import { configsData } from 'configs/globals';

class Configs {
  protected json: TObjAny;

  constructor (json: TObjAny) {
    this.json = json;
  }

  get(id: string) {
    return this.json[id];
  }

  get ids() {
    return Object.keys(this.json);
  }
}

export default Configs;

class CardsConfigs extends Configs {
  constructor (json: TObjAny) {
    super(json);
    for (const [id, configs] of Object.entries(json)) {
      const { 0: before, 1: after } = configs;

      this._handle(id, configs, 0);

      if (after === undefined) continue;
      this.json[id].IsUpgradable = true;

      this._handle(id, configs, 1);

      for (const [key, value] of Object.entries(before)) {
        if (!(key in after)) this.json[id][1][key] = value;
      }
    }
  }

  private _handle(id: string, configs: TObjAny, IsUpgraded: number) {
    const { Keywords, Cost, Mana } = configs[IsUpgraded];
    if (Keywords !== undefined) this.json[id][IsUpgraded].Keywords = Keywords.split(',');
    if (Cost !== undefined) this.json[id][IsUpgraded].Cost = new CMana(Cost).manas;
    if (Mana !== undefined) this.json[id][IsUpgraded].Mana = new CMana(Mana).manas;
  }
}

class ConfigsData {
  private ver: string = '';
  private configs: TObj<TConfigsData> = {};

  get(version: string) {
    this._init(version);
    return this.configs[version];
  }

  set(key: string, configs: Configs) {
    this.configs[this.ver][key] = configs;
    configsData[key] = configs;
  }

  set version(version: string) {
    this._init(version);
    for (const [key, value] of Object.entries(this.configs[version])) configsData[key] = value;
  }

  private _init(version: string) {
    this.ver = version;
    if (!(version in this.configs)) this.configs[version] = {};
  }
}

export {
  CardsConfigs,
  ConfigsData
};