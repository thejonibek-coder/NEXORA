import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatUZS } from '@/utils/format';

export default function SearchOverlay({ open, onClose }) {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" />
      <div
        className="relative max-w-2xl mx-auto mt-20 mx-4 bg-ink-800 border border-ink-600 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-ink-600">
          <SearchIcon className="w-5 h-5 text-slatey-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot qidiring..."
            className="flex-1 bg-transparent text-white placeholder-slatey-500 outline-none text-lg"
          />
          <button onClick={onClose} className="text-slatey-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 hover:bg-ink-700 transition-colors border-b border-ink-600/50 last:border-0"
              >
                <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-ink-700" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-xs text-slatey-400">{p.categoryLabel}</p>
                </div>
                <span className="text-sm font-semibold text-accent-300 flex-shrink-0">{formatUZS(p.price)}</span>
              </Link>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="p-8 text-center text-slatey-400">
            <p className="text-sm">Hech narsa topilmadi: "{query}"</p>
          </div>
        )}

        {!query.trim() && (
          <div className="p-4 text-center text-slatey-500 text-sm">
            Mahsulot nomi, kategoriyasi yoki brendini kiriting
          </div>
        )}
      </div>
    </div>
  );
}
