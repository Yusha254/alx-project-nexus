// ─────────────────────────────────────────────
//  SEARCH PRODUCT (raw from /search)
// ─────────────────────────────────────────────

export interface Product {
  asin: string;
  product_title: string;

  product_price?: string | null;
  unit_price?: string | null;
  unit_count?: number | null;
  product_original_price?: string | null;
  currency?: string | null;

  product_star_rating?: string | null;   // API gives string like "4.6"
  product_num_ratings?: number | null;

  book_format?: string;

  product_url: string;
  product_photo: string;                 // always present in search
  product_num_offers?: number;
  product_minimum_offer_price?: string | null;

  is_best_seller?: boolean;
  is_amazon_choice?: boolean;
  is_prime?: boolean;
  climate_pledge_friendly?: boolean;

  sales_volume?: string | null;
  delivery?: string | null;
  has_variations?: boolean;

  product_badge?: string;
  product_byline?: string;
  product_availability?: string;
  coupon_text?: string;
}


// ─────────────────────────────────────────────
//  SEARCH RESPONSE SHAPE
// ─────────────────────────────────────────────

export interface ProductSearchData {
  total_products: number;
  country: string;
  domain: string;
  products: UnifiedProduct[];
}

export interface ProductSearchResponse {
  status: string;
  request_id: string;
  parameters: {
    query: string;
    country: string;
    sort_by: string;
    page: number;
    is_prime: boolean;
  };
  data: ProductSearchData;
}


// ─────────────────────────────────────────────
//  PRODUCT DETAIL TYPES (raw from /product-details)
// ─────────────────────────────────────────────

export interface CategoryPathItem {
  id: string;
  name: string;
  link: string;
}

export interface VariationOption {
  asin: string;
  value: string;
  photo: string;
  is_available: boolean;
}

export interface ProductVariations {
  [dimension: string]: VariationOption[];
}

export interface VariationCombination {
  [dimension: string]: string; 
}

export interface AllProductVariations {
  [asin: string]: VariationCombination;
}

export interface ProductDetail {
  asin: string;
  product_title: string;

  product_price: string | null;
  product_original_price?: string | null;

  product_star_rating?: string | null;
  product_num_ratings?: number | null;

  about_product: string[] | null;
  product_description: string | null;

  product_photo: string | null;
  product_photos: string[] | null;       // detail API gives array

  is_prime: boolean;

  category_path?: CategoryPathItem[] | null;

  product_variations_dimensions?: string[];
  product_variations?: ProductVariations;
  all_product_variations?: AllProductVariations;
}


// ─────────────────────────────────────────────
//  COMPONENT PROPS
// ─────────────────────────────────────────────

export interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<UnifiedProduct & { quantity: number }>;
  onUpdateQuantity: (asin: string, quantity: number) => void;
}

export interface ProductGridProps {
  products: UnifiedProduct[];
  onProductClick: (product: UnifiedProduct) => void;
  onAddToCart: (product: UnifiedProduct) => void;
  loading?: boolean;
}

export interface ProductCardProps {
  product: UnifiedProduct;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export interface ProductActionsProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
  onAddToCart: (quantity: number) => void;
}

export interface ProductImagesProps {
  images: string[];
  discount?: number;
  isPrime?: boolean;
  title: string;
}

export interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export interface ProductDetailsPageProps {
  params: { asin: string } | Promise<{ asin: string }>;
}

export interface FiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export interface CategoryNavProps {
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ProductDetailsProps {
  product: UnifiedProduct;
}


// ─────────────────────────────────────────────
//  UNIFIED PRODUCT
// ─────────────────────────────────────────────
export interface UnifiedProduct {
  asin: string;
  title: string;

  price: string | null;
  originalPrice: string | null;
  currency: string | null;

  rating: number | null;
  ratingCount: number | null;

  image: string | null;
  images: string[];

  description: string | null;
  about: string[];

  isPrime: boolean;
  categoryPath: CategoryPathItem[];

  variations: ProductVariations | null;
  variationDimensions: string[] | null;
}
