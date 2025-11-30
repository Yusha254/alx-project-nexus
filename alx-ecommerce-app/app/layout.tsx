"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { Header } from "@/components/common/Header";
import { Cart } from "@/components/ui/Cart";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <SearchProvider>
              <RootContent
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              >
                {children}
              </RootContent>
            </SearchProvider>
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

//
// Separate component so CartProvider is usable via useCart()
//
function RootContent({
  children,
  isCartOpen,
  setIsCartOpen,
}: {
  children: React.ReactNode;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
}) {
  const { items, updateQuantity } = useCart();


  return (
    <>
      {/* Header present on EVERY page */}
      <Header
        cartItemCount={items.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
      />

      <main>{children}</main>
    </>
  );
}
