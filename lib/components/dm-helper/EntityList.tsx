import { Box, Icon, List, Spinner, Text, useToast } from '@chakra-ui/react';
import { Suspense, useContext } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { sortEntitiesByInitiative } from '@lib/util/mobUtils';
import MobItem from './MobItem';
import { Entity, EntityType } from '@lib/models/dm-helper/Entity';
import HeroItem from './HeroItem';
import { FaUserEdit } from 'react-icons/fa';
import { Mob } from '@lib/models/dm-helper/Mob';
import { Hero } from '@lib/models/dm-helper/Hero';

export const EntityList = () => {
  const { entities, updateEntities, combatStarted, isClient, loadingFirebaseRoom, readOnlyRoom } =
    useContext(DMHelperContext);
  const toast = useToast();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedEntities = Array.from(sortEntitiesByInitiative(entities));
    const [removed] = reorderedEntities.splice(result.source.index, 1);
    reorderedEntities.splice(result.destination.index, 0, removed);

    //validate that the entities are still in the correct order
    const sortedEntities = sortEntitiesByInitiative(reorderedEntities);
    if (JSON.stringify(sortedEntities) !== JSON.stringify(reorderedEntities)) {
      toast({
        title: 'Invalid move',
        description: (
          <Text>
            You cannot move an entity out of initiative order. To change a creature's initiative, hover over the
            creature and click {'  '}
            <Icon as={FaUserEdit} />
          </Text>
        ),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    updateEntities(reorderedEntities);
  };

  return (
    <Box p={4} bg="secondary.200" borderWidth={1} borderRadius="md" shadow="md" w={{ base: '100%', lg: '500px' }}>
      {isClient &&
        (loadingFirebaseRoom ? (
          <Spinner size="lg" label="Loading entities..." />
        ) : !readOnlyRoom ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="EntityList">
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps} data-testid="entity-list">
                  {sortEntitiesByInitiative(entities).map((entity: Entity, i) => (
                    <Draggable key={entity.id} draggableId={entity.id} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-testid="entity-item"
                        >
                          {entity.type === EntityType.MOB ? (
                            <MobItem mob={entity as Mob} />
                          ) : (
                            combatStarted && <HeroItem hero={entity as Hero} textColor={'interactive.200'} />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <List data-testid="entity-list">
            {sortEntitiesByInitiative(entities).map((entity: Entity) => (
              <div key={entity.id} data-testid="entity-item">
                {entity.type === EntityType.MOB ? (
                  <MobItem mob={entity as Mob} />
                ) : (
                  combatStarted && <HeroItem hero={entity as Hero} textColor={'interactive.200'} />
                )}
              </div>
            ))}
          </List>
        ))}
    </Box>
  );
};
