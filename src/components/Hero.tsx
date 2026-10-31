export default function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(200,117,51,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(180,83,9,0.2),transparent_40%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,165,116,0.15),transparent_50%)]"></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-amber-600/5 blur-3xl float-animation"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-amber-800/5 blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-200 text-xs font-medium tracking-wider uppercase">Fresh Roasted Weekly</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Coffee,
              <br />
              <span className="text-gradient italic">Crafted</span> with
              <br />
              <span className="relative inline-block">
                Passion
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              From the world's most extraordinary growing regions to your morning ritual — every bean tells a story of dedication, terroir, and artistry.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#products"
                className="btn-primary px-8 py-3.5 rounded-full text-white font-medium text-sm tracking-wide"
              >
                Explore Our Coffees
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all text-sm font-medium"
              >
                <span>Our Story</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300">12+</p>
                <p className="text-xs text-stone-400 mt-0.5">Origins Sourced</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300">4.9</p>
                <p className="text-xs text-stone-400 mt-0.5">Avg. Rating</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300">5k+</p>
                <p className="text-xs text-stone-400 mt-0.5">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400"></div>
              </div>
              {/* Inner ring */}
              <div className="absolute inset-8 rounded-full border border-amber-400/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-300"></div>
              </div>
              {/* Center */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-700/30 to-stone-900/50 backdrop-blur-xl border border-amber-500/20 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl block mb-2">☕</span>
                  <p className="text-amber-200/80 text-xs font-medium tracking-widest uppercase">Est. 2019</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-xs font-medium text-stone-700 float-animation">
                🌱 Ethically Sourced
              </div>
              <div className="absolute bottom-8 left-0 px-3 py-1.5 rounded-full glass text-xs font-medium text-stone-700 float-animation" style={{ animationDelay: '1s' }}>
                ✨ Small Batch
              </div>
              <div className="absolute top-1/2 -right-4 px-3 py-1.5 rounded-full glass text-xs font-medium text-stone-700 float-animation" style={{ animationDelay: '2s' }}>
                🚚 Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-stone-400 text-[10px] uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
