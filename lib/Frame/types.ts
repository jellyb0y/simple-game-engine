import type { Entity } from '../Entity';

export type InitEntity = Entity | {
  entity: Entity;
  zIndex: number;
};

export type InitEntitiesList = InitEntity[];