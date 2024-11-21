enum Events {
  PatchouliPhilosophy = 'PatchouliPhilosophy',
  JunkoColorless = 'JunkoColorless'
};

enum CardFilters {
  LilyChun = 'LilyChun',
  ChooseFriend = 'ChooseFriend',
  FindCollection = 'FindCollection'
};

class DefaultPool {
  static keys = {
    ch: 'ch',
    ex: 'ex',
    et: 'et',
    pp: 'pp',
    jc: 'jc',
    ft: 'ft',
    co: 'co',
    rr: 'rr'
  };

  static Events = Events;

  static CardFilters = CardFilters;

  static et = {
    none: 'none',
    pp: 'pp',
    jc: 'jc'
  };

  static ev = {
    [this.Events.PatchouliPhilosophy]: 'pp',
    [this.Events.JunkoColorless]: 'jc',
  };

  static ft = {
    all: 'all',
    custom: 'custom',
    ...Object.keys(this.CardFilters).reduce((a, b) => Object.assign(a, { [b]: b }), {})
  };

  static radios = [
    this.keys.ch,
    this.keys.et,
    this.keys.pp,
    this.keys.jc,
    this.keys.ft
  ];

  static get(name: string) {
    if (this.radios.includes(name)) return '';
    else return [];
  }

  static check(name: string) {
    switch (name) {
      case this.keys.et:
        return this.et.none;
      case this.keys.ft:
        return this.ft.all;
    }
  }
}

export default DefaultPool;