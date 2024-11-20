import { Button, Flex } from '@chakra-ui/react';
import { RollType, RollTypeMethods } from '@lib/models/dm-helper/RollType';
import { SummaryMob } from '@lib/models/dnd5eapi/DetailedMob';
import useDndApi from '@lib/services/dnd5eapi-service';

interface DiceRollerProps {
  mob: SummaryMob;
  rollType: RollType;
  afterRoll: (roll: number) => void;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ mob, rollType, afterRoll }) => {
  const { getMobByName, rollDice } = useDndApi();

  const handleDiceRoll = () => {
    if (!mob) return;

    getMobByName(mob.name).then((detailedMob) => {
      const roll = rollDice(detailedMob, rollType);

      afterRoll(roll);
    });
  };

  return (
    mob && (
      <Flex direction="column" align="center" justify="center">
        <Button onClick={handleDiceRoll} size={'sm'} alignSelf="flex-start">
          Re-Roll
        </Button>
      </Flex>
    )
  );
};
