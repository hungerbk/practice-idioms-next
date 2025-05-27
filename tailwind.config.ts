import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#faf6f1',
          100: '#f5ede3',
          200: '#e8d9c5',
          300: '#d9c2a7',
          400: '#c7a989',
          500: '#b38f6b',
          600: '#a57d5a',
          700: '#8a6649',
          800: '#70523d',
          900: '#5b4332'
        }
      },
      keyframes: {
        wrong: {
          '0%, 100%': {
            transform: 'translateX(0)',
            backgroundColor: '#fecaca'
          },
          '25%': { transform: 'translateX(-4px)', backgroundColor: '#fecaca' },
          '75%': { transform: 'translateX(4px)', backgroundColor: '#fecaca' }
        },
        correct: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#86efac' }
        }
      },
      animation: {
        wrong: 'wrong 0.2s ease-in-out 0s 2',
        correct: 'correct 0.3s'
      }
    }
  },
  plugins: []
}

export default config
