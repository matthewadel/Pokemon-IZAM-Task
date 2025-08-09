import Pokemns from '@/app/pokemons/page';

/**
 * Home page component that redirects to the Pokemon listing page
 * Provides a clean entry point for the application while maintaining proper routing structure
 * 
 * This approach allows for:
 * - Flexible URL structure (both "/" and "/pokemons" work)
 * - Easy addition of a proper landing page in the future
 * - Consistent navigation patterns
 * - SEO-friendly routing structure
 * 
 * @returns Pokemon listing page component
 */
export default function Home() {
  // Render the Pokemon listing page directly
  // This maintains component-based routing while providing homepage access
  return <Pokemns />;
}
