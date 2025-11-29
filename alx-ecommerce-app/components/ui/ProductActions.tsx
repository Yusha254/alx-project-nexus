"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { ProductActionsProps } from "@/interfaces";

export function ProductActions({ price, originalPrice, discount, inStock = true, onAddToCart }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-neutral-900 mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-neutral-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-neutral-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        {discount && discount > 0 && (
          <p className="text-green-600">
            You save ${(originalPrice! - price).toFixed(2)} ({discount}%)
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <button
          onClick={() => onAddToCart(quantity)}
          disabled={!inStock}
          className="w-full bg-neutral-900 text-white py-4 rounded-lg hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          disabled={!inStock}
          className="w-full bg-amber-400 text-neutral-900 py-4 rounded-lg hover:bg-amber-500 transition-colors disabled:bg-neutral-200 disabled:cursor-not-allowed"
        >
          Buy Now
        </button>
        <div className="flex gap-3">
          <button className="flex-1 border border-neutral-200 py-3 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            <span>Save</span>
          </button>
          <button className="flex-1 border border-neutral-200 py-3 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
