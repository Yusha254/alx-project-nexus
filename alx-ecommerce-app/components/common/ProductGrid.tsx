"use client";

import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGridProps } from "@/interfaces";

export function ProductGrid({
  products,
  onProductClick,
  onAddToCart,
  loading = true,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-neutral-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-4 bg-neutral-200 rounded w-1/2" />
              <div className="h-6 bg-neutral-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-600">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.asin}
          product={product}
          onClick={() => onProductClick(product)}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
