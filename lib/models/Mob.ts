export default class Mob {
  private _id?: string;
  mobName: string;
  mobHealth: number;
  mobNumber?: number;

  constructor(mobName: string, mobHealth: number, mobNumber: number) {
    this.mobName = mobName;
    this.mobHealth = mobHealth;
    this.mobNumber = mobNumber;
    this._id = `${this.mobName}_${this.mobNumber}`;
  }

  // Getter for id
  get id(): string {
    if (!this._id) {
      this._id = `${this.mobName}_${this.mobNumber}`;
    }
    return this._id;
  }

  // Setter for id, in case you want to set it manually
  set id(value: string) {
    this._id = value;
  }
}
