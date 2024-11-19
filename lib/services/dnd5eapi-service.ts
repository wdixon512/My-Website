import { AllMonstersResponse } from '@lib/models/dnd5eapi/AllMonstersResponse';
import { DetailedMob, SummaryMob } from '@lib/models/dnd5eapi/DetailedMob';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://www.dnd5eapi.co/api';

// Define the types for the API responses
interface UseDndApiHook {
  getMobByIndex: (index: string) => Promise<DetailedMob | null>;
  summaryMobs: SummaryMob[];
}

// Custom hook to interact with the D&D 5e API
export const useDndApi = (): UseDndApiHook => {
  const [summaryMobs, setSummaryMobs] = useState<SummaryMob[]>([]);

  useEffect(() => {
    // Load a list of monsters when the hook is first used
    const fetchMonsters = async () => {
      try {
        const response = await fetch(`${BASE_URL}/monsters`);
        if (!response.ok) {
          throw new Error('Failed to fetch monsters');
        }
        const monsterData: AllMonstersResponse = await response.json();
        setSummaryMobs(monsterData.results);
      } catch (error) {
        console.error('Failed to fetch monsters:', error);
      }
    };

    fetchMonsters();
  }, []);

  // Fetch details of a specific monster by its index
  const getMobByIndex = async (index: string): Promise<DetailedMob | null> => {
    try {
      const response = await fetch(`${BASE_URL}/monsters/${index}`);
      if (!response.ok) {
        throw new Error('Failed to fetch monster details');
      }
      return (await response.json()) as DetailedMob;
    } catch (error) {
      console.error('Failed to fetch monster details:', error);
      return null;
    }
  };

  // Return the list of monsters and the method to fetch detailed monster data
  return {
    getMobByIndex,
    summaryMobs,
  };
};

export default useDndApi;
