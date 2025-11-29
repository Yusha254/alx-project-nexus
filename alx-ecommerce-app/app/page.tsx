"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UnifiedProduct } from "@/interfaces";
import { useProducts } from "@/hooks/useQuery";
import { useCart } from "@/context/CartContext";

import Hero from "@/components/common/Hero";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Filters } from "@/components/common/Filters";
import { CategoryNav } from "@/components/common/CategoryNav";
import { Pagination } from "@/components/ui/Pagination";

export default function Home({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  const { data: products = [] } = useProducts(searchQuery);

  // -------------------------------------------------------
  // FILTER + SORT
  // -------------------------------------------------------
  const filteredProducts = products
    .filter((p) => {
      if (!selectedCategory) return true;
      return p.title?.toLowerCase().includes(selectedCategory);
    })
    .filter((p) => p.title?.toLowerCase().includes((searchQuery ?? "").toLowerCase()))
    .filter((p) => {
      const price = Number(p.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case "price-high":
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "reviews":
          return (b.ratingCount || 0) - (a.ratingCount || 0);
        default:
          return 0;
      }
    });

  // -------------------------------------------------------
  // PAGINATION
  // -------------------------------------------------------
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, sortBy, selectedCategory]);

  // -------------------------------------------------------
  // Navigation
  // -------------------------------------------------------
  const handleProductClick = async (product: UnifiedProduct) => {
    router.push(`/productDetails/${product.asin}`);
  };

  // -------------------------------------------------------
  // Cart
  // -------------------------------------------------------
  const handleAddToCart = (product: UnifiedProduct) => {
    addItem(product);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Hero
        onShopNow={() =>
          document
            .getElementById("products-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <CategoryNav
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div
        id="products-section"
        className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8"
      >
        <aside className="lg:w-64 shrink-0">
          <Filters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-neutral-900 mb-2">All Products</h1>
            <p className="text-neutral-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "result" : "results"}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <ProductGrid
            products={paginatedProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            loading={false}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
