'use client';

import PaginationView from '@/components/views/PaginationView';
import InfiniteView from '@/components/views/InfiniteView';
import ScrollToTop from '@/components/ScrollToTop';
import Button from '@/components/Button';
import { useScreenLocationStateContext } from '@/providers/ScreenLocationStateProvider';

// Type definition for the two supported view modes
type ViewMode = 'pagination' | 'infinite';

/**
 * Main Pokemon listing page that supports dual view modes
 * Allows users to switch between traditional pagination and infinite scroll
 * 
 * Features:
 * - Dual view mode switching (pagination vs infinite scroll)
 * - State persistence across navigation
 * - Responsive header with title and description
 * - Smooth transitions between view modes
 * - Scroll-to-top functionality
 * - Global state management for user preferences
 * 
 * View Modes:
 * 1. Pagination: Traditional page-by-page navigation with page controls
 * 2. Infinite: Continuous scrolling with automatic content loading
 * 
 * State Management:
 * - View mode preference is preserved across sessions
 * - Current page is maintained for pagination mode
 * - Scroll position is preserved for infinite scroll mode
 * 
 * @returns Pokemon listing page with view mode controls and content
 */
export default function Home() {

  // Access global screen location state for view mode and navigation persistence
  const { viewMode, currentPage, scrollPosition, updateScreenLocationState } = useScreenLocationStateContext();
  
  // Configuration: Number of Pokemon to display per page/batch
  const itemsPerPage = 20;

  /**
   * Handles view mode changes and resets navigation state
   * Switches between pagination and infinite scroll modes
   * 
   * @param mode - The new view mode to switch to
   */
  const handleViewModeChange = (mode: ViewMode) => {
    // Update global state with new mode and reset to first page
    updateScreenLocationState({ mode, page: 1 });
  };

  /**
   * Reusable toggle button component for view mode switching
   * Provides consistent styling and behavior for mode buttons
   * 
   * @param toggleTo - The view mode this button switches to
   * @param title - Display text for the button
   * @returns Styled button component with active/inactive states
   */
  const RenderToggleButton = ({ toggleTo, title }: { toggleTo: ViewMode, title: string }) => {
    return (
      <Button
        onClick={() => handleViewModeChange(toggleTo)}
        className={`px-6 py-3 rounded-lg ${viewMode === toggleTo
          ? 'bg-blue-600 text-white' // Active state styling
          : 'text-gray-600' // Inactive state styling
          }`}
      >
        {title}
      </Button>
    )
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">

        {/* Header Section */}
        <div className="center-content mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            ⚡ Pokémon
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Discover and explore Pokémon with pagination or automatic infinite scroll
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="center-container mb-8">
          <div className="rounded-xl p-2 border bg-white border-gray-100">
            {/* Pagination Mode Button */}
            <RenderToggleButton title="Page Controls" toggleTo="pagination" />
            
            {/* Infinite Scroll Mode Button */}
            <RenderToggleButton title="Infinite Scroll" toggleTo="infinite" />
          </div>
        </div>

        {/* Conditional View Rendering Based on Selected Mode */}
        {viewMode === 'pagination' ? (
          /* Pagination View: Traditional page-by-page navigation */
          <PaginationView
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            updateScreenLocationState={updateScreenLocationState}
          />
        ) : (
          /* Infinite View: Continuous scrolling with automatic loading */
          <InfiniteView
            itemsPerPage={itemsPerPage}
            scrollPosition={scrollPosition}
            updateScreenLocationState={updateScreenLocationState} />
        )}
      </div>

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTop />
    </div>
  );
}
