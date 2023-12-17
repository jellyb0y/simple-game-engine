import { DEFAULT_POSITION } from '../constants';

import type { Point } from '../types';
import type { Options } from './types';

export abstract class Entity {
  public _position: Point;
  public zIndex: number;
  public ready: Promise<void>;
  public primaryPoint: Point;

  constructor(options: Options = {}) {
    const {
      primaryPoint = DEFAULT_POSITION,
      position = DEFAULT_POSITION,
      zIndex,
    } = options;

    this.primaryPoint = primaryPoint;
    this._position = position;
    this.zIndex = zIndex;
  }

  public get position() {
    return {
      x: this._position.x + this.primaryPoint.x,
      y: this._position.y + this.primaryPoint.y,
    }
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;
}
