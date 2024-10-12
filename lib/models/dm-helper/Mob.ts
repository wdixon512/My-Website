import Entity from "./Entity";

export default class Mob extends Entity {
  constructor(name: string, health: number, number: number, initiative?: number) {
    super(name, health, number, initiative);
  }
}
