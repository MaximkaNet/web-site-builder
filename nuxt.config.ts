// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,

  app: {
    head: {
      title: 'Website Builder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/_colors.scss" as *;
          @use "~/assets/scss/_reset.scss" as *;
          `
        }
      }
    }
  },
  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: "./public/uploads"
      }
    }
  },

  modules: ['@pinia/nuxt', '@vite-pwa/nuxt'],
})