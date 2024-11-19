// TODO
class DefaultPool {
  static keys = {
    ch: 'ch',
    ex: 'ex',
    ev: 'ev',
    pp: 'pp',
    jc: 'jc'
  };

  // TODO
  static ev = {
    none: 'none',
    pp: 'pp',
    jc: 'jc'
  };

  static radios = [
    this.keys.ch,
    this.keys.ev
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
      case this.keys.ev:
        return this.ev.none;
    }
  }
}

export default DefaultPool;