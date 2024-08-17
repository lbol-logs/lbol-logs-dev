class DefaultFilter {
  static get(name: string) {
    switch (name) {
      case 'et':
        return '';
      default:
        return [];
    }
  }

  static getActual(name: string) {
    switch (name) {
      case 'et':
        return 'any';
      default:
        return [];
    }
  }
}

export default DefaultFilter;