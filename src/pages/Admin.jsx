import { useState, useMemo } from 'react';
import {
  DollarSign, Package, ShoppingBag, AlertTriangle, Plus,
  Trash2, X, TrendingUp, Boxes,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { PRODUCTS, CATEGORIES, ORDER_STATUSES } from '@/data/products';
import { formatUZS, formatUZSShort, generateId } from '@/utils/format';

const STATUS_KEYS = Object.keys(ORDER_STATUSES);

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@nexora.uz' && password === 'admin123') {
      onLogin(email, 'Administrator');
    } else {
      setError('Email yoki parol noto‘g‘ri. (admin@nexora.uz / admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ink-900 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent-gradient flex items-center justify-center mx-auto mb-4">
            <Boxes className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin panel</h1>
          <p className="text-slatey-400 text-sm mt-1">Tizimga kirish uchun ma’lumotlaringizni kiriting</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
          <div>
            <label className="text-sm text-slatey-400 mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexora.uz"
              className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-slatey-400 mb-2 block">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button type="submit" className="w-full py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity">
            Kirish
          </button>
          <p className="text-xs text-slatey-500 text-center">Test: admin@nexora.uz / admin123</p>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, login, logout, products, orders, addProduct, deleteProduct, updateProductStock, updateOrderStatus } = useStore();
  const [tab, setTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'smartphones', price: '', originalPrice: '', stock: '', description: '',
  });

  if (!user || !user.isAdmin) {
    return <AdminLogin onLogin={login} />;
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const metrics = [
    { label: 'Jami tushum', value: formatUZSShort(totalRevenue), full: formatUZS(totalRevenue), icon: DollarSign, color: 'accent' },
    { label: 'Jami buyurtmalar', value: orders.length, icon: ShoppingBag, color: 'success' },
    { label: 'Mahsulotlar soni', value: products.length, icon: Package, color: 'accent' },
    { label: 'Kam qolgan tovarlar', value: lowStockProducts.length, icon: AlertTriangle, color: 'warning' },
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    const categoryLabel = CATEGORIES.find((c) => c.id === newProduct.category)?.label || 'Boshqa';
    const product = {
      id: generateId(),
      name: newProduct.name,
      category: newProduct.category,
      categoryLabel,
      price: parseInt(newProduct.price) || 0,
      originalPrice: parseInt(newProduct.originalPrice) || 0,
      stock: parseInt(newProduct.stock) || 0,
      rating: 5,
      reviews: 0,
      bestseller: false,
      images: ['https://images.pexels.com/photos/7538510/pexels-photo-7538510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
      description: newProduct.description || 'Yangi mahsulot',
      specs: [],
      warranty: '1 yil rasmiy kafolat',
      brand: 'NEXORA',
    };
    addProduct(product);
    setShowAddModal(false);
    setNewProduct({ name: '', category: 'smartphones', price: '', originalPrice: '', stock: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin panel</h1>
            <p className="text-slatey-400 text-sm mt-1">Xush kelibsiz, {user.name}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-ink-800 text-slatey-400 border border-ink-600 hover:text-white text-sm font-medium transition-colors"
          >
            Chiqish
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-ink-600">
          {[
            { id: 'overview', label: 'Umumiy' },
            { id: 'products', label: 'Mahsulotlar' },
            { id: 'orders', label: 'Buyurtmalar' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                tab === t.id ? 'text-white' : 'text-slatey-400 hover:text-white'
              }`}
            >
              {t.label}
              {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gradient" />}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <div key={i} className="rounded-2xl bg-ink-800 border border-ink-600 p-5 hover:border-ink-500 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${m.color}/10`}>
                      <m.icon className={`w-5 h-5 text-${m.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-slatey-600" />
                  </div>
                  <p className="text-2xl font-bold text-white">{m.value}</p>
                  <p className="text-xs text-slatey-400 mt-1">{m.label}</p>
                  {m.full && <p className="text-xs text-slatey-500 mt-1">{m.full}</p>}
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="rounded-2xl bg-ink-800 border border-ink-600 overflow-hidden">
              <div className="p-5 border-b border-ink-600">
                <h2 className="text-lg font-bold text-white">So‘nggi buyurtmalar</h2>
              </div>
              {orders.length === 0 ? (
                <div className="p-8 text-center text-slatey-400 text-sm">Hozircha buyurtmalar yo‘q</div>
              ) : (
                <div className="divide-y divide-ink-600">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 hover:bg-ink-700/30 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-white">{order.id}</p>
                        <p className="text-xs text-slatey-400">{order.customer?.fullName} • {order.items.length} ta mahsulot</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{formatUZS(order.total)}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-${ORDER_STATUSES[order.status].color}/10 text-${ORDER_STATUSES[order.status].color}`}>
                          {ORDER_STATUSES[order.status].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Low stock alert */}
            {lowStockProducts.length > 0 && (
              <div className="rounded-2xl bg-warning/5 border border-warning/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h2 className="text-lg font-bold text-white">Kam qolgan tovarlar</h2>
                </div>
                <div className="space-y-2">
                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-ink-800 border border-ink-600">
                      <span className="text-sm text-white">{p.name}</span>
                      <span className={`text-sm font-semibold ${p.stock <= 3 ? 'text-error' : 'text-warning'}`}>{p.stock} ta qoldi</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products management */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Mahsulotlar ({products.length})</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Yangi mahsulot
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-ink-800 border border-ink-600">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-ink-600">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slatey-400 uppercase">Mahsulot</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slatey-400 uppercase">Kategoriya</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slatey-400 uppercase">Narx</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slatey-400 uppercase">Ombor</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slatey-400 uppercase">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-600">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-ink-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-ink-700" />
                          <span className="text-sm font-medium text-white truncate max-w-xs">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slatey-400">{p.categoryLabel}</td>
                      <td className="px-4 py-3 text-sm text-white font-medium text-right">{formatUZS(p.price)}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => updateProductStock(p.id, p.stock - 1)}
                            className="w-6 h-6 rounded-md bg-ink-600 text-slatey-400 hover:text-white text-xs flex items-center justify-center"
                          >−</button>
                          <span className={`text-sm font-semibold w-8 text-center ${p.stock <= 5 ? 'text-warning' : 'text-white'}`}>{p.stock}</span>
                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 1)}
                            className="w-6 h-6 rounded-md bg-ink-600 text-slatey-400 hover:text-white text-xs flex items-center justify-center"
                          >+</button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-slatey-500 hover:text-error transition-colors inline-flex"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders management */}
        {tab === 'orders' && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Buyurtmalar ({orders.length})</h2>
            {orders.length === 0 ? (
              <div className="rounded-2xl bg-ink-800 border border-ink-600 p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-slatey-500 mx-auto mb-3" />
                <p className="text-slatey-400">Hozircha buyurtmalar yo‘q</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl bg-ink-800 border border-ink-600 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-bold text-white">{order.id}</p>
                        <p className="text-xs text-slatey-400 mt-1">
                          {order.customer?.fullName} • {order.customer?.phone}
                        </p>
                        <p className="text-xs text-slatey-500 mt-1">{new Date(order.date).toLocaleString('uz-UZ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{formatUZS(order.total)}</p>
                        <p className="text-xs text-slatey-400">{order.items.length} ta mahsulot</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-ink-600 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slatey-400 mr-2">Holatni o‘zgartirish:</span>
                      {STATUS_KEYS.map((key) => (
                        <button
                          key={key}
                          onClick={() => updateOrderStatus(order.id, key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            order.status === key
                              ? `bg-${ORDER_STATUSES[key].color}/15 text-${ORDER_STATUSES[key].color} border border-${ORDER_STATUSES[key].color}/30`
                              : 'bg-ink-700 text-slatey-400 border border-ink-600 hover:text-white'
                          }`}
                        >
                          {ORDER_STATUSES[key].label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" />
          <form
            onSubmit={handleAddProduct}
            className="relative max-w-lg w-full rounded-2xl bg-ink-800 border border-ink-600 p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Yangi mahsulot qo‘shish</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slatey-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slatey-400 mb-1 block">Nomi</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent text-sm"
                  placeholder="Masalan: Samsung Galaxy S24"
                />
              </div>
              <div>
                <label className="text-sm text-slatey-400 mb-1 block">Kategoriya</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white outline-none focus:border-accent text-sm"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slatey-400 mb-1 block">Narx (so‘m)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white outline-none focus:border-accent text-sm"
                    placeholder="5000000"
                  />
                </div>
                <div>
                  <label className="text-sm text-slatey-400 mb-1 block">Eski narx (ixtiyoriy)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white outline-none focus:border-accent text-sm"
                    placeholder="6000000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slatey-400 mb-1 block">Ombor soni</label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white outline-none focus:border-accent text-sm"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="text-sm text-slatey-400 mb-1 block">Tavsif</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-700 border border-ink-600 text-white outline-none focus:border-accent text-sm resize-none"
                  placeholder="Mahsulot tavsifi..."
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-5 py-3 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity">
              Qo‘shish
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
