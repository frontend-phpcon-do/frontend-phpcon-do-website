import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content_ja: defineCollection({
      type: 'page',
      source: 'ja/**',
    }),
    content_en: defineCollection({
      type: 'page',
      source: 'en/**',
    }),
  },
})
