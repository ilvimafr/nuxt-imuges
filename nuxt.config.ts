import graphql from '@rollup/plugin-graphql';

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
  nitro: {
    rollupConfig: {
      plugins: [graphql()]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-graphql-client',
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
  runtimeConfig: {
    public: {
      url: getURL(),
      'graphql-client': {
        clients: {
          default: {
            host: `${getURL()}/api/graphql`,
            clientHost: '/api/graphql',
            schema: './server/graphql/schema.graphql'
          }
        },
      },
    }
  },
})
