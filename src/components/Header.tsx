import { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-stone-900/5 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center shadow-lg shadow-amber-900/20">
                <span className="text-lg">☕</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
                Ember & Bloom
              </h1>
              <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                Specialty Coffee Roasters
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors">Shop</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors">Subscriptions</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors">Our Story</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors">Brewing</a>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search origins, notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-56 lg:w-64 pl-10 pr-4 py-2.5 rounded-full bg-white/80 border border-stone-200/80 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 focus:w-72 transition-all duration-300"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-stone-100/80 transition-colors"
            >
              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative group p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold pulse-gold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="md:hidden mt-3 pb-1 fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coffees, origins, tasting notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-stone-200 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all"
                autoFocus
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
