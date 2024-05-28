export default class Mob {
  id: string;
  mobName: string;
  mobHealth: number;
  mobNumber?: number;

  constructor(mobName: string, mobHealth: number, mobNumber: number) {
    this.mobName = mobName;
    this.mobHealth = mobHealth;
    this.mobNumber = mobNumber;
    this.id = `${this.mobName}_${this.mobNumber}`;
  }
}
