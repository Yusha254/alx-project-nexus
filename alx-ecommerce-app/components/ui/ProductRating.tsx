import { Star } from "lucide-react";
import { ProductRatingProps } from "@/interfaces";

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(rating)
                  ? "text-amber-400 fill-amber-400"
                  : i < rating
                  ? "text-amber-400 fill-amber-400 opacity-50"
                  : "text-neutral-300"
              }`}
            />
          ))}
        </div>
        <span className="text-neutral-900">{rating.toFixed(1)}</span>
      </div>
      <span className="text-neutral-400">·</span>
      <span className="text-neutral-600">{reviewCount.toLocaleString()} ratings</span>
    </div>
  );
}
