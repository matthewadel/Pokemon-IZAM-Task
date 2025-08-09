import Link from 'next/link';
import { IoSearch, IoArrowBack } from 'react-icons/io5';

/**
 * 404 Not Found page component for the Pokemon application
 * Automatically displayed by Next.js when users navigate to non-existent routes
 * 
 * This component handles scenarios like:
 * - Invalid Pokemon IDs in URLs
 * - Mistyped route paths
 * - Deleted or moved pages
 * - Direct URL access to non-existent resources
 * 
 * Features:
 * - Pokemon-themed 404 message
 * - Large search icon for visual context
 * - Clear navigation back to main Pokemon list
 * - Responsive design that works on all devices
 * - Consistent styling with the rest of the application
 * - User-friendly language and helpful action
 * 
 * UX Considerations:
 * - Friendly, themed messaging instead of technical errors
 * - Clear call-to-action to get users back to working content
 * - Visual icon to immediately communicate the error state
 * - Consistent navigation patterns with the rest of the app
 * 
 * @returns 404 error page with Pokemon theme and navigation
 */
export default function NotFound() {
  return (
    <div className="page-container center-container">
      <div className="center-content">
        {/* Large search icon to visually represent "not found" */}
        <IoSearch className="text-8xl mb-8 mx-auto text-gray-400" />
        
        {/* Main 404 heading with Pokemon theme */}
        <h1 className="text-4xl font-bold mb-5 text-gray-900">
          404 - Pokémon Not Found
        </h1>
        
        {/* Friendly, themed error message */}
        <p className="text-lg mb-5 max-w-md mx-auto px-10 text-gray-600">
          The Pokémon you&apos;re looking for seems to have escaped!
        </p>
        
        {/* Navigation link back to main Pokemon list */}
        <Link
          href="/pokemons"
          className="btn-primary"
        >
          <IoArrowBack className="w-4 h-4" />
          Back to Pokédex
        </Link>
      </div>
    </div>
  );
}
