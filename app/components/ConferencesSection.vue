<script setup lang="ts">
import { frontendConferenceData, phpConferenceData } from "../../public/conferences/data";
import {
  formatConferenceDate,
  splitConferencesByDate,
  type Conference,
} from "../utils/conferences";

const { locale } = useI18n();

type Category = {
  key: string;
  labelKey: string;
  conferences: readonly Conference[];
};

const categories: Category[] = [
  { key: "frontend", labelKey: "conferences.frontend", conferences: frontendConferenceData },
  { key: "php", labelKey: "conferences.php", conferences: phpConferenceData },
];

const now = new Date();

const sections = computed(() =>
  categories
    .map((category) => {
      const { upcoming, past } = splitConferencesByDate(category.conferences, now);
      return {
        key: category.key,
        labelKey: category.labelKey,
        groups: [
          { key: "upcoming", labelKey: "conferences.upcoming", items: upcoming },
          { key: "past", labelKey: "conferences.past", items: past },
        ].filter((group) => group.items.length > 0),
      };
    })
    .filter((category) => category.groups.length > 0),
);

const displayName = (conference: Conference): string =>
  locale.value === "en" ? conference.nameEn : conference.name;

// Thumbnails live in public/conferences/<id>/thumbnail.<webp|png>; the extension
// varies per conference, so try webp first and fall back to png, then hide.
const thumbnailState = ref<Record<string, "png" | "hidden">>({});

const thumbnailSrc = (id: string): string =>
  `/conferences/${id}/thumbnail.${thumbnailState.value[id] === "png" ? "png" : "webp"}`;

const onThumbnailError = (id: string): void => {
  thumbnailState.value = {
    ...thumbnailState.value,
    [id]: thumbnailState.value[id] === "png" ? "hidden" : "png",
  };
};
</script>

<template>
  <SectionContainer id="conferences" index="07" label="Conferences">
    <h2>{{ $t("conferences.heading") }}</h2>
    <p>{{ $t("conferences.description") }}</p>

    <div class="conferences__categories">
      <section
        v-for="category in sections"
        :key="category.key"
        :data-category="category.key"
        class="conferences__category"
      >
        <h3 class="conferences__category-name">{{ $t(category.labelKey) }}</h3>

        <div v-for="group in category.groups" :key="group.key" class="conferences__group">
          <h4 class="conferences__group-name">{{ $t(group.labelKey) }}</h4>
          <ul class="conferences__grid">
            <li v-for="conference in group.items" :key="conference.id" class="conferences__item">
              <a :href="conference.url" target="_blank" rel="noopener" class="conferences__card">
                <span v-if="thumbnailState[conference.id] !== 'hidden'" class="conferences__thumb">
                  <img
                    :src="thumbnailSrc(conference.id)"
                    :alt="displayName(conference)"
                    loading="lazy"
                    width="320"
                    height="180"
                    @error="onThumbnailError(conference.id)"
                  />
                </span>
                <time class="conferences__date" :datetime="conference.data">
                  {{ formatConferenceDate(conference.data) }}
                </time>
                <h5 class="conferences__name">{{ displayName(conference) }}</h5>
                <span class="conferences__venue">{{ conference.venue }}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </SectionContainer>
</template>

<style scoped>
.conferences__categories {
  width: 100%;
  display: grid;
  gap: 48px;
  margin-top: 8px;
}

.conferences__category {
  display: grid;
  gap: 28px;
  /* Per-category accent; frontend overrides to blue below. */
  --conf-accent: var(--theme-pink);
}

.conferences__category[data-category="frontend"] {
  --conf-accent: var(--theme-blue);
}

.conferences__category-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  letter-spacing: 0.02em;
  color: var(--color-ink);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-hairline);
}

.conferences__group {
  display: grid;
  gap: 16px;
}

.conferences__group-name {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-mute);
}

.conferences__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
  /* Responsive: 1 column by default, scaling up to 4 on wide screens. */
  grid-template-columns: 1fr;
}

@media (min-width: 560px) {
  .conferences__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .conferences__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .conferences__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.conferences__item {
  display: flex;
}

.conferences__card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 20px;
  background: var(--color-paper);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.conferences__card:hover {
  transform: translateY(-2px);
  border-color: var(--color-line);
  box-shadow: 4px 4px 0 0 var(--color-line);
}

.conferences__thumb {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  border: 1px solid var(--color-hairline);
}

.conferences__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.conferences__date {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--conf-accent);
}

.conferences__name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.4;
  color: var(--color-ink);
}

/* Rendered as a span element to avoid the SectionContainer paragraph styling. */
.conferences__venue {
  display: block;
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.5;
  color: var(--color-mute);
}
</style>
