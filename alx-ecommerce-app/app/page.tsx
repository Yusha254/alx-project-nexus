"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UnifiedProduct } from "@/interfaces";
import { fetchProducts, fetchProductDetails } from "@/data/index";
import { Header } from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Filters } from "@/components/common/Filters";
import { CategoryNav } from "@/components/common/CategoryNav";
import { Pagination } from "@/components/ui/Pagination";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetchProducts("Nike Backpack")
      console.log("🔵 RAW SEARCH API RESPONSE:");
      console.log(JSON.stringify(response, null, 2));
    }

    load()
  }, [])

  // ——————————————————————————————————
  // FILTER + SORT (pre-pagination)
  // ——————————————————————————————————
  const filteredProducts = products
  .filter((p) => {
    if (!selectedCategory) return true;
    return p.title.toLowerCase().includes(selectedCategory);
  })
  .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
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
        return (a.rating || 0) - (b.rating || 0);
      case "reviews":
        return (a.ratingCount || 0) - (b.ratingCount || 0);
      default:
        return 0;
    }
  });

  // ——————————————————————————————————
  // PAGINATION LOGIC
  // ——————————————————————————————————
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceRange, sortBy, selectedCategory]);

  const handleProductClick = async (product: UnifiedProduct) => {
    const details = await fetchProductDetails(product.asin);
    console.log("Normalized product details:", details);
    router.push(`/product/${product.asin}`); // we'll build this next
};


  const handleAddToCart = (product: UnifiedProduct) => {
    console.log("Add to cart", product.asin);
    setCartCount((prev) => prev + 1);
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        cartItemCount={cartCount}
        onCartClick={() => alert("Cart Open")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Hero
        onShopNow={() => {
          document
            .getElementById("products-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <CategoryNav
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <div
        id="products-section"
        className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8"
      >
        {/* Filters */}
        <aside className="lg:w-64 shrink-0">
          <Filters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </aside>
        {/* Products + Pagination */}
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
