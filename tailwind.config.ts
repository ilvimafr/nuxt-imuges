import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme'; 

export default <Partial<Config>> {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    fontFamily: {
      'sans': ['"Lexend Deca"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

