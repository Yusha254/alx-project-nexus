import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758522484646-c8694d1784fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjM1MTIxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Shopping hero"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white">New Arrivals Daily</span>
          </div>
          
          <h1 className="text-white mb-6">
            Discover Premium Products at Unbeatable Prices
          </h1>
          
          <p className="text-neutral-200 mb-8 max-w-xl">
            Shop the latest electronics, home essentials, and more. 
            Curated selection with exclusive deals and fast, free delivery on qualifying orders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onShopNow}
              className="group bg-white text-neutral-900 px-8 py-4 rounded-lg hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
              View Deals
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-white mb-1">10K+</div>
              <div className="text-neutral-400">Products</div>
            </div>
            <div>
              <div className="text-white mb-1">50K+</div>
              <div className="text-neutral-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-white mb-1">4.8★</div>
              <div className="text-neutral-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent" />
    </div>
  );
}
