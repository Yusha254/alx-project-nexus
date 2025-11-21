export interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface Product {
  asin: string;
  product_title: string;
  product_price?: string | null;
  unit_price?: string | null;
  unit_count?: number | null;
  product_original_price?: string | null;
  currency?: string | null;
  product_star_rating?: string | null;
  product_num_ratings?: number | null;
  book_format?: string;
  product_url: string;
  product_photo: string;
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

export interface ProductSearchData {
  total_products: number;
  country: string;
  domain: string;
  products: Product[];
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

export interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  loading?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
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