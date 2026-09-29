/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'giay-do': 'var(--giay-do)',
        'giay-sang': 'var(--giay-sang)',
        'than': 'var(--than)',
        'son': 'var(--son)',
        'nghe': 'var(--nghe)',
        'cham': 'var(--cham)',
        'luc': 'var(--luc)',
        'sen': 'var(--sen)',
        'com': 'var(--com)',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        label: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
