// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/main.scss'],
  modules: ['@nuxtjs/tailwindcss'],
  build: {
    transpile: ['applicationinsights']
  }
})
