import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingCart, Zap, Minus, Plus, ChevronRight,
  ShieldCheck, Truck, Check, ArrowLeft, Package,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatUZS, discountPercent, scrollToTop } from '@/utils/format';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, products, addToCart, toggleWishlist, isInWishlist, setCartOpen } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProduct(id);

  useEffect(() => { scrollToTop(); }, [id]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-slatey-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Mahsulot topilmadi</h1>
          <Link to="/products" className="text-accent-300 hover:text-accent-200">Mahsulotlar ro‘yxatiga qaytish</Link>
        </div>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const discount = discountPercent(product.originalPrice, product.price);
  const outOfStock = product.stock <= 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slatey-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-white transition-colors">Mahsulotlar</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/products?category=${product.category}`} className="hover:text-white transition-colors">{product.categoryLabel}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-800 border border-ink-600">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-error text-white text-sm font-bold shadow-lg">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-accent shadow-lg shadow-accent/20' : 'border-ink-600 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <span className="text-sm text-accent-300 font-medium">{product.categoryLabel}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-warning fill-current' : 'text-ink-600'}`} />
                  ))}
                </div>
                <span className="text-sm text-slatey-400">{product.reviews} sharhlar</span>
                <span className="text-slatey-600">•</span>
                <span className="text-sm text-slatey-400">{product.brand}</span>
              </div>
            </div>

            <p className="text-slatey-400 leading-relaxed">{product.description}</p>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              {outOfStock ? (
                <span className="px-3 py-1.5 rounded-lg bg-error/10 text-error text-sm font-medium border border-error/20">Omborda yo‘q</span>
              ) : product.stock <= 5 ? (
                <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-sm font-medium border border-warning/20">
                  Omborda {product.stock} ta qoldi!
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium border border-success/20">
                  Omborda {product.stock} ta qoldi
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{formatUZS(product.price)}</span>
              {discount > 0 && (
                <span className="text-lg text-slatey-500 line-through">{formatUZS(product.originalPrice)}</span>
              )}
            </div>

            {/* Quantity selector */}
            {!outOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slatey-400">Miqdor:</span>
                <div className="flex items-center gap-1 bg-ink-800 border border-ink-600 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-success text-white'
                    : outOfStock
                      ? 'bg-ink-700 text-slatey-500 cursor-not-allowed'
                      : 'bg-ink-800 text-white border border-ink-600 hover:border-accent/40 hover:bg-ink-700'
                }`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Qo‘shildi!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Savatchaga qo‘shish</>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={outOfStock}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  outOfStock ? 'bg-ink-700 text-slatey-500 cursor-not-allowed' : 'bg-accent-gradient text-white hover:opacity-90 shadow-lg shadow-accent/20'
                }`}
              >
                <Zap className="w-5 h-5" /> Hozir sotib olish
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 sm:w-auto sm:px-4 rounded-xl flex items-center justify-center border transition-all ${
                  wished ? 'bg-error/10 text-error border-error/30' : 'bg-ink-800 text-slatey-400 border-ink-600 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${wished ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ink-800 border border-ink-600">
                <Truck className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">24 soat</p>
                  <p className="text-xs text-slatey-500">Tezkor yetkazib berish</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ink-800 border border-ink-600">
                <ShieldCheck className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Kafolat</p>
                  <p className="text-xs text-slatey-500">{product.warranty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ink-800 border border-ink-600">
                <Check className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">100% Rasmiy</p>
                  <p className="text-xs text-slatey-500">Brend: {product.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Texnik xususiyatlar</h2>
          <div className="rounded-2xl bg-ink-800 border border-ink-600 overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className={`border-b border-ink-600 last:border-0 ${i % 2 === 0 ? 'bg-ink-800' : 'bg-ink-700/30'}`}>
                    <td className="px-4 sm:px-6 py-3.5 text-sm text-slatey-400 font-medium w-1/3">{spec.label}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm text-white">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-4">O‘xshash mahsulotlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slatey-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Mahsulotlar ro‘yxatiga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
