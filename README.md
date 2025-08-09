# Pokemon Explorer Documentation
applive location: https://pokemon-izam-task.vercel.app/

## Core Features

- **Dual View Modes**: Switch between paginated navigation and infinite scroll
- **Pokemon Details**: Detailed view with stats, abilities, and characteristics
- **Responsive Design**: Optimized for all device sizes (Desktop, Mobile, Tablet)
- **Smart Caching**: Efficient data fetching with React Query
- **Error Handling**: Graceful error recovery with retry mechanisms
- **Type Safety**: Full TypeScript implementation

## Architecture Overview

The application follows a modular architecture with clear separation of concerns:

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks for data fetching
├── providers/     # Context providers for state management
├── services/      # API service layer
└── types/         # TypeScript type definitions
```

## Module Documentation

### App Router (`src/app/`)

The application uses Next.js 15's App Router for file-based routing and modern React features.

#### `layout.tsx`
Root layout component that wraps the entire application with essential providers and global configurations.

**Key Features:**
- Sets up global providers (React Query, Screen Location State)
- Configures Error Boundary for runtime error handling
- Applies Geist font family
- Defines SEO metadata

#### `page.tsx`
Home page that redirects to the Pokemon listing page, providing a clean entry point.

#### `pokemons/page.tsx`
Main Pokemon listing page with view mode switching functionality.

**Features:**
- Toggle between pagination and infinite scroll modes
- Maintains view state across navigation
- Responsive header with title and description
- Conditional rendering based on selected view mode

#### `pokemons/[id]/page.tsx`
Dynamic Pokemon detail page displaying comprehensive information about individual Pokemon.

**Features:**
- Dynamic routing based on Pokemon ID
- Detailed Pokemon statistics and abilities
- Gradient header design based on Pokemon type
- Back navigation to maintain user flow
- Loading and error states

### Components (`src/components/`)

Reusable UI components organized by functionality and complexity.

#### Core Components

**`Button.tsx`**
Flexible button component with customizable styling and full HTML button attribute support.

**`ErrorBoundary.tsx`**
Class-based React component that catches JavaScript errors anywhere in the component tree and displays a fallback UI.

**`ErrorComponent.tsx`**
Standardized error display component with retry functionality and consistent messaging.

**`LoadingSpinner.tsx`**
Loading indicator component with multiple size variants and skeleton loading states for different content types.

**`Pagination.tsx`**
Traditional pagination component with page navigation controls and responsive design.

**`PokemonCard.tsx`**
Individual Pokemon card component that displays Pokemon image, name, ID, and types with hover effects and loading states.

**`ScrollToTop.tsx`**
Floating action button that appears when users scroll down, providing quick navigation back to the top.

#### View Components (`src/components/views/`)

**`PaginationView.tsx`**
Complete pagination implementation that handles page-based Pokemon browsing with navigation controls.

Key Features:
- Page-based data fetching
- Total page calculation
- Smooth scroll to top on page change
- Error handling and loading states

**`InfiniteView.tsx`**
Infinite scroll implementation with automatic loading and scroll position restoration.

Key Features:
- Automatic loading when approaching bottom
- Scroll position memory
- Load more indicator
- End-of-list notification

### Hooks (`src/hooks/`)

Custom React hooks that encapsulate data fetching logic and provide clean interfaces for components.

#### `usePokemon.ts`
Fetches individual Pokemon data by ID with caching and error handling.

**Features:**
- 10-minute cache duration for detailed Pokemon data
- Conditional fetching based on ID availability
- React Query integration

#### `usePokemonList.ts`
Handles paginated Pokemon list fetching with configurable limit and offset parameters.

**Features:**
- 5-minute cache duration
- Pagination support
- Configurable page size

#### `usePokemonInfinite.ts`
Manages infinite scroll data fetching with automatic page management.

**Features:**
- Infinite query implementation
- Automatic next page parameter calculation
- 5-minute cache duration
- Page continuation logic

### Providers (`src/providers/`)

Context providers that manage global application state and external library integration.

#### `QueryProvider.tsx`
React Query configuration and provider setup for the entire application.

**Configuration:**
- 1-minute default stale time
- 3 retry attempts with exponential backoff
- Development tools integration
- Global query defaults

#### `ScreenLocationStateProvider.tsx`
Custom context provider that manages view mode, pagination state, and scroll position.

**State Management:**
- View mode switching (pagination/infinite)
- Current page tracking
- Scroll position memory
- State update optimization

### Services (`src/services/`)

API service layer that handles external data fetching and provides clean interfaces for data operations.

#### `pokemon-api.ts`
Centralized API service for all Pokemon-related data fetching operations.

**Methods:**
- `getPokemonList()`: Fetches paginated Pokemon list
- `getPokemon()`: Retrieves individual Pokemon details
- Error handling and response validation
- RESTful API integration with PokeAPI

### Types (`src/types/`)

TypeScript type definitions that ensure type safety throughout the application.

#### `pokemon.ts`
Comprehensive type definitions for Pokemon data structures.

**Types Defined:**
- `Pokemon`: Complete Pokemon object with all properties
- `PokemonListResponse`: API response structure for list endpoints
- `PokemonListItem`: Individual item in Pokemon lists
- `PokemonCardData`: Simplified data structure for card display
- `ViewMode`: Union type for view mode states

## Data Flow

### Pagination Mode
1. User selects pagination mode
2. `PaginationView` component loads
3. `usePokemonList` hook fetches data for current page
4. Data is cached by React Query
5. `PokemonCard` components render individual Pokemon
6. User navigates using pagination controls

### Infinite Scroll Mode
1. User selects infinite scroll mode
2. `InfiniteView` component loads
3. `usePokemonInfinite` hook fetches initial data
4. Scroll event listeners monitor scroll position
5. Additional pages load automatically when near bottom
6. Scroll position is preserved for navigation

### Pokemon Details
1. User clicks on Pokemon card
2. Navigation to `/pokemons/[id]` route
3. `usePokemon` hook fetches detailed data
4. Detailed view renders with complete information
5. User can navigate back to preserve list state

## Performance Optimizations

### Caching Strategy
- **List Data**: 5-minute cache for Pokemon lists
- **Detail Data**: 10-minute cache for individual Pokemon
- **Background Updates**: Stale-while-revalidate pattern

### Loading Optimizations
- Skeleton loading states for improved perceived performance
- Image lazy loading with proper loading indicators
- Progressive loading for infinite scroll

### Memory Management
- Scroll position restoration without memory leaks
- Efficient re-rendering with proper dependency arrays
- Cleanup of event listeners

## Error Handling

### Error Boundary
Global error boundary catches runtime errors and provides user-friendly error messages with recovery options.

### API Error Handling
- Retry logic with exponential backoff
- User-friendly error messages
- Manual retry capabilities
- Graceful degradation

### Loading States
- Skeleton loaders for content areas
- Spinner indicators for actions
- Progressive loading feedback

## Responsive Design

### Breakpoint System
- **Mobile**: 1 column grid
- **Small Tablet**: 2 columns
- **Tablet**: 3 columns
- **Desktop**: 4 columns
- **Large Desktop**: 5 columns

### Touch Optimization
- Minimum 44px touch targets
- Touch-friendly spacing
- Optimized hover states for touch devices

## Styling System

### CSS Architecture
- Tailwind CSS for utility-first styling
- Custom CSS variables for consistent theming
- Component-specific classes for reusable patterns
- Responsive design with mobile-first approach

### Design Tokens
- Consistent color palette
- Standardized spacing scale
- Typography hierarchy
- Shadow and border radius system

## Development Guidelines

### Code Organization
- Feature-based file organization
- Consistent naming conventions
- Clear separation of concerns
- Reusable component patterns

### Type Safety
- Strict TypeScript configuration
- Comprehensive type definitions
- Proper error type handling
- Interface consistency

### Performance Considerations
- Optimized re-rendering with proper memoization
- Efficient data fetching patterns
- Image optimization strategies
- Bundle size optimization

This documentation provides a comprehensive overview of the Pokemon Explorer application, covering all major modules, functionality, and architectural decisions. The application demonstrates modern React development practices with a focus on user experience, performance, and maintainability.
