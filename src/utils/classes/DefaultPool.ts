// TODO
class DefaultPool {
  static keys = {
    ch: 'ch',
    ex: 'ex',
    et: 'et',
    pp: 'pp',
    jc: 'jc'
  };

  // TODO
  static et = {
    none: 'none',
    pp: 'pp',
    jc: 'jc'
  };

  static radios = [
    this.keys.ch,
    this.keys.et
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
    }
  }
}

export default DefaultPool;