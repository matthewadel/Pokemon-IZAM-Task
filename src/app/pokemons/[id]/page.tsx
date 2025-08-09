'use client';

import { usePokemon } from '@/hooks/usePokemon';
import ErrorComponent from '@/components/ErrorComponent';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import {
  IoArrowBack,
  IoResize,
  IoBarbell,
  IoFlash,
  IoEye,
  IoEyeOff
} from 'react-icons/io5';
import { use } from 'react';
import Loading from '@/app/loading';

/**
 * Props interface for the Pokemon detail page
 */
interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Dynamic Pokemon detail page that displays comprehensive information about a specific Pokemon
 * Uses Next.js 15's dynamic routing with async params to handle Pokemon ID from URL
 * 
 * Features:
 * - Dynamic routing based on Pokemon ID
 * - Comprehensive Pokemon information display
 * - Gradient header design with Pokemon image
 * - Detailed stats with animated progress bars
 * - Abilities display with hidden ability indicators
 * - Physical characteristics (height, weight)
 * - Base experience points
 * - Back navigation with browser history
 * - Loading and error states with retry functionality
 * - Responsive design for all screen sizes
 * - Type-based color theming
 * 
 * Data Display:
 * - High-quality official artwork
 * - Formatted Pokemon number with leading zeros
 * - Capitalized Pokemon name
 * - Type badges with consistent styling
 * - Base stats with visual progress bars
 * - Abilities with hidden ability indicators
 * - Physical measurements in metric units
 * 
 * @param params - Next.js params containing the Pokemon ID from the URL
 * @returns Detailed Pokemon information page with comprehensive stats
 */
export default function Home({ params }: PageProps) {
  // Extract Pokemon ID from async params (Next.js 15 pattern)
  const { id } = use(params);
  
  // Navigation hook for back button functionality
  const router = useRouter();
  
  // Fetch detailed Pokemon data using custom hook
  const { data: pokemon, isLoading, error, refetch } = usePokemon(id);

  /**
   * Handles back navigation using browser history
   * Preserves user's navigation flow by going to previous page
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Back Navigation Button */}
        <Button
          onClick={handleBack}
          className="btn-primary mb-8"
        >
          <IoArrowBack className="w-4 h-4" />
          Back to List
        </Button>

        {/* Conditional Rendering Based on Loading/Error States */}
        {isLoading ?
          /* Loading State */
          <Loading />
          :

          (error || !pokemon) ? (
            /* Error State with Retry Functionality */
            <ErrorComponent
              message="Failed to load Pokémon details. Please check your connection and try again."
              onRetry={refetch}
            />
          )
            :
            /* Main Pokemon Detail Content */
            <>
              {/* Main Pokemon Detail Card */}
              <div className="rounded-3xl shadow-2xl overflow-hidden bg-white">
                
                {/* Header Section with Pokemon Image and Basic Info */}
                <div
                  className="relative px-8 py-12 text-white bg-blue-600"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    
                    {/* Pokemon Image Container */}
                    <div className="w-64 h-64 bg-white/20 rounded-full center-container">
                      <Image
                        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>

                    {/* Pokemon Basic Information */}
                    <div className="center-content md:text-left">
                      {/* Pokemon Number */}
                      <div className="text-white/80 text-lg font-medium mb-2">
                        #{pokemon.id.toString().padStart(3, '0')}
                      </div>
                      
                      {/* Pokemon Name */}
                      <h1 className="text-5xl font-bold mb-6 capitalize">
                        {pokemon.name}
                      </h1>

                      {/* Pokemon Types */}
                      <div className="flex gap-3 justify-center md:justify-start mb-6">
                        {pokemon.types.map((type) => (
                          <span
                            key={type.type.name}
                            className="px-4 py-2 bg-white/30 rounded-full text-white font-medium text-sm"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>

                      {/* Quick Physical Stats */}
                      <div className="flex gap-6 justify-center md:justify-start">
                        {/* Height (converted from decimeters to meters) */}
                        <div className="flex items-center gap-2">
                          <IoResize className="w-5 h-5" />
                          <span className="font-medium">{(pokemon.height / 10).toFixed(1)} m</span>
                        </div>
                        
                        {/* Weight (converted from hectograms to kilograms) */}
                        <div className="flex items-center gap-2">
                          <IoBarbell className="w-5 h-5" />
                          <span className="font-medium">{(pokemon.weight / 10).toFixed(1)} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section with Detailed Stats */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Base Stats Section */}
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-gray-900">Base Stats</h2>
                      <div className="space-y-4">
                        {pokemon.stats.map((stat, index) => {
                          // Format stat name for display
                          const statName = stat.stat.name.replace('-', ' ');
                          const value = stat.base_stat;
                          
                          // Calculate percentage for progress bar (capped at 100%)
                          // Using 200 as max value for reasonable scaling
                          const percentage = Math.min((value / 200) * 100, 100);

                          return (
                            <div key={index} className="flex items-center justify-between">
                              {/* Stat Name */}
                              <span className="text-gray-600 font-medium w-24 capitalize">
                                {statName.replace('special', 'sp.')}
                              </span>
                              
                              {/* Progress Bar */}
                              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              
                              {/* Stat Value */}
                              <span className="font-bold text-gray-900 w-8 text-right">{value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Abilities & Experience Section */}
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-gray-900">Abilities</h2>
                      
                      {/* Abilities List */}
                      <div className="space-y-3 mb-8">
                        {pokemon.abilities.map((ability, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                            {/* Ability Icon (hidden vs normal) */}
                            {ability.is_hidden ? (
                              <IoEyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <IoEye className="w-5 h-5 text-blue-600" />
                            )}
                            
                            {/* Ability Name */}
                            <span className="font-medium capitalize text-gray-900">
                              {ability.ability.name.replace('-', ' ')}
                            </span>
                            
                            {/* Hidden Ability Badge */}
                            {ability.is_hidden && (
                              <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
                                Hidden
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Base Experience Card */}
                      <div className="p-6 rounded-2xl bg-gray-50">
                        <div className="flex items-center gap-3 mb-2">
                          <IoFlash className="w-6 h-6 text-blue-600" />
                          <h3 className="text-lg font-bold text-gray-900">Base Experience</h3>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                          {pokemon.base_experience} XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>}
      </div>
    </div>
  );
}
