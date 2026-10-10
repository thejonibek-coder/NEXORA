import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, LayoutGrid, Smartphone, Laptop, Headphones, Watch,
  Tablet, Gamepad2, Camera, Keyboard, SlidersHorizontal, X,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';

const CATEGORY_ICONS = {
  LayoutGrid, Smartphone, Laptop, Headphones, Watch, Tablet, Gamepad2, Camera, Keyboard,
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'Eng ommabop' },
  { value: 'cheap', label: 'Arzonroq' },
  { value: 'expensive', label: 'Qimmatroq' },
];

export default function Products() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const setCategory = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'cheap': result.sort((a, b) => a.price - b.price); break;
      case 'expensive': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [products, category, query, sort]);

  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Mahsulotlar</h1>
          <p className="text-slatey-400">{filteredProducts.length} ta mahsulot topildi</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slatey-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot qidiring..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-800 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slatey-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || LayoutGrid;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  active
                    ? 'bg-accent-gradient text-white shadow-lg shadow-accent/20'
                    : 'bg-ink-800 text-slatey-400 border border-ink-600 hover:text-white hover:border-ink-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort and filter bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slatey-400" />
            <span className="text-sm text-slatey-400">Saralash:</span>
          </div>
          <div className="flex gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sort === opt.value
                    ? 'bg-accent/15 text-accent-300 border border-accent/30'
                    : 'bg-ink-800 text-slatey-400 border border-ink-600 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-ink-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slatey-500" />
            </div>
            <p className="text-slatey-400 text-lg">Mahsulot topilmadi</p>
            <p className="text-slatey-500 text-sm mt-1">Boshqa so‘z yoki kategoriya bilan urinib ko‘ring</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
