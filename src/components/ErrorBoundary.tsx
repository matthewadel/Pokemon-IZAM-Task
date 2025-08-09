'use client';

import React from 'react';
import ErrorComponent from '@/components/ErrorComponent';

/**
 * State interface for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The actual error object (optional) */
  error?: Error;
}

/**
 * Class-based Error Boundary component that catches JavaScript errors anywhere in the component tree
 * Provides a fallback UI and recovery options when errors occur during rendering
 * 
 * This is a critical safety net that prevents the entire application from crashing
 * when individual components encounter runtime errors
 * 
 * Features:
 * - Catches all JavaScript errors in child components
 * - Displays user-friendly error message
 * - Provides retry functionality via page reload
 * - Logs errors to console for debugging
 * - Maintains application stability
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  /**
   * Constructor initializes the error boundary with no error state
   * @param props - Component props containing children to wrap
   */
  constructor(props: { children: React.ReactNode }) {
    super(props);
    // Initialize with no error
    this.state = { hasError: false };
  }

  /**
   * Static method called when an error occurs during rendering
   * Updates component state to trigger error UI display
   * 
   * @param error - The error that was thrown
   * @returns New state object with error information
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show error UI on next render
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error has been caught
   * Used for error logging and side effects
   * 
   * @param error - The error that was caught
   * @param errorInfo - Additional information about the error (component stack, etc.)
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // In a production app, you might want to send this to an error reporting service
    // Example: errorReportingService.captureException(error, { extra: errorInfo });
  }

  /**
   * Renders either the error UI or the normal child components
   * @returns JSX element - either error UI or children
   */
  render() {
    // If an error has been caught, render the error UI
    if (this.state.hasError) {
      return (
        <div className="page-container">
          <div className="content-wrapper">
            <ErrorComponent
              title="Something went wrong"
              message="An unexpected error occurred. Please refresh the page to try again."
              onRetry={() => {
                // Reset error state and reload the page
                this.setState({ hasError: false });
                window.location.reload();
              }}
            />
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
