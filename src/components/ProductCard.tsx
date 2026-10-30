import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onViewDetails, onAddToCart, index }: ProductCardProps) {
  const getRoastLabel = (level: number) => {
    const labels = ['', 'Light', 'Light-Medium', 'Medium', 'Medium-Dark', 'Dark'];
    return labels[level] || 'Medium';
  };

  return (
    <div
      className="group card-hover bg-white rounded-2xl overflow-hidden border border-stone-100/80 shadow-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div
        className="relative h-60 sm:h-64 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] font-semibold uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="px-5 py-2 rounded-full bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-semibold hover:bg-white transition-colors shadow-xl"
          >
            Quick View
          </button>
        </div>

        {/* Roast Level Indicator */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  level <= product.roastLevel ? 'bg-amber-400' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Origin & Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-400 font-medium">{product.country}</span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-400">{product.process}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-stone-600">{product.rating}</span>
            <span className="text-[10px] text-stone-400">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-display text-lg font-bold text-stone-800 mb-1 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{product.shortDesc}</p>

        {/* Tasting Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 rounded-md bg-stone-50 text-[10px] text-stone-500 font-medium border border-stone-100"
            >
              {note}
            </span>
          ))}
          {product.notes.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] text-stone-400">
              +{product.notes.length - 3}
            </span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div>
            <span className="text-xl font-bold text-stone-800">${product.price.toFixed(2)}</span>
            <span className="text-xs text-stone-400 ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary px-4 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
