import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatUZS, discountPercent } from '@/utils/format';

export default function ProductCard({ product, onQuickAdd }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);
  const discount = discountPercent(product.originalPrice, product.price);
  const outOfStock = product.stock <= 0;

  return (
    <div className="group relative rounded-2xl bg-ink-800 border border-ink-600 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(0,102,255,0.15)] hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-700">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-error text-white text-xs font-bold shadow-lg">
              -{discount}%
            </span>
          )}
          {outOfStock && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ink-900/80 text-slatey-400 text-xs font-semibold border border-ink-600">
              Tugagan
            </span>
          )}
          {product.bestseller && !outOfStock && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent-gradient text-white text-xs font-bold shadow-lg">
              Ommabop
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          wished
            ? 'bg-error/20 text-error border border-error/30'
            : 'bg-ink-900/60 text-slatey-400 border border-ink-600 opacity-0 group-hover:opacity-100'
        } ${outOfStock ? 'top-3' : 'top-12'} hover:scale-110`}
        aria-label="Sevimlilarga qo‘shish"
      >
        <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
      </button>

      <div className="p-4 space-y-2">
        <span className="text-xs text-accent-300 font-medium">{product.categoryLabel}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-accent-300 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < product.rating ? 'text-warning fill-current' : 'text-ink-600'}`}
            />
          ))}
          <span className="text-xs text-slatey-400 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-white">{formatUZS(product.price)}</span>
          {discount > 0 && (
            <span className="text-xs text-slatey-500 line-through">{formatUZS(product.originalPrice)}</span>
          )}
        </div>
        <button
          onClick={() => (onQuickAdd ? onQuickAdd(product) : addToCart(product.id))}
          disabled={outOfStock}
          className={`w-full mt-2 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
            outOfStock
              ? 'bg-ink-700 text-slatey-500 cursor-not-allowed'
              : 'bg-ink-700 text-white hover:bg-accent-gradient border border-ink-600 hover:border-transparent'
          }`}
        >
          {outOfStock ? 'Mavjud emas' : 'Savatchaga qo‘shish'}
        </button>
      </div>
    </div>
  );
}
