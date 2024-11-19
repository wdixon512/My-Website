export type ArmorClass = {
  type: string;
  value: number;
};

export type Speed = {
  walk?: string;
  climb?: string;
};

export type Proficiency = {
  value: number;
  proficiency: {
    index: string;
    name: string;
    url: string;
  };
};

export type Senses = {
  darkvision?: string;
  passive_perception: number;
};

export type SpecialAbility = {
  name: string;
  desc: string;
};

export type Action = {
  name: string;
  desc: string;
  multiattack_type?: string;
  actions?: {
    action_name: string;
    count: number;
    type: string;
  }[];
  attack_bonus?: number;
  damage?: {
    damage_type: {
      index: string;
      name: string;
      url: string;
    };
    damage_dice: string;
  }[];
};

export type DetailedMob = {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: ArmorClass[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: Proficiency[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: string[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  special_abilities: SpecialAbility[];
  actions: Action[];
  url: string;
  legendary_actions: any[];
};

export type SummaryMob = {
  index: string;
  name: string;
  challenge_rating: number;
};
