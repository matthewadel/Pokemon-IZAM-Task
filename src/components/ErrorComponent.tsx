import { IoAlertCircle, IoRefresh } from 'react-icons/io5';
import Button from './Button';

/**
 * Props interface for the ErrorComponent
 */
interface ErrorComponentProps {
  /** Custom error message to display (optional) */
  message?: string;
  /** Callback function to handle retry action (optional) */
  onRetry?: () => void;
  /** Custom title for the error (optional) */
  title?: string;
}

/**
 * Standardized error display component used throughout the application
 * Provides consistent error messaging with optional retry functionality
 * 
 * Features:
 * - Consistent visual design with icon and styling
 * - Customizable title and message
 * - Optional retry button with callback
 * - Responsive layout that works on all screen sizes
 * - Accessible design with proper contrast and typography
 * 
 * Usage scenarios:
 * - API request failures
 * - Component-level errors
 * - User action failures
 * - Network connectivity issues
 * 
 * @param message - Error message to display to the user
 * @param onRetry - Function to call when user clicks retry button
 * @param title - Title/heading for the error message
 * @returns Formatted error display with optional retry functionality
 */
export default function ErrorComponent({
  message = 'Something went wrong. Please try again.',
  onRetry,
  title = 'Oops! An error occurred'
}: ErrorComponentProps) {
  return (
    <div className="center-container py-16 px-4">
      {/* Error card container with consistent styling */}
      <div className="card center-content max-w-md w-full">
        {/* Alert icon to visually indicate error state */}
        <IoAlertCircle className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        
        {/* Error title/heading */}
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        
        {/* Error message with details */}
        <p className="mb-6 text-gray-600">{message}</p>
        
        {/* Conditional retry button - only shows if onRetry function is provided */}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="btn-primary"
          >
            <IoRefresh className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
