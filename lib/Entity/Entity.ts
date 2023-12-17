import { DEFAULT_POSITION, DEFAULT_SIZE } from '../constants';

import type { Position, Size } from '../types';
import type { Options } from './types';

export abstract class Entity {
  public size: Size;
  public position: Position;
  public zIndex: number;
  public ready: Promise<void>;

  constructor(options: Options = {}) {
    const {
      size = DEFAULT_SIZE,
      position = DEFAULT_POSITION,
      zIndex,
    } = options;

    this.size = size;
    this.position = position;
    this.zIndex = zIndex;
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;
}
