export enum EntityType {
  MOB = 'mob',
  HERO = 'hero',
}

export type Entity = {
  id: string;
  apiUrl?: string;
  name: string;
  health?: number;
  number?: number;
  initiative?: number;
  type: EntityType;
};
