'use client';

import PokemonCard from '@/components/PokemonCard';
import { PokemonGridSkeleton } from '@/components/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import { ViewMode } from '@/types/pokemon';
import { usePokemonList } from '@/hooks/usePokemonList';

/**
 * Props interface for the PaginationView component
 */
interface PaginationViewProps { 
    /** Current page number (1-indexed) */
    currentPage: number;
    /** Number of Pokemon to display per page */
    itemsPerPage: number;
    /** Function to update screen location state (page, mode, scroll) */
    updateScreenLocationState: (updates: { mode?: ViewMode; page?: number; scroll?: number; }) => void
}

/**
 * Pagination-based view for browsing Pokemon with traditional page navigation
 * Implements page-by-page Pokemon browsing with navigation controls
 * 
 * Features:
 * - Traditional pagination with page numbers and navigation
 * - Automatic total page calculation based on API response
 * - Loading states with skeleton grid
 * - Error handling with retry functionality
 * - Smooth scroll to top on page changes
 * - Responsive grid layout for Pokemon cards
 * - Empty state handling
 * 
 * Data Flow:
 * 1. Calculates offset based on current page and items per page
 * 2. Fetches Pokemon list for the current page using API hook
 * 3. Renders Pokemon cards in a responsive grid
 * 4. Provides pagination controls for navigation
 * 
 * @param currentPage - The currently active page number
 * @param itemsPerPage - Number of Pokemon to show per page
 * @param updateScreenLocationState - Function to update global state
 * @returns Paginated Pokemon view with navigation controls
 */
export default function PaginationView({
    currentPage,
    itemsPerPage,
    updateScreenLocationState,
}: PaginationViewProps) {

    // Calculate the offset for API request based on current page
    // Pages are 1-indexed in UI but API uses 0-indexed offset
    const offset = (currentPage - 1) * itemsPerPage;

    // Fetch Pokemon list data for the current page
    const {
        data: paginatedData,
        isLoading: isPaginatedLoading,
        error: paginatedError,
        refetch: refetchPaginated
    } = usePokemonList(itemsPerPage, offset);

    // Calculate total pages for pagination controls
    // Uses the total count from API response to determine how many pages exist
    const totalPages = paginatedData ? Math.ceil(paginatedData.count / itemsPerPage) : 0;

    /**
     * Handles page change events from pagination controls
     * Updates global state and scrolls to top for better UX
     * 
     * @param page - The new page number to navigate to
     */
    const handlePageChange = (page: number) => {
        // Update global state with new page number
        updateScreenLocationState({ page });
        
        // Scroll to top of page for better user experience
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show loading state while fetching Pokemon data
    if (isPaginatedLoading) {
        return <PokemonGridSkeleton count={itemsPerPage} />;
    }

    // Show error state with retry option if API request failed
    if (paginatedError) {
        return (
            <ErrorComponent
                message="Failed to load Pokémon. Please check your connection and try again."
                onRetry={refetchPaginated}
            />
        );
    }

    // Show empty state if no Pokemon data is available
    if (!paginatedData?.results || paginatedData?.results?.length === 0) {
        return (
            <div className="center-content py-16">
                <p className="text-lg text-gray-600">No Pokémon found.</p>
            </div>
        );
    }

    return (
        <>
            {/* Responsive Pokemon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Extract URLs from Pokemon list results and render cards */}
                {paginatedData?.results.map(p => p.url).map((pokemon) => (
                    <PokemonCard
                        key={pokemon}
                        pokemonUrl={pokemon}
                    />
                ))}
            </div>

            {/* Pagination Controls - only show if there are multiple pages */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12"
                />
            )}
        </>
    );
}
