import { useState, useMemo, useEffect } from 'react';

// Types
interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Sample Products
const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Single Origin',
    roast: 'Light',
    price: 22.50,
    weight: '250g',
    description: 'A luminous, complex coffee from the birthplace of arabica. Grown at elevations above 1,900m in the Gedeo zone, this lot showcases the terroir of one of the world\'s most celebrated coffee regions.',
    notes: ['Jasmine', 'Bergamot', 'Stone Fruit', 'Honey'],
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Single Origin',
    roast: 'Medium',
    price: 19.00,
    weight: '250g',
    description: 'Sourced from smallholder farms in the Huila region, this Supremo grade coffee delivers a beautifully balanced cup with silky body and refined sweetness.',
    notes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Almond'],
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Artisan Espresso Blend',
    origin: 'Brazil & Guatemala',
    category: 'Blend',
    roast: 'Dark',
    price: 18.50,
    weight: '250g',
    description: 'Our signature espresso blend combines the chocolate richness of Brazilian beans with the nuanced complexity of Guatemalan highland coffee. Perfect for espresso and milk-based drinks.',
    notes: ['Dark Chocolate', 'Hazelnut', 'Brown Sugar', 'Toffee'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=400&fit=crop&crop=center',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'Single Origin',
    roast: 'Dark',
    price: 21.00,
    weight: '250g',
    description: 'Wet-hulled in the traditional Giling Basah method, this Sumatran coffee delivers the full body and earthy complexity that makes Mandheling a perennial favorite among dark roast enthusiasts.',
    notes: ['Cedar', 'Dark Cocoa', 'Tobacco', 'Black Pepper'],
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop&crop=center',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Morning Ritual Blend',
    origin: 'Kenya & Costa Rica',
    category: 'Blend',
    roast: 'Medium',
    price: 20.00,
    weight: '250g',
    description: 'A vibrant, uplifting blend designed to start your day with clarity and joy. The bright acidity of Kenyan AA beans harmonizes with the clean sweetness of Costa Rican Tarrazú.',
    notes: ['Grapefruit', 'Peach', 'Vanilla', 'Maple'],
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop&crop=center',
    rating: 4.7,
  },
  {
    id: 6,
    name: 'Swiss Water Decaf',
    origin: 'Mexico',
    category: 'Decaf',
    roast: 'Medium',
    price: 23.00,
    weight: '250g',
    description: 'Chemical-free decaffeination using the Swiss Water Process preserves the full character of this exceptional Mexican coffee. Enjoy a refined cup any time of day without compromise.',
    notes: ['Toasted Almond', 'Dried Fig', 'Cane Sugar', 'Cinnamon'],
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=400&h=400&fit=crop&crop=center',
    rating: 4.5,
  },
];

const categories = ['All', 'Single Origin', 'Blend', 'Decaf'];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const completeOrder = () => {
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => {
      setOrderComplete(false);
      setIsCheckout(false);
      setIsCartOpen(false);
    }, 3000);
  };

  const getRoastColor = (roast: string) => {
    switch (roast) {
      case 'Light': return 'bg-amber-100 text-amber-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Dark': return 'bg-stone-200 text-stone-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, selectedProduct]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center">
                <span className="text-white text-sm sm:text-lg">☕</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-stone-800 tracking-tight">
                  Ember & Bloom
                </h1>
                <p className="hidden sm:block text-xs text-stone-500 -mt-0.5">Specialty Coffee Roasters</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search coffees, origins, tasting notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Cart Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 rounded-full hover:bg-stone-100 transition-colors"
              >
                <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {mobileSearchOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search coffees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
                  autoFocus
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(180,83,9,0.2),transparent_40%)]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">Curated with care</p>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-4">
              Exceptional Coffee,<br />
              <span className="text-amber-300">Roasted to Perfection</span>
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg">
              From the world's finest growing regions to your cup — every bean is carefully selected, roasted in small batches, and delivered at peak freshness.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-stone-800 text-white shadow-lg shadow-stone-800/20'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-stone-500 mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'coffee' : 'coffees'} available
          {searchQuery && <span> for "<span className="text-stone-700 font-medium">{searchQuery}</span>"</span>}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div
                  className="relative h-52 sm:h-56 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRoastColor(product.roast)}`}>
                      {product.roast} Roast
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-700 backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="font-serif font-bold text-stone-800 text-lg cursor-pointer hover:text-amber-700 transition-colors"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500 shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium text-stone-600">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-500 mb-3">{product.origin} · {product.weight}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.notes.slice(0, 3).map((note) => (
                      <span key={note} className="px-2 py-0.5 rounded-md bg-stone-50 text-xs text-stone-600 border border-stone-100">
                        {note}
                      </span>
                    ))}
                    {product.notes.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md text-xs text-stone-400">
                        +{product.notes.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-stone-800">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-full transition-colors duration-200 shadow-sm hover:shadow-md active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-serif font-bold text-stone-700 mb-2">No coffees found</h3>
            <p className="text-stone-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-3">Ember & Bloom</h4>
              <p className="text-sm leading-relaxed">
                Specialty coffee roasters dedicated to sourcing, roasting, and delivering the world's finest coffees to your door.
              </p>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm uppercase tracking-wider mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Our Story</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Brewing Guides</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Subscriptions</span></li>
                <li><span className="hover:text-amber-400 cursor-pointer transition-colors">Wholesale</span></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm uppercase tracking-wider mb-3">Contact</h5>
              <ul className="space-y-2 text-sm">
                <li>hello@emberandbloom.co</li>
                <li>Mon–Fri: 8am – 5pm</li>
                <li>Free shipping over $40</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-xs text-stone-500">
            © 2026 Ember & Bloom Coffee Roasters. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:text-stone-800 hover:bg-white transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoastColor(selectedProduct.roast)}`}>
                      {selectedProduct.roast} Roast
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
                    {selectedProduct.name}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-stone-800">${selectedProduct.price.toFixed(2)}</p>
                  <p className="text-xs text-stone-500">{selectedProduct.weight}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-amber-400 fill-current' : 'text-stone-200 fill-current'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-stone-600 font-medium">{selectedProduct.rating}</span>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-2">Tasting Notes</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.notes.map((note) => (
                    <span key={note} className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-sm font-medium border border-amber-100">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-amber-600/20 active:scale-[0.98]"
                >
                  Add to Cart — ${selectedProduct.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { setIsCartOpen(false); setIsCheckout(false); }}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="text-xl font-serif font-bold text-stone-800">
                {isCheckout ? 'Checkout' : 'Your Cart'}
              </h2>
              <button
                onClick={() => { setIsCartOpen(false); setIsCheckout(false); }}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {orderComplete ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">Order Confirmed!</h3>
                  <p className="text-stone-500 text-sm">Thank you for your purchase. Your coffee is on its way!</p>
                </div>
              ) : isCheckout ? (
                <CheckoutForm
                  cart={cart}
                  cartTotal={cartTotal}
                  onComplete={completeOrder}
                  onBack={() => setIsCheckout(false)}
                />
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-lg font-serif font-bold text-stone-700 mb-2">Your cart is empty</h3>
                  <p className="text-stone-500 text-sm">Add some delicious coffee to get started!</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-stone-50 border border-stone-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-stone-800 text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-stone-500">{item.product.weight}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-stone-700">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-stone-800">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {!isCheckout && !orderComplete && cart.length > 0 && (
              <div className="p-5 border-t border-stone-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-500">Subtotal</span>
                  <span className="text-sm font-medium text-stone-700">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-500">Shipping</span>
                  <span className="text-sm font-medium text-stone-700">
                    {cartTotal >= 40 ? 'Free' : '$5.00'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-stone-100">
                  <span className="font-semibold text-stone-800">Total</span>
                  <span className="text-lg font-bold text-stone-800">
                    ${(cartTotal + (cartTotal >= 40 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
                {cartTotal < 40 && (
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-3 text-center">
                    Add ${(40 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-full transition-colors shadow-lg active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Checkout Form Component
function CheckoutForm({
  cart,
  cartTotal,
  onComplete,
  onBack,
}: {
  cart: CartItem[];
  cartTotal: number;
  onComplete: () => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = cartTotal >= 40 ? 0 : 5;
  const total = cartTotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-5">
      {/* Order Summary */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
        <h4 className="text-sm font-semibold text-stone-700 mb-3">Order Summary</h4>
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-stone-600 truncate mr-2">
                {item.product.name} × {item.quantity}
              </span>
              <span className="text-stone-800 font-medium shrink-0">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-200 mt-3 pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Shipping</span>
            <span className="text-stone-700">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="text-stone-800">Total</span>
            <span className="text-stone-800">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div>
        <h4 className="text-sm font-semibold text-stone-700 mb-3">Shipping Information</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
          />
          <input
            type="text"
            placeholder="Street Address"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              required
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div>
        <h4 className="text-sm font-semibold text-stone-700 mb-3">Payment Details</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            required
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              required
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="CVV"
              required
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-amber-600/20 active:scale-[0.98]"
        >
          Place Order — ${total.toFixed(2)}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2.5 text-stone-600 hover:text-stone-800 text-sm font-medium transition-colors"
        >
          ← Back to Cart
        </button>
      </div>

      <p className="text-xs text-center text-stone-400">
        🔒 This is a demo. No real payment will be processed.
      </p>
    </form>
  );
}

export default App;
