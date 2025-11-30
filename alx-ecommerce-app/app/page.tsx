"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UnifiedProduct } from "@/interfaces";
import { useInfiniteProducts } from "@/hooks/useQuery"; 
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext"; 

import Hero from "@/components/common/Hero";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Filters } from "@/components/common/Filters";
import { CategoryNav } from "@/components/common/CategoryNav";
import { Pagination } from "@/components/ui/Pagination";

export default function Home() { 
  const router = useRouter();
  const { addItem } = useCart();
  
  // -------------------------------------------------------
  // SEARCH CONTEXT
  // -------------------------------------------------------
  const { 
    searchQuery, 
    searchResults, 
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearch();

  // -------------------------------------------------------
  // DEFAULT PRODUCT FETCHING (Used when searchQuery is empty)
  // -------------------------------------------------------
  const isSearchActive = !!searchQuery;
  const { 
    data: infiniteData, // Data is an object with a 'pages' array
    fetchNextPage, // Function to load the next API page
    hasNextPage, // Boolean from React Query
    isFetchingNextPage, // Loading state specific to the next page
    isLoading: isDefaultLoading,
    isError: isDefaultError,
  } = useInfiniteProducts("", !isSearchActive);

  const defaultProducts = infiniteData?.pages?.flatMap(page => page) ?? [];

  // -------------------------------------------------------
  // DETERMINE THE ACTIVE PRODUCT LIST
  // -------------------------------------------------------
  const productsToDisplay = isSearchActive ? searchResults : defaultProducts;
  const isLoading = isSearchActive 
    ? isSearchLoading 
    : (isDefaultLoading || isFetchingNextPage); // Use isFetchingNextPage for loading indication

  const isError = isSearchActive ? isSearchError : isDefaultError;

  // -------------------------------------------------------
  // FILTERS/SORT/PAGINATION STATE (Your existing state)
  // -------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  // -------------------------------------------------------
  // FILTER + SORT LOGIC
  // -------------------------------------------------------
  const filteredProducts = (productsToDisplay ?? []) // Use productsToDisplay
    .filter((p) => {
      // Keep category filter
      if (!selectedCategory) return true;
      return p.title?.toLowerCase().includes(selectedCategory);
    })
    // ⚠️ Remove this filter! The API/search context now handles the search query.
    // .filter((p) => p.title?.toLowerCase().includes((searchQuery ?? "").toLowerCase())) 
    .filter((p) => {
      // Keep price filter
      const price = Number(p.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      // Keep sort logic
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
    const isFetchingNewData = isDefaultLoading || isFetchingNextPage;

    if (
        !isSearchActive && 
        currentPage === totalPages &&
        hasNextPage &&
        !isFetchingNewData &&
        paginatedProducts.length < PAGE_SIZE 
    ) {
        console.log("Reached end of loaded data. Fetching next API page...");
        fetchNextPage();
    }
    // reset current page when filters/search changes
    if (currentPage !== 1 && (priceRange || sortBy || selectedCategory || searchQuery)) {
        setCurrentPage(1);
    }
  }, [currentPage, totalPages, isSearchActive, hasNextPage, isFetchingNextPage, fetchNextPage, paginatedProducts.length, PAGE_SIZE, priceRange, sortBy, selectedCategory, searchQuery]);

  // -------------------------------------------------------
  // Navigation & Cart
  // -------------------------------------------------------
  const handleProductClick = async (product: UnifiedProduct) => {
    router.push(`/productDetails/${product.asin}`);
  };

  const handleAddToCart = (product: UnifiedProduct) => {
    addItem(product);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // -------------------------------------------------------
  // RENDER LOGIC
  // -------------------------------------------------------

  if (isError) {
      return (
          <div className="text-center py-20 text-red-600">
              Failed to load products. Please check your network or API key.
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Hero
        onShopNow={() =>
          document
            .getElementById("products-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* Hide category nav if a search query is active and we want search results only */}
      {!isSearchActive && (
        <CategoryNav
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      )}

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
            <h1 className="text-neutral-900 mb-2">
              {isSearchActive ? "Search Results" : "All Products"}
            </h1>
            <p className="text-neutral-600">
              {isLoading ? "Loading..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "result" : "results"}`}
              {isSearchActive && ` for "${searchQuery}"`}
            </p>
          </div>

          <ProductGrid
            products={paginatedProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            loading={isLoading}
          />
          
          {/* Show no results message */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                No products found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}