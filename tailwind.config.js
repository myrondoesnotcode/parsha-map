/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        'surface': '#fcf9f0',
        'surface-bright': '#fcf9f0',
        'surface-dim': '#dddad1',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3ea',
        'surface-container': '#f1eee5',
        'surface-container-high': '#ebe8df',
        'surface-container-highest': '#e5e2da',
        'surface-variant': '#e5e2da',
        'surface-tint': '#934b19',
        // On-surface
        'on-surface': '#1c1c17',
        'on-surface-variant': '#54433a',
        'on-background': '#1c1c17',
        'background': '#fcf9f0',
        'inverse-surface': '#31312b',
        'inverse-on-surface': '#f4f1e8',
        // Primary (Burnt Sienna)
        'primary': '#6c2f00',
        'primary-container': '#8b4513',
        'primary-fixed': '#ffdbc9',
        'primary-fixed-dim': '#ffb68c',
        'on-primary': '#ffffff',
        'on-primary-container': '#ffc29f',
        'on-primary-fixed': '#321200',
        'on-primary-fixed-variant': '#753401',
        'inverse-primary': '#ffb68c',
        // Secondary (Olive Green)
        'secondary': '#50652a',
        'secondary-container': '#cfe99f',
        'secondary-fixed': '#d2eca2',
        'secondary-fixed-dim': '#b6d088',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#546a2e',
        'on-secondary-fixed': '#131f00',
        'on-secondary-fixed-variant': '#394d14',
        // Tertiary (Slate Blue — scholarly asides, links)
        'tertiary': '#00446c',
        'tertiary-container': '#155c8c',
        'tertiary-fixed': '#cee5ff',
        'tertiary-fixed-dim': '#96ccff',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#a7d3ff',
        'on-tertiary-fixed': '#001d32',
        'on-tertiary-fixed-variant': '#004a75',
        // Outlines
        'outline': '#877369',
        'outline-variant': '#dac2b6',
        // Error
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        'headline': ['"Noto Serif"', 'serif'],
        'body': ['"Newsreader"', 'serif'],
        'label': ['Inter', 'sans-serif'],
        'hebrew': ['"Frank Ruhl Libre"', 'David', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        '2xl': '0.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'ambient': '0 8px 24px rgba(28, 28, 23, 0.06)',
        'ambient-md': '0 4px 16px rgba(28, 28, 23, 0.08)',
      },
    },
  },
  plugins: [],
}
