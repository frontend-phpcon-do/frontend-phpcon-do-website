<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s.join('/') : (s ?? '')
})

const contentPath = computed(() => {
  const base = `/${locale.value}`
  return slug.value ? `${base}/${slug.value}` : base
})

const { data: page } = await useAsyncData(
  `page-${locale.value}-${contentPath.value}`,
  () =>
    locale.value === 'en'
      ? queryCollection('content_en').path(contentPath.value).first()
      : queryCollection('content_ja').path(contentPath.value).first(),
  { watch: [contentPath] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
