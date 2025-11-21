import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FiltersProps } from "@/interfaces";

export function Filters({
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
}: FiltersProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-neutral-200">
        <SlidersHorizontal className="w-5 h-5 text-neutral-700" />
        <h2 className="text-neutral-900">Filters & Sort</h2>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sort" className="block text-neutral-900 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        >
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="reviews">Most Reviews</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between text-neutral-900 mb-3"
        >
          <span>Price Range</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isPriceOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isPriceOpen && (
          <div className="space-y-4">
            {/* Min / Max inputs */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-neutral-600 mb-1">
                  Min
                </label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    onPriceRangeChange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <span className="text-neutral-400 mt-5">-</span>

              <div className="flex-1">
                <label className="block text-xs text-neutral-600 mb-1">
                  Max
                </label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceRangeChange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="200"
                />
              </div>
            </div>

            {/* Range slider */}
            <div>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceRangeChange([priceRange[0], Number(e.target.value)])
                }
                className="w-full accent-neutral-900"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear All */}
      <div className="pt-4 border-t border-neutral-200">
        <button
          onClick={() => {
            onPriceRangeChange([0, 200]);
            onSortByChange("featured");
          }}
          className="w-full text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
