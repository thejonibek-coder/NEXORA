import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/StoreContext';
import { formatUZS } from '@/utils/format';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, getProduct, updateCartQuantity, removeFromCart, cartTotal } = useStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } bg-ink-900/70 backdrop-blur-sm`}
        onClick={() => setCartOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-ink-800 border-l border-ink-600 shadow-2xl transition-transform duration-300 flex flex-col ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-ink-600">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent-400" />
            <h2 className="text-lg font-bold text-white">Savat</h2>
          </div>
          <button onClick={() => setCartOpen(false)} className="text-slatey-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-20 h-20 rounded-full bg-ink-700 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-slatey-500" />
            </div>
            <p className="text-slatey-400 text-center">Savatchangiz bo‘sh</p>
            <Link
              to="/products"
              onClick={() => setCartOpen(false)}
              className="px-6 py-2.5 rounded-lg bg-accent-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Mahsulotlarga o‘tish
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-ink-700/50 border border-ink-600/50 animate-slide-right">
                    <Link to={`/products/${item.id}`} onClick={() => setCartOpen(false)} className="flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-ink-700" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.id}`} onClick={() => setCartOpen(false)}>
                        <h4 className="text-sm font-medium text-white truncate hover:text-accent-300 transition-colors">{product.name}</h4>
                      </Link>
                      <p className="text-xs text-slatey-400 mb-2">{formatUZS(product.price)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-ink-600 flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium text-white w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-ink-600 flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-slatey-500 hover:text-error transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-ink-600 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slatey-400 text-sm">Yetkazib berish</span>
                <span className="text-success text-sm font-medium">Bepul</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Jami</span>
                <span className="text-xl font-bold text-white">{formatUZS(cartTotal)}</span>
              </div>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="block w-full py-3 rounded-lg bg-ink-700 text-white font-medium text-sm text-center hover:bg-ink-600 border border-ink-600 transition-colors"
              >
                Savatni ko‘rish
              </Link>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full py-3 rounded-lg bg-accent-gradient text-white font-semibold text-sm text-center hover:opacity-90 transition-opacity"
              >
                Buyurtma berish
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
