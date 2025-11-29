"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UnifiedProduct } from "@/interfaces";

interface CartItem extends UnifiedProduct {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: UnifiedProduct) => void;
  removeItem: (asin: string) => void;
  increaseQty: (asin: string) => void;
  decreaseQty: (asin: string) => void;
  updateQuantity: (asin: string, quantity: number) => void;
  totalCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: UnifiedProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.asin === product.asin);
      if (existing) {
        return prev.map((i) =>
          i.asin === product.asin
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (asin: string) => {
    setItems((prev) => prev.filter((i) => i.asin !== asin));
  };

  const increaseQty = (asin: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.asin === asin
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (asin: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.asin === asin
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const updateQuantity = (asin: string, quantity: number) => {
  setItems(prev =>
    prev
      .map(item =>
        item.asin === asin ? { ...item, quantity } : item
      )
      .filter(item => item.quantity > 0) // Remove items set to 0
  );
};

  const totalCount = items.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        updateQuantity,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
