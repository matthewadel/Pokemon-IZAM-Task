'use client';

import { ViewMode } from '@/types/pokemon';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Internal state interface for tracking user's screen location and view preferences
 */
interface ScreenLocationState {
  /** Current view mode: pagination or infinite scroll */
  viewMode: ViewMode;
  /** Current page number for pagination mode */
  currentPage: number;
  /** Scroll position for infinite scroll mode (used for restoration) */
  scrollPosition: number;
}

/**
 * Context interface that components can use to access and modify screen location state
 */
interface ScreenLocationStateContextType {
  /** Current view mode */
  viewMode: ViewMode;
  /** Current page number */
  currentPage: number;
  /** Current scroll position */
  scrollPosition: number;
  /** Function to update any part of the screen location state */
  updateScreenLocationState: (updates: {
    mode?: ViewMode;
    page?: number;
    scroll?: number;
  }) => void;
}

// Create the context with undefined default (will throw error if used without provider)
const ScreenLocationStateContext = createContext<ScreenLocationStateContextType | undefined>(undefined);

/**
 * Props interface for the provider component
 */
interface ScreenLocationStateProviderProps {
  children: ReactNode;
}

/**
 * Context provider that manages global screen location state
 * Tracks view mode, pagination, and scroll position across the application
 * 
 * This allows users to switch between view modes and return to their previous
 * position/page when navigating back to the Pokemon list
 * 
 * @param children - Child components that need access to screen location state
 * @returns Context provider wrapper
 */
export const ScreenLocationStateProvider: React.FC<ScreenLocationStateProviderProps> = ({ children }) => {
  // Initialize state with default values
  const [ScreenLocationState, setScreenLocationState] = useState<ScreenLocationState>({
    viewMode: 'pagination', // Start with pagination view
    currentPage: 1,         // Start on first page
    scrollPosition: 0,      // Start at top of page
  });

  /**
   * Optimized state updater function using useCallback to prevent unnecessary re-renders
   * Only updates the state properties that are provided in the updates object
   * 
   * @param updates - Partial state updates to apply
   * @param updates.mode - New view mode (optional)
   * @param updates.page - New page number (optional)
   * @param updates.scroll - New scroll position (optional)
   */
  const updateScreenLocationState = useCallback((updates: {
    mode?: ViewMode;
    page?: number;
    scroll?: number;
  }) => {
    setScreenLocationState(prevState => ({
      ...prevState,
      // Only update properties that are defined in the updates object
      // This allows partial updates without overwriting other state
      ...(updates.mode !== undefined && { viewMode: updates.mode }),
      ...(updates.page !== undefined && { currentPage: updates.page }),
      ...(updates.scroll !== undefined && { scrollPosition: updates.scroll }),
    }));
  }, []); // Empty dependency array since this function doesn't depend on any external values

  // Create the context value object
  const value: ScreenLocationStateContextType = {
    viewMode: ScreenLocationState.viewMode,
    currentPage: ScreenLocationState.currentPage,
    scrollPosition: ScreenLocationState.scrollPosition,
    updateScreenLocationState,
  };

  return (
    <ScreenLocationStateContext.Provider value={value}>
      {children}
    </ScreenLocationStateContext.Provider>
  );
};

/**
 * Custom hook for accessing screen location state context
 * Provides type-safe access to the context and throws helpful error if used outside provider
 * 
 * @returns Screen location state context with current values and update function
 * @throws Error if used outside of ScreenLocationStateProvider
 */
export const useScreenLocationStateContext = (): ScreenLocationStateContextType => {
  const context = useContext(ScreenLocationStateContext);
  
  // Provide helpful error message if hook is used outside provider
  if (context === undefined) {
    throw new Error('useScreenLocationStateContext must be used within a ScreenLocationStateProvider');
  }
  
  return context;
};
