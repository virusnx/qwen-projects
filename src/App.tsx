import { useState, useMemo, useCallback } from 'react';
import { Product, CartItem, Toast } from './types';
import { products, categories, roastLevels } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesRoast =
        selectedRoast === 'All' || product.roast === selectedRoast;
      return matchesSearch && matchesCategory && matchesRoast;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedRoast, sortBy]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Toast system
  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart operations
  const addToCart = useCallback((product: Product, grind: string = 'Whole Bean') => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.grind === grind
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.grind === grind
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, grind }];
    });
    addToast(`${product.name} added to cart`);
  }, [addToast]);

  const updateQuantity = useCallback((productId: number, grind: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.product.id === productId && item.grind === grind
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const removeFromCart = useCallback((productId: number, grind: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.grind === grind))
    );
  }, []);

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const completeOrder = () => {
    setCart([]);
    setIsCheckout(false);
    setIsCartOpen(false);
    addToast('Order placed successfully! 🎉', 'success');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero */}
      <Hero />

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-700 text-xs font-semibold uppercase tracking-[0.2em]">Our Collection</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mt-2 mb-3">
            Exceptional Coffees
          </h2>
          <p className="text-stone-500 text-sm sm:text-base max-w-md mx-auto">
            Each origin tells a unique story — explore our curated selection of the world's finest specialty coffees.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category & Roast Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Category Pills */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-stone-800 text-white shadow-lg shadow-stone-800/20'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
            <div className="w-px h-6 bg-stone-200 mx-1 self-center hidden sm:block"></div>
            {/* Roast Pills */}
            {roastLevels.map((roast) => (
              <button
                key={roast}
                onClick={() => setSelectedRoast(roast)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedRoast === roast
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/20'
                    : 'bg-white text-stone-500 border border-stone-200 hover:border-amber-200 hover:text-amber-700'
                }`}
              >
                {roast === 'All' ? 'All Roasts' : roast}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-stone-400 font-medium">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-stone-400">
            Showing <span className="font-semibold text-stone-600">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'coffee' : 'coffees'}
            {searchQuery && (
              <span>
                {' '}for "<span className="text-amber-700 font-medium">{searchQuery}</span>"
              </span>
            )}
          </p>
          {(searchQuery || selectedCategory !== 'All' || selectedRoast !== 'All') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedRoast('All'); }}
              className="text-xs text-amber-700 font-medium hover:text-amber-800 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={(p) => addToCart(p)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-stone-700 mb-2">No coffees found</h3>
            <p className="text-stone-400 text-sm mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedRoast('All'); }}
              className="btn-secondary px-5 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Features Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $40' },
            { icon: '✨', title: 'Fresh Roasted', desc: 'Roasted to order' },
            { icon: '🌱', title: 'Ethically Sourced', desc: 'Direct trade partners' },
            { icon: '💝', title: 'Gift Wrapping', desc: 'Available at checkout' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-stone-100 shadow-sm"
            >
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <p className="text-sm font-semibold text-stone-700">{feature.title}</p>
                <p className="text-xs text-stone-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, grind) => addToCart(product, grind)}
        />
      )}

      {/* Cart Drawer */}
      {isCartOpen && !isCheckout && (
        <CartDrawer
          isOpen={isCartOpen}
          cart={cart}
          onClose={() => { setIsCartOpen(false); setIsCheckout(false); }}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* Checkout Overlay */}
      {isCartOpen && isCheckout && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCheckout(false)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl slide-in-right">
            <Checkout
              cart={cart}
              onBack={() => setIsCheckout(false)}
              onComplete={completeOrder}
            />
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
