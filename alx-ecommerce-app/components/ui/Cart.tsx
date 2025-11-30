import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { CartProps } from '@/interfaces';


function getPriceNumber(price: string | null): number {
  if (!price) return 0;
  const parsed = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity }: CartProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = getPriceNumber(item.price);
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-neutral-900">Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
            <h3 className="text-neutral-900 mb-2">Your cart is empty</h3>
            <p className="text-neutral-600 mb-6">
              Add some products to get started!
            </p>
            <button
              onClick={onClose}
              className="bg-neutral-900 text-white px-6 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.asin} className="flex gap-4 bg-neutral-50 rounded-lg p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-white shrink-0">
                    <ImageWithFallback
                      src={item.image??''}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-900 mb-3">
                      ${getPriceNumber(item.price).toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.asin, item.quantity - 1)}
                          className="w-8 h-8 rounded-md bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.asin, item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.asin, 0)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-xs text-neutral-500">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
