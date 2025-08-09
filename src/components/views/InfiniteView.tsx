'use client';

import { PokemonGridSkeleton } from '@/components/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ViewMode } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonInfinite } from '@/hooks/usePokemonInfinite';

/**
 * Props interface for the InfiniteView component
 */
interface InfiniteViewProps {
    /** Number of Pokemon to fetch per page/batch */
    itemsPerPage: number;
    /** Saved scroll position for restoration */
    scrollPosition: number;
    /** Function to update screen location state */
    updateScreenLocationState: (updates: {
        mode?: ViewMode;
        page?: number;
        scroll?: number;
    }) => void
}

/**
 * Infinite scroll view for browsing Pokemon with automatic loading
 * Implements continuous scrolling with progressive data loading
 * 
 * Features:
 * - Infinite scroll with automatic page loading
 * - Scroll position restoration for navigation
 * - Progressive loading indicator
 * - End-of-list notification
 * - Memory-efficient scroll tracking
 * - Responsive grid layout
 * - Error handling with retry functionality
 * 
 * Scroll Management:
 * - Tracks scroll position for state preservation
 * - Restores scroll position when returning to view
 * - Automatically loads more content near bottom
 * - Debounced scroll updates for performance
 * 
 * @param itemsPerPage - Number of Pokemon to load per batch
 * @param scrollPosition - Previously saved scroll position
 * @param updateScreenLocationState - Function to update global state
 * @returns Infinite scroll Pokemon view with progressive loading
 */
export default function InfiniteView({
    itemsPerPage,
    scrollPosition,
    updateScreenLocationState,
}: InfiniteViewProps) {

    // Ref to control when scroll position updates are allowed
    // Prevents updating state during initial scroll restoration
    const allowUpdatingScrollPosition = useRef(false)
    
    // Threshold for triggering next page load (pixels from bottom)
    const threshold = 200

    // Fetch Pokemon data using infinite scroll hook
    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isInfiniteLoading,
        error: infiniteError,
        refetch: refetchInfinite
    } = usePokemonInfinite(itemsPerPage);

    /**
     * Handles scroll position changes and updates global state
     * Uses useCallback to prevent unnecessary re-renders
     * Only updates state if updates are allowed (after initial restoration)
     * 
     * @param position - Current scroll position in pixels
     */
    const onScrollChange = useCallback((position: number) => {
        if (allowUpdatingScrollPosition.current && position > 0) {
            updateScreenLocationState({ scroll: position });
        }
    }, [updateScreenLocationState]);

    /**
     * Restores scroll position when component mounts or scroll position changes
     * Prevents infinite loops by controlling when position updates are allowed
     */
    useEffect(() => {
        if (scrollPosition > 0 && !allowUpdatingScrollPosition.current) {
            // Restore scroll position without animation for instant restoration
            window.scrollTo({
                top: scrollPosition,
                behavior: 'auto'
            });
            // Enable scroll position updates after restoration
            allowUpdatingScrollPosition.current = true;
        }
    }, [scrollPosition]);

    /**
     * Sets up scroll event listener for infinite scroll and position tracking
     * Handles both scroll position tracking and automatic page loading
     */
    useEffect(() => {
        /**
         * Scroll event handler that manages both position tracking and infinite loading
         * Uses requestAnimationFrame for smooth performance
         */
        const handleScroll = () => {
            // Use requestAnimationFrame for smooth scroll tracking
            requestAnimationFrame(() => {
                const currentPosition = window.pageYOffset;
                onScrollChange?.(currentPosition);
            });
            
            // Don't trigger loading if already fetching or no more pages
            if (isFetchingNextPage || !hasNextPage) return;

            // Calculate scroll position relative to document height
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Trigger next page load when near bottom (within threshold)
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                fetchNextPage();
            }
        };

        // Add scroll listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup: remove scroll listener when component unmounts or dependencies change
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [onScrollChange, isFetchingNextPage, hasNextPage, fetchNextPage]);

    /**
     * Memoized computation of all Pokemon URLs across all loaded pages
     * Prevents unnecessary re-renders when data structure changes
     * Flattens the paginated structure into a single array
     */
    const allInfinitePokemonUrls = useMemo(() => {
        return infiniteData?.pages.flatMap(page => page.results.map(p => p.url)) || [];
    }, [infiniteData]);

    // Show loading state while initial data is being fetched
    if (isInfiniteLoading) {
        return <PokemonGridSkeleton count={itemsPerPage} />;
    }

    // Show error state with retry option if API request failed
    if (infiniteError) {
        return (
            <ErrorComponent
                message="Failed to load Pokémon. Please check your connection and try again."
                onRetry={refetchInfinite}
            />
        );
    }

    // Show empty state if no Pokemon data is available
    if (!allInfinitePokemonUrls || allInfinitePokemonUrls.length === 0) {
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
                {/* Render Pokemon cards from all loaded pages */}
                {(infiniteData?.pages.flatMap(page => page.results.map(p => p.url)) || [])?.map((pokemon) => (
                    <PokemonCard
                        key={pokemon}
                        pokemonUrl={pokemon}
                    />
                ))}
            </div>

            {/* Loading indicator for infinite scroll - shown while fetching next page */}
            {isFetchingNextPage && (
                <div className="center-container mt-12 py-8">
                    <div className="center-container gap-3 text-gray-600">
                        <LoadingSpinner size="medium" />
                        <span>Loading more Pokémon...</span>
                    </div>
                </div>
            )}

            {/* End of list indicator - shown when all Pokemon have been loaded */}
            {!hasNextPage && allInfinitePokemonUrls.length > 0 && (
                <div className="center-container mt-12 py-8">
                    <div className="center-content">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="font-medium text-gray-600">You&apos;ve caught them all!</p>
                        <p className="text-sm text-gray-600">All Pokémon have been loaded</p>
                    </div>
                </div>
            )}
        </>
    );
}
