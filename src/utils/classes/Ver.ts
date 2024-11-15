class Ver {
  private _major: number;
  private _minor: number;
  private _patch: number;

  constructor (version: string) {
    [this._major, this._minor, this._patch] = this._getVersion(version);
  }

  public isSince(version: string) {
    const [major, minor, patch] = this._getVersion(version);
    if (major < this._major) return true;
    if (major === this._major) {
      if (minor < this._minor) return true;
      if (minor === this._minor) {
        if (patch <= this._patch) return true;
      }
    }
    return false;
  }

  private _getVersion(version: string) {
    return version.split('.').map(e => Number(e));
  }
}

export default Ver;