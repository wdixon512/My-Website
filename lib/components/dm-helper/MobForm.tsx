import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import useDndApi from '@lib/services/dnd5eapi-service';
import { SummaryMob } from '@lib/models/dnd5eapi/DetailedMob';
import { debounce } from '@lib/util/js-utils';
import { MobTypeahead } from './MobTypeahead';

export const MobForm = () => {
  const [name, setName] = useState('');
  const [health, setHealth] = useState<string>('');
  const [initiative, setInitiative] = useState<string>('');
  const [selectedTypeaheadMob, setSelectedTypeaheadMob] = useState<SummaryMob | null>(null);
  const [typeaheadMobs, setTypeaheadMobs] = useState<SummaryMob[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const typeaheadRef = useRef(null);
  const { summaryMobs } = useDndApi();

  const { addMob, clearMobs, readOnlyRoom } = useContext(DMHelperContext);

  const handleAddMob = (e) => {
    e.preventDefault();

    const parsedHealth = health === '' ? null : parseInt(health, 10);
    const parsedInitiative = initiative === '' ? null : parseInt(initiative, 10);

    if (addMob(name, parsedHealth, parsedInitiative, selectedTypeaheadMob?.index)) {
      setName('');
      setHealth('');
      setInitiative('');
      setSelectedTypeaheadMob(null);
    }
  };

  const fetchTypeaheadMobs = async (userInput: string) => {
    if (userInput === '') {
      setTypeaheadMobs([]);
      return;
    }

    // Filter the list of mobs based on the user's input
    const filteredMobs = summaryMobs.filter((mob) => mob.name.toLowerCase().includes(userInput.toLowerCase()));

    setTypeaheadMobs(filteredMobs);
  };

  const debouncedFetchTypeaheadMobs = useCallback(debounce(fetchTypeaheadMobs, 200), [summaryMobs]);

  const handleMobNameChange = async (e) => {
    const userInput = e.target.value as string;
    setName(userInput);

    // Debounce the fetching of mobs against search term so it only happens once every 200ms
    debouncedFetchTypeaheadMobs(userInput);
    setHighlightedIndex(-1);

    // Clear out the api index when the user types in a new mob name
    setSelectedTypeaheadMob(null);
  };

  const handleTypeaheadSelect = (summaryMob: SummaryMob) => {
    setName(summaryMob.name);
    setSelectedTypeaheadMob(summaryMob);

    // Clear the typeahead list when a mob is selected
    setTypeaheadMobs([]);
    setHighlightedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay the blur effect to allow click event on list items
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleKeyDown = (e) => {
    if (typeaheadMobs.length > 0 && isFocused) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % typeaheadMobs.length);
        typeaheadRef.current?.scrollTo(0, (highlightedIndex + 1) * 40);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex - 1 + typeaheadMobs.length) % typeaheadMobs.length);
        typeaheadRef.current?.scrollTo(0, (highlightedIndex - 1) * 40);
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleTypeaheadSelect(typeaheadMobs[highlightedIndex]);
      }
    }
  };

  return (
    !readOnlyRoom && (
      <Box as="form" p={4} bg="gray.50" borderWidth={1} borderRadius="md" shadow="md" onSubmit={handleAddMob}>
        <FormControl mb={4} position="relative">
          <FormLabel color="blackAlpha.900">Mob Name</FormLabel>
          <Input
            type="text"
            value={name}
            color="blackAlpha.700"
            onChange={(e) => handleMobNameChange(e)}
            placeholder="Enter mob name"
            required={true}
            data-testid="mob-name-input"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <MobTypeahead
            ref={typeaheadRef}
            typeaheadMobs={typeaheadMobs}
            highlightedIndex={highlightedIndex}
            isFocused={isFocused}
            searchTerm={name}
            handleTypeaheadClick={handleTypeaheadSelect}
          />
          {selectedTypeaheadMob && (
            <FormLabel
              fontSize="xs"
              fontStyle="italic"
              color="blackAlpha.700"
              mt="1"
              data-testid="selected-mob-typeahead-label"
            >
              You have selected: <b>{selectedTypeaheadMob.name}</b>
            </FormLabel>
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="blackAlpha.900">Mob Initiative</FormLabel>
          <Input
            type="text"
            color="blackAlpha.700"
            value={initiative}
            onChange={(e) => setInitiative(e.target.value)}
            placeholder="Enter mob initiative"
            required={false}
            data-testid="mob-initiative-input"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="blackAlpha.900">Mob Health</FormLabel>
          <Input
            type="text"
            color="blackAlpha.700"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            placeholder="Enter mob health"
            required={false}
            data-testid="mob-health-input"
          />
        </FormControl>

        <Button type="submit" variant="solid" width="full" data-testid="submit-mob-button">
          Add Mob
        </Button>

        <Button variant="redLink" width="full" onClick={clearMobs} mt="4" data-testid="clear-mobs-button">
          Clear Mobs
        </Button>
      </Box>
    )
  );
};
