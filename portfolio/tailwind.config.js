/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"VT323"', '"Courier New"', 'monospace'],
      },
      colors: {
        // Dark theme + Electric Lime accent
        night: '#120f17',
        panel: '#17141f',
        edge: '#2a2633',
        mist: '#9b98a6',
        chalk: '#ece9f2',
        lime: {
          DEFAULT: '#DBFF00',
          dim: '#aecb00',
        },
        // legacy retro tokens (kept so nothing breaks mid-refactor)
        paper: '#ecead8',
        olive: { DEFAULT: '#7c7f4e', dark: '#656841' },
        cream: '#f3f1e2',
        ink: '#2b2b25',
        accent: '#DBFF00',
      },
      boxShadow: {
        win: '0 8px 30px -8px rgba(0,0,0,0.6)',
        'win-lg': '0 20px 60px -20px rgba(0,0,0,0.75)',
        icon: '0 4px 14px -4px rgba(0,0,0,0.6)',
        'lime-glow': '0 0 24px -4px rgba(219,255,0,0.45)',
      },
      keyframes: {
        'win-open': {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
      },
      animation: {
        'win-open': 'win-open .5s cubic-bezier(.16,1,.3,1) both',
        'fade-up': 'fade-up .6s cubic-bezier(.16,1,.3,1) both',
        float: 'float 4s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
