export const sortMobs = (mobs) => {
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
