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
        paper: '#ecead8',
        grid: '#d9d6c0',
        olive: {
          DEFAULT: '#7c7f4e',
          dark: '#656841',
        },
        cream: '#f3f1e2',
        ink: '#2b2b25',
        accent: '#e8862b',
        folder: '#e8c25a',
        win: '#cfae3f',
      },
      boxShadow: {
        win: '4px 4px 0 0 rgba(43,43,37,0.9)',
        'win-lg': '8px 8px 0 0 rgba(43,43,37,0.85)',
        icon: '3px 3px 0 0 rgba(43,43,37,0.8)',
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
