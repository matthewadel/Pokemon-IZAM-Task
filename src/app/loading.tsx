import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * Global loading component for Next.js App Router
 * Automatically displayed by Next.js when pages are loading
 * 
 * This component is used for:
 * - Page-level loading states during navigation
 * - Initial page loads in development and production
 * - Code splitting and lazy loading scenarios
 * - Network delays during page transitions
 * 
 * Features:
 * - Large spinner for prominent loading indication
 * - Centered layout that fills the page container
 * - Pokemon-themed loading message
 * - Consistent styling with the rest of the application
 * - Responsive design that works on all screen sizes
 * 
 * @returns Full-page loading component with spinner and message
 */
export default function Loading() {
  return (
    <div className="page-container center-container">
      <div className="center-content">
        {/* Large loading spinner for prominent visual feedback */}
        <LoadingSpinner size="large" />
        
        {/* Loading message with Pokemon theme */}
        <p className="mt-6 font-medium text-lg">
          Loading Pokémon...
        </p>
      </div>
    </div>
  );
}
