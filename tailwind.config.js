/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Original handwritten fonts (commented)
        /* 
        hand: ['var(--font-indie-flower)', 'cursive'],
        script: ['var(--font-caveat)', 'cursive'],
        */
        // New custom handwritten font
        hand: ['var(--font-custom-hand)', 'cursive'],
        script: ['var(--font-custom-hand)', 'cursive'],
      },
      colors: {
        // Paper colors
        paper: {
          light: '#f9f7f1',
          DEFAULT: '#f5f3e7',
          dark: '#e8e6d9',
        },
        // Ink colors
        ink: {
          light: '#555555',
          DEFAULT: '#333333',
          dark: '#111111',
        },
        // Pencil colors
        pencil: {
          light: '#b6b6b6',
          DEFAULT: '#949494', 
          dark: '#707070',
        },
      },
      backgroundImage: {
        'paper-texture': "url('/images/paper-texture.png')",
        'notebook-line': "repeating-linear-gradient(transparent, transparent 31px, #E5E7EB 31px, #E5E7EB 32px)",
      },
      boxShadow: {
        'sketchbook': '0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'polaroid': '0 1px 2px rgba(0, 0, 0, 0.2), 0 12px 24px -8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'drawing': 'drawing 2s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scribble': 'scribble 3s ease-in-out infinite',
      },
      keyframes: {
        drawing: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scribble: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}

