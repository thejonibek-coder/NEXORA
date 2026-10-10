import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PRODUCTS } from '@/data/products';
import { generateOrderNumber } from '@/utils/format';

const StoreContext = createContext(null);

const STORAGE_KEYS = {
  cart: 'nexora_cart',
  wishlist: 'nexora_wishlist',
  auth: 'nexora_auth',
  orders: 'nexora_orders',
  products: 'nexora_products',
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage(STORAGE_KEYS.cart, []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage(STORAGE_KEYS.wishlist, []));
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.auth, null));
  const [orders, setOrders] = useState(() => loadFromStorage(STORAGE_KEYS.orders, []));
  const [products, setProducts] = useState(() => loadFromStorage(STORAGE_KEYS.products, PRODUCTS));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { saveToStorage(STORAGE_KEYS.cart, cart); }, [cart]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.wishlist, wishlist); }, [wishlist]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.auth, user); }, [user]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.orders, orders); }, [orders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.products, products); }, [products]);

  const getProduct = useCallback((id) => products.find((p) => p.id === id), [products]);

  const addToCart = useCallback((productId, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  const login = useCallback((email, name) => {
    const userData = { email, name: name || email.split('@')[0], isAdmin: email === 'admin@nexora.uz' };
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const placeOrder = useCallback((orderData) => {
    const order = {
      id: generateOrderNumber(),
      ...orderData,
      items: [...cart],
      status: 'pending',
      date: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  }, [cart]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [product, ...prev]);
  }, []);

  const deleteProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const updateProductStock = useCallback((productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const value = {
    cart, cartCount, cartTotal,
    addToCart, updateCartQuantity, removeFromCart, clearCart,
    cartOpen, setCartOpen,
    wishlist, toggleWishlist, isInWishlist,
    user, login, logout,
    orders, placeOrder, updateOrderStatus,
    products, getProduct, addProduct, deleteProduct, updateProductStock,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
