import { FitMode, Size } from '../types';
import { Entity } from '../Entity';

import { DEFAULT_SIZE } from '../constants';

import type { ExtendedOptions } from './types';

export class ImageEntity extends Entity {
  public size?: Size;
  public naturalSize?: Size;
  public fitMode?: FitMode;
  public alignX?: boolean;
  public alignY?: boolean;

  protected asset: HTMLImageElement;

  constructor(asset: string, options?: ExtendedOptions) {
    const {
      size,
      ...otherOptions
    } = options;

    super(otherOptions);

    this.asset = new Image();
    this.asset.src = asset;

    this.ready = new Promise<void>((resolve, reject) => {
      this.asset.onerror = reject;
      this.asset.onload = () => {
        this.naturalSize = {
          width: this.asset.naturalWidth,
          height: this.asset.naturalHeight,
        };

        this.loadEffect();
        this.prepareSize(size ?? this.size);
        resolve();
      };
    });
  }

  protected loadEffect() {}

  protected prepareSize(initialSize: ExtendedOptions['size']) {
    const XYRatio = this.naturalSize.width / this.naturalSize.height;

    const width = initialSize.width ?? initialSize.height * XYRatio;
    const height =  initialSize.height ?? initialSize.width / XYRatio;

    this.size = {
      width,
      height,
    };
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const { width, height } = this.size;
    const { x, y } = this.position;

    ctx.drawImage(this.asset, x, y, width, height,);
  }
}
