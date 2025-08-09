import { Pokemon, PokemonListResponse } from '@/types/pokemon';

// Base URL for the PokeAPI - official Pokemon data source
const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Pokemon API service layer that handles all external data fetching operations.
 * Provides a clean interface for components to interact with the PokeAPI.
 * All methods return promises and handle basic error scenarios.
 */
export const pokemonApi = {
  /**
   * Fetches a paginated list of Pokemon from the PokeAPI
   * @param limit - Number of Pokemon to fetch per request (default: 20)
   * @param offset - Starting position for pagination (default: 0)
   * @returns Promise<PokemonListResponse> - Paginated Pokemon list with navigation info
   * @throws Error if the API request fails
   */
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    
    return response.json();
  },

  /**
   * Fetches detailed information for a specific Pokemon by ID or name
   * @param id - Pokemon ID (number as string) or Pokemon name
   * @returns Promise<Pokemon> - Complete Pokemon data including stats, abilities, types
   * @throws Error if the Pokemon is not found or API request fails
   */
  getPokemon: async (id: string): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${id}`);
    }
    
    return response.json();
  },
};
