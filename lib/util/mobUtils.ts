import Mob from "@lib/models/Mob";

export const sortMobs = (mobs: Mob[]) => {
  if (!mobs) return [];
  return mobs.sort((a, b) => {
    // First, sort by mobName
    if (a.mobName.toLowerCase() < b.mobName.toLowerCase()) return -1;
    if (a.mobName.toLowerCase() > b.mobName.toLowerCase()) return 1;

    // If mobName is the same, sort by id
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;

    // If both mobName and id are the same
    return 0;
  });
};

export const sortMobsByInitiative = (mobs: Mob[]) => {
  if (!mobs) return [];
  return mobs.sort((a, b) => {
    // Sort by mobInitiative in descending order
    if (a.mobInitiative > b.mobInitiative) return -1;
    if (a.mobInitiative < b.mobInitiative) return 1;

    // If mobInitiative is the same, fallback to sorting by mobName
    if (a.mobName.toLowerCase() < b.mobName.toLowerCase()) return -1;
    if (a.mobName.toLowerCase() > b.mobName.toLowerCase()) return 1;

    // If mobName is also the same, fallback to sorting by id
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;

    // If all properties are the same, consider them equal
    return 0;
  });
};
