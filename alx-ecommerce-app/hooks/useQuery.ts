// /hooks/useQuery.ts
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductDetails } from "@/data";
import type { UnifiedProduct } from "@/interfaces";

export function useInfiniteProducts(searchQuery: string, enabled: boolean) {
  const effectiveQuery = searchQuery.trim() === "" ? "Electronics" : searchQuery;

  return useInfiniteQuery<UnifiedProduct[]>({
    queryKey: ["infiniteProducts", effectiveQuery],
    

    queryFn: ({ pageParam = 1 }) => {
        const pageNumber = pageParam as number; 
        return fetchProducts(effectiveQuery, pageNumber);
    },
    
    enabled: enabled,
    initialPageParam: 1,
    

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length > 0) {
        return allPages.length + 1;
      }
      return undefined; 
    },
  });
}

export function useProductDetails(asin: string) {
  return useQuery({
    queryKey: ['productDetails', asin],
    queryFn: () => fetchProductDetails(asin),
    enabled: Boolean(asin), 
  });
}