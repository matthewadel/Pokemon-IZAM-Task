/**
 * Complete Pokemon data structure as returned by the PokeAPI
 * Contains all detailed information about a specific Pokemon including
 * sprites, stats, abilities, types, and physical characteristics
 */
export interface Pokemon {
  /** Unique identifier for the Pokemon */
  id: number;
  /** Pokemon name in lowercase */
  name: string;
  /** Collection of Pokemon sprite images */
  sprites: {
    /** Default front-facing sprite URL */
    front_default: string;
    /** High-quality official artwork sprites */
    other: {
      'official-artwork': {
        /** High-resolution front-facing artwork URL */
        front_default: string;
      };
    };
  };
  /** Pokemon height in decimeters (divide by 10 for meters) */
  height: number;
  /** Pokemon weight in hectograms (divide by 10 for kilograms) */
  weight: number;
  /** Array of Pokemon types (e.g., fire, water, grass) */
  types: Array<{
    type: {
      /** Type name (e.g., "fire", "water") */
      name: string;
    };
  }>;
  /** Array of Pokemon abilities including hidden abilities */
  abilities: Array<{
    ability: {
      /** Ability name (e.g., "blaze", "solar-power") */
      name: string;
    };
    /** Whether this ability is hidden/rare */
    is_hidden: boolean;
  }>;
  /** Array of base stats (HP, Attack, Defense, etc.) */
  stats: Array<{
    /** The numeric value of this stat */
    base_stat: number;
    stat: {
      /** Stat name (e.g., "hp", "attack", "defense") */
      name: string;
    };
  }>;
  /** Base experience points gained when defeating this Pokemon */
  base_experience: number;
}

/**
 * Individual Pokemon item as returned in list responses
 * Contains minimal information with a URL to fetch full details
 */
export interface PokemonListItem {
  /** Pokemon name in lowercase */
  name: string;
  /** API URL to fetch complete Pokemon details */
  url: string;
}

/**
 * Paginated response structure for Pokemon list endpoints
 * Includes navigation information for pagination
 */
export interface PokemonListResponse {
  /** Total number of Pokemon available */
  count: number;
  /** URL for the next page of results (null if last page) */
  next: string | null;
  /** URL for the previous page of results (null if first page) */
  previous: string | null;
  /** Array of Pokemon items for the current page */
  results: PokemonListItem[];
}

/**
 * Simplified Pokemon data structure optimized for card display
 * Contains only the essential information needed for Pokemon cards
 */
export interface PokemonCardData {
  /** Unique Pokemon identifier */
  id: number;
  /** Pokemon name for display */
  name: string;
  /** Primary sprite image URL */
  sprite: string;
  /** Array of type names for this Pokemon */
  types: string[];
}

/**
 * Union type for the two view modes supported by the application
 * - pagination: Traditional page-by-page navigation
 * - infinite: Continuous scrolling with automatic loading
 */
export type ViewMode = 'pagination' | 'infinite'