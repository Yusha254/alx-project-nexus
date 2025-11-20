"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common/Header";
import Hero from "@/components/common/Hero";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        cartItemCount={cartCount}
        onCartClick={() => alert("Cart Open")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
        <Hero onShopNow={() => router.push("/products/${product.asin}")}/>
    </div>
  );
}
