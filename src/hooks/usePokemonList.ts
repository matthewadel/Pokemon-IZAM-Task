import { pokemonApi } from "@/services/pokemon-api";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching paginated Pokemon lists
 * Optimized for traditional pagination with page-based navigation
 * 
 * @param limit - Number of Pokemon to fetch per page (default: 20)
 * @param offset - Starting position for the current page (default: 0)
 * @returns React Query result with Pokemon list data, loading states, and error handling
 * 
 * Features:
 * - 5-minute cache duration for list data
 * - Automatic pagination support through offset calculation
 * - Shared cache between different limit/offset combinations
 * - Background refetching when data becomes stale
 */
export const usePokemonList = (limit: number = 20, offset: number = 0) => {
    return useQuery({
        // Unique cache key that includes pagination parameters
        // This ensures different pages are cached separately
        queryKey: ['pokemon-list', limit, offset],
        
        // Query function that fetches the paginated list
        queryFn: () => pokemonApi.getPokemonList(limit, offset),
        
        // Cache duration: 5 minutes for list data
        // List data is cached for less time than individual Pokemon
        // since the list might change more frequently
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};