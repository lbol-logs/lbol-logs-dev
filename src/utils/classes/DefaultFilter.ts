enum ExhibitTypes {
  startingExhibit = 'startingExhibit',
  swappedExhibit = 'swappedExhibit'
};

class DefaultFilter {
  static keys = {
    na: 'na',
    no: 'no',
    ch: 'ch',
    sc: 'sc',
    et: 'et',
    st: 'st',
    sw: 'sw',
    di: 'di',
    rt: 'rt',
    rq: 'rq',
    re: 're',
    rs: 'rs'
  };

  static ExhibitTypes = ExhibitTypes;

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
    this.keys.na,
    this.keys.no,
    this.keys.rs
  ];

  static radios = [
    this.keys.et,
    this.keys.rt
  ];

  static get(name: string) {
    if (this.radios.includes(name)) return '';
    else return [];
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