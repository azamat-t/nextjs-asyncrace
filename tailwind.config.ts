import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-left': {
          '0%': {
            visibility: 'visible',
            transform: 'translate3d(0, 0, 0)', // Start outside the view
          },
          '100%': {
            transform: 'translate3d(100%, 0, 0)', // End inside the view
          },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left ease-in-out 0.25s 1 forwards', // Add 'forwards' to retain end state
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
