import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatUZS } from '@/utils/format';

export default function Cart() {
  const { cart, getProduct, updateCartQuantity, removeFromCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center animate-fade-in px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-ink-800 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-slatey-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Savatchangiz bo‘sh</h1>
          <p className="text-slatey-400 mb-6">Hozircha hech narsa qo‘shilmagan. Mahsulotlar sahifasiga o‘ting va o‘zingizga yoqqan narsani tanlang.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Mahsulotlarga o‘tish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Savat</h1>
        <p className="text-slatey-400 mb-6">{cart.length} ta mahsulot</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const product = getProduct(item.id);
              if (!product) return null;
              return (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-ink-800 border border-ink-600 hover:border-ink-500 transition-colors">
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-24 h-24 rounded-xl object-cover bg-ink-700" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-sm font-semibold text-white hover:text-accent-300 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-slatey-400 mt-1">{product.categoryLabel} • {product.brand}</p>
                    <p className="text-sm font-bold text-white mt-2">{formatUZS(product.price)}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-ink-700 border border-ink-600 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-600 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-600 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slatey-500 hover:text-error transition-colors flex items-center gap-1 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> O‘chirish
                      </button>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slatey-500">Umumiy</p>
                    <p className="text-sm font-bold text-accent-300 mt-1">{formatUZS(product.price * item.quantity)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Buyurtma xulosasi</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slatey-400">Mahsulotlar ({cart.length})</span>
                  <span className="text-sm text-white font-medium">{formatUZS(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slatey-400">Yetkazib berish</span>
                  <span className="text-sm text-success font-medium">Bepul</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-accent-gradient-soft border border-accent/10">
                  <Tag className="w-4 h-4 text-accent-400" />
                  <span className="text-xs text-slatey-400">Promokod mavjud emas</span>
                </div>
              </div>

              <div className="pt-4 border-t border-ink-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">Jami</span>
                  <span className="text-2xl font-bold text-white">{formatUZS(cartTotal)}</span>
                </div>
                <p className="text-xs text-slatey-500">QQS va yetkazib berish xarajati kiritilgan</p>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-3.5 rounded-xl bg-accent-gradient text-white font-semibold text-center hover:opacity-90 transition-opacity"
              >
                Buyurtmani rasmiylashtirish
              </Link>
              <Link
                to="/products"
                className="block w-full py-3 rounded-xl bg-ink-700 text-white font-medium text-center border border-ink-600 hover:bg-ink-600 transition-colors text-sm"
              >
                Davom etish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
