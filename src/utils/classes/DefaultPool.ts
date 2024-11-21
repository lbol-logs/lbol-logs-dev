class DefaultPool {
  static keys = {
    ch: 'ch',
    ex: 'ex',
    et: 'et',
    pp: 'pp',
    jc: 'jc',
    ft: 'ft'
  };

  static et = {
    none: 'none',
    pp: 'pp',
    jc: 'jc'
  };

  static ev = {
    PatchouliPhilosophy: 'pp',
    JunkoColorless: 'jc',
  };

  static cardFilters = [
    'LilyChun',
    'ChooseFriend',
    'FindCollection'
  ];

  static ft = {
    all: 'all',
    custom: 'custom',
    ...this.cardFilters.reduce((a, b) => Object.assign(a, { [b]: b }), {})
  };

  static radios = [
    this.keys.ch,
    this.keys.et,
    this.keys.pp,
    this.keys.jc
  ];

  static get(name: string) {
    switch (name) {
      case this.keys.ex:
        return [];
      default:
        return '';
    }
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