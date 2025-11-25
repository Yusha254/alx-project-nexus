import { useState } from "react";
import { Zap } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ProductImagesProps {
  images: string[];
  discount?: number;
  isPrime?: boolean;
  title: string;
}

export function ProductImages({ images, discount = 0, isPrime = false, title }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <ImageWithFallback
          src={images[selectedImage]}
          alt={title}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-lg">
            {discount}% OFF
          </div>
        )}
        {isPrime && (
          <div className="absolute top-6 right-6 bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2">
            <Zap className="w-4 h-4 fill-current" />
            <span>Prime</span>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
              selectedImage === idx
                ? "border-neutral-900"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <ImageWithFallback
              src={img}
              alt={`${title} view ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
