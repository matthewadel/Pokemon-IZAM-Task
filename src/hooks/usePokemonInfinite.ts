import { pokemonApi } from "@/services/pokemon-api";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Custom hook for infinite scroll Pokemon fetching
 * Manages automatic page loading and infinite data aggregation
 * 
 * @param limit - Number of Pokemon to fetch per page (default: 20)
 * @returns React Query infinite result with accumulated data and pagination controls
 * 
 * Features:
 * - Infinite scroll data management
 * - Automatic next page parameter calculation
 * - 5-minute cache duration matching regular list queries
 * - Background refetching support
 * - Seamless data aggregation across pages
 */
export const usePokemonInfinite = (limit: number = 20) => {
  return useInfiniteQuery({
    // Unique query key for infinite queries
    // Note: This is separate from regular list queries to avoid cache conflicts
    queryKey: ['pokemon-Imagenfinite'],
    
    /**
     * Query function that fetches a single page of data
     * @param pageParam - Current page offset (starts at 0)
     * @returns Promise with Pokemon list for the current page
     */
    queryFn: ({ pageParam = 0 }) => pokemonApi.getPokemonList(limit, pageParam),
    
    /**
     * Determines the parameter for the next page
     * @param lastPage - The most recently fetched page data
     * @param pages - Array of all fetched pages so far
     * @returns Next page offset or undefined if no more pages
     */
    getNextPageParam: (lastPage, pages) => {
      // If there's a 'next' URL in the response, calculate the next offset
      if (lastPage.next) {
        // Calculate offset based on number of pages already fetched
        return pages.length * limit;
      }
      // Return undefined to indicate no more pages available
      return undefined;
    },
    
    // Starting page parameter (offset 0)
    initialPageParam: 0,
    
    // Cache duration: 5 minutes (same as regular list queries)
    staleTime: 5 * 60 * 1000,
  });
};