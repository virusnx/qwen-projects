import { useState } from 'react';
import { Product } from '../types';
import { grindOptions } from '../data';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, grind: string) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedGrind);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl slide-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-white transition-all shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-auto md:min-h-[500px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r"></div>

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  ★ Featured
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col">
            {/* Category & Origin */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold uppercase tracking-wider">
                {product.roast} Roast
              </span>
            </div>

            {/* Name */}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-800 mb-1">
              {product.name}
            </h2>

            {/* Origin */}
            <p className="text-sm text-stone-500 mb-4">
              {product.origin}, {product.country}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-stone-200 fill-current'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-stone-700">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Altitude</p>
                <p className="text-sm font-semibold text-stone-700">{product.altitude}</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Process</p>
                <p className="text-sm font-semibold text-stone-700">{product.process}</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Weight</p>
                <p className="text-sm font-semibold text-stone-700">{product.weight}</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Roast Level</p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-full ${
                        level <= product.roastLevel ? 'bg-amber-700' : 'bg-stone-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Grind Selection */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Grind</h4>
              <div className="flex flex-wrap gap-2">
                {grindOptions.map((grind) => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedGrind === grind
                        ? 'bg-stone-800 text-white shadow-md'
                        : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-auto pt-4 border-t border-stone-100">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-stone-50 rounded-full px-3 py-1.5 border border-stone-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-stone-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 btn-primary py-3 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
