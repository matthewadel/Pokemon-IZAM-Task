/**
 * Props interface for LoadingSpinner component
 */
interface LoadingSpinnerProps {
  /** Size variant for the spinner */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Animated loading spinner component with multiple size variants
 * Provides visual feedback during data loading or processing
 * 
 * Features:
 * - Three size variants: small (16px), medium (32px), large (48px)
 * - Smooth CSS animation with consistent styling
 * - Centered layout by default
 * - Accessible design with proper contrast
 * 
 * @param size - Size variant for the spinner (default: 'medium')
 * @returns Animated spinning loading indicator
 */
export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  // Size mapping for different spinner variants
  const sizeClasses = {
    small: 'w-4 h-4',    // 16px - for inline loading states
    medium: 'w-8 h-8',   // 32px - for general loading states
    large: 'w-12 h-12'   // 48px - for prominent loading states
  };

  return (
    <div className="center-container">
      {/* Animated spinner with size-specific classes */}
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
    </div>
  );
}

/**
 * Skeleton loading component that mimics the structure of a Pokemon card
 * Provides placeholder content while Pokemon data is being fetched
 * 
 * Features:
 * - Matches the exact layout of PokemonCard
 * - Smooth pulse animation for visual feedback
 * - Consistent spacing and proportions
 * - Responsive design matching actual cards
 * 
 * @returns Skeleton placeholder for Pokemon card
 */
export function PokemonCardSkeleton() {
  return (
    <div className="card">
      {/* Pokemon image placeholder */}
      <div className="w-full h-40 mb-4 rounded-xl animate-pulse bg-gray-200"></div>
      
      {/* Pokemon number placeholder */}
      <div className="h-4 rounded w-16 mb-1 animate-pulse bg-gray-200"></div>
      
      {/* Pokemon name placeholder */}
      <div className="h-6 rounded w-24 mb-3 animate-pulse bg-gray-200"></div>
      
      {/* Pokemon types placeholder */}
      <div className="flex gap-2">
        <div className="h-6 rounded-full w-16 animate-pulse bg-gray-200"></div>
        <div className="h-6 rounded-full w-20 animate-pulse bg-gray-200"></div>
      </div>
    </div>
  );
}

/**
 * Props interface for PokemonGridSkeleton component
 */
interface PokemonGridSkeletonProps {
  /** Number of skeleton cards to display */
  count?: number;
}

/**
 * Grid of skeleton Pokemon cards for loading states
 * Shows placeholder content while Pokemon list data is being fetched
 * 
 * Features:
 * - Responsive grid layout matching actual Pokemon grid
 * - Configurable number of skeleton cards
 * - Consistent with actual grid breakpoints
 * - Maintains layout stability during loading
 * 
 * @param count - Number of skeleton cards to display (default: 20)
 * @returns Grid of Pokemon card skeletons
 */
export function PokemonGridSkeleton({ count = 20 }: PokemonGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {/* Generate array of skeleton cards based on count */}
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}
