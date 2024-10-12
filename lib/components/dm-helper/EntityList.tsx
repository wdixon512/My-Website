import { Box, List } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { sortEntitiesByInitiative } from "@lib/util/mobUtils";
import Mob from "@lib/models/dm-helper/Mob";
import MobItem from "./MobItem";

export const EntityList = () => {
  const { entities, setEntities, isClient } = useContext(DMHelperContext);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedEntities = Array.from(entities);
    const [removed] = reorderedEntities.splice(result.source.index, 1);
    reorderedEntities.splice(result.destination.index, 0, removed);

    setEntities(reorderedEntities);
  };

  return (
    <Box
      p={4}
      bg="secondary.200"
      borderWidth={1}
      borderRadius="md"
      shadow="md"
      w={{ base: "100%", lg: "500px" }}
    >
      {isClient && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="EntityList">
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {sortEntitiesByInitiative(entities).map((mob: Mob, i) => (
                  <Draggable key={mob.id} draggableId={mob.id} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MobItem mob={mob} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};
