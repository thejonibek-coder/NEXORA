import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { formatPhone } from '@/utils/format';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3) errs.name = 'Ismni kiriting';
    if (form.phone.replace(/\D/g, '').length < 12) errs.phone = 'Telefon raqamni to‘g‘ri kiriting';
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Xabarni kiriting (kamida 10 ta belgi)';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const CONTACT_INFO = [
    { icon: Phone, label: 'Telefon', value: '+998 (71) 200-30-40', sub: 'Ish kunlari 9:00 - 20:00' },
    { icon: Mail, label: 'Email', value: 'info@nexora.uz', sub: '24 soat ichida javob beramiz' },
    { icon: MapPin, label: 'Manzil', value: 'Toshkent sh., Amir Temur ko‘chasi 108', sub: 'NEXORA flagman do‘koni' },
    { icon: Clock, label: 'Ish vaqti', value: 'Dushanba - Yakshanba: 9:00 - 22:00', sub: 'Onlayn buyurtmalar 24/7' },
  ];

  return (
    <div className="min-h-screen bg-ink-900 animate-fade-in">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gradient-soft border border-accent/20 mb-6">
            <MessageSquare className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-accent-200 font-medium">Aloqa</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Biz bilan bog‘laning</h1>
          <p className="text-lg text-slatey-400 max-w-2xl mx-auto">
            Savollaringiz bormi? Bizga yozing — tez orada javob beramiz. 24/7 qo‘llab-quvvatlash xizmati sizga yordam berishga tayyor.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-ink-800 border border-ink-600 hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent-gradient-soft flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <p className="text-sm text-slatey-400">{info.label}</p>
                  <p className="text-base font-semibold text-white mt-1">{info.value}</p>
                  <p className="text-xs text-slatey-500 mt-1">{info.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="rounded-2xl bg-ink-800 border border-ink-600 p-6">
            <h2 className="text-lg font-bold text-white mb-5">Xabar yuborish</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <p className="text-lg font-semibold text-white">Xabaringiz yuborildi!</p>
                <p className="text-sm text-slatey-400 mt-1">Tez orada siz bilan bog‘lanamiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-slatey-400 mb-2 block">Ismingiz</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="To‘liq ismingiz"
                    className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm ${
                      errors.name ? 'border-error/50' : 'border-ink-600 focus:border-accent'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm text-slatey-400 mb-2 block">Telefon raqam</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                    placeholder="+998 (XX) XXX-XX-XX"
                    className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm ${
                      errors.phone ? 'border-error/50' : 'border-ink-600 focus:border-accent'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm text-slatey-400 mb-2 block">Xabar</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Savolingizni yozing..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-ink-700 border text-white placeholder-slatey-500 outline-none transition-colors text-sm resize-none ${
                      errors.message ? 'border-error/50' : 'border-ink-600 focus:border-accent'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Xabar yuborish
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
