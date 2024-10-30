import { Combat } from './Combat';
import Hero from './Hero';
import Mob from './Mob';

export type Room = {
  id?: string;
  ownerUID: string;
  combat: Combat;
  mobFavorites: Mob[];
  heroes: Hero[];
};
