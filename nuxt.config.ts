// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  css: [
    '@vue-flow/core/dist/style.css',
    '@vue-flow/minimap/dist/style.css',
    '@vue-flow/controls/dist/style.css',
    'overlayscrollbars/overlayscrollbars.css',
    '~/assets/css/scrollbar.css',
    '~/assets/css/vueflow.css',
    '~/assets/css/base.css',
  ],
  alias: {
    '@components': '../components',
    '@dummy': '../dummy',
    '@stores': '../stores',
    '@utilities': '../utilities',
    '@composables': '../composables',
    '@symbols': '../symbols',
    '@records': '../records',
    '@lang': '../lang',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@vue-macros/nuxt',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'DM Mono': [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
});
