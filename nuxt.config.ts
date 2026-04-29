// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/a11y",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "motion-v/nuxt",
  ],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
    },
  },
  css: ["~/assets/css/globals.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-09-19",
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: false,
      nodeCompat: true,
    },
  },
  content: {
    database: {
      type: "d1",
      bindingName: "DB",
    },
  },
  i18n: {
    defaultLocale: "ja",
    locales: [
      { code: "ja", name: "日本語", file: "ja.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
  },
});
