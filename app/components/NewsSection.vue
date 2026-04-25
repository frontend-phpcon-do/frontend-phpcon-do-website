<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();

const { data: posts } = await useAsyncData(
  `news-${locale.value}`,
  () => {
    const prefix = `/${locale.value}/news/`;
    if (locale.value === "en") {
      return queryCollection("content_en")
        .where("path", "LIKE", `${prefix}%`)
        .order("date", "DESC")
        .all();
    }
    return queryCollection("content_ja")
      .where("path", "LIKE", `${prefix}%`)
      .order("date", "DESC")
      .all();
  },
  { watch: [locale] },
);

const toRoute = (postPath: string): string => {
  const bare = postPath.replace(/^\/(ja|en)/, "") || "/";
  return localePath(bare);
};
</script>

<template>
  <SectionContainer id="news">
    <h2>{{ $t("news.heading") }}</h2>
    <ul v-if="posts && posts.length" class="news-section__list">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink :to="toRoute(post.path)">
          <time :datetime="post.date">{{ post.date }}</time>
          <span>{{ post.title }}</span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else>
      {{ $t("news.empty") }}
    </p>
  </SectionContainer>
</template>

<style scoped>
.news-section__list {
  width: 100%;
  max-width: 40em;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-section__list a {
  display: flex;
  align-items: baseline;
  gap: 16px;
  color: inherit;
  text-decoration: none;
}

.news-section__list time {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  color: #666;
}
</style>
