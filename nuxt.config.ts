// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  css: [
    '@vue-flow/core/dist/style.css',
    '@vue-flow/core/dist/theme-default.css',
    '@vue-flow/minimap/dist/style.css',
    '@vue-flow/controls/dist/style.css',
    'overlayscrollbars/overlayscrollbars.css',
    '~/assets/css/scrollbar.css',
  ],
  alias: {
    '@components': '../components',
    '@dummy': '../dummy',
    '@stores': '../stores',
    '@utilities': '../utilities',
    '@composables': '../composables',
    '@symbols': '../symbols',
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
      Inter: true,
      'DM Mono': true,
    },
  },
});
