import { Link } from 'react-router-dom';
import { Zap, Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink-800 border-t border-ink-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">NEXORA</span>
            </Link>
            <p className="text-sm text-slatey-400 leading-relaxed">
              O‘zbekistonning eng zamonaviy texnika va gadjetlar do‘koni. Mukammallik sari intiluvchilar uchun yaratilgan.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-ink-700 flex items-center justify-center text-slatey-400 hover:text-white hover:bg-accent transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-ink-700 flex items-center justify-center text-slatey-400 hover:text-white hover:bg-accent transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigatsiya</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Bosh sahifa</Link></li>
              <li><Link to="/products" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Mahsulotlar</Link></li>
              <li><Link to="/about" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Biz haqimizda</Link></li>
              <li><Link to="/contact" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Aloqa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Kategoriyalar</h4>
            <ul className="space-y-2.5">
              <li><Link to="/products?category=smartphones" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Smartfonlar</Link></li>
              <li><Link to="/products?category=laptops" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Noutbuklar</Link></li>
              <li><Link to="/products?category=audio" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Audio & Quloqchinlar</Link></li>
              <li><Link to="/products?category=watches" className="text-sm text-slatey-400 hover:text-accent-300 transition-colors">Aqlli soatlar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Aloqa</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slatey-400">
                <Phone className="w-4 h-4 text-accent-400" />
                <span>+998 (71) 200-30-40</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slatey-400">
                <Mail className="w-4 h-4 text-accent-400" />
                <span>info@nexora.uz</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slatey-400">
                <MapPin className="w-4 h-4 text-accent-400" />
                <span>Toshkent sh., Amir Temur ko‘chasi 108</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slatey-500">© 2025 NEXORA. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slatey-500">Tezkor yetkazib berish</span>
            <span className="text-xs text-slatey-500">100% Rasmiy kafolat</span>
            <span className="text-xs text-slatey-500">24/7 Qo‘llab-quvvatlash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
