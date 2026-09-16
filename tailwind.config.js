/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#171516',
        soft: '#f6f6f4',
        muted: '#ecebe8',
        cyan: '#00aeef',
        magenta: '#ec008c',
        yellow: '#fff200'
      },
        fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        elev1: '0 4px 16px rgba(23, 21, 22, 0.06)',
        elev2: '0 12px 40px rgba(23, 21, 22, 0.08)',
        elev3: '0 24px 60px rgba(23, 21, 22, 0.12)'
      },
      borderRadius: {
        card: '16px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
