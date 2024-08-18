class DefaultFilter {
  static keys = {
    sc: 'sc',
    et: 'et',
    rt: 'rt',
    rq: 'rq'
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