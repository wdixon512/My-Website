export default class Mob {
  id: string;
  mobName: string;
  mobHealth: number;
  mobNumber?: number;
  mobInitiative?: number;

  constructor(mobName: string, mobHealth: number, mobNumber: number, mobInitiative?: number) {
    this.mobName = mobName;
    this.mobHealth = mobHealth;
    this.mobNumber = mobNumber;
    this.mobInitiative = mobInitiative;
    this.id = `${this.mobName}_${this.mobNumber}`;
  }
}
