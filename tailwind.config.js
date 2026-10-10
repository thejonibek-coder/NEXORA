/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0A0D14',
          800: '#111622',
          700: '#1A2030',
          600: '#1E2638',
          500: '#252D44',
        },
        accent: {
          DEFAULT: '#0066FF',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        slatey: {
          400: '#8A94A6',
          500: '#6B7588',
          600: '#555F70',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 0 rgba(0, 102, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px 8px rgba(0, 102, 255, 0.5)' },
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #0066FF 0%, #3385FF 100%)',
        'accent-gradient-soft': 'linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(51,133,255,0.05) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0D14 0%, #111622 100%)',
        'mesh': 'radial-gradient(circle at 20% 50%, rgba(0,102,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(51,133,255,0.06) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-accent/10', 'bg-success/10', 'bg-warning/10', 'bg-error/10',
    'bg-accent/15', 'bg-success/15', 'bg-warning/15', 'bg-error/15',
    'text-accent', 'text-success', 'text-warning', 'text-error',
    'border-accent/30', 'border-success/30', 'border-warning/30', 'border-error/30',
    'bg-warning/5', 'border-warning/20',
  ],
};
