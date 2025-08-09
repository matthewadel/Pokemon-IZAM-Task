import { useQuery, } from '@tanstack/react-query';
import { pokemonApi } from '@/services/pokemon-api';

/**
 * Custom hook for fetching individual Pokemon details by ID
 * Uses React Query for caching, error handling, and loading states
 * 
 * @param id - Pokemon ID (as string) to fetch details for
 * @returns React Query result object with data, loading, error states and refetch function
 * 
 * Features:
 * - 10-minute cache duration for detailed Pokemon data
 * - Conditional fetching (only runs when ID is provided)
 * - Automatic retry on failure
 * - Background refetching when stale
 */
export const usePokemon = (id: string) => {
  return useQuery({
    // Unique query key for caching - includes the Pokemon ID
    queryKey: ['pokemon', id],
    
    // Query function that calls the API service
    queryFn: () => pokemonApi.getPokemon(id),
    
    // Only fetch if ID is provided and truthy
    enabled: !!id,
    
    // Cache duration: 10 minutes for individual Pokemon (longer than list data)
    // Individual Pokemon data changes less frequently than the list
    staleTime: 10 * 60 * 1000, // 10 minutes for individual Pokemon
  });
};