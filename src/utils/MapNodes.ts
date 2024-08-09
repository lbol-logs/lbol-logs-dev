import { iconSize } from 'configs/globals';
import { TNodeX, TNodeY } from 'utils/types/runData';

class MapNodes {
  static mapOptions = {
    length: 24,
    padding: {
      x: 6,
      y: 2
    },
    size: iconSize,
    gap: {
      x: 48,
      y: 36
    },
    widths: {
      normal: 1,
      taken: 2,
      active: 3
    },
    colors: {
      normal: 'black',
      taken: 'blue',
      active: 'red'
    }
  };

  static x1x2(X: TNodeX) {
    const { length } = this.mapOptions;
    const x1 = this._x(X);
    const x2 = x1 + length;
    return [x1, x2];
  }

  static y1y2(Y: TNodeY, Y2: TNodeY, force = true) {
    const { padding, size } = this.mapOptions;
    const _Y = this._force(Y, force);
    const _Y2 = this._force(Y2, force);
    let y1 = this._y(_Y);
    let y2;
    const diff = (_Y - _Y2);
    if (diff) {
      const offset = diff * padding.y * 2;
      y1 += offset;
      y2 = this._y(_Y2) - offset;
    }
    else {
      if (!force) y1 += size;
      y2 = y1;
    }
    return [y1, y2];
  }

  static node(X: TNodeX, Y: TNodeY, force = true) {
    const { gap, padding, size } = this.mapOptions;
    const _Y = this._force(Y, force);
    const x = this._x(X) - gap.x + padding.x;
    const y = this._y(_Y) - size / 2;
    return [x, y];
  }

  private static _x(X: TNodeX) {
    const { gap, length } = this.mapOptions;
    const x: number = gap.x + X * (length + gap.x);
    return x;
  }

  private static _y(Y: TNodeY | 2.5) {
    const { gap } = this.mapOptions;
    const y: number = ((5 - Y) - 0.5) * gap.y;
    return y;
  }

  private static _force(Y: TNodeY, force: boolean) {
    let y;
    if (!Y) {
      if (force) y = 2.5;
      else y = 4;
    }
    else y = Y;
    return y as TNodeY | 2.5;
  }
}

export default MapNodes;