import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import type { CategoryNavProps } from '@/interfaces';

export function CategoryNav({ selectedCategory, onCategorySelect }: CategoryNavProps) {
  const [startIndex, setStartIndex] = useState(0);
  
  // Show 5 categories at a time on desktop, 3 on tablet, 2 on mobile
  const categoriesPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 5
  };
  
  const [itemsToShow, setItemsToShow] = useState(categoriesPerView.desktop);
  
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + itemsToShow < CATEGORIES.length;
  
  const handleScrollLeft = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };
  
  const handleScrollRight = () => {
    setStartIndex(Math.min(CATEGORIES.length - itemsToShow, startIndex + 1));
  };
  
  const visibleCategories = CATEGORIES.slice(startIndex, startIndex + itemsToShow);

  return (
    <nav className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Left Arrow */}
          <button
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`shrink-0 p-2 rounded-lg transition-all ${
              canScrollLeft
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
            }`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Categories */}
          <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden">
            {visibleCategories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all min-w-[100px] sm:min-w-[120px] ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-lg scale-105'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  style={{
                    animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`
                  }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs text-center leading-tight">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className={`shrink-0 p-2 rounded-lg transition-all ${
              canScrollRight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
            }`}
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-1 pb-3">
          {Array.from({ length: Math.ceil(CATEGORIES.length / itemsToShow) }).map((_, index) => {
            const pageStartIndex = index * itemsToShow;
            const isActive = startIndex >= pageStartIndex && startIndex < pageStartIndex + itemsToShow;
            
            return (
              <button
                key={index}
                onClick={() => setStartIndex(pageStartIndex)}
                className={`h-1 rounded-full transition-all ${
                  isActive ? 'w-8 bg-neutral-900' : 'w-1 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to category group ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}