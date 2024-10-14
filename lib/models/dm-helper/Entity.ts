export enum EntityType {
  MOB = "mob",
  HERO = "hero",
}

export default class Entity {
  id: string;
  name: string;
  health: number;
  number?: number;
  initiative?: number;
  type?: EntityType;

  constructor(
    name: string,
    health: number,
    number: number,
    initiative?: number
  ) {
    this.name = name;
    this.health = health;
    this.number = number;
    this.initiative = initiative;
    this.id = `${this.name}_${this.number}`;
  }
}
