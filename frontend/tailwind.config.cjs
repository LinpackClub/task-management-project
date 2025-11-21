/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#4299E1',
        'background-light': '#FFFFFF',
        'background-dark': '#101922',
        'surface-light': '#F7F8FA',
        'surface-dark': '#1A202C',
        'text-primary-light': '#4A5568',
        'text-primary-dark': '#E2E8F0',
        'text-secondary-light': '#718096',
        'text-secondary-dark': '#A0AEC0',
        'border-light': '#E2E8F0',
        'border-dark': '#2D3748',
        'priority-high': '#EF4444',
        'priority-medium': '#F59E0B',
        'priority-low': '#3B82F6',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px'
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
