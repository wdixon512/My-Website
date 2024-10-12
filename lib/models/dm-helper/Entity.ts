export default class Entity {
  id: string;
  name: string;
  health: number;
  number?: number;
  initiative?: number;

  constructor(name: string, health: number, number: number, initiative?: number) {
    this.name = name;
    this.health = health;
    this.number = number;
    this.initiative = initiative;
    this.id = `${this.name}_${this.number}`;
  }
}
