/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        myota: {
          terra:      '#C4674A',
          'terra-mid':'#B05840',
          'terra-light':'#E0957C',
          'terra-pale':'#F5DDD7',
          'terra-wash':'#FBF0EC',
          'sand-pale': '#F8F2EA',
          cream:       '#FAF6F0',
          'cream-dark':'#F0E8DA',
          ink:         '#1E1610',
          'ink-mid':   '#5C4E3D',
          'ink-light': '#9C8C7A',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '22px',
        '4xl': '28px',
        '5xl': '32px',
      },
      boxShadow: {
        'terra-sm': '0 3px 14px rgba(196,103,74,0.35)',
        'terra-md': '0 5px 24px rgba(196,103,74,0.38)',
        'terra-lg': '0 8px 32px rgba(196,103,74,0.42)',
        'card':     '0 24px 80px rgba(30,22,16,0.08)',
        'modal':    '0 20px 60px rgba(30,22,16,0.07)',
      },
      animation: {
        'fade-up':  'fadeUp 0.8s ease both',
        'fade-up-delayed': 'fadeUp 0.8s 0.3s ease both',
        'slide-in': 'slideIn 0.35s ease both',
        'prog':     'prog 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        prog: {
          from: { width: '20%' },
          to:   { width: '55%' },
        },
      },
    },
  },
  safelist: [
  'bg-[#E1F5EE]', 'text-[#085041]',
  'bg-[#9FE1CB]', 'text-[#04342C]',
  'bg-[#EEEDFE]', 'text-[#3C3489]',
  'bg-[#FAEEDA]', 'text-[#633806]',
  'bg-[#FAECE7]', 'text-[#712B13]',
  'bg-[#E6F1FB]', 'text-[#0C447C]',
  'bg-[#F1EFE8]', 'text-[#5F5E5A]',
  'bg-[#F8F2EA]', 'bg-[#FBF0EC]',
  'bg-[#FAF6F0]', 'bg-[#e8ddd6]',
  'border-[#e8ddd6]', 'border-[#C4674A]',
  'text-[#888780]', 'text-[#4a3728]',
  'text-[#1E1610]', 'text-[#b4a89e]',
  'text-[#C4674A]', 'bg-[#b05a3e]',
],
  plugins: [],
}