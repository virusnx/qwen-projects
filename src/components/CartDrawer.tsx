import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, grind: string, delta: number) => void;
  onRemove: (productId: number, grind: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, cart, onClose, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 40 ? 0 : 5.99;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-in"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 className="font-display text-xl font-bold text-stone-800">Your Cart</h2>
            <p className="text-xs text-stone-400 mt-0.5">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-stone-700 mb-1">Your cart is empty</h3>
              <p className="text-stone-400 text-sm mb-4">Discover our curated selection of specialty coffees</p>
              <button
                onClick={onClose}
                className="btn-secondary px-5 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.grind}`}
                  className="flex gap-3 p-3 rounded-xl bg-stone-50/80 border border-stone-100 fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover shrink-0"
                    style={{ width: '72px', height: '72px' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-stone-800 text-sm truncate">{item.product.name}</h4>
                        <p className="text-[10px] text-stone-400 mt-0.5">{item.grind} · {item.product.weight}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.product.id, item.grind)}
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-white rounded-full border border-stone-200 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.grind, -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-xs"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-stone-700">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.grind, 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-stone-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 bg-stone-50/50">
            {/* Free Shipping Progress */}
            {subtotal < 40 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500">
                    Add <span className="font-semibold text-amber-700">${(40 - subtotal).toFixed(2)}</span> for free shipping
                  </span>
                  <span className="text-stone-400">{Math.round((subtotal / 40) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 40) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-medium text-stone-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="font-medium text-stone-700">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <span className="font-semibold text-stone-800">Total</span>
                <span className="text-xl font-bold text-stone-800">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full btn-primary py-3.5 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </button>

            <p className="text-center text-[10px] text-stone-400 mt-3">
              🔒 Secure 256-bit SSL encryption
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
