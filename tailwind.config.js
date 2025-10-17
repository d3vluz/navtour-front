/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1238b4',
          light: '#1e4fd9',
          dark: '#0d2a85',
        },
        secondary: {
          DEFAULT: '#fff5dc',
          light: '#fffef5',
          dark: '#f5e8c3',
        },
        accent: {
          cyan: '#68c7d1',
          orange: '#ff6a32',
        },
        // Cores para Dark Mode
        dark: {
          bg: '#0f1419',
          surface: '#1a2332',
          card: '#243447',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          card: '#ffffff',
        }
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'tiny': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'input': '10px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(18, 56, 180, 0.08)',
        'card-hover': '0 4px 16px rgba(18, 56, 180, 0.12)',
      },
    },
  },
  plugins: [],
}