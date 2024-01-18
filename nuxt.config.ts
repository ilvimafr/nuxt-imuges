function getURL() {
  if (process.env.NUXT_ENV_VERCEL_URL) {
    return process.env.NUXT_ENV_VERCEL_URL;
  }
  return 'http://localhost:3000';
}

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${getURL()}/api/graphql`
      }
    },
  },
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
  runtimeConfig: {
    public: {
      url: getURL()
    }
  },
})
