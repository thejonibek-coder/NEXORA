import { Link } from 'react-router-dom';
import { Zap, Target, Award, Users, TrendingUp, ArrowRight, Truck, ShieldCheck, Headphones } from 'lucide-react';

const VALUES = [
  { icon: Target, title: 'Vazifamiz', desc: 'O‘zbekistonda premium texnologiyalarni har bir kishi uchun mavjud qilish va onlayn xarid tajribasini yangi bosqichga olib chiqish.' },
  { icon: Award, title: 'Sifat kafolati', desc: 'Har bir mahsulot rasmiy distribyutorlardan olinadi va kafolat bilan taqdim etiladi. Biz hech qachon soxta mahsulot sotmaymiz.' },
  { icon: Users, title: 'Mijoz markazliligi', desc: 'Har bir mijoz biz uchun muhim. 24/7 qo‘llab-quvvatlash jamoamiz har doim sizga yordam berishga tayyor.' },
  { icon: TrendingUp, title: 'Doimiy rivojlanish', desc: 'Texnologiya dunyosi tez o‘zgaradi va biz bilan birga. Eng so‘nggi innovatsiyalarni birinchilardan bo‘lib taqdim etamiz.' },
];

const STATS = [
  { value: '10K+', label: 'Mamnun mijozlar' },
  { value: '500+', label: 'Mahsulot turlari' },
  { value: '24 soat', label: 'Yetkazib berish' },
  { value: '4.9/5', label: 'Mijoz baholashi' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gradient-soft border border-accent/20 mb-6">
            <Zap className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-accent-200 font-medium">NEXORA haqida</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Texnologiya bilan <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">kelajakka</span> qadam qo‘ying
          </h1>
          <p className="text-lg text-slatey-400 leading-relaxed max-w-2xl mx-auto">
            NEXORA — O‘zbekistonning eng zamonaviy texnika va gadjetlar do‘koni. 2023-yildan beri minglab mijozlarimizga eng yaxshi mahsulotlarni yetkazib berib kelamiz.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="rounded-2xl bg-ink-800 border border-ink-600 p-6 text-center hover:border-accent/30 transition-colors">
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-sm text-slatey-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Bizning qadriyatlarimiz</h2>
          <p className="text-slatey-400">Nima uchun NEXORA ga ishonishadi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map((v, i) => (
            <div key={i} className="rounded-2xl bg-ink-800 border border-ink-600 p-6 hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent-gradient-soft flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-slatey-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: 'Tezkor yetkazib berish', desc: '24 soat ichida Toshkent bo‘ylab' },
            { icon: ShieldCheck, title: '100% Rasmiy kafolat', desc: 'Barcha mahsulotlar rasmiy' },
            { icon: Headphones, title: '24/7 Qo‘llab-quvvatlash', desc: 'Har doim yoningizdamiz' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-ink-800 border border-ink-600">
              <div className="w-12 h-12 rounded-xl bg-accent-gradient-soft flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{badge.title}</p>
                <p className="text-xs text-slatey-400 mt-1">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl bg-ink-800 border border-ink-600 overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Bizning mahsulotlarimizni o‘rganing</h2>
            <p className="text-slatey-400 mb-6 max-w-xl mx-auto">Dunyoning eng yaxshi texnologiya brendlaridan tanlangan mahsulotlar bilan tanishing</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity">
              Mahsulotlarga o‘tish <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
