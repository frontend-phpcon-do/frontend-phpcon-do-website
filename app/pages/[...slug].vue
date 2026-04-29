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
  <article v-if="page" class="article">
    <header class="article__header">
      <p class="article__eyebrow">// ARTICLE</p>
      <h1 class="article__title">{{ page.title }}</h1>
      <p v-if="page.date || page.author" class="article__meta">
        <time v-if="page.date" :datetime="page.date" class="article__date">{{ page.date }}</time>
        <span v-if="page.date && page.author" class="article__sep" aria-hidden="true">/</span>
        <span v-if="page.author" class="article__author">{{ page.author }}</span>
      </p>
    </header>
    <div class="article__body">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>

<style scoped>
.article {
  max-width: 720px;
  margin-inline: auto;
  padding: clamp(48px, 6vw, 96px) var(--section-padding-x);
}

.article__header {
  margin-bottom: 40px;
  display: grid;
  gap: 14px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-hairline);
}

.article__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-pink);
  margin: 0;
}

.article__title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0;
}

.article__meta {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--color-mute);
}

.article__date {
  font-variant-numeric: tabular-nums;
}

.article__sep {
  color: var(--theme-blue);
}

.article__author {
  color: var(--color-ink);
  font-weight: 600;
}

.article__author::before {
  content: "by ";
  color: var(--color-mute);
  font-weight: 400;
}

.article__body {
  font-size: 1.02rem;
  line-height: 1.8;
}

.article__body :deep(h2) {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 2.5em 0 0.6em;
  padding-top: 0.4em;
  border-top: 1px dashed var(--color-hairline);
}

.article__body :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 2em 0 0.4em;
}

.article__body :deep(p) {
  margin: 0 0 1.2em;
  max-width: var(--paragraph-max-width);
}

.article__body :deep(a) {
  color: var(--theme-blue);
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: color 0.2s ease;
}

.article__body :deep(a:hover) {
  color: var(--theme-pink);
}

.article__body :deep(ul),
.article__body :deep(ol) {
  margin: 0 0 1.2em;
  padding-left: 1.4em;
}

.article__body :deep(li) {
  margin-bottom: 0.4em;
}

.article__body :deep(li::marker) {
  color: var(--theme-pink);
}

.article__body :deep(blockquote) {
  margin: 1.6em 0;
  padding: 16px 20px;
  border-left: 3px solid var(--theme-pink);
  background: var(--color-soft);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-style: italic;
  color: var(--color-ink);
}

.article__body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.92em;
  padding: 0.1em 0.4em;
  background: var(--color-soft);
  border-radius: 4px;
}

.article__body :deep(pre) {
  margin: 1.4em 0;
  padding: 18px 20px;
  background: var(--color-ink);
  color: var(--color-paper);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.6;
}

.article__body :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.article__body :deep(hr) {
  margin: 2.4em 0;
  border: none;
  border-top: 1px dashed var(--color-hairline);
}

.article__body :deep(img) {
  margin: 1.6em auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-hairline);
}
</style>
