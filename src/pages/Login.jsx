import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email va parolni kiriting');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("To'g'ri email manzilni kiriting");
      return;
    }
    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ink-900 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">NEXORA</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Hisobingizga kiring</h1>
          <p className="text-slatey-400 text-sm mt-1">Buyurtmalaringizni kuzatish uchun tizimga kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-ink-800 border border-ink-600 p-6 space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-slatey-400 mb-2">
              <Lock className="w-4 h-4" /> Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-ink-700 border border-ink-600 text-white placeholder-slatey-500 outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Kirish <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-slatey-500 text-center">
            Admin uchun: admin@nexora.uz / admin123
          </p>
        </form>

        <p className="text-center text-sm text-slatey-400 mt-6">
          Hisobingiz yo‘qmi? <span className="text-accent-300">Istalgan email bilan kirishingiz mumkin</span>
        </p>
      </div>
    </div>
  );
}
