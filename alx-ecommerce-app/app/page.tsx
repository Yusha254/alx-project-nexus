"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/interfaces";
import { data as MOCK_PRODUCTS } from "@/data/index";
import { Header } from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import { ProductGrid } from "@/components/common/ProductGrid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Load mock products on mount
  useEffect(() => {
    const normalizedProducts: Product[] = MOCK_PRODUCTS.products.map((p) => ({
      ...p,
      product_star_rating: String(p.product_star_rating), // convert number → string
    }));
    setProducts(normalizedProducts);
  }, []);


  // Filter products by search query
  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleProductClick = (product: Product) => {
    console.log("Clicked product", product.asin);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart", product.asin);
    setCartCount((prev) => prev + 1);
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

      <div id="products-section" className="mt-20">
        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          loading={false} // no async loading yet
        />
      </div>
    </div>
  );
}
