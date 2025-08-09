'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * Global React Query provider component that configures data fetching for the entire application
 * Sets up caching strategies, retry logic, and development tools
 * 
 * @param children - Child components that will have access to React Query
 * @returns QueryClientProvider wrapper with configured client and dev tools
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create QueryClient instance with custom configuration
  // Using useState ensures the client is created only once per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default cache duration: 1 minute
            // Data is considered fresh for this duration
            staleTime: 60 * 1000, // 1 minute
            
            // Retry failed requests up to 3 times
            retry: 3,
            
            /**
             * Exponential backoff strategy for retries
             * @param attemptIndex - Current retry attempt (0-based)
             * @returns Delay in milliseconds before next retry
             * 
             * Formula: min(1000 * 2^attemptIndex, 30000)
             * Attempt 1: 1000ms, Attempt 2: 2000ms, Attempt 3: 4000ms, etc.
             * Maximum delay is capped at 30 seconds
             */
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Development tools for debugging queries (only visible in development) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
