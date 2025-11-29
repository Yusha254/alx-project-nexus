// /hooks/useQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductDetails } from "@/data";

import type { UnifiedProduct } from "@/interfaces";

export function useProducts(searchQuery: string) {
  return useQuery<UnifiedProduct[]>({
    queryKey: ["products", searchQuery],
    queryFn: () => fetchProducts(searchQuery),
  });
}

export function useProductDetails(asin: string) {
  return useQuery({
    queryKey: ['productDetails', asin],
    queryFn: () => fetchProductDetails(asin),
    enabled: Boolean(asin),  // only fetch if asin is available
  });
}
