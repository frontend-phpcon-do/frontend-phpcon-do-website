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
  <SectionContainer id="news" index="02" label="News">
    <h2>{{ $t("news.heading") }}</h2>

    <ul v-if="posts && posts.length" class="news__list">
      <li v-for="(post, i) in posts" :key="post.path" class="news__item">
        <NuxtLink :to="toRoute(post.path)" class="news__link">
          <div class="news__date-col">
            <time :datetime="post.date" class="news__date">{{ post.date }}</time>
            <span v-if="i === 0" class="news__badge">NEW</span>
          </div>
          <div class="news__title-col">
            <span class="news__title">{{ post.title }}</span>
            <span class="news__arrow" aria-hidden="true">→</span>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <div v-else class="news__empty">
      <span class="news__empty-icon" aria-hidden="true">∅</span>
      <p>{{ $t("news.empty") }}</p>
    </div>
  </SectionContainer>
</template>

<style scoped>
.news__list {
  width: 100%;
  max-width: 760px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-line);
}

.news__item {
  border-bottom: 1px solid var(--color-hairline);
}

.news__item:last-child {
  border-bottom: 1px solid var(--color-line);
}

.news__link {
  display: grid;
  grid-template-columns: minmax(140px, 180px) 1fr;
  align-items: center;
  gap: 24px;
  padding: 22px 4px;
  color: inherit;
  text-decoration: none;
  position: relative;
  transition: background-color 0.2s ease;
}

.news__link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--theme-pink);
  transition: width 0.25s ease;
}

.news__link:hover {
  background: var(--color-soft);
}

.news__link:hover::before {
  width: 4px;
}

.news__date-col {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-left: 16px;
}

.news__date {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--color-mute);
}

.news__badge {
  display: inline-block;
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  background: var(--theme-pink);
  color: #fff;
  border-radius: var(--radius-pill);
}

.news__title-col {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 16px;
}

.news__title {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--color-ink);
  flex: 1;
}

.news__arrow {
  color: var(--theme-blue);
  font-size: 1.1rem;
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.news__link:hover .news__arrow {
  transform: translateX(4px);
}

.news__empty {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 24px 28px;
  border: 1px dashed var(--color-hairline);
  border-radius: var(--radius-md);
  color: var(--color-mute);
}

.news__empty-icon {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  color: var(--theme-blue);
}

.news__empty p {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
}

@media (max-width: 640px) {
  .news__link {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 18px 16px;
  }
  .news__date-col {
    padding-left: 0;
  }
  .news__title-col {
    padding-right: 0;
  }
}
</style>
