import { Combat } from './Combat';
import Hero from './Hero';
import Mob from './Mob';

export type Room = {
  id: number;
  ownerUID: string;
  code: string;
  combat: Combat;
  mobFavorites: Mob[];
  heroes: Hero[];
};
