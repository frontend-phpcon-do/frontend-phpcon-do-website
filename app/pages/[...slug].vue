<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => {
  const s = route.params.slug;
  return Array.isArray(s) ? s.join("/") : (s ?? "");
});

const contentPath = computed(() => {
  const base = `/${locale.value}`;
  return slug.value ? `${base}/${slug.value}` : base;
});

const { data: page } = await useAsyncData(
  `page-${locale.value}-${contentPath.value}`,
  () =>
    locale.value === "en"
      ? queryCollection("content_en").path(contentPath.value).first()
      : queryCollection("content_ja").path(contentPath.value).first(),
  { watch: [contentPath] },
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}
</script>

<template>
  <article v-if="page" class="content-article">
    <header class="content-article__header">
      <h1 class="content-article__title">{{ page.title }}</h1>
      <time v-if="page.date" class="content-article__date" :datetime="page.date">
        {{ page.date }}
      </time>
    </header>
    <ContentRenderer :value="page" />
  </article>
</template>

<style scoped>
.content-article {
  max-width: var(--paragraph-max-width);
  margin-inline: auto;
}

.content-article__header {
  margin-bottom: 32px;
}

.content-article__title {
  margin: 0;
}

.content-article__date {
  display: block;
  margin-top: 8px;
  color: #666;
  font-size: 0.875rem;
}
</style>
