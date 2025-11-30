"use client";

import { Search, ShoppingCart, Menu } from "lucide-react";
import { HeaderProps } from "@/interfaces";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export function Header({
  onCartClick,
}: HeaderProps) {
  const { totalCount } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <button className="lg:hidden p-2 -ml-2">
              <Menu className="w-6 h-6 text-neutral-700" />
            </button>

            <h1 className="text-neutral-900 tracking-tight text-xl font-semibold">
              ShopHub
            </h1>
          </div>

          {/* Search input - desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Cart icon */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-neutral-700" />

            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
