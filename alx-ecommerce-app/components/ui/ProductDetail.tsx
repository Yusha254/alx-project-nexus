"use client";

import type { ProductDetail, ProductDetailsProps } from "@/interfaces";
import { ProductImages } from "./ProductImages";
import { ProductRating } from "./ProductRating";
import { ProductActions } from "./ProductActions";

export function ProductDetails({ productDetail, onBack, onAddToCart }: ProductDetailsProps) {
  // Prices + discount
  const original = productDetail.originalPrice
    ? parseFloat(productDetail.originalPrice.replace(/[^0-9.]/g, ""))
    : null;

  const price = productDetail.price
    ? parseFloat(productDetail.price.replace(/[^0-9.]/g, ""))
    : null;

  const discount = original && price ? Math.round(((original - price) / original) * 100) : 0;

  // Images
  const images =
    productDetail.image && productDetail.images.length > 0
      ? productDetail.images
      : productDetail.image
      ? [productDetail.image]
      : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
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
            isPrime={productDetail.isPrime}
            title={productDetail.title}
          />

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Category */}
            {productDetail.categoryPath.map((cat, idx) => (
                <span key={cat.id} className="flex items-center gap-1">
                    <a
                        href={cat.link}
                        className="hover:underline hover:text-neutral-900"
                    >
                        {cat.name}
                    </a>
                    {idx < productDetail.categoryPath.length - 1 && (
                        <span className="text-neutral-400">/</span>
                    )}
                </span>
            ))}

            {/* Title */}
            <h1 className="text-neutral-900 text-2xl font-semibold">{productDetail.title}</h1>

            {/* Rating */}
            <ProductRating
                rating={productDetail.rating ?? 0}
                reviewCount={productDetail.ratingCount ?? 0}
            />


            {/* Actions */}
            {price != null && (
              <ProductActions
                price={price}
                originalPrice={original ?? undefined}
                discount={discount}
                inStock={true} // you can enhance with real stock info later
                onAddToCart={() => onAddToCart({ asin: productDetail.asin, product_title: productDetail.title } as any)}
              />
            )}

            {/* Description */}
            {productDetail.description && (
              <div className="prose prose-neutral max-w-none">
                <h2 className="text-neutral-900 mb-2">Product Description</h2>
                <p className="text-neutral-700">{productDetail.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
