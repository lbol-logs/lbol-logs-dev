class DefaultFilter {
  static keys = {
    na: 'na',
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

  static texts = [
    this.keys.na
  ];

  static radios = [
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

export default DefaultFilter;