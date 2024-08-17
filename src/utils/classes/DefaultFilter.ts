class DefaultFilter {
  static et = 'et';
  static all = 'all';
  static co = 'co';
  static sw = 'sw';

  static get(name: string) {
    switch (name) {
      case this.et:
        return '';
      default:
        return [];
    }
  }

  static check(name: string) {
    switch (name) {
      case this.et:
        return this.all;
      default:
        return [];
    }
  }
}

export default DefaultFilter;