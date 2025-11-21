import { Star, ShoppingCart, Zap } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ProductCardProps } from '@/interfaces';

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const hasDiscount = !!product.product_original_price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(e);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <ImageWithFallback
          src={product.product_photo}
          alt={product.product_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading='lazy'
        />

        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md">
            Sale
          </div>
        )}

        {product.is_prime && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            <span className="text-xs">Prime</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-neutral-900 mb-2 line-clamp-2 group-hover:text-neutral-600 transition-colors">
          {product.product_title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
                <Star
                    className={`w-4 h-4 ${
                        (product.product_num_ratings ?? 0) > 0
                            ? "text-amber-400 fill-amber-400"
                            : "text-neutral-400 fill-neutral-400"
                    }`}
            />
<span className="text-neutral-900">
  {product.product_star_rating && product.product_star_rating !== "null"
    ? product.product_star_rating
    : "0"}
</span>


            </div>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-600">
                {(product.product_num_ratings ?? 0).toLocaleString()} reviews
            </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-neutral-900">{product.product_price}</span>
          {product.product_original_price && (
            <span className="text-neutral-400 line-through">{product.product_original_price}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
