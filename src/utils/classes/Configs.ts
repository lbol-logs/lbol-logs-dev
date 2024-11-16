import { TConfigsData, TObj, TObjAny } from 'utils/types/common';
import CMana from './CMana';
import { TCard } from 'utils/types/runData';
import { TCardMana } from 'utils/types/others';
import { copyObject, getConfigsKey } from 'utils/functions/helpers';
import { getConfigs, getConfigsUrl } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { configsData, isDev, modsConfigsData } from 'configs/globals';

class Configs {
  protected key: string;
  protected json: TObjAny;

  constructor (key: string, json: TObjAny) {
    this.key = key;
    this.json = json;
  }

  has(id: string) {
    if (id === 'Shoot') return true;
    return id in this.json;
  }

  get(id: string, isMod = false) {
    let configs: any;
    if (this.has(id)) {
      configs = this.json[id];
    }
    else if (!isMod) {
      const modsConfigs = modsConfigsData[this.key];
      configs = modsConfigs.get(id, true);
      if (!configs) {
        if (this.key === 'exhibitsConfigs') configs = this.json.KongZhanpinhe;
        else if (this.key === 'statusEffectsConfigs') configs = { Id: 'NotAvailable' };
      }
      return configs;
    }
    else {
      if (isDev) console.info(`Id ${id} not found in ${this.key}`);
    }
    return configs;
  }

  get ids() {
    return Object.keys(this.json);
  }
}

export default Configs;

class CardsConfigs extends Configs {
  constructor (key: string, json: TObjAny) {
    super(key, json);
    for (const [id, configs] of Object.entries(json)) {
      const { 0: before, 1: after } = configs;

      this._handle(id, configs, 0);

      if (after === undefined) continue;
      this.json[id].IsUpgradable = true;

      this._handle(id, configs, 1);

      for (const [key, value] of Object.entries(before)) {
        if (key === 'Keywords') continue;
        if (!(key in after)) this.json[id][1][key] = value;
      }
    }
  }

  override has(card: TCard | string) {
    let id: string;
    if (typeof card === 'string') {
      id = card;
    }
    else {
      ({ Id: id } = card as TCard);
    }
    return super.has(id);
  }

  override get(card: TCard | string, isMod = false) {
    let _card: TCard;
    if (typeof card === 'string') {
      _card = { Id: card, IsUpgraded: false };
    }
    else {
      _card = card as TCard;
    }
    const id = _card.Id;

    let configs: any;
    if (this.has(id)) {
      configs = this.json[id];
    }
    else if (!isMod) {
      const { cardsConfigs } = modsConfigsData;
      if (cardsConfigs.has(id)) {
        const cardConfigs = cardsConfigs.get(_card, true) as CardConfigs;
        return cardConfigs;
      }
      {
        const id = 'HistoryCard';
        _card = { Id: id, IsUpgraded: false };
        configs = this.json[id];
      }
    }
    else {
      if (isDev) console.info(`Id ${id} not found in ${this.key}`);
    }

    const cardConfigs = new CardConfigs(configs, _card);
    return cardConfigs;
  }

  getAll(card: TCard) {
    return this.get(card).getAll();
  }

  private _handle(id: string, configs: TObjAny, IsUpgraded: number) {
    const { IsXCost } = configs;
    const { Keywords, Cost, Mana } = configs[IsUpgraded];
    if (Keywords !== undefined) this.json[id][IsUpgraded].Keywords = Keywords.split(',');
    if (Cost !== undefined) {
      let cost: TCardMana = [];
      let isUnplayable = false;
      if (Keywords !== undefined) isUnplayable = Keywords.includes('Forbidden');

      if (!isUnplayable) {
        cost = CMana.get(Cost);
        if (IsXCost) cost.unshift('X');
      }
      this.json[id][IsUpgraded].Cost = cost;
    }
    if (Mana !== undefined) this.json[id][IsUpgraded].Mana = CMana.get(Mana);
  }
}

class CardConfigs {
  private configs: TObjAny;
  private card: TCard;

  constructor (configs: TObjAny, card: TCard) {
    this.configs = configs;
    this.card = card;
  }

  getAll() {
    const { IsUpgraded } = this.card;
    const configs = this.configs;
    const key = IsUpgraded ? 1 : 0;
    const all = copyObject(configs);
    delete all['0'];
    delete all['1'];
    Object.assign(all, configs[key]);
    return all;
  }

  get art() {
    const { Id } = this.card;
    const { ImageId } = this.getAll();
    const art = ImageId || Id;
    return art;
  }

  get isUnremovable() {
    const { Keywords } = this.getAll();
    if (Keywords === undefined) return false;
    return Keywords.includes('Unremovable');
  }

  get isMisfortune() {
    const { Type } = this.getAll();
    return Type === 'Misfortune';
  }

  get type() {
    const { Type, Rarity } = this.getAll();
    const _type = this.isMisfortune ? Type : Rarity;
    return _type;
  }

  get isMod() {
    const { cardsConfigs } = configsData;
    return !cardsConfigs.has(this.card);
  }
}

class ConfigsData {
  private ver: string = '';
  private configs: TObj<TConfigsData> = {};
  private configsData: TConfigsData;
  private isMods: boolean;

  constructor(configsData: TConfigsData, isMods: boolean) {
    this.configsData = configsData;
    this.isMods = isMods;
  }

  get(version: string) {
    this._init(version);
    return this.configs[version];
  }

  set(key: string, configs: Configs) {
    this.configs[this.ver][key] = configs;
    this.configsData[key] = configs;
  }

  fetch(version: string, names: Array<string>) {
    for (const name of names) {
      const key = getConfigsKey(name);
      if (key in this.configsData) continue;
      const configs = use(getConfigs(version, name, this.isMods));
      const C = name === 'cards' ? CardsConfigs : Configs;
      this.set(key, new C(key, configs));
    }
  }

  async fetchAsync(version: string, names: Array<string>) {
    this.version = version;
    for (const name of names) {
      const key = getConfigsKey(name);
      // if (key in this.configsData) continue;
      const response = await fetch(getConfigsUrl(version, name, this.isMods));
      const configs = await response.json();
      this.set(key, new Configs(key, configs));
    }
  }

  set version(version: string) {
    this._init(version);
    const c = this.configs[version];
    for (const key in this.configsData) {
      const configs = c[key];
      if (configs !== undefined) this.set(key, configs);
    }
  }

  private _init(version: string) {
    this.ver = version;
    if (!(version in this.configs)) this.configs[version] = {} as TConfigsData;
  }
}

export {
  CardsConfigs,
  CardConfigs,
  ConfigsData
};