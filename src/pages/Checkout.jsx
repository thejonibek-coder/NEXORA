import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Phone, MapPin, MessageSquare, CreditCard, Truck,
  CheckCircle2, Send, ShoppingBag, ArrowLeft, X, Copy,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatUZS, formatPhone } from '@/utils/format';
import { sendTelegramMessage } from '@/utils/telegram';

export default function Checkout() {
  const { cart, getProduct, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0 && !confirmed) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-ink-800 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-slatey-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Savat bo‘sh</h1>
          <p className="text-slatey-400 mb-6">Buyurtma berish uchun avval mahsulot qo‘shing.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity">
            Mahsulotlarga o‘tish
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) errs.fullName = 'Ismni to‘liq kiriting';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) errs.phone = 'Telefon raqamni to‘g‘ri kiriting';
    if (!form.address.trim() || form.address.trim().length < 5) errs.address = 'Manzilni batafsil kiriting';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    // 1. Do'kon tizimida buyurtmani saqlash
    const order = placeOrder({
      customer: { ...form },
      total: cartTotal,
    });

    // 2. Savatdagi tovarlar ro'yxatini Telegram uchun tayyorlash
    const orderItemsText = cart.map((item, index) => {
      const product = getProduct(item.id);
      const name = product ? product.name : `Mahsulot #${item.id}`;
      const price = product ? formatUZS(product.price * item.quantity) : '';
      return `${index + 1}. <b>${name}</b> — ${item.quantity} dona (${price})`;
    }).join('\n');

    // 3. Telegram xabar shabloni
    const message = `
🛍 <b>Yangi buyurtma: #${order.id}</b>

👤 <b>Mijoz:</b> ${form.fullName}
📞 <b>Telefon:</b> ${form.phone}
📍 <b>Manzil:</b> ${form.address}
💬 <b>Izoh:</b> ${form.note || "Yo'q"}
💳 <b>To'lov turi:</b> ${form.paymentMethod === 'cod' ? 'Naqd / Karta (Qabul qilinganda)' : 'Onlayn karta'}

📦 <b>Mahsulotlar:</b>
${orderItemsText}

💰 <b>Jami summa:</b> ${formatUZS(cartTotal)}
    `;

    // 4. Telegramga yuborish
    await sendTelegramMessage(message);

    setIsSubmitting(false);
    setConfirmed(order);
    setShowTelegramModal(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Confirmation screen
  if (confirmed) {
    return (
      <div className="min-h-screen bg-ink-900 animate-fade-in py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Buyurtma qabul qilindi!</h1>
            <p className="text-slatey-400">Buyurtmangiz muvaffaqiyatli rasmiylashtirildi. Tez orada siz bilan bog‘lanamiz.</p>
          </div>

          <div className="rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-ink-600">
              <span className="text-slatey-400">Buyurtma raqami</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-accent-300">{confirmed.id}</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(confirmed.id)}
                  className="text-slatey-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slatey-400">Mijoz</span>
              <span className="text-white font-medium">{confirmed.customer.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slatey-400">Telefon</span>
              <span className="text-white font-medium">{confirmed.customer.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slatey-400">Manzil</span>
              <span className="text-white font-medium text-right max-w-xs">{confirmed.customer.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slatey-400">To‘lov usuli</span>
              <span className="text-white font-medium">
                {confirmed.customer.paymentMethod === 'cod' ? 'Yetkazib berilganda naqd / karta' : 'Karta orqali onlayn (Test rejim)'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-ink-600">
              <span className="text-white font-medium">Jami summa</span>
              <span className="text-xl font-bold text-white">{formatUZS(confirmed.total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="flex-1 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold text-center hover:opacity-90 transition-opacity">
              Davom etish
            </Link>
            <Link to="/" className="flex-1 py-3.5 rounded-xl bg-ink-800 text-white font-medium text-center border border-ink-600 hover:bg-ink-700 transition-colors">
              Bosh sahifaga
            </Link>
          </div>
        </div>

        {/* Telegram notification modal */}
        {showTelegramModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowTelegramModal(false)}>
            <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" />
            <div className="relative max-w-md w-full rounded-2xl bg-ink-800 border border-ink-600 p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowTelegramModal(false)} className="absolute top-4 right-4 text-slatey-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Telegram bildirishnoma</h3>
                  <p className="text-xs text-slatey-400">Telegram botga yuborildi</p>
                </div>
              </div>
              <div className="rounded-xl bg-ink-700 border border-ink-600 p-4 text-sm space-y-2">
                <p className="text-slatey-400">Yangi buyurtma: <span className="text-white font-semibold">{confirmed.id}</span></p>
                <p className="text-slatey-400">Mijoz: <span className="text-white">{confirmed.customer.fullName}</span></p>
                <p className="text-slatey-400">Telefon: <span className="text-white">{confirmed.customer.phone}</span></p>
                <p className="text-slatey-400">Summa: <span className="text-accent-300 font-semibold">{formatUZS(confirmed.total)}</span></p>
                <p className="text-slatey-400">Mahsulotlar: <span className="text-white">{confirmed.items?.length || cart.length} ta</span></p>
              </div>
              <button
                onClick={() => setShowTelegramModal(false)}
                className="w-full mt-4 py-3 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Tushunarli
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Checkout form
  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-slatey-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Savatga qaytish
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6">Buyurtmani rasmiylashtirish</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Customer info */}
            <div className="rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-5">
              <h2 className="text-lg font-bold text-white">Yetkazib berish ma’lumotlari</h2>

              <div>
                <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
                  <User className="w-4 h-4" /> To‘liq ism
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Masalan: Akmal Karimov"
                  className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm ${
                    errors.fullName ? 'border-error/50 focus:border-error' : 'border-ink-600 focus:border-accent'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
                  <Phone className="w-4 h-4" /> Telefon raqam
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                  placeholder="+998 (XX) XXX-XX-XX"
                  className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm ${
                    errors.phone ? 'border-error/50 focus:border-error' : 'border-ink-600 focus:border-accent'
                  }`}
                />
                {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
                  <MapPin className="w-4 h-4" /> Yetkazib berish manzili
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Shahar, ko‘cha, uy raqami, kvartira..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm resize-none ${
                    errors.address ? 'border-error/50 focus:border-error' : 'border-ink-600 focus:border-accent'
                  }`}
                />
                {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
                  <MessageSquare className="w-4 h-4" /> Izoh (ixtiyoriy)
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  placeholder="Qo‘shimcha ma’lumot..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm resize-none"
                />
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">To‘lov usuli</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  form.paymentMethod === 'cod' ? 'bg-accent/10 border-accent/40' : 'bg-ink-700 border-ink-600 hover:border-ink-500'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={(e) => handleChange('paymentMethod', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    form.paymentMethod === 'cod' ? 'border-accent' : 'border-ink-600'
                  }`}>
                    {form.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <Truck className="w-5 h-5 text-accent-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Yetkazib berilganda naqd / karta</p>
                    <p className="text-xs text-slatey-400">Mahsulotni olganda to‘lang</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  form.paymentMethod === 'online' ? 'bg-accent/10 border-accent/40' : 'bg-ink-700 border-ink-600 hover:border-ink-500'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={form.paymentMethod === 'online'}
                    onChange={(e) => handleChange('paymentMethod', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    form.paymentMethod === 'online' ? 'border-accent' : 'border-ink-600'
                  }`}>
                    {form.paymentMethod === 'online' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <CreditCard className="w-5 h-5 text-accent-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Karta orqali onlayn (Test rejim)</p>
                    <p className="text-xs text-slatey-400">Onlayn to‘lov tizimi orqali</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Buyurtma xulosasi</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item) => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-ink-700" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{product.name}</p>
                        <p className="text-xs text-slatey-400">× {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-white">{formatUZS(product.price * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-ink-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slatey-400">Mahsulotlar</span>
                  <span className="text-sm text-white">{formatUZS(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slatey-400">Yetkazib berish</span>
                  <span className="text-sm text-success">Bepul</span>
                </div>
              </div>

              <div className="pt-4 border-t border-ink-600 flex items-center justify-between">
                <span className="text-white font-medium">Jami</span>
                <span className="text-xl font-bold text-white">{formatUZS(cartTotal)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}