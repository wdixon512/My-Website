import { Box, List } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { sortMobs } from "@lib/util/mobUtils";
import Mob from "@lib/models/Mob";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MobItem from "./MobItem";

export const MobList = () => {
  const { mobs, setMobs, isClient } = useContext(DMHelperContext);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedMobs = Array.from(mobs);
    const [removed] = reorderedMobs.splice(result.source.index, 1);
    reorderedMobs.splice(result.destination.index, 0, removed);

    setMobs(reorderedMobs);
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
          <Droppable droppableId="mobList">
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {mobs.map((mob: Mob, i) => (
                  <Draggable
                    key={mob.id}
                    draggableId={mob.id.toString()}
                    index={i}
                  >
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
