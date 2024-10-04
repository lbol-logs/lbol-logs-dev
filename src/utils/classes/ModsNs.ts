class ModsNs {
  private static prefix = 'mods.';

  static adds(nss: Array<string>) {
    nss = nss.map(ns => this.add(ns));
    return nss;
  }

  static add(ns: string) {
    ns = this.prefix + ns;
    return ns;
  }

  static is(ns: string) {
    return ns.startsWith(this.prefix);
  }

  static remove(ns: string) {
    if (this.is(ns)) {
      ns = ns.slice(this.prefix.length);
    }
    return ns;
  }
}

export default ModsNs;