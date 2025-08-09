import { IoChevronBack , IoChevronForward  } from 'react-icons/io5';
import Button from './Button';

/**
 * Props interface for the Pagination component
 */
interface PaginationProps {
  /** Current active page number (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Callback function called when user changes page */
  onPageChange: (page: number) => void;
  /** Additional CSS classes for custom styling */
  className?: string;
}

/**
 * Traditional pagination component with page navigation controls
 * Provides intuitive navigation through paginated content with smart page number display
 * 
 * Features:
 * - Previous/Next navigation buttons
 * - Smart page number display with ellipsis for large page counts
 * - Current page highlighting
 * - Disabled states for boundary conditions
 * - Responsive design with touch-friendly buttons
 * - Accessible keyboard navigation
 * 
 * Page Number Display Logic:
 * - Shows all pages if total <= 5 pages
 * - Shows smart truncation with ellipsis for larger page sets
 * - Always shows first and last page when possible
 * - Centers current page in the visible range
 * 
 * @param currentPage - The currently active page (1-indexed)
 * @param totalPages - Total number of pages available
 * @param onPageChange - Function to call when user selects a new page
 * @param className - Additional CSS classes for styling
 * @returns Pagination controls with page numbers and navigation buttons
 */
export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  
  /**
   * Generates an array of page numbers and ellipsis for display
   * Implements smart truncation to keep pagination compact while showing relevant pages
   * 
   * Algorithm:
   * 1. If total pages <= 5, show all pages
   * 2. Otherwise, show current page ± 2 pages
   * 3. Add ellipsis and boundary pages as needed
   * 4. Always try to show first and last page
   * 
   * @returns Array of page numbers (numbers) and ellipsis (strings)
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    // If we have few pages, show them all
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate the range of pages to show around current page
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      // Add the main range of pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`center-container gap-2 ${className}`}>
      {/* Previous page button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1} // Disable on first page
        className="btn-secondary"
      >
        <IoChevronBack className="w-4 h-4" />
        Previous
      </Button>

      {/* Page number buttons */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page !== 'number'} // Disable ellipsis buttons
            className={`w-10 h-10 rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white' // Active page styling
                : typeof page === 'number'
                ? 'text-gray-600' // Regular page styling
                : 'text-gray-400 cursor-default' // Ellipsis styling
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next page button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages} // Disable on last page
        className="btn-secondary"
      >
        Next
        <IoChevronForward className="w-4 h-4" />
      </Button>
    </div>
  );
}
