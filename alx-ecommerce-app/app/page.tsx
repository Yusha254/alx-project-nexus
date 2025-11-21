"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/interfaces";
import { data as MOCK_PRODUCTS } from "@/data/index";
import { Header } from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Filters } from "@/components/common/Filters";
import { CategoryNav } from "@/components/common/CategoryNav";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  // KEEP ONLY PRICE + SORT
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const router = useRouter();

  useEffect(() => {
    const normalizedProducts: Product[] = MOCK_PRODUCTS.products.map((p) => ({
      ...p,
      product_star_rating: p.product_star_rating
        ? String(p.product_star_rating)
        : "0",
    }));

    setProducts(normalizedProducts);
  }, []);

  // NEW: filtered products (without category filter)
  const filteredProducts = products
    .filter((p) =>
      p.product_title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((p) => {
      const price = Number(p.product_price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            (Number(a.product_price) || 0) -
            (Number(b.product_price) || 0)
          );
        case "price-high":
          return (
            (Number(b.product_price) || 0) -
            (Number(a.product_price) || 0)
          );
        case "rating":
          return (
            Number(b.product_star_rating || 0) -
            Number(a.product_star_rating || 0)
          );
        case "reviews":
          return (
            (b.product_num_ratings || 0) -
            (a.product_num_ratings || 0)
          );
        default:
          return 0;
      }
    });

  const handleProductClick = (product: Product) => {
    console.log("Clicked product", product.asin);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart", product.asin);
    setCartCount((prev) => prev + 1);
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category", categoryId);
  }

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
      <CategoryNav onCategorySelect={handleCategorySelect} />

      <div
        id="products-section"
        className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8"
      >
        {/* Filters Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <Filters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </aside>

        {/* Product Grid */}
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
            products={filteredProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            loading={false}
          />
        </main>
      </div>
    </div>
  );
}
