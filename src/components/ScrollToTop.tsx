'use client';

import { useState, useEffect } from 'react';
import { IoArrowUp } from 'react-icons/io5';
import Button from './Button';

/**
 * Floating scroll-to-top button component that appears when user scrolls down
 * Provides quick navigation back to the top of the page
 * 
 * Features:
 * - Auto-show/hide based on scroll position (appears after 300px scroll)
 * - Smooth scroll animation when clicked
 * - Fixed positioning that doesn't interfere with content
 * - Accessible with proper ARIA label
 * - Responsive design with hover effects
 * - High z-index to stay above other content
 * 
 * Behavior:
 * - Hidden by default and when at top of page
 * - Appears when user scrolls more than 300px down
 * - Smooth scroll animation back to top when clicked
 * - Removes scroll event listener on component unmount
 * 
 * @returns Floating scroll-to-top button (conditionally rendered)
 */
export default function ScrollToTop() {
  // State to track whether the button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Set up scroll event listener to control button visibility
  useEffect(() => {
    /**
     * Toggles button visibility based on scroll position
     * Shows button when user has scrolled more than 300px from top
     */
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // Empty dependency array - only run once on mount

  /**
   * Smoothly scrolls the page back to the top
   * Uses native browser smooth scrolling for best performance
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth animation instead of instant jump
    });
  };

  // Don't render anything if button shouldn't be visible
  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg hover:scale-110 z-50 bg-blue-600"
      aria-label="Scroll to top" // Accessibility label for screen readers
    >
      <IoArrowUp className="w-6 h-6" />
    </Button>
  );
}
