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
        primary: '#1238b4',    // Azul principal
        secondary: '#fff5dc',  // Off-white/Creme
        cyan: '#68c7d1',       // Verde-água
        orange: '#ff6a32',     // Laranja
      },
      
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],  // Fonte principal 
        inter: ['Inter', 'sans-serif'],        // Fonte auxiliar
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