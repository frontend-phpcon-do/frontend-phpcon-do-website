<script setup lang="ts">
import type { SponsorItem } from "../data/manual-sponsors";

const props = defineProps<{
  sponsor: SponsorItem;
}>();

const hasLogoError = ref(false);
const logoSrc = computed(() => `/sponsors/${props.sponsor.id}/logo.png`);
</script>

<template>
  <component
    :is="sponsor.url ? 'a' : 'div'"
    :href="sponsor.url"
    :target="sponsor.url ? '_blank' : undefined"
    :rel="sponsor.url ? 'noopener' : undefined"
    class="job-card"
  >
    <span class="job-card__logo">
      <img
        v-if="!hasLogoError"
        :src="logoSrc"
        :alt="sponsor.name"
        loading="lazy"
        @error="hasLogoError = true"
      />
      <span v-else class="job-card__logo-fallback" aria-hidden="true">
        {{ sponsor.name }}
      </span>
    </span>
    <h3 class="job-card__name">{{ sponsor.name }}</h3>
    <p v-if="sponsor.pr" class="job-card__pr">{{ sponsor.pr }}</p>
  </component>
</template>

<style scoped>
.job-card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 14px;
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
  height: 100%;
}

a.job-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-line);
  box-shadow: 4px 4px 0 0 var(--color-line);
}

.job-card__logo {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.job-card__logo img,
.job-card__logo-fallback {
  position: absolute;
  inset: 12px;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  object-fit: contain;
}

.job-card__logo-fallback {
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  line-height: 1.2;
  color: var(--color-mute);
  text-align: center;
}

.job-card__name {
  margin: 0;
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-ink);
}

.job-card__pr {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-mute);
  white-space: pre-line;
}
</style>
