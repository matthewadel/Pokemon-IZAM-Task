import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { ScreenLocationStateProvider } from "@/providers/ScreenLocationStateProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

// Configure Geist font with CSS variable for global use
// Geist is a modern, readable sans-serif font optimized for digital interfaces
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for font usage
  subsets: ["latin"], // Include Latin character subset
});

// SEO metadata configuration for the entire application
// This metadata will be used for all pages unless overridden at page level
export const metadata: Metadata = {
  title: "Pokémon - Discover and Explore Pokémon",
  description: "Browse through all Pokémon with detailed stats, abilities, and beautiful designs. Built with Next.js and React.",
};

/**
 * Root layout component that wraps the entire Next.js application
 * Sets up global providers, styling, and error handling for all pages
 * 
 * Provider Hierarchy (from outermost to innermost):
 * 1. ErrorBoundary - Catches and handles runtime errors
 * 2. QueryProvider - Provides React Query context for data fetching
 * 3. ScreenLocationStateProvider - Manages view mode and navigation state
 * 
 * Features:
 * - Global font configuration with CSS variables
 * - SEO-optimized metadata
 * - Global CSS styles and Tailwind setup
 * - Error boundary for graceful error handling
 * - React Query setup for efficient data fetching
 * - State management for screen location and view preferences
 * 
 * @param children - Page components and content to be wrapped
 * @returns HTML document structure with all providers and global setup
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {/* Error Boundary - catches runtime errors and displays fallback UI */}
        <ErrorBoundary>
          {/* React Query Provider - enables data fetching and caching throughout the app */}
          <QueryProvider>
            {/* Screen Location State Provider - manages view mode and navigation state */}
            <ScreenLocationStateProvider>
              {children}
            </ScreenLocationStateProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
