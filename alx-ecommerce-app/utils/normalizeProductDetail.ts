import { ProductDetail, UnifiedProduct } from "@/interfaces";

export function normalizeProductDetail(raw: ProductDetail): UnifiedProduct {
  return {
    asin: raw.asin,
    title: raw.product_title ?? "",

    price: raw.product_price ?? null,
    originalPrice: raw.product_original_price ?? null,
    currency: null, // details API doesn't return currency reliably

    rating: raw.product_star_rating ? Number(raw.product_star_rating) : null,
    ratingCount: raw.product_num_ratings ?? null,

    image: raw.product_photo ?? null,
    images: raw.product_photos ?? [],

    description: raw.product_description ?? null,
    about: raw.about_product ?? [],

    isPrime: raw.is_prime ?? false,
    categoryPath: raw.category_path ?? [],

    variations: raw.product_variations ?? null,
    variationDimensions: raw.product_variations_dimensions ?? null,
  };
}
