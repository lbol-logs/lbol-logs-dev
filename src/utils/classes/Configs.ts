import { TConfigsData, TObj, TObjAny } from 'utils/types/common';
import CMana from './CMana';
import { TCard } from 'utils/types/runData';
import { TCardMana } from 'utils/types/others';
import { getConfigsKey } from 'utils/functions/helpers';
import { getConfigs, getConfigsUrl } from 'utils/functions/fetchData';
import use from 'utils/functions/use';

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
        if (key === 'Keywords') continue;
        if (!(key in after)) this.json[id][1][key] = value;
      }
    }
  }

  override get(card: TCard | string) {
    const _card = card as TCard;
    const configs = super.get(_card.Id);
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
    return { ...configs, ...configs[key] };
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
}

class ConfigsData {
  private ver: string = '';
  private configs: TObj<TConfigsData> = {};
  private configsData: TConfigsData;

  constructor(configsData: TConfigsData) {
    this.configsData = configsData;
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
      const configs = use(getConfigs(version, name));
      const C = name === 'cards' ? CardsConfigs : Configs;
      this.set(key, new C(configs));
    }
  }

  async fetchAsync(version: string, names: Array<string>) {
    this.version = version;
    for (const name of names) {
      const key = getConfigsKey(name);
      if (key in this.configsData) continue;
      const response = await fetch(getConfigsUrl(version, name));
      const configs = await response.json();
      this.set(key, new Configs(configs));
    }
  }

  set version(version: string) {
    this._init(version);
    for (const [key, value] of Object.entries(this.configs[version])) this.configsData[key] = value;
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