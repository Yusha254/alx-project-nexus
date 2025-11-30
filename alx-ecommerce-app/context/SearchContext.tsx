"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce"; 
import { fetchProducts } from "@/data"; 
import { UnifiedProduct } from "@/interfaces"; 

interface SearchContextValue {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  searchResults: UnifiedProduct[] | undefined; 
  isLoading: boolean;
  isError: boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce({ value: searchQuery, delay: 500 });


  const { 
    data: searchResults, 
    isLoading, 
    isError, 
    isFetching 
  } = useQuery<UnifiedProduct[]>({
    queryKey: ["products", debouncedQuery], 
    queryFn: () => fetchProducts(debouncedQuery),
    enabled: !!debouncedQuery, 
    initialData: undefined, 
  });


  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading: isLoading || isFetching, 
        isError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}