import { Product, UnifiedProduct } from "@/interfaces";

export function normalizeSearchProduct(raw: Product): UnifiedProduct {
  return {
    asin: raw.asin,
    title: raw.product_title ?? "",

    price: raw.product_price ?? null,
    originalPrice: raw.product_original_price ?? null,
    currency: raw.currency ?? null,

    rating: raw.product_star_rating ? Number(raw.product_star_rating) : null,
    ratingCount: raw.product_num_ratings ?? null,

    image: raw.product_photo ?? null,
    images: [raw.product_photo].filter(Boolean),  // search only gives 1

    description: null,
    about: [],

    isPrime: raw.is_prime ?? false,
    categoryPath: [],

    variations: null,
    variationDimensions: null,
  };
}
