import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Truck, ShieldCheck, Headphones, ArrowRight, Star,
  Smartphone, Laptop, Headphones as HeadsetIcon, Watch,
  Tablet, Gamepad2, Camera, Keyboard, LayoutGrid, Send, CheckCircle2,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { CATEGORIES, REVIEWS } from '@/data/products';
import { formatUZS, discountPercent } from '@/utils/format';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton, CategorySkeleton } from '@/components/Skeleton';

const CATEGORY_ICONS = {
  LayoutGrid, Smartphone, Laptop, Headphones, Watch, Tablet, Gamepad2, Camera, Keyboard,
};

const TRUST_BADGES = [
  { icon: Truck, title: 'Tezkor yetkazib berish', desc: '24 soat ichida' },
  { icon: ShieldCheck, title: '100% Rasmiy kafolat', desc: 'Barcha mahsulotlar' },
  { icon: Headphones, title: '24/7 Qo‘llab-quvvatlash', desc: 'Har doim yoningizda' },
];

export default function Home() {
  const { products, addToCart } = useStore();
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const bestSellers = useMemo(() => products.filter((p) => p.bestseller).slice(0, 4), [products]);
  const specialOffers = useMemo(
    () => products.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 4),
    [products]
  );

  const handleNewsletter = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterError("To'g'ri email manzilni kiriting");
      return;
    }
    setNewsletterError('');
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/50 to-ink-900" />

        {/* Floating tech image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] hidden lg:block">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/11621727/pexels-photo-11621727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Premium tech"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/30 to-transparent" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gradient-soft border border-accent/20 animate-slide-up">
              <Zap className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-accent-200 font-medium">Yangi texnologiya kolleksiyasi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Mukammallik sari<br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">intiluvchilar uchun</span>
            </h1>

            <p className="text-lg text-slatey-400 leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Dunyoning eng yaxshi texnologiya brendlaridan tanlangan mahsulotlar. Premium sifat, rasmiy kafolat va tezkor yetkazib berish — bir joyda.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
              >
                Mahsulotlarni ko‘rish
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ink-800 text-white font-semibold border border-ink-600 hover:border-accent/40 transition-all duration-300"
              >
                Biz haqimizda
              </Link>
            </div>
          </div>
        </div>

        {/* Trust badges bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-ink-600 bg-ink-800/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-10 h-10 rounded-lg bg-accent-gradient-soft flex items-center justify-center">
                    <badge.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{badge.title}</p>
                    <p className="text-xs text-slatey-400">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Kategoriyalar</h2>
            <p className="text-slatey-400 mt-1">Kerakli mahsulotni tezda toping</p>
          </div>
          <Link to="/products" className="text-sm text-accent-300 hover:text-accent-200 font-medium flex items-center gap-1 transition-colors">
            Barchasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
            : CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const Icon = CATEGORY_ICONS[cat.icon] || LayoutGrid;
                return (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className="group flex-shrink-0 w-44 rounded-2xl bg-ink-800 border border-ink-600 p-5 hover:border-accent/40 hover:bg-ink-700 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square rounded-xl bg-accent-gradient-soft flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-white text-center">{cat.label}</p>
                  </Link>
                );
              })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 rounded-full bg-accent-gradient" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Ommabop mahsulotlar</h2>
            </div>
            <p className="text-slatey-400">Mijozlarimiz eng ko‘p tanlagan mahsulotlar</p>
          </div>
          <Link to="/products" className="text-sm text-accent-300 hover:text-accent-200 font-medium flex items-center gap-1 transition-colors">
            Hammasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 rounded-full bg-error" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Maxsus takliflar</h2>
            </div>
            <p className="text-slatey-400">Cheklangan vaqt oralig‘ida chegirma narxlarda</p>
          </div>
          <Link to="/products" className="text-sm text-accent-300 hover:text-accent-200 font-medium flex items-center gap-1 transition-colors">
            Hammasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : specialOffers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1 h-6 rounded-full bg-accent-gradient" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Mijozlarimiz fikrlari</h2>
            <div className="w-1 h-6 rounded-full bg-accent-gradient" />
          </div>
          <p className="text-slatey-400">Minglab mamnun mijozlarimiz ishonchi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div key={review.id} className="rounded-2xl bg-ink-800 border border-ink-600 p-6 hover:border-accent/30 transition-all duration-300">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-warning fill-current' : 'text-ink-600'}`} />
                ))}
              </div>
              <p className="text-sm text-slatey-400 leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-ink-600">
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-slatey-500">{review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-ink-800 border border-ink-600 overflow-hidden p-8 sm:p-12">
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gradient-soft border border-accent/20 mb-4">
              <Send className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-accent-200 font-medium">Yangiliklar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Yangi mahsulotlar va aksiyalardan xabardor bo‘ling</h2>
            <p className="text-slatey-400 mb-6">Email manzilingizni qoldiring va eng so‘nggi takliflardan birinchilardan bo‘lib foydalaning</p>

            {newsletterSent ? (
              <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-success/10 border border-success/30 text-success animate-scale-in">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Rahmat! Siz muvaffaqiyatli obuna bo‘ldingiz.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email manzilingiz"
                    className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
                  />
                  {newsletterError && <p className="text-xs text-error mt-1 text-left">{newsletterError}</p>}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Obuna bo‘lish
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
