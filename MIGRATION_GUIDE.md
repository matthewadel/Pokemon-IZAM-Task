# Migration Guide: Using UnifiedPokemonCard

The new `UnifiedPokemonCard` component replaces both `PokemonCard` and `PokemonCardWrapper` components.

## Usage Examples

### For Pagination View (previously used PokemonCard)
```tsx
// Before
<PokemonCard key={pokemon.id} pokemon={pokemon} />

// After
<UnifiedPokemonCard 
  key={pokemon.id} 
  pokemon={pokemon} 
  preserveSearchParams={true} 
/>
```

### For Infinite View (previously used PokemonCardWrapper)
```tsx
// Before
<PokemonCardWrapper key={pokemonUrl} pokemonUrl={pokemonUrl} />

// After
<UnifiedPokemonCard 
  key={pokemonUrl} 
  pokemonUrl={pokemonUrl} 
  preserveSearchParams={false} 
/>
```

## Benefits of the Unified Component

1. **Single component to maintain** - Reduces code duplication
2. **Flexible data handling** - Can work with both direct data and URLs
3. **Consistent UI** - Same styling and behavior across all views
4. **Configurable behavior** - Option to preserve search params
5. **Better error handling** - Unified error states
6. **Optimized loading** - Smart loading states based on data source

## Breaking Changes

- Replace imports of `PokemonCard` and `PokemonCardWrapper` with `UnifiedPokemonCard`
- Update props: `preserveSearchParams` prop controls URL state preservation
- Both components can be safely deleted after migration
