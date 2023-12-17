import { FitMode, Point, Size } from '../types';
import { ImageEntity } from '../ImageEntity';

import type { ExtendedOptions } from './types';

export class BackgroundEntity extends ImageEntity {
  public fitMode?: FitMode;
  public alignX?: boolean;
  public alignY?: boolean;

  constructor(asset: string, options?: ExtendedOptions) {
    const {
      fitMode,
      alignX,
      alignY,
      ...restOptions
    } = options;

    super(asset, restOptions);

    this.fitMode = fitMode;
    this.alignX = alignX;
    this.alignY = alignY;
  }

  protected loadEffect() {
    this.size = {
      width: this.asset.naturalWidth,
      height: this.asset.naturalHeight,
    };
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const renderSize = this.getRenderSize(ctx);
    const renderPosition = this.getRenderPosition(ctx, 
      renderSize);

    ctx.drawImage(
      this.asset,
      renderPosition.x,
      renderPosition.y,
      renderSize.width,
      renderSize.height,
    );
  }

  private getRenderPosition(ctx: CanvasRenderingContext2D, renderSize: Size): Point {
    const { width, height } = renderSize;

    const {
      width: canvasWidth,
      height: canvasHeight,
    } = ctx.canvas;
    
    let { x, y } = this.position;

    if (this.alignX) {
      x = (canvasWidth - width) / 2;
    }

    if (this.alignY) {
      y = (canvasHeight - height) / 2;
    }

    return {
      x,
      y,
    };
  }

  private getRenderSize(ctx: CanvasRenderingContext2D) {
    const {
      width: entityWidth,
      height: entityHeight,
    } = this.size;

    const {
      width: canvasWidth,
      height: canvasHeight,
    } = ctx.canvas;

    const ratioX = canvasWidth / entityWidth;
    const ratioY = canvasHeight / entityHeight;

    // Contain mode
    if (this.fitMode === 'contain') {
      const ratio = Math.min(ratioX, ratioY);

      return {
        width: entityWidth * ratio,
        height: entityHeight * ratio,
      };
    }

    // Cover mode
    if (ratioY > ratioX) {
      return {
        width: entityWidth * ratioY,
        height: canvasHeight,
      };
    }

    return {
      width: canvasWidth,
      height: entityHeight * ratioX,
    };
  }
}
