// TODO
class DefaultPool {
  static keys = {
    ch: 'ch',
    sc: 'sc',
    et: 'et',
    st: 'st',
    sw: 'sw',
    di: 'di',
    rt: 'rt',
    rq: 'rq',
    re: 're'
  };

  static et = {
    all: 'all',
    co: 'co',
    sw: 'sw'
  };

  static rt = {
    both: 'both',
    inactive: 'inactive',
    active: 'active'
  };

  static radios = [
    this.keys.ch,
    this.keys.et,
    this.keys.rt
  ];

  static get(name: string) {
    switch (name) {
      case this.keys.et:
        return '';
      case this.keys.rt:
        return '';
      default:
        return [];
    }
  }

  static check(name: string) {
    switch (name) {
      case this.keys.et:
        return this.et.all;
      case this.keys.rt:
        return this.rt.both;
    }
  }
}

export default DefaultPool;