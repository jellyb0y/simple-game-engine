import { Entity } from '../Entity';

import type { Size } from '../types';
import type { InitEntitiesList } from './types';

export class Frame {
  private canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private entitiesMap: Map<Entity, number>;

  public size: Size;

  constructor(canvasEl: HTMLCanvasElement, initEntities?: InitEntitiesList) {
    this.canvasEl = canvasEl;
    this.ctx = this.canvasEl.getContext('2d');

    this.entitiesMap = new Map();

    this.size = {
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight,
    };

    initEntities?.forEach((initEntity) => {
      if (initEntity instanceof Entity) {
        this.add(initEntity);
      } else {
        this.add(initEntity.entity, initEntity.zIndex);
      }
    });
  }

  public async add(entity: Entity, zIndex?: number) {
    await entity.ready;

    if (this.entitiesMap.has(entity)) {
      console.warn('Entity already on the frame');
      return;
    }

    this.entitiesMap.set(entity, zIndex ?? entity.zIndex ?? 0);

    this.draw();
  }

  public remove(entity: Entity) {
    if (!this.entitiesMap.has(entity)) {
      console.warn('Entity not exists on the frame');
      return;
    }

    this.entitiesMap.delete(entity);

    this.draw();
  }

  public draw() {
    requestAnimationFrame(() => {
      this.ctx.canvas.width = this.size.width;
      this.ctx.canvas.height = this.size.height;

      this.entitiesRenderOrder
        .forEach((entity) => entity.render(this.ctx));
    });
  }

  public resize() {
    this.size = {
      width: this.canvasEl.clientWidth,
      height: this.canvasEl.clientHeight,
    };

    this.draw();
  }

  private get entitiesRenderOrder() {
    return Array.from(this.entitiesMap.entries())
      .sort(([_, indexA], [__, indexB]) => indexB - indexA)
      .map(([entity]) => entity);
  }
}
