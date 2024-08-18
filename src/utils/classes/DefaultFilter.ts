class DefaultFilter {
  static keys = {
    et: 'et'
  };

  static et = 'et';
  static all = 'all';
  static co = 'co';
  static sw = 'sw';

  static rt = 'rt';
  static both = 'both';
  static active = 'active';

  static radios = [
    this.et,
    this.rt
  ];

  static get(name: string) {
    switch (name) {
      case this.et:
        return '';
      case this.rt:
        return '';
      default:
        return [];
    }
  }

  static check(name: string) {
    switch (name) {
      case this.et:
        return this.all;
      case this.rt:
        return this.both;
    }
  }
}

export default DefaultFilter;