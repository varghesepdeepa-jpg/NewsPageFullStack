function Navigation({ activeQuery, setActiveQuery }) {
  // Common news categories to provide instant variety
  const categories = ['technology', 'business', 'science', 'sports', 'entertainment'];

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm mb-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between py-3 gap-3">
        {/* Simple Brand/Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveQuery('technology')}
        >
          <span className="bg-gray-900 text-white font-black text-xs px-2 py-1 rounded">LIVE</span>
          <span className="font-serif font-black text-xl tracking-tight text-gray-900">The Chronicle</span>
        </div>

        {/* Dynamic Shadcn-style Tabs Component Row */}
        <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveQuery(cat)}
              className={`px-3 py-1.5 text-xs md:text-sm font-medium capitalize rounded-md transition-all whitespace-nowrap ${
                activeQuery === cat
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;