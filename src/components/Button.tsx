import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Props interface for the Button component
 * Extends all standard HTML button attributes for maximum flexibility
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to render inside the button (text, icons, or other components) */
  children?: ReactNode;
  /** Additional CSS classes to apply to the button */
  className?: string;
}

/**
 * Flexible button component with consistent styling and accessibility features
 * Provides a foundation for all buttons throughout the application
 * 
 * Features:
 * - Consistent typography and transitions
 * - Disabled state handling with visual feedback
 * - Full accessibility support through native button element
 * - Customizable styling through className prop
 * - Support for all standard button attributes (onClick, disabled, etc.)
 * 
 * @param children - Button content (text, icons, etc.)
 * @param className - Additional CSS classes for custom styling
 * @param props - All other standard HTML button attributes
 * @returns Styled button element with consistent behavior
 */
export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  
  // Base button classes that provide consistent styling across the app
  // Includes typography, transitions, and disabled state handling
  const buttonClasses = `font-medium duration-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  return (
    <button
      className={buttonClasses}
      {...props} // Spread all other button attributes (onClick, disabled, etc.)
    >
      {children}
    </button>
  );
}
