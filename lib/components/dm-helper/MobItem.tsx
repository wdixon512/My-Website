import {
  Text,
  Flex,
  FormControl,
  Input,
  Button,
  FlexProps,
} from "@chakra-ui/react";
import AnimatedFlex from "@components/global/AnimatedFlex";
import Mob from "@lib/models/Mob";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import React from "react";

interface MobItemProps extends FlexProps {
  mob: Mob;
  handleDrop?: (id: string | number, x: number, y: number) => void;
}

export const MobItem: React.FC<MobItemProps> = ({
  mob,
  handleDrop,
  ...props
}) => {
  const { mobs, removeMob, setMobs } = useContext(DMHelperContext);
  // const [isDragging, setIsDragging] = useState(false);

  const updateHealth = (mob: Mob, newHealth) => {
    setMobs(
      mobs.map((m) =>
        m.id === mob.id ? new Mob(m.mobName, newHealth, m.mobNumber) : m
      )
    );
  };

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.dataTransfer.setData("text/plain", JSON.stringify(mob));
  //   setIsDragging(true);
  // };

  // const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //   handleDrop(mob.id, e.clientX, e.clientY);
  //   setIsDragging(false);
  // };

  return (
    <AnimatedFlex
      align="center"
      key={props.key}
      justify="space-between"
      p={2}
      borderBottomWidth={1}
      _hover={{ bg: "secondary.600", cursor: "pointer" }}
      // onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
      {...props}
    >
      <Flex w="full">
        <Flex alignItems="center" flex="1">
          <Text>
            <Text as="span" fontWeight="800">
              &nbsp;{mob.mobName} {mob.mobNumber}
            </Text>
          </Text>
        </Flex>
        <Flex flex="1" alignItems="center">
          <Text>Health:</Text>
          <FormControl>
            <Input
              type="number"
              fontWeight="800"
              value={mob.mobHealth}
              onChange={(e) => updateHealth(mob, parseInt(e.target.value))}
              w="90px"
              ml={2}
            />
          </FormControl>
        </Flex>
      </Flex>
      <Button variant="redSolid" onClick={() => removeMob(mob)}>
        Kill
      </Button>
    </AnimatedFlex>
  );
};

export default MobItem;
