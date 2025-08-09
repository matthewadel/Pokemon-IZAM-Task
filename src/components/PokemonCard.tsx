'use client';

import { usePokemon } from '@/hooks/usePokemon';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LoadingSpinner, { PokemonCardSkeleton } from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';

/**
 * Props interface for the PokemonCard component
 */
interface UnifiedPokemonCardProps {
  /** URL from PokeAPI to fetch Pokemon details (required) */
  pokemonUrl?: string;
}

/**
 * Individual Pokemon card component that displays Pokemon information in a card format
 * Fetches Pokemon data, handles loading states, and provides navigation to detail page
 * 
 * Features:
 * - Automatic data fetching from Pokemon URL
 * - Loading states with skeleton placeholder
 * - Error handling with retry functionality
 * - Image lazy loading with loading indicators
 * - Hover effects and smooth animations
 * - Responsive design across all screen sizes
 * - Navigation to detailed Pokemon page
 * - Type badges with consistent styling
 * 
 * Data Flow:
 * 1. Extracts Pokemon ID from the provided URL
 * 2. Fetches Pokemon details using custom hook
 * 3. Transforms API data for card display
 * 4. Renders card with image, name, ID, and types
 * 
 * @param pokemonUrl - PokeAPI URL to fetch Pokemon data from
 * @returns Interactive Pokemon card with navigation and loading states
 */
export default function UnifiedPokemonCard({
  pokemonUrl,
}: UnifiedPokemonCardProps) {
  // State to track image loading for smooth visual transitions
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract Pokemon ID from the API URL for data fetching
  // URL format: https://pokeapi.co/api/v2/pokemon/{id}/
  const pokemonId = pokemonUrl ? pokemonUrl.split('/pokemon/')[1] : '';
  
  // Fetch Pokemon data using custom hook with caching and error handling
  const { data: fetchedPokemon, isLoading, error } = usePokemon(pokemonId);

  // Transform fetched Pokemon data into simplified card data structure
  // This reduces the complexity and provides only what's needed for the card
  const pokemonData = (fetchedPokemon ? {
    id: fetchedPokemon.id,
    name: fetchedPokemon.name,
    // Prefer high-quality official artwork, fallback to default sprite
    sprite: fetchedPokemon.sprites.other['official-artwork'].front_default || fetchedPokemon.sprites.front_default,
    types: fetchedPokemon.types.map(t => t.type.name) // Extract type names from API structure
  } : null);

  // Show skeleton loading state while data is being fetched
  if (isLoading) {
    return <PokemonCardSkeleton />;
  }

  // Show error state if data fetching failed or no data available
  if ((error || !pokemonData)) {
    return (
      <ErrorComponent
        message="Failed to load Pokémon details. Please check your connection and try again."
      />
    );
  }

  // Don't render anything if no data is available (safety check)
  if (!pokemonData) {
    return null;
  }

  // Generate the navigation link to the Pokemon detail page
  const linkHref = `/pokemons/${pokemonData.id}`;

  return (
    <Link href={linkHref} className="block group">
      <div className="card-interactive">
        {/* Pokemon Image Container */}
        <div className="relative w-full h-40 mb-4 rounded-xl center-container overflow-hidden bg-gray-100">
          {/* Loading spinner shown until image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 center-container">
              <LoadingSpinner size="small" />
            </div>
          )}
          {/* Pokemon Image with lazy loading and hover effects */}
          <Image
            src={pokemonData.sprite}
            alt={pokemonData.name}
            width={120}
            height={120}
            loading="lazy" // Optimize performance with lazy loading
            className={`object-contain duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)} // Update state when image loads
            priority={false} // Not critical for initial page load
          />
        </div>

        {/* Pokemon Number - formatted with leading zeros */}
        <div className="text-sm font-medium mb-1 text-gray-400">
          #{pokemonData.id.toString().padStart(3, '0')}
        </div>

        {/* Pokemon Name - capitalized for better readability */}
        <h3 className="text-lg font-bold mb-3 capitalize text-gray-900">
          {pokemonData.name}
        </h3>

        {/* Pokemon Types - rendered as badges */}
        <div className="flex gap-2 flex-wrap">
          {pokemonData.types.map((type) => (
            <span
              key={type}
              className="badge" // Consistent badge styling from global CSS
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
