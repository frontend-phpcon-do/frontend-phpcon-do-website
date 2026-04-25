import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const pageSchema = z.object({
  date: z.string().optional(),
});

export default defineContentConfig({
  collections: {
    content_ja: defineCollection({
      type: "page",
      source: "ja/**",
      schema: pageSchema,
    }),
    content_en: defineCollection({
      type: "page",
      source: "en/**",
      schema: pageSchema,
    }),
  },
});
