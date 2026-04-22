// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/storybook',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  i18n: {
    defaultLocale: 'ja',
    locales: [
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  storybook: {
    url: 'http://localhost:6006',
    storybookRoute: '/.storybook',
    port: 6006,
  },
})
