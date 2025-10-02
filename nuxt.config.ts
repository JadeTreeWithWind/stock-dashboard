import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant",
      },
    },
  },
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
  },
});