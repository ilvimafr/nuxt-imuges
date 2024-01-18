export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
  ],
  googleFonts: {
    families: {
      'Lexend+Deca': {
        wght: [300, 600]
      }
    }
  },
  ui: {
    icons: ['heroicons', 'fontisto'],
  },
  css: ['~/assets/scss/main.scss'],
  supabase: {
    redirect: false,
  },
})
