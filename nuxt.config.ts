// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
  css: [
    '@vue-flow/core/dist/style.css',
    '@vue-flow/core/dist/theme-default.css',
  ],
  alias: {
    '@components': '../components',
    '@dummy': '../dummy',
    '@stores': '../stores',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@vue-macros/nuxt',
  ],
  eslint: {
    lintOnStart: false,
  },
});
