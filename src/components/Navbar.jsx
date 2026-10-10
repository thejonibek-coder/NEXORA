import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Search, Heart, ShoppingCart, User, Shield, Zap,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/products', label: 'Mahsulotlar' },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/contact', label: 'Aloqa' },
];

export default function Navbar() {
  const { cartCount, wishlist, cartOpen, setCartOpen, user, logout } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-shadow">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slatey-400 bg-clip-text text-transparent">
                  NEXORA
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition-colors relative group ${
                      location.pathname === link.to
                        ? 'text-white'
                        : 'text-slatey-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent-gradient transition-all duration-300 ${
                      location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                aria-label="Qidiruv"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="relative w-10 h-10 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                aria-label="Sevimlilar"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative w-10 h-10 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                aria-label="Savat"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent-gradient text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                  aria-label="Profil"
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-ink-800 border border-ink-600 shadow-2xl overflow-hidden animate-scale-in origin-top-right">
                    {user ? (
                      <>
                        <div className="p-4 border-b border-ink-600">
                          <p className="text-sm font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-slatey-400">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { navigate('/admin'); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slatey-400 hover:text-white hover:bg-ink-700 transition-colors"
                        >
                          <Shield className="w-4 h-4" /> Admin panel
                        </button>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors"
                        >
                          <X className="w-4 h-4" /> Tizimdan chiqish
                        </button>
                      </>
                    ) : (
                      <div className="p-2">
                        <Link
                          to="/login"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm text-white hover:bg-ink-700 transition-colors"
                        >
                          <User className="w-4 h-4" /> Kirish
                        </Link>
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm text-slatey-400 hover:text-white hover:bg-ink-700 transition-colors"
                        >
                          <Shield className="w-4 h-4" /> Admin panel
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slatey-400 hover:text-white hover:bg-ink-700 transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden glass border-t border-ink-600 animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-accent/10 text-accent-300'
                      : 'text-slatey-400 hover:text-white hover:bg-ink-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
