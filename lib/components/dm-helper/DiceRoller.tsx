import { Button, Flex, Text } from '@chakra-ui/react';
import { RollType, RollTypeMethods } from '@lib/models/dm-helper/RollType';
import { SummaryMob } from '@lib/models/dnd5eapi/DetailedMob';
import useDndApi from '@lib/services/dnd5eapi-service';
import { get } from 'cypress/types/lodash';
import { useState } from 'react';

interface DiceRollerProps {
  mob: SummaryMob;
  rollType: RollType;
  afterRoll: (roll: number) => void;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ mob, rollType, afterRoll }) => {
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);
  const { getMobByName } = useDndApi();

  const rollDice = () => {
    if (!mob) return;

    getMobByName(mob.name).then((detailedMob) => {
      const diceString = RollTypeMethods[rollType].getDice(detailedMob);

      // parse the dice string to get the number of dice and the dice type
      const [numDice, diceType] = diceString.split('d').map((num) => parseInt(num, 10));
      const [_, modifier] = diceString.split('+').map((num) => parseInt(num, 10));

      // Simulate rolling by choosing a random number between 1 and 20
      let roll = Math.floor(Math.random() * (numDice * diceType)) + 1;

      if (modifier) {
        roll += modifier;
      }

      setCurrentRoll(roll);
      afterRoll(roll);
    });
  };

  return (
    mob && (
      <Flex direction="column" align="center" justify="center">
        <Button onClick={rollDice} size={'sm'} alignSelf="flex-start">
          Roll
        </Button>
      </Flex>
    )
  );
};
