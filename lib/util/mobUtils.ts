import Entity from "@lib/models/dm-helper/Entity";

export const sortEntities = (entities: Entity[]) => {
  if (!entities) return [];
  return entities.sort((a, b) => {
    // First, sort by name
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

    // If name is the same, sort by id
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;

    // If both name and id are the same
    return 0;
  });
};

export const sortEntitiesByInitiative = (entities: Entity[]) => {
  if (!entities) return [];
  return entities.sort((a, b) => {
    // Sort by initiative in descending order
    if (a.initiative > b.initiative) return -1;
    if (a.initiative < b.initiative) return 1;

    // If initiative is the same, fallback to sorting by name
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

    // If name is also the same, fallback to sorting by id
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;

    // If all properties are the same, consider them equal
    return 0;
  });
};
