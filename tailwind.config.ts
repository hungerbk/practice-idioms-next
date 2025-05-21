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
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' }
        }
      },
      animation: {
        shake: 'shake 0.2s ease-in-out 0s 2'
      }
    }
  },
  plugins: []
}

export default config
