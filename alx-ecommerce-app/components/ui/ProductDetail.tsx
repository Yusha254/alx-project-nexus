"use client";

import { useRouter } from "next/navigation";
import type { ProductDetailsProps } from "@/interfaces";
import { useCart } from "@/context/CartContext";
import { ProductImages } from "./ProductImages";
import { ProductRating } from "./ProductRating";
import { ProductActions } from "./ProductActions";

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addItem, increaseQty } = useCart();
  
  function handleBack() {
    router.back();
  }

  function handleAddToCart(quantity: number) {
    addItem(product); // adds 1
    // If quantity > 1, increase the rest
    for (let i = 1; i < quantity; i++) {
      increaseQty(product.asin);
    }
  }
  // Prices + discount
  const original = product.originalPrice
    ? parseFloat(product.originalPrice.replace(/[^0-9.]/g, ""))
    : null;

  const price = product.price
    ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
    : null;

  const discount =
    original && price ? Math.round(((original - price) / original) * 100) : 0;

  // Images
  const images =
    product.image && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            ← Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <ProductImages
            images={images}
            discount={discount}
            isPrime={product.isPrime}
            title={product.title}
          />

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.categoryPath.map((cat, idx) => (
              <span key={cat.id} className="flex items-center gap-1">
                <a
                  href={cat.link}
                  className="hover:underline hover:text-neutral-900"
                >
                  {cat.name}
                </a>
                {idx < product.categoryPath.length - 1 && (
                  <span className="text-neutral-400">/</span>
                )}
              </span>
            ))}

            {/* Title */}
            <h1 className="text-neutral-900 text-2xl font-semibold">
              {product.title}
            </h1>

            {/* Rating */}
            <ProductRating
              rating={product.rating ?? 0}
              reviewCount={product.ratingCount ?? 0}
            />

            {/* Actions */}
            {price != null && (
              <ProductActions
                price={price}
                originalPrice={original ?? undefined}
                discount={discount}
                inStock={true}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* Description */}
            {product.description && (
              <div className="prose prose-neutral max-w-none">
                <h2 className="text-neutral-900 mb-2">Product Description</h2>
                <p className="text-neutral-700">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
